define(["app"],function(app){

	var state={
	    SOURCE_LOGIN:{},
	    TARGET_LOGIN:{}
    };

	function  loadLoginState ( prefix ) {

        var loginStatus=webix.storage.local.get(prefix);
        if(loginStatus && loginStatus.source_info.id) {
            var sourceLoginDetails = loginStatus.source_info;
            var identityServiceUrl = sourceLoginDetails.id;
            var identityOrgId = identityServiceUrl.split( "/id/" )[1].split( "/" )[0];
            var sessionId = sourceLoginDetails.access_token;
            var instanceUrl = sourceLoginDetails.instance_url;

            state[prefix]={
                identityOrgId:identityOrgId,
                sessionId:sessionId,
                instanceUrl:instanceUrl
            }
        }
    }

    //init state
    loadLoginState('SOURCE_LOGIN');
    loadLoginState('TARGET_LOGIN');



    return {
        STATE:state ,
        isLoggedIn:function ( prefix ) {
            debugger;
            var me=this;
            var returnValue = false;
            var loginStatus = me.STATE[prefix];
            if ( loginStatus && loginStatus.identityOrgId ) {
                returnValue = true;
            }
            return returnValue;
        }
    }

});