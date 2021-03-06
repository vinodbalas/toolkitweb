define([
    "app",
    "views/ToolkitsList",
    "models/AppSharedState",
    "models/AppEventHandlers"
],function(app,ToolkitsList,AppSharedState,AppEventHandlers){


    var layout = {
        css:'abstract_container',
        rows:[
            {template:'Forceput',height:'50px',css:'app_container_toolkits_landing_title'},
            {template:'Toolkit Service',height:'50px',css:'app_container_toolkits_landing_sub_title'},
            ToolkitsList,
			{id:'forceput_abstract_app',$subview:true,css:'app_container_toolkits_container'}

        ]
    };



	return {
		$ui:layout,
        css:'abstract_container_top',
        $oninit:function (  ) {
            //debugger;
            $('body').removeClass('carter_page_wrapper');
            $('body').removeClass('auditor_body_wrapper');
            $('body').removeClass('analyser_body_wrapper');
            $('body').removeClass('documenter_body_wrapper');

        }
	};

});
