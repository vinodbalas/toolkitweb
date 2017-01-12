define([
    "app",
    "views/start",
    "views/ToolkitsList"
],function(app,start,ToolkitsList){


    var layout = {
        css:'abstract_container',
        rows:[
            {template:'Forceput',height:'50px',css:'app_container_toolkits_landing_title'},
            {template:'Salesforce Toolkit Services',height:'50px',css:'app_container_toolkits_landing_sub_title'},
            ToolkitsList,
			{$subview:true,css:'app_container_toolkits_container'}

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
