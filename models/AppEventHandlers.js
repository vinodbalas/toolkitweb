define(["app","models/AppSharedState"],function(app,AppSharedState){

	var Toolkit=window.Toolkit=Toolkit || {};

	Toolkit.SOURCE_LOGIN_STATUS='SOURCE_LOGIN';
    Toolkit.TARGET_LOGIN_STATUS='TARGET_LOGIN';

    Toolkit.EVENT_NAMES={
        LOGIN_STATUS_CHANGED:'LOGIN_STATUS_CHANGED'
    };


    Toolkit.handleLoginResult=function ( prefix ) {
        AppSharedState.loadLoginState(prefix);
        app.callEvent(Toolkit.EVENT_NAMES.LOGIN_STATUS_CHANGED, [prefix]);
    };

    return{};

});