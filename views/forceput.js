define([
	"app",
    "models/AppSharedState",
    "models/AppEventHandlers"
],function(app,AppSharedState,AppEventHandlers){


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
