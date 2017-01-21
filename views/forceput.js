define([
	"app",
    "models/AppSharedState",
    "models/AppEventHandlers"
],function(app,AppSharedState,AppEventHandlers){



    webix.ui({
        view:"popup",
        id:"userLoginMenu",
        css:'carter-user-login-menu-list-popup',
        head:false,
        width: 300,
        body:{
            view:"list" ,
            css:'carter-user-login-menu-list' ,
            scroll:false ,
            yCount:2 ,
            select:true ,
            borderless:true ,
            template:"#menuItemText#" ,
            data:[
                {
                    id:1 ,
                    menuItemText:"<div class='source_logout_menu'>" +
                    "<span class='source_logout_menu_icon'><i class='fa fa-cloud-download'></i></span>" +
                    "<span class='source_logout_menu_text'>Source Logout</span>" +
                    "</div>"
                    , css:'carter-user-login-menu-item-source'
                } ,
                {
                    id:2 ,
                    menuItemText:"<div class='target_logout_menu'>" +
                    "<span class='target_logout_menu_icon'><i class='fa fa-cloud-upload'></i></span>" +
                    "<span class='target_logout_menu_text'>Target Logout</span>" +
                    "</div>" ,
                    css:'carter-user-login-menu-list-target'
                }
            ] ,
            on:{
                "onAfterSelect":function(id){
                    if(id==="1"){
                        webix.storage.local.remove('SOURCE_LOGIN');
                        //app.show("forceput/CarterLoggedInView")
                        AppSharedState.loadLoginState('SOURCE_LOGIN');
                        AppSharedState.loadLoginState('TARGET_LOGIN');
                        app.show("forceput/toolkits");
                        document.location.reload();
                        //trigger source logout event.
                        //clear index db
                    }
                    else if(id==="2"){
                        webix.storage.local.remove('TARGET_LOGIN');
                        //TODO..
                        //trigger target logout event.
                        // window.location.reload();
                        //clear index db
                    }
                    $$("userLoginMenu").hide();
                }
            }
        }
    });




    /*webix.protoUI( {
        name:"resizer" ,
        defaults:{
            width:2 , height:2
        }
    });*/
/** View Template
    define([], function(){
        return {
            $ui:{
            ui config
            },
            $oninit:function(view, $scope){

            //each time when a view is created
            after creating

            $scope.on(app, "detailsModeChanged", function(mode){
                view.showColumnBatch(mode);
            });


            },
            $onurlchange:function(config, url, $scope){

            after navigation

            },
            $ondestroy:function(){

            before destroy
            },
            //Shortcut t
            $onevent:{
            <CUSTOM_EVENT_NAME>:handler

            },
            //Define Custom Methods
            getActiveRecord:function(){
            }
        }
    });
/**/
        webix.detachEvent(webix.debug_load_event);

    return { id:'forceput_abstract_app',$subview:true,css:'abstract_app'};
});
