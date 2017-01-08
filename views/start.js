define([
    "app",
    "views/start",
    "views/ToolkitsList"
],function(app,start,ToolkitsList){


    var layout = {
        type: "clean",
        rows:[
            {template:'Title',height:'50px'},
            {template:'Sub Title',height:'50px'},
            ToolkitsList,
			{$subview:true}

        ]
    };



	return {
        type:"material",
		$ui:layout,
        $init:function (  ) {
            //debugger;
        }
	};
	
});
