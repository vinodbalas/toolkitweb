define([
    "app",
	"models/records"
],function(app,records){


    var collection = new webix.DataCollection({ data:[
        { id:1, title:"The Shawshank Redemption", year:1994, votes:678790, rating:9.2, rank:1},
        { id:2, title:"The Godfather", year:1972, votes:511495, rating:9.2, rank:2},
        { id:3, title:"The Godfather: Part II", year:1974, votes:319352, rating:9.0, rank:3},
        { id:4, title:"The Good, the Bad and the Ugly", year:1966, votes:213030, rating:8.9, rank:4},
        { id:5, title:"My Fair Lady", year:1964, votes:533848, rating:8.9, rank:5},
        { id:6, title:"12 Angry Men", year:1957, votes:164558, rating:8.9, rank:6}
    ]});



    var loginStatus=webix.storage.local.get('source_status');
    if(loginStatus) {
        var sourceLoginDetails = loginStatus.source_info;
        var identityServiceUrl = sourceLoginDetails.id;
        var identityOrgId = identityServiceUrl.split( "/id/" )[1].split( "/" )[0];
        var sessionId = sourceLoginDetails.access_token;
        var instanceUrl = sourceLoginDetails.instance_url;
    }

	var ui = {
        header:'<div class="carter-toolkit-title">CARTER</div>',
        css:'carter-toolkit-name',
        collapsed:false,
        type:'material',
        body:{
            rows:[
                /*{ template:'Meta Data Types' , height:35 , css:'bg_clean' } ,*/
                { view:"search", placeholder:"Search here",height:35 ,id:'metaDataTypeListSearch' },
                {
                    view:"datatable" ,
                    id:'metaDataTypesList',
                    scroll:'platform-y',
                    adjust:true ,
                    select:"row" ,
                    multiselect:false ,
                    header:true ,
                    columns:[
                        { id:"xmlName" , header:'Meta Data Types', width:270, minWidth:270 , fillspace:true,sort:"string" },
                        { id:"directoryName" , header:'' ,hidden:true},
                        { id:"suffix" , header:'' ,hidden:true}
                    ] ,
                    //data:collection,
                    on:{
                        onBeforeLoad:function(){
                           // debugger;
                            this.showOverlay("Loading...");
                        },
                        onAfterLoad:function(){
                            debugger;
                            this.hideOverlay();

                            this.data.sort("xmlName", "asc");
                            $$('metaDataTypesList').markSorting("xmlName", "asc");

                        },
                        onItemClick: function(){alert("you have clicked an item");}
                    },
                    url:loginStatus?'http://45.79.68.106:8080/Carter/rest/CarterService/getMetadataObjects?session={"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }':""
                }
            ]
        }

	};

	return {
		$ui: ui,
		$oninit:function(view){
			//debugger;
			//view.parse(records.data);
		}
	};
	
});
