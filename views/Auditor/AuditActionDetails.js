/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "models/AppSharedState"
],function(app,AppSharedState){

    /*webix.ui({
        view:"popup",
        id:"userLoginMenu_Auditor",
        css:'carter-user-login-menu-list-popup',
        head:false,
        width: 300,
        body:{
            view:"list",
            css:'carter-user-login-menu-list',
            scroll:false,
            yCount:4,
            select:true,
            borderless:true,
            template:"#menuItemText#",
            data:[
                {id:1, menuItemText:"Source Logout",css:'carter-user-login-menu-item-source'}
            ],
            on:{
                "onAfterSelect":function(id){

                        if(id==="1"){
                            webix.storage.local.remove('SOURCE_LOGIN');
                            AppSharedState.loadLoginState('TARGET_LOGIN');
                            app.show("forceput/toolkits");
                           // window.location.reload();
                        }
                        else if(id==="2"){
                            //SPH remove this
                        }
                        $$("userLoginMenu_Auditor").hide();
                }
            }
        }
    });*/

    var layout = {
        type:"plain",
        css:'audit-actions-wrapper',
        rows:[
            {view:"toolbar",
                type:'plain',
                height: 46,
                css:'carter_app_toolbar',
                elements:[
                    {}, {view:"label", width:180,   label:'<div class="user_login_profile">' +
                    '<span class="user_login_profile_icon">' +
                    '<i class="fa fa-user"></i>' +
                    '</span>' +
                    '<span class="user_login_profile_label">Org Login Info</span>' +
                    '<span class="user_login_profile_arrow">' +
                    '<i class="fa fa-angle-down"></i>' +
                    '</span>' +
                    '</div>', popup: "userLoginMenu" },
                    {width:5}

                ]},
                {
                    type:'plain',
                    css:'audit-actions-container',
                    rows:[
                        {template:'Audit Action Details',height:35,css:'carter-grid-meta-selection-list-header'},
                        {
                            view:"pager", id:"pagerAuditActionDetails",
                            animate:true,
                            size:15 ,
                            height:32 ,
                            template:function ( data , common ) {
                                //debugger;
                                var start = data.page * data.size;
                                var end = start + data.size;
                                var html = " <div class='usr-sel-metadata-type-list-pager' style='width:100%; text-align:center; line-height:20px; font-size:10pt; float:left'> " +common.first() + common.prev() + "&nbsp;" + (start + 1) + " - " + (end < data.count ? end : data.count) + " of " + (data.count) + "&nbsp;" + common.next() + common.last() +"</div> ";
                                return html;
                            }
                        },
                         {
            view:"datatable",
            size:20,
            id:'sourceGridAuditActions',
            css:'carter-user-selected-list-of-meta-components audit-list' ,
            resizeColumn: {headerOnly:true},
            headerRowHeight:45,
            scroll:true,
            tooltip:true,
            adjust:true ,
            scrollAlignY:true,
            scrollAlignX:true,
            header:true,
            pager:"pagerAuditActionDetails",
            columns:[
                { id:"value", sort:'string', template:function ( obj) {
                return ("<div class='carter-source-grid-row-for-selection'> " +
                "<div class='carter-source-grid-row-obj-name'>" + (obj.value?obj.value:"" )+ "</div></div> " )

                },
                    header:[ "Resource" ],hidden:false, fillspace:3},
                { id:"actionType", sort:'string',  header:[ "ActionType"],hidden:false, template:function ( obj) {
                    return ("<div class='carter-source-grid-row-for-selection'> " +
                    "<div class='carter-source-grid-row-obj-name'>" + (obj.actionType?obj.actionType:"" )+ "</div></div> " )

                },fillspace:2},
                { id:"createdByName", sort:'string',  header:[ "ActionBy"],hidden:false, template:function ( obj) {
                    return ("<div class='carter-source-grid-row-for-selection'> " +
                    "<div class='carter-source-grid-row-obj-name'>" + (obj.createdByName?obj.createdByName:"" )+ "</div></div> " )

                }, fillspace:2},
                { id:"createdDate", sort:'string',header:[ "ActionDate"],template:function ( obj) {
                    return ("<div class='carter-source-grid-row-for-selection'> " +
                    "<div class='carter-source-grid-row-obj-name'>" + (obj.createdDate?obj.createdDate:"" )+ "</div></div> " )

                }, fillspace:3},
                { id:"display",  sort:'string', header:"Description",hidden:false, template:function ( obj) {
                    return ("<div class='carter-source-grid-row-for-selection'> " +
                    "<div class='carter-source-grid-row-obj-name'>" + (obj.display?obj.display:"" )+ "</div></div> " )

                },fillspace:7}
            ],
            url:'',
            ready:function(){
                if (!this.count()){ //if no data is available
                    webix.extend(this, webix.OverlayBox);
                    this.showOverlay("<div style=''>There is no data</div>");
                }
            },

            on:{
                onBeforeLoad:function(){
                    this.showOverlay("Loading...");
                },

                onAfterLoad:function(){
                    this.hideOverlay();
                },

                onCheck:function (  row, col , state) {
                    var me=this;
                    var selectedForValidateGrid= $$( 'userSelectionsForValidation' );
                    var checkAllCheckbox = me.getHeaderContent("selection_for_validation_masterCheckbox");
                    var checkAllStatus=checkAllCheckbox.isChecked();
                    var isExistAlready=selectedForValidateGrid.exists(row);

                    if(state)
                    {
                        me.select(row);
                        if(!isExistAlready) {
                            selectedForValidateGrid.add( me.getItem(row ));
                        }
                    }else{
                        me.unselect(row);
                        if(isExistAlready) {
                            selectedForValidateGrid.remove( row );
                        }
                    }
                    selectedForValidateGrid.refreshFilter();
                    me.refresh();

                }
            }
        }

    ]
              }
        ]
    };

    return {
        $ui:layout,
        type:"material",
        $oninit:function(view, $scope){


            }
    };

});
