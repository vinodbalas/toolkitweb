define(["app","models/AppSharedState"],function(app,AppSharedState){

	var Toolkit=window.Toolkit=Toolkit || {};

	Toolkit.SOURCE_LOGIN_STATUS='SOURCE_LOGIN';
    Toolkit.TARGET_LOGIN_STATUS='TARGET_LOGIN';

    Toolkit.EVENT_NAMES={
        LOGIN_STATUS_CHANGED:'LOGIN_STATUS_CHANGED'
    };


    Toolkit.handleLoginResult=function ( prefix ) {

        var loginStatus=webix.storage.local.get(prefix);
        if(loginStatus && loginStatus.source_info.id) {
            var sourceLoginDetails = loginStatus.source_info;
            var identityServiceUrl = sourceLoginDetails.id;
            var identityOrgId = identityServiceUrl.split( "/id/" )[1].split( "/" )[0];
            var sessionId = sourceLoginDetails.access_token;
            var instanceUrl = sourceLoginDetails.instance_url;

            AppSharedState.STATE[prefix]={
                identityOrgId:identityOrgId,
                sessionId:sessionId,
                instanceUrl:instanceUrl
            }
        }

        app.callEvent(Toolkit.EVENT_NAMES.LOGIN_STATUS_CHANGED, [prefix]);
    };

    return{};

});