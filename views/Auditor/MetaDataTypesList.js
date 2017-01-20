define([
    "app",
    "models/AppSharedState"
],function(app,AppSharedState){

	var ui = {
        header:'<div class="carter-toolkit-title">AUDITOR</div>',
        css:'carter-toolkit-name',
        width:310,
        collapsed:false,
        headerAlt:'<div class="carter-header-collapsed"> <span class="carter-header-collapsed-title">AUDITOR</span>&nbsp;-&nbsp;<span class="carter-header-collapsed-user-text">Click to Expand and see Audit Actions</span> </div>',
        type:'material',
        body:{
            rows:[
                {
                    view:"datatable" ,
                    id:'auditActionsList',
                    pager:'pagerauditActionsList',
                    css:'carter-available-meta-data-types-list',
                    scroll:'platform-y',
                    adjust:true ,
                    scrollAlignY:true,
                    select:"row" ,
                    multiselect:false ,
                    header:true ,
                    columns:[
                        { id:"xmlName" , header:["<div class='toolkit-grid-header-meta-type-text'>Available Audit Actions</div>",
                                                    {
                                                        content:"textFilter", placeholder:'Search Audit Actions', class:'search_meta_data_types'
                                                    }
                                                 ],
                             minWidth:300 , css:'carter-grid-header-meta-data-name',fillspace:2,sort:"string" },
                        { id:"directoryName" , header:'' ,hidden:true},
                        { id:"suffix" , header:'' ,hidden:true}
                    ],
                    on:{
                        onBeforeLoad:function(){
                            this.showOverlay("Loading...");
                        },

                        onAfterLoad:function(){
                            this.hideOverlay();
                            if (!this.count()) {
                                this.showOverlay( "Sorry, there is no data. " );
                            }

                            this.data.sort("xmlName", "asc");
                            $$('auditActionsList').markSorting("xmlName", "asc");

                        },

                        onItemClick: function(id, e, node){
                            debugger;
                            var me=this;
                            var selectedType=me.getItem(id).xmlName;

                            AppSharedState.loadLoginState('SOURCE_LOGIN');
                            AppSharedState.loadLoginState('TARGET_LOGIN');

                            var sourceOrgInfo=AppSharedState.getOrgLogInInfo("SOURCE_LOGIN");

                            var identityOrgId = sourceOrgInfo.identityOrgId;
                            var sessionId = sourceOrgInfo.sessionId;
                            var instanceUrl = sourceOrgInfo.instanceUrl;

                            var metaDataTypesComponentsListUrl=app.config.getAuditorApiUrl('getAuditDetails?session={"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" } &action="'+selectedType+'"')

                            $$('sourceGrid').clearAll();
                            $$("sourceGrid").define("currentType", selectedType);
                            $$("sourceGrid").define("url", metaDataTypesComponentsListUrl);
                            $$('sourceGrid').load(metaDataTypesComponentsListUrl);
                            $$('sourceGrid').refresh();

                        },
                        onLoadError:function (  ) {
                           //TODO ;
                        }
                    }
                },
                 {
                    view:"pager" , id:"pagerauditActionsList" ,
                    animate:true ,
                    size:20 ,
                    height:25 ,
                    template:function ( data , common ) {
                      debugger;
                        var start = data.page * data.size;
                        var end = start + data.size;
                        var html = " <div style='width:100%; text-align:center; line-height:20px; font-size:10pt; float:left'> "+common.first() + common.prev() + "&nbsp;" + (start + 1) + " - " + (end < data.count ? end : data.count) + " of " + (data.count) + "&nbsp;" + common.next() + common.last()+"</div> ";
                        return html;
                    }
                }
            ]
        }

	};

	return {
		$ui: ui,
        $oninit:function(view){

            AppSharedState.loadLoginState('SOURCE_LOGIN');

            var sourceOrgInfo=AppSharedState.getOrgLogInInfo("SOURCE_LOGIN");

            var identityOrgId = sourceOrgInfo.identityOrgId;
            var sessionId = sourceOrgInfo.sessionId;
            var instanceUrl = sourceOrgInfo.instanceUrl;



            var metaDataTypesListUrl=app.config.getAuditorApiUrl('getAuditActions?session={"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }');

            webix.ajax(metaDataTypesListUrl,{
                error:function(text, data, XmlHttpRequest){
                    //alert("error");
                },
                success:function(text, data, XmlHttpRequest){
                    if(XmlHttpRequest.status===204){

                        webix.alert({
                            type:"alert-error",
                            title:"Session Time out",
                            text:"Your source org session timed out. </br>Please login again. and refresh page",
                            callback:function(){
                                webix.storage.local.remove('SOURCE_LOGIN');
                                document.location.reload();
                                //app.show("forceput/CarterNotLoggedInView")
                            }
                        });


                    }else if(XmlHttpRequest.status===200){
                        $$("auditActionsList").parse(text);
                    }
                }
            });

		}
	};

});
