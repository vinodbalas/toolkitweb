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
        $init:function (  ) {
          debugger;
        },
        $onevent:{
            LOGIN_STATUS_CHANGED:function ( prefix ) {
                debugger;
                app.show('top/CarterLoggedInView');

            }
        }};
});
