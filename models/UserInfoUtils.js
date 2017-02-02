define(['app','models/AppSharedState'],function(app,AppSharedState){

	function  AjaxRequest ( url, successFunction,failureFunction ) {

        webix.ajax(url,{

        	error:failureFunction,
            success:successFunction
            /*error:function(text, data, XmlHttpRequest){
                //alert("error");
            },
            success:function(text, data, XmlHttpRequest){
                if(XmlHttpRequest.status===204){

                    webix.alert({
                        type:"alert-error",
                        title:"Session Time out",
                        text:"Your source org session timed out. </br>Please login again.",
                        callback:function(){
                            webix.storage.local.remove('SOURCE_LOGIN');
                            app.show("forceput/CarterNotLoggedInView")
                        }
                    });


                }else if(XmlHttpRequest.status===200){
                    $$("metaDataTypesList").parse(text);
                    AppSharedState.resetUserSelection();
                }
            }*/
        });

    }
	function getUserInfoInfo ( sessionInfo,orgType) {

		var url=app.config.getCarterApiUrl('getUserInfo?session='+sessionInfo);

        function userInfoError(text, data, XmlHttpRequest){
            //alert("error");
			debugger;
        }

        function userInfoSuccess(text, data, XmlHttpRequest){
            if(XmlHttpRequest.status===204){

            	debugger;

                /*webix.alert({
                    type:"alert-error",
                    title:"Session Time out",
                    text:"Your source org session timed out. </br>Please login again.",
                    callback:function(){
                        webix.storage.local.remove('SOURCE_LOGIN');
                        app.show("forceput/CarterNotLoggedInView")
                    }
                });*/


            }else if(XmlHttpRequest.status===200){





                app.callEvent( 'USER_INFO_'+orgType ,[JSON.parse(text)]);
            }
        }

        AjaxRequest(url,userInfoSuccess,userInfoError);

    }


	return {
		getSourceOrgUserInfo:function (  ) {

            var sourceOrgInfo=AppSharedState.getOrgLogInInfo("SOURCE_LOGIN");

            var identityOrgId = sourceOrgInfo.identityOrgId;
            var sessionId = sourceOrgInfo.sessionId;
            var instanceUrl = sourceOrgInfo.instanceUrl;
            var sourceSessionInfo='{"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }';

            getUserInfoInfo(sourceSessionInfo,'SOURCE');


        },
        getTargetOrgUserInfo:function (  ) {

            var targetOrgInfo=AppSharedState.getOrgLogInInfo("TARGET_LOGIN");

            var identityOrgId = targetOrgInfo.identityOrgId;
            var sessionId = targetOrgInfo.sessionId;
            var instanceUrl = targetOrgInfo.instanceUrl;
            var targetSessionInfo='{"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }';

            getUserInfoInfo(targetSessionInfo,'TARGET');


        }
	};
});