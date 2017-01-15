define([
    "app",
    "views/ToolkitsList"
],function(app,ToolkitsList){


    var layout = {
        css:'abstract_container',
        rows:[
            {template:'Forceput',height:'50px',css:'app_container_toolkits_landing_title'},
            {template:'Salesforce Toolkit Services',height:'50px',css:'app_container_toolkits_landing_sub_title'},
            ToolkitsList,
			{id:'forceput_abstract_app',$subview:true,css:'app_container_toolkits_container'}

        ]
    };



	return {
		$ui:layout,
        css:'abstract_container_top',
        $init:function (  ) {
            //debugger;
        }
	};
	
});
