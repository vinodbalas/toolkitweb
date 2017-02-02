define([
    "app",
    "models/AppSharedState"
],function(app,AppSharedState){

    return {
        getSelectedSourceOrgComponents:function (  ) {

            var objectsByType={};
            var gridData=$$('userSelectionsForValidation').data;
            gridData.each( function ( row ) {
                if ( !objectsByType[row.itemType] ) {
                    objectsByType[row.itemType] = []
                }
                objectsByType[row.itemType].push( row.name )
            } );

            var paramsObj={types:[ ]};

            Object.keys(objectsByType).map(function ( key ) {
                var selectedType={members:objectsByType[key],name:key};
                paramsObj.types.push(selectedType);
            });


            var finalParams=JSON.stringify(paramsObj);
            return finalParams;

        },
        doUntilFinalStatus:function ( url, resolveDefOnLastCall,statusFieldToCheck, finalStatusValue, params,processPrefix, pollInterval ,finalCallback,progressStatusCallback,failedStatusValue) {


            var stepCounter=1;
            var intervalId=null;

            function  upDateProgress (progressStatus  ) {

                progressStatusCallback && progressStatusCallback(progressStatus);
            }
            function runProcess(processUrl){


                var promise = webix.ajax(processUrl);
                promise.then(function(resData){

                    try {
                        var jsonResponse = resData.json();
                        var dataField=jsonResponse.data;
                        console.log( "Response Counter:" + stepCounter , jsonResponse );
                        if ( dataField ) {

                            var responseFinalFieldValue = dataField[statusFieldToCheck];
                            //var failValue=dataField[failedStatusValue];
                            if ( responseFinalFieldValue === finalStatusValue  || responseFinalFieldValue===failedStatusValue) {
                                console.log( processPrefix + " Response has:" + statusFieldToCheck + " with Value:" + finalStatusValue );
                                console.log( processPrefix + " Response Counter Coming to end:" );
                                finalCallback && finalCallback( dataField );
                                if(intervalId) {
                                    clearInterval( intervalId );
                                }

                                upDateProgress(responseFinalFieldValue);
                                //resolveDefOnLastCall.resolve('');with final response
                            } else {
                                console.log( processPrefix + " Response does not have:" + statusFieldToCheck + " with Value:" + finalStatusValue );
                                //setInterval(, pollInterval)

                                upDateProgress(responseFinalFieldValue);
                                runProcess( processUrl );

                            }

                        }
                        //upDateProgress('Still Working...');
                        stepCounter++;
                    }catch (err){
                        console.log(processPrefix+"Failed ... Step:"+stepCounter,err);
                        upDateProgress('Failed...');
                        finalCallback && finalCallback( {msg:'parsing response failed',data:resData} );
                        if(intervalId) {
                            clearInterval( intervalId );
                        }
                    }
                });
                promise.fail(function(err){
                    console.log(processPrefix+"Failed ... Step:"+stepCounter,err);
                    progressStatusCallback && progressStatusCallback('Failed...');
                    finalCallback && finalCallback({status:false,msg:'failed to get final status'});
                    if(intervalId) {
                        clearInterval( intervalId );
                    }

                });

            }

            runProcess(url);


        },

        doValidateOrDeploy:function ( deploy ) {



        },
        getRetrieveStatusUrl:function ( asyncProcessId ) {

            //if deploy
            var statusUrl=app.config.getCarterApiUrl('retrieveStatus?asyncProcessId="'+asyncProcessId+'"');
            return statusUrl;
        },

        doRetrieve:function ( finalStatusCallback ,progressStatusCallback) {

            //var stopPromise = new Promise(function () {});

            var me=this;
            var retrieveParams=this.getSelectedSourceOrgComponents();
            var retrieveUrl=this.getRetrieveUrl(retrieveParams);

            webix.ajax(retrieveUrl,{
                error:function(text, data, XmlHttpRequest){
                    //alert("error");
                },
                success:function(text, data, XmlHttpRequest){
                    if(XmlHttpRequest.status===204){

                        finalStatusCallback({status:'Failed'});

                    }else if(XmlHttpRequest.status===200){

                        var jsonResponse={};
                        if(text && text.length>0)
                        {
                            jsonResponse=JSON.parse(text);
                        }

                        if(jsonResponse) {

                            if(jsonResponse.status==="Failed"){
                                console.log("Retrieve Status Failed");
                                finalStatusCallback(jsonResponse);
                                return;
                            }


                            var asyncProcessId =jsonResponse.data.id;

                            AppSharedState.setProcessStatusFieldValue('retrieve','processId',asyncProcessId);
                            /*AppSharedState.retrieveAsyncProcessStatus=false;
                             AppSharedState.retrieveAsyncProcessId=asyncProcessId;*/
                            console.log("Retrieve Status Id:"+asyncProcessId);
                            var retrieveStatusUrl=me.getRetrieveStatusUrl(asyncProcessId);
                            console.log(":API Call: Retrieve Status:"+retrieveStatusUrl);
                            me.doUntilFinalStatus( retrieveStatusUrl , null , "status" , "Succeeded" , {} , ":RetrieveFromSource:",null, finalStatusCallback,progressStatusCallback );
                        }


                    }
                }
            });


        },
        getRetrieveUrl:function ( finalParams ) {
            var sourceOrgInfo=AppSharedState.getOrgLogInInfo("SOURCE_LOGIN");

            var identityOrgId = sourceOrgInfo.identityOrgId;
            var sessionId = sourceOrgInfo.sessionId;
            var instanceUrl = sourceOrgInfo.instanceUrl;

            var retrieveUrl=app.config.getCarterApiUrl('retrieve?sourceSession={"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }&deployRequest='+escape(finalParams));

            return retrieveUrl;
        },


        getDeployStatusUrl:function ( asyncProcessId ) {

            var sourceOrgInfo=AppSharedState.getOrgLogInInfo("TARGET_LOGIN");//TODO TARGET_LOGIN

            var identityOrgId = sourceOrgInfo.identityOrgId;
            var sessionId = sourceOrgInfo.sessionId;
            var instanceUrl = sourceOrgInfo.instanceUrl;
            //if deploy
            var statusUrl=app.config.getCarterApiUrl('deployStatus?targetSession={"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }&asyncProcessId="'+escape(asyncProcessId)+'"');
            return statusUrl;
        },

        doDeploy:function ( deployFinalStatusCallback ,deployProgressCallback) {

            //var stopPromise = new Promise(function () {});

            var me=this;
            var asyncId=  AppSharedState.getProcessStatusFieldValue('retrieve','processId') ;//|| AppSharedState.getProcessStatusFieldValue('validate','processId');
            var deployUrl=me.getDeployUrl(asyncId);



            webix.ajax(deployUrl,{
                error:function(text, data, XmlHttpRequest){
                    //alert("error");
                },
                success:function(text, data, XmlHttpRequest){
                    if(XmlHttpRequest.status===204){
                        deployFinalStatusCallback({status:'Failed',errorCode:204});
                    }else if(XmlHttpRequest.status===200){

                        var jsonResponse={};

                        if(text && text.length>0)
                        {
                            jsonResponse=JSON.parse(text);
                        }
                        var resData=jsonResponse.data;

                        if(resData) {
                            if(resData.status==="Failed"){
                                console.log("Deploy Status Failed");
                                deployFinalStatusCallback(jsonResponse);
                                return;
                            }
                            var asyncProcessId = resData.id;
                            //AppSharedState.deployStatusAsyncId = asyncProcessId;
                            console.log("Deploy Status Id:"+asyncProcessId);
                            // var deployStatusUrl=this.getDeployStatusUrl(AppSharedState.validateAsyncProcessId);
                            var deployStatusUrl=me.getDeployStatusUrl(asyncProcessId );
                            console.log(":API Call: Deploy Status:"+deployStatusUrl);
                            me.doUntilFinalStatus( deployStatusUrl , null , "status" , "Succeeded" , {} , ":Deploy To Target:" ,null,deployFinalStatusCallback,deployProgressCallback,"Failed");
                        }else
                        {
                            console.log("No Data returned");
                        }


                    }
                }
            });


        },
        getDeployUrl:function ( asyncProcessId ) {
            var targetOrgInfo=AppSharedState.getOrgLogInInfo("TARGET_LOGIN");//TODO TARGET_LOGIN

            var trgIdentityOrgId = targetOrgInfo.identityOrgId;
            var trgSessionId = targetOrgInfo.sessionId;
            var trgInstanceUrl = targetOrgInfo.instanceUrl;
            var findParams=this.getFindReplaceParams(true);


            var retrieveUrl=app.config.getCarterApiUrl('deploy?targetSession={"sessionId":"'+escape(trgSessionId)+'","instanceUrl":"'+escape(trgInstanceUrl)+'","organizationId":"'+escape(trgIdentityOrgId)+'" }&asyncProcessId="'+escape(asyncProcessId)+'"&carterOptions={"checkOnly":"false" '+(findParams)+'}');

            return retrieveUrl;
        },

        getValidateStatusUrl:function ( asyncProcessId ) {

            var sourceOrgInfo=AppSharedState.getOrgLogInInfo("TARGET_LOGIN");//TODO TARGET_LOGIN

            var identityOrgId = sourceOrgInfo.identityOrgId;
            var sessionId = sourceOrgInfo.sessionId;
            var instanceUrl = sourceOrgInfo.instanceUrl;
            var findParams=this.getFindReplaceParams(true);

            //if deploy
            var statusUrl=app.config.getCarterApiUrl('deployStatus?targetSession={"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }&asyncProcessId="'+escape(asyncProcessId)+'"&carterOptions={"checkOnly":"true" '+(findParams)+'}');
            return statusUrl;
        },
        getFindReplaceParams:function ( asJsonString ) {

            var findReplaces=[];
            var findValues=[];
            var replaceValues=[];

            $('.carter_find_string').each(function(it){
                findValues.push(this.value);
            });

            if(!findValues.length>0){
                return '';
            }
            $('.carter_replace_string').each(function(it){
                replaceValues.push(this.value);
            });


            for(var i=0;i<findValues.length;i++){

                if(findValues[i].length>0) {
                    var findReplace = { findString:findValues[i] , replaceString:replaceValues[i] };
                    findReplaces.push( findReplace );
                }

                    //findReplaces:[{findString:"", replaceString: ""}, {findString:"", replaceString: ""}]
            }

            var stringFormat="";
            var findReplacesStr=[];
            for(var i=0,len=findReplaces.length;i<len;i++){
                var fr=findReplaces[i];
                stringFormat='{"findString":"'+fr.findString+'","replaceString":"'+fr.replaceString+'"}';
                findReplacesStr.push(stringFormat);
            }
            if(asJsonString && findReplaces.length>0){
                return ',"findReplaces":[+'+findReplacesStr.join(',')+']';
            }else{
                return findReplaces;
            }


        },
        getValidateUrl:function (asyncProcessId  ) {

            var targetOrgInfo=AppSharedState.getOrgLogInInfo("TARGET_LOGIN");//TODO TARGET_LOGIN

            var trgIdentityOrgId = targetOrgInfo.identityOrgId;
            var trgSessionId = targetOrgInfo.sessionId;
            var trgInstanceUrl = targetOrgInfo.instanceUrl;

            var findParams=this.getFindReplaceParams(true);


            var retrieveUrl=app.config.getCarterApiUrl('deploy?targetSession={"sessionId":"'+escape(trgSessionId)+'","instanceUrl":"'+escape(trgInstanceUrl)+'","organizationId":"'+escape(trgIdentityOrgId)+'" }&asyncProcessId="'+escape(asyncProcessId)+'"&carterOptions={"checkOnly":"true" '+(findParams)+'}');

            return retrieveUrl;


        },
        doValidate:function ( validateFinalStatusCallback ,validateProgressCallback ) {
            //var stopPromise = new Promise(function () {});

            var me=this;
            var asyncId=AppSharedState.getProcessStatusFieldValue('retrieve','processId');//.retrieveAsyncProcessId;
            var validateUrl=me.getValidateUrl(asyncId);


            webix.ajax(validateUrl,{
                error:function(text, data, XmlHttpRequest){
                    //alert("error");
                },
                success:function(text, data, XmlHttpRequest){
                    if(XmlHttpRequest.status===204){
                        validateFinalStatusCallback({status:'Failed'});

                    }else if(XmlHttpRequest.status===200){

                        var jsonResponse={};
                        if(text && text.length>0)
                        {
                            jsonResponse=JSON.parse(text);
                        }
                        //var jsonResponse=resData.json();
                        var resItem=jsonResponse.data;
                        if(resItem) {
                            var asyncProcessId = resItem.id;

                            AppSharedState.setProcessStatusFieldValue('validate','processId',asyncProcessId);

                            //AppSharedState.validateAsyncProcessId = asyncProcessId;
                            //debugger;
                            console.log("validateAsyncProcessId Status Id:"+asyncProcessId);
                            // var deployStatusUrl=this.getDeployStatusUrl(AppSharedState.validateAsyncProcessId);
                            var deployStatusUrl=me.getValidateStatusUrl(asyncProcessId);
                            console.log(":API Call: Validate Status:"+deployStatusUrl);
                            me.doUntilFinalStatus( deployStatusUrl , null , "status" , "Succeeded" , {} , ":Validate in  Target:" ,null,validateFinalStatusCallback,validateProgressCallback);
                        }else
                        {
                            console.log("No Data returned");
                        }

                    }
                }
            });


        }


    }

});
