/**
 * Created by prakash on 1/4/17.
 */
define([
    "app",
    "views/CarterHomeView",
    "views/CarterHomeViewLeftBar",
    "views/CarterHomeSourceLogin",
    "models/AppSharedState",
    "models/UserInfoUtils"
],function(app,CarterHomeView,CarterHomeViewLeftBar,CarterHomeSourceLogin,AppSharedState,UserInfoUtils){

    var cmpToRender={
        type:'plain',
        id:'carterNotLoggedInView',
        css:'carter_not_logged_in_container',
        cols:[
            CarterHomeViewLeftBar,
            /*{ view:"resizer"},*/
            {
                type:'plain',
                gravity:4,
                rows:[
                    CarterHomeSourceLogin
                ]
            }
        ],
        responsive:"carterHomeInitial"
    };

    $('body').addClass('carter_page_wrapper');

    return {
        $ui:cmpToRender,
        $onevent:{
            LOGIN_STATUS_CHANGED:function ( prefix ) {

                //debugger;
                AppSharedState.loadLoginState('SOURCE_LOGIN');
                AppSharedState.loadLoginState('TARGET_LOGIN');

                var toolKitToLogin=webix.storage.local.get("TOOLKIT_TO_LOGIN");


                var currentToolKitInfo=AppSharedState.getCurrentToolKitInfo();

                if(toolKitToLogin===currentToolKitInfo.name)
                {
                    if ( prefix === "SOURCE_LOGIN" ) {
                        if ( currentToolKitInfo.loggedInView ) {
                            if(currentToolKitInfo.reloadOnLogin){
                                webix.storage.local.remove("TOOLKIT_TO_LOGIN");
                                document.location.reload();
                            }else {
                                webix.storage.local.remove("TOOLKIT_TO_LOGIN");
                                //UserInfoUtils.getSourceOrgUserInfo();
                                app.show( 'forceput/' + currentToolKitInfo.loggedInView );
                            }
                        }
                    }
                }


            }
        }};
});
