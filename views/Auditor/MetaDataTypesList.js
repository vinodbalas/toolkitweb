define([
    "app",
    "models/AppSharedState"
],function(app,AppSharedState){

	var ui = {
        header:'<div class="carter-toolkit-title">FORCEPUT</div>',
        css:'carter-toolkit-name',
        width:310,
        collapsed:false,
        headerAlt:'<div class="carter-header-collapsed"> <span class="carter-header-collapsed-title">AUDITOR</span>&nbsp;-&nbsp;<span class="carter-header-collapsed-user-text">Click to Expand and see Audit Actions</span> </div>',
        type:'material',
        type:'plain',
        body:{
            css:'carter-left-bar-container',
            rows:[
                { template:'AUDITOR' , type:'plain',height:28 ,css:'meta-data-type-header' } ,
                { template:'<div><span class="meta-data-header-icon"><i class="fa fa-file-text-o" aria-hidden="true"></i></span>Meta Data Types</div>' , type:'plain',height:28 ,css:'meta-data-type-title' } ,
                {
                    view:"pager" , id:"pagerauditActionsList" ,
                    animate:true ,
                    size:15,
                    height:25 ,
                    template:function ( data , common ) {
                        var start = data.page * data.size;
                        var end = start + data.size;
                        var html = " <div class='metadata-type-list-pager' style='width:100%; text-align:center; line-height:20px; font-size:10pt; float:left'> "+common.first() + common.prev() + "<span class='pager-info-text'>" + (start + 1) + " - " + (end < data.count ? end : data.count) + " of " + (data.count) + "</span>" + common.next() + common.last()+"</div> ";
                        return html;
                    }
                },
                { view:"search",
                    icon:"search", placeholder:"Search here",height:55 ,id:'metaDataTypeListSearchAuditor',
                    css:'carter-left-bar-container meta-data-search-input',
                    on:{
                        onTimedKeyPress:function (  ) {
                            var value = this.getValue().toLowerCase();

                            $$("auditActionsList").filter(function(obj){ //here it filters data!
                                return obj['xmlName'].toLowerCase().indexOf(value)>=0;
                            })
                        }
                    }
                },
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
                    header:false ,
                    columns:[
                        { id:"xmlName" , minWidth:300 , css:'carter-grid-header-meta-data-name',fillspace:2,sort:"string" },
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
                            var me=this;
                            var selectedType=me.getItem(id).xmlName;

                            AppSharedState.loadLoginState('SOURCE_LOGIN');
                            AppSharedState.loadLoginState('TARGET_LOGIN');

                            var sourceOrgInfo=AppSharedState.getOrgLogInInfo("SOURCE_LOGIN");

                            var identityOrgId = sourceOrgInfo.identityOrgId;
                            var sessionId = sourceOrgInfo.sessionId;
                            var instanceUrl = sourceOrgInfo.instanceUrl;

                            var sourceGridAuditActions=$$("sourceGridAuditActions");
                            webix.extend(sourceGridAuditActions, webix.ProgressBar);
                            sourceGridAuditActions.showProgress({
                                type:"top"
                            });



                            var metaDataTypesComponentsListUrl=app.config.getAuditorApiUrl('getAuditDetails?session={"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" } &action="'+selectedType+'"')

                            $$('sourceGridAuditActions').clearAll();
                            $$("sourceGridAuditActions").define("currentType", selectedType);
                            $$("sourceGridAuditActions").define("url", metaDataTypesComponentsListUrl);
                            $$('sourceGridAuditActions').load(metaDataTypesComponentsListUrl);
                            $$('sourceGridAuditActions').refresh();
                            $$('pagerAuditActionDetails').refresh();

                        },
                        onLoadError:function (  ) {
                           //TODO ;
                        }
                    }
                }
            ]
        }

	};

	return {
		$ui: ui,
        $oninit:function(view){

		    var auditActionsList=$$("auditActionsList");
            webix.extend(auditActionsList, webix.ProgressBar);
            auditActionsList.showProgress({
                type:"top"
            });

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

                        auditActionsList.hideProgress();
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

                        auditActionsList.hideProgress();

                        $$("auditActionsList").parse(text);
                    }
                }
            });

		}
	};

});
