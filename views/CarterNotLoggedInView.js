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
        id:'carterNotLoggedInView',
        cols:[
            CarterHomeViewLeftBar,
            /*{ view:"resizer"},*/
            {
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
