/**
 * Created by prakash on 1/4/17.
 */
define([
    "app",
    "views/CarterHomeView",
    "views/CarterHomeViewLeftBar",
    "views/CarterHomeSourceLogin",
    "models/AppSharedState"
],function(app,CarterHomeView,CarterHomeViewLeftBar,CarterHomeSourceLogin,AppSharedState){

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

                if(prefix==="SOURCE_LOGIN") {
                    app.show( 'forceput/CarterLoggedInView' );
                }

            }
        }};
});
