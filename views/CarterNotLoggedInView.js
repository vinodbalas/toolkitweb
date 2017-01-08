/**
 * Created by prakash on 1/4/17.
 */
define([
    "app",
    "views/CarterHomeView",
    "views/CarterHomeViewLeftBar",
    "views/CarterHomeSourceLogin"
],function(app,CarterHomeView,CarterHomeViewLeftBar,CarterHomeSourceLogin){

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



    return {
        $ui:cmpToRender,
        $onevent:{
            LOGIN_STATUS_CHANGED:function ( prefix ) {

                //debugger;
                if(prefix==="SOURCE_LOGIN") {
                    app.show( 'top/CarterLoggedInView' );
                }

            }
        }};
});
