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
	function getUserInfoInfo ( sessionInfo,orgType,orgId) {

		var url=app.config.getCarterApiUrl('getUserInfo?session='+sessionInfo);

        app.callEvent( 'USER_INFO_PROGRESS_'+orgType ,['progress']);
        function userInfoError(text, data, XmlHttpRequest){
            //alert("error");
            app.callEvent( 'USER_INFO_PROGRESS_'+orgType ,['failed']);
			debugger;
        }

        function userInfoSuccess(text, data, XmlHttpRequest){
            if(XmlHttpRequest.status===500){
                app.callEvent( 'USER_INFO_PROGRESS_'+orgType ,['failed']);
            }
            if(XmlHttpRequest.status===204){

                app.callEvent( 'USER_INFO_PROGRESS_'+orgType ,['failed']);

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
                app.callEvent( 'USER_INFO_PROGRESS_'+orgType ,['success']);
                var userInfo=JSON.parse(text);

                debugger;
                if(userInfo && userInfo.data ){
                    var userInfoSave=userInfo.data;
                    userInfoSave.orgType=orgType;
                    webix.storage.local.put(orgType+"_"+"USER_INFO_"+orgId,(userInfoSave));
                }

                app.callEvent( 'USER_INFO_'+orgType ,[userInfo]);

            }
        }

        AjaxRequest(url,userInfoSuccess,userInfoError);

    }


    function logout(prefix,eventId){
        var sourceOrgInfo=AppSharedState.getOrgLogInInfo(prefix);

        var identityOrgId = sourceOrgInfo.identityOrgId;
        var sessionId = sourceOrgInfo.sessionId;
        var instanceUrl = sourceOrgInfo.instanceUrl;
        var sourceSessionInfo='{"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }';

        var logoutUrl=app.config.getCarterApiUrl('logout?session='+sourceSessionInfo);


        var promise = webix.ajax(logoutUrl);
        promise.then(function(resData) {
            webix.storage.local.remove(prefix);
            AppSharedState.loadLoginState(prefix);

            app.callEvent(eventId,[]);

        });
        promise.fail(function(err){
        });
    }

	return {
        sourceLogout:function (  ) {
            logout('SOURCE_LOGIN','SOURCE_LOGOUT_SUCCESS')
        },
        targetLogout:function (  ) {
            logout('TARGET_LOGIN','TARGET_LOGOUT_SUCCESS')
        },
		getSourceOrgUserInfo:function (  ) {

            var sourceOrgInfo=AppSharedState.getOrgLogInInfo("SOURCE_LOGIN");

            var identityOrgId = sourceOrgInfo.identityOrgId;
            var sessionId = sourceOrgInfo.sessionId;
            var instanceUrl = sourceOrgInfo.instanceUrl;
            var sourceSessionInfo='{"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }';

            getUserInfoInfo(sourceSessionInfo,'SOURCE',identityOrgId);


        },
        getTargetOrgUserInfo:function (  ) {

            var targetOrgInfo=AppSharedState.getOrgLogInInfo("TARGET_LOGIN");

            var identityOrgId = targetOrgInfo.identityOrgId;
            var sessionId = targetOrgInfo.sessionId;
            var instanceUrl = targetOrgInfo.instanceUrl;
            var targetSessionInfo='{"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }';

            getUserInfoInfo(targetSessionInfo,'TARGET',identityOrgId);


        }
	};
});