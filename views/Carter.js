/**
 * Created by prakash on 1/4/17.
 */
define([
    "app",
    "views/CarterHomeViewLeftBar",
    "views/CarterSfdcLogin",
    "models/AppSharedState",
    "views/LogInInfoUtils"
],function(app,CarterHomeViewLeftBar,CarterSfdcLogin,AppSharedState,LogInInfoUtils){




   /* webix.ui({
        container:'fixedOnPage',
        view:"menu",
        width:150,
        css:'fixedOnPage',
        layout:"y",
        subMenuPos:"right",
        data:[
            { value:"Translate...", submenu:[
                "English",
                { value:"Slavic...", submenu:[
                    "Belarusian", "Russian", "Ukrainian"
                ]},
                "German"
            ]},
            { value:"Post...", submenu:[ "Facebook", "Google+", "Twitter" ]},
            { $template:"Separator" },
            { value:"Info" }
        ],
        on:{
            onMenuItemClick:function(id){
                webix.message("Click: "+this.getMenuItem(id).value);
            }
        }
    });*/

    var cmpToRender={
        type:'plain',
        id:'carter',
        css:'carter_not_logged_in_container',
        cols:[
            CarterHomeViewLeftBar,
            /*{ view:"resizer"},*/
            {
                type:'plain',
                gravity:4,
                rows:[
                    CarterSfdcLogin
                ]
            },
            LogInInfoUtils
        ],
        responsive:"carterHomeInitial"
    };

    $('body').addClass('carter_page_wrapper');

    return {
        $ui:cmpToRender
    };
});
