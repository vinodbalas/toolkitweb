define([
    "app",
	"/models/records"
],function(app,records){

  debugger;
    var loginStatus=webix.storage.local.get('source_status');
    if(loginStatus && loginStatus.source_info.id) {
        var sourceLoginDetails = loginStatus.source_info;
        var identityServiceUrl = sourceLoginDetails.id;
        var identityOrgId = identityServiceUrl.split( "/id/" )[1].split( "/" )[0];
        var sessionId = sourceLoginDetails.access_token;
        var instanceUrl = sourceLoginDetails.instance_url;
    }

	var ui = {
        header:'<div class="auditor-toolkit-title">Auditor</div>',
        css:'auditor-toolkit-name',
        width:310,
        collapsed:false,
        headerAlt:'<div class="auditor-header-collapsed"> <span class="auditor-header-collapsed-title">auditor</span>&nbsp;-&nbsp;<span class="auditor-header-collapsed-user-text">Click to Expand and see Audit types available</span> </div>',
        type:'material',
        body:{
            rows:[
                {
                    view:"datatable" ,
                    id:'auditActionList',
                    css:'auditor-available-meta-data-types-list',
                    scroll:'platform-y',
                    adjust:true ,
                    scrollAlignY:true,
                    select:"row" ,
                    multiselect:false ,
                    header:true ,
                    columns:[
                        { id:"xmlName" , header:["<div class='toolkit-grid-header-meta-type-text'>Available Audit Action List</div>",
                                                    {
                                                        content:"textFilter", placeholder:'Search meta data types', class:'search_meta_data_types'
                                                    }
                                                 ],
                             minWidth:300 , css:'auditor-grid-header-meta-data-name',fillspace:2,sort:"string" },
                        { id:"directoryName" , header:'' ,hidden:true},
                        { id:"suffix" , header:'' ,hidden:true}
                    ] ,
                    on:{
                        onBeforeLoad:function(){
                            this.showOverlay("Loading...");
                        },
                        onAfterLoad:function(){
                            this.hideOverlay();
                            if (!this.count()) {
                                this.showOverlay( "Sorry, there is no data. Please logout and login again. " );
                            }

                            this.data.sort("xmlName", "asc");
                            $$('metaDataTypesList').markSorting("xmlName", "asc");

                        },
                        onItemClick: function(id, e, node){

                            var me=this;
                            var selectedType=me.getItem(id).xmlName;
                            var metaDataTypesComponentsListUrl=loginStatus?app.config.getApiUrl('getAuditDetails?session={"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" } &metadataType="'+selectedType+'"'):""

                            $$("sourceGrid").define("currentType", selectedType);
                            $$("sourceGrid").define("url", metaDataTypesComponentsListUrl);
                            $$('sourceGrid').refresh();

                        },
                        onLoadError:function (  ) {
                           //TODO;
                        }
                    },
                    url:loginStatus?app.config.getApiUrl('?session={"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }'):""
                }
            ]
        }

	};

	return {
		$ui: ui,
		$oninit:function(view){
		}
	};

});
