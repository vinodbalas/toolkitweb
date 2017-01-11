define([
    "app",
    "models/AppSharedState"
],function(app,AppSharedState){


        var sourceOrgInfo=AppSharedState.getOrgLogInInfo("SOURCE_LOGIN");

        var identityOrgId = sourceOrgInfo.identityOrgId;
        var sessionId = sourceOrgInfo.sessionId;
        var instanceUrl = sourceOrgInfo.instanceUrl;
        var loginStatus=true;

	var ui = {
        header:'<div class="carter-toolkit-title">CARTER</div>',
        css:'carter-toolkit-name',
        width:310,
        collapsed:false,
        headerAlt:'<div class="carter-header-collapsed"> <span class="carter-header-collapsed-title">CARTER </span>&nbsp;-&nbsp;<span class="carter-header-collapsed-user-text">Click to Expand and see Available Meta Data Types</span> </div>',
        type:'material',
        body:{
            css:'carter-left-bar-container',
            rows:[
                { template:'Meta Data Types' , height:28 ,css:'carter-left-bar-container meta-data-type-title' } ,

                {
                    view:"pager" , id:"pagerMetaDataTypeList" ,
                    css:'pager-meta-data-type-list',
                    animate:true ,
                    size:30 ,
                    height:25 ,
                    template:function ( data , common ) {
                        var start = data.page * data.size;
                        var end = start + data.size;
                        var html = " <div class='metadata-type-list-pager' style='width:100%; text-align:center; line-height:20px; font-size:10pt; float:left'> "+common.first() + common.prev() + "<span class='pager-info-text'>" + (start + 1) + " - " + (end < data.count ? end : data.count) + " of " + (data.count) + "</span>" + common.next() + common.last()+"</div> ";
                        return html;
                    }
                },
                { view:"search",
                    icon:"search", placeholder:"Search here",height:55 ,id:'metaDataTypeListSearch',
                    css:'carter-left-bar-container meta-data-search-input',
                    on:{
                        onTimedKeyPress:function (  ) {
                           var value = this.getValue().toLowerCase();

                            $$("metaDataTypesList").filter(function(obj){ //here it filters data!
                                return obj['xmlName'].toLowerCase().indexOf(value)>=0;
                            })
                        }
                    }
                },
                {
                    view:"datatable" ,
                    id:'metaDataTypesList',
                    css:'carter-left-bar-container carter-available-meta-data-types-list',
                    scroll:'platform-y',
                    adjust:true ,
                    fillspace:true,
                    hover:"meta-data-type-list-hover",
                    pager:'pagerMetaDataTypeList',
                    scrollAlignY:true,
                    select:"row" ,
                    multiselect:false ,
                    header:false ,
                    columns:[
                        { id:"xmlName" , header:["<div class='toolkit-grid-header-meta-type-text'>Available Meta Data Types</div>",
                                                    {
                                                        content:"textFilter", placeholder:'Search meta data types', class:'search_meta_data_types'
                                                    }
                                                 ],
                             minWidth:300 , css:'carter-grid-header-meta-data-name',fillspace:2,sort:"string" },
                        { id:"directoryName" , header:'' ,hidden:true},
                        { id:"suffix" , header:'' ,hidden:true}
                    ] ,
                    //data:collection,
                    on:{
                        onBeforeLoad:function(){
                            AppSharedState.loadLoginState('SOURCE_LOGIN');
                            AppSharedState.loadLoginState('TARGET_LOGIN');
                           // debugger;
                            this.showOverlay("Loading...");
                        },
                        onAfterLoad:function(){
                            //debugger;
                            this.hideOverlay();
                            if (!this.count()) {
                               // app.show('top/CarterNotLoggedInView');
                                this.showOverlay( "Sorry, there is no data. Please logout and login again. " );
                            }

                            this.data.sort("xmlName", "asc");
                            $$('metaDataTypesList').markSorting("xmlName", "asc");

                        },
                        onItemClick: function(id, e, node){

                            var me=this;
                           // alert("you have clicked an item");
                            var selectedType=me.getItem(id).xmlName;
                            var metaDataTypesComponentsListUrl=loginStatus?app.config.getCarterApiUrl('getMetadataObjectDetails?session={"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" } &metadataType="'+selectedType+'"'):""
                            //sourceGrid
                            $$('sourceGrid').clearAll();
                            //$$('sourceGrid').
                            $$("sourceGrid").define("currentType", selectedType);
                            $$("sourceGrid").define("url", metaDataTypesComponentsListUrl);


                           // $$('sourceGrid').load(metaDataTypesComponentsListUrl);
                            $$('sourceGrid').refresh();

                        },
                        onLoadError:function (  ) {
                           //TODO debugger;
                        }
                    },
                    url:''
                }
            ]
        }

	};

	return {
		$ui: ui,
		$oninit:function(view){



		    var metaDataTypesListUrl=app.config.getCarterApiUrl('getMetadataObjects?session={"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }');

            var result = webix.ajax().get(metaDataTypesListUrl, function (text) {
                debugger;
                $$("metaDataTypesList").parse(text);
            });

            $$('userSelectionsForValidationPreview').data.sync($$('userSelectionsForValidation'));
		}
	};
	
});
