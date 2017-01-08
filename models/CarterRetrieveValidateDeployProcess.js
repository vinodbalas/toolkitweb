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
        doUntilFinalStatus:function ( url, resolveDefOnLastCall,statusFieldToCheck, finalStatusValue, params,processPrefix, pollInterval ,finalCallback,progressStatusCallback) {


            var stepCounter=1;

            function  upDateProgress (progressStatus  ) {

                progressStatusCallback && progressStatusCallback(progressStatus);
            }
            function runProcess(processUrl){


                var promise = webix.ajax(processUrl);
                promise.then(function(resData){

                    try {
                        var jsonResponse = resData.json();
                        console.log( "Response Counter:" + stepCounter , jsonResponse );
                        if ( jsonResponse ) {
                            var responseFinalFieldValue = jsonResponse[statusFieldToCheck];
                            if ( responseFinalFieldValue === finalStatusValue ) {
                                console.log( processPrefix + " Response has:" + statusFieldToCheck + " with Value:" + finalStatusValue );
                                console.log( processPrefix + " Response Counter Coming to end:" );
                                finalCallback && finalCallback( jsonResponse );

                                upDateProgress(responseFinalFieldValue);
                                //resolveDefOnLastCall.resolve('');with final response
                            } else {
                                console.log( processPrefix + " Response does not have:" + statusFieldToCheck + " with Value:" + finalStatusValue );
                                //setInterval(, pollInterval)

                                upDateProgress(responseFinalFieldValue);
                                runProcess( processUrl )
                            }

                        }
                        //upDateProgress('Still Working...');
                        stepCounter++;
                    }catch (err){
                        console.log(processPrefix+"Failed ... Step:"+stepCounter,err);
                        upDateProgress('Failed...');
                        finalCallback && finalCallback( {msg:'parsing response failed',data:resData} );
                    }
                });
                promise.fail(function(err){
                    console.log(processPrefix+"Failed ... Step:"+stepCounter,err);
                    progressStatusCallback && progressStatusCallback('Failed...');
                    finalCallback && finalCallback({status:false,msg:'failed to get final status'});

                });

            }

            runProcess(url);


        },

        doValidateOrDeploy:function ( deploy ) {



        },
        getRetrieveStatusUrl:function ( asyncProcessId ) {

            //if deploy
            var statusUrl=app.config.getApiUrl('retrieveStatus?asyncProcessId="'+asyncProcessId+'"');
            return statusUrl;
        },

        doRetrieve:function ( finalStatusCallback ,progressStatusCallback) {

            //var stopPromise = new Promise(function () {});

            var me=this;
            var retrieveParams=this.getSelectedSourceOrgComponents();
            var retrieveUrl=this.getRetrieveUrl(retrieveParams);

            var promise = webix.ajax(retrieveUrl);
            promise.then(function(resData){

                var jsonResponse=resData.json();
                if(jsonResponse) {
                    var asyncProcessId =jsonResponse.id;
                    AppSharedState.validateAsyncProcessId=asyncProcessId;
                    var retrieveStatusUrl=me.getRetrieveStatusUrl(asyncProcessId);
                    me.doUntilFinalStatus( retrieveStatusUrl , null , "status" , "Succeeded" , {} , ":RetrieveFromSource:",null, finalStatusCallback,progressStatusCallback );
                }else
                {
                    finalStatusCallback && finalStatusCallback('Failed to Get Async Id');
                    progressStatusCallback && progressStatusCallback('Failed to Get Async Id');

                    console.log("No Data returned");
                }

            });
            promise.fail(function(err){
                finalStatusCallback && finalStatusCallback('Failed to Get Async Id');
                progressStatusCallback && progressStatusCallback('Failed to Get Async Id');
                console.log("No Data returned");
            });

        },
        getRetrieveUrl:function ( finalParams ) {
            var sourceOrgInfo=AppSharedState.getOrgLogInInfo("SOURCE_LOGIN");

            var identityOrgId = sourceOrgInfo.identityOrgId;
            var sessionId = sourceOrgInfo.sessionId;
            var instanceUrl = sourceOrgInfo.instanceUrl;

            var retrieveUrl=app.config.getApiUrl('retrieve?sourceSession={"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }&deployRequest='+escape(finalParams));

            return retrieveUrl;
        },


        getDeployStatusUrl:function ( asyncProcessId ) {

            var sourceOrgInfo=AppSharedState.getOrgLogInInfo("TARGET_LOGIN");//TODO TARGET_LOGIN

            var identityOrgId = sourceOrgInfo.identityOrgId;
            var sessionId = sourceOrgInfo.sessionId;
            var instanceUrl = sourceOrgInfo.instanceUrl;

            if(!asyncProcessId)
            {
                asyncProcessId=AppSharedState.validateAsyncProcessId;
            }
            //if deploy
            var statusUrl=app.config.getApiUrl('deployStatus?targetSession={"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }&asyncProcessId="'+escape(asyncProcessId)+'"');
            return statusUrl;
        },

        doDeploy:function ( deployFinalStatusCallback ) {

            //var stopPromise = new Promise(function () {});

            var me=this;
            var asyncId=AppSharedState.validateAsyncProcessId;
            var deployUrl=me.getDeployUrl(asyncId);


            var promise = webix.ajax(deployUrl);
            promise.then(function(resData){

                var jsonResponse=null;//resData.json();
               // if(jsonResponse) {
                    var asyncProcessId =null;
                   // var deployStatusUrl=this.getDeployStatusUrl(AppSharedState.validateAsyncProcessId);
                    var deployStatusUrl=me.getDeployStatusUrl(asyncProcessId || AppSharedState.validateAsyncProcessId);
                    me.doUntilFinalStatus( deployStatusUrl , null , "status" , "Succeeded" , {} , ":Deploy To Target:" ,null,deployFinalStatusCallback);
               /* }else
                {
                    console.log("No Data returned");
                }*/

            });
            promise.fail(function(err){
                console.log("No Data returned");
            });


        },
        getDeployUrl:function ( asyncProcessId ) {
            var sourceOrgInfo=AppSharedState.getOrgLogInInfo("TARGET_LOGIN");//TODO TARGET_LOGIN

            var identityOrgId = sourceOrgInfo.identityOrgId;
            var sessionId = sourceOrgInfo.sessionId;
            var instanceUrl = sourceOrgInfo.instanceUrl;

            var retrieveUrl=app.config.getApiUrl('deploy?targetSession={"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }&asyncProcessId="'+escape(asyncProcessId)+'"&carterOptions={"checkOnly":"true"}');

            return retrieveUrl;
        }


    }

});