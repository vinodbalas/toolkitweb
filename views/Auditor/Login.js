/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "views/OrgTypeLoginForm",
    "models/AppSharedState"
],function(app,OrgTypeLoginForm,AppSharedState){
    var layout = {
        type:'plain',
        css:'carter_not_logged_in_center_container',
        borderless:true,
        rows:[
            {type:'plain',template:'<div class="carter-source-login-header">Source Login</div>',
                height: 46,
                css:'carter_app_toolbar'},
        OrgTypeLoginForm
        ]
    };

    return {
        $ui:layout,
        $onevent:{
            LOGIN_STATUS_CHANGED:function ( prefix ) {

                //debugger;
                AppSharedState.loadLoginState( 'SOURCE_LOGIN' );
                AppSharedState.loadLoginState( 'TARGET_LOGIN' );
                var toolKitToLogin = webix.storage.local.get( "TOOLKIT_TO_LOGIN" );
                var currentToolKitInfo = AppSharedState.getCurrentToolKitInfo();
                if (toolKitToLogin==="AUDITOR" &&  toolKitToLogin === currentToolKitInfo.name ) {
                    if ( prefix === "SOURCE_LOGIN" ) {
                        if ( currentToolKitInfo.loggedInView ) {
                            if ( currentToolKitInfo.reloadOnLogin ) {
                                webix.storage.local.remove( "TOOLKIT_TO_LOGIN" );
                                document.location.reload();
                            } else {
                                webix.storage.local.remove( "TOOLKIT_TO_LOGIN" );
                                app.show( 'forceput/' + currentToolKitInfo.loggedInView );
                            }
                        }
                    }
                }else{
                    console.error("Toolkit launched and login are not same.")
                }
            }
        }
    };

});
