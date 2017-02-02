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
        height:400,
        scroll:true,
        body:{
            view:"list" ,
            css:'carter-user-login-menu-list' ,
            scroll:true ,
            yCount:2 ,
            select:false ,
            width: 300,
            height:400,
            borderless:true ,
            template:"#menuItemText#" ,

            /*type:{
                templateStart:"<div item_id='id' class='custom_item'>",
                template:"#rank#. #title#<br><div style='text-align:right;'>#year#</div>",
                templateEnd:"</div>"
            },
             "data" : {
             "organizationName" : "BARCLAYS",
             "userEmail" : "sph.prakash@gmail.com",
             "userFullName" : "Prakash S",
             "userType" : "Standard"
             }
            */
            data:[
                {
                    id:1 ,
                    menuItemText:"<div class='source_logout_menu' style='height: 200px !important;'>" +
                    "<div class='source_info_menu_text'>" +
                        "<div class='source_info_menu_text' id='sourceUserFullName'></div>"+
                        "<div class='source_info_menu_text' id='sourceUserEmail'></div>"+
                        "<div class='source_info_menu_text' id='sourceUserType'></div>"+
                        "<div class='source_info_menu_text' id='sourceOrganizationName'></div>"+
                    "</div>" +
                    "<div class='source_logout_menu_logout_container'><span class='source_logout_menu_icon'><i class='fa fa-cloud-upload'></i></span>" +
                    "<span class='source_logout_menu_text'><a href='javascript:void(0);' class='source_logout_link'>Source Logout</a></span> </div>" +

                    "</div>"
                    , css:'carter-user-login-menu-item-source'
                } ,
                {
                    id:2 ,
                    menuItemText:"<div class='target_logout_menu' style='height: 200px !important;'>" +
                    "<div class='target_info_menu_text'>" +
                    "<div class='target_info_menu_text' id='targetUserFullName'></div>"+
                    "<div class='target_info_menu_text' id='targetUserEmail'></div>"+
                    "<div class='target_info_menu_text' id='targetUserType'></div>"+
                    "<div class='target_info_menu_text' id='targetOrganizationName'></div>"+
                    "</div>" +
                    "<div class='target_logout_menu_logout_container'><span class='target_logout_menu_icon'><i class='fa fa-cloud-download'></i></span>" +
                    "<span class='target_logout_menu_text'><a href='javascript:void(0);' class='target_logout_link'>Target Logout</a></span> </div>" +

                    "</div>"
                    ,css:'carter-user-login-menu-list-target'
                }
            ] ,
            type:{
                height:200
            },
            onClick:{
                source_logout_link:function ( id , ev ) {
                    var sourceOrgInfo=AppSharedState.getOrgLogInInfo("SOURCE_LOGIN");

                    var identityOrgId = sourceOrgInfo.identityOrgId;
                    var sessionId = sourceOrgInfo.sessionId;
                    var instanceUrl = sourceOrgInfo.instanceUrl;
                    var sourceSessionInfo='{"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }';

                    var logoutUrl=app.config.getCarterApiUrl('logout?session='+sourceSessionInfo);


                    var promise = webix.ajax(logoutUrl);
                    promise.then(function(resData) {
                        webix.storage.local.remove('SOURCE_LOGIN');
                        app.show("forceput/toolkits");
                        AppSharedState.loadLoginState('SOURCE_LOGIN');
                        document.location.reload();

                    });
                    promise.fail(function(err){
                    });

                    $$("userLoginMenu").hide();

                },
                target_logout_link:function ( id , ev ) {
                    webix.storage.local.remove('TARGET_LOGIN');
                    $$("userLoginMenu").hide();
                }
            },
            on:{
                "onAfterSelect":function(id){
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

 USER_INFO_
/**/
        webix.detachEvent(webix.debug_load_event);

    return { id:'forceput_abstract_app',$subview:true,css:'abstract_app', $onevent:{

        USER_INFO_SOURCE:function ( data ) {

            debugger;
            /*"{
             "success" : true,
             "message" : null,
             "data" : {
             "organizationName" : "BARCLAYS",
             "userEmail" : "sph.prakash@gmail.com",
             "userFullName" : "Prakash S",
             "userType" : "Standard"
             }
             }"*/
            if(data && data.data) {
                var info = data.data;
                $( '#sourceOrganizationName' ).text( info.organizationName );
                $( '#sourceUserEmail' ).text( info.userEmail );
                $( '#sourceUserFullName' ).text( info.userFullName );
                $( '#sourceUserType' ).text( info.userType );
            }else{
                app.show("forceput/CarterNotLoggedInView");
            }

        },
        USER_INFO_TARGET:function ( data ) {

            debugger;

            if(data && data.data) {
                var info=data.data;
                $( '#targetOrganizationName' ).text( info.organizationName );
                $( '#targetUserEmail' ).text( info.userEmail );
                $( '#targetUserFullName' ).text( info.userFullName );
                $( '#targetUserType' ).text( info.userType );
            }else{

            }

        }
    }};
});
