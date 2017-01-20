/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "models/AppSharedState"
],function(app,AppSharedState){

    webix.ui({
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
                            webix.storage.local.remove('source_status');
                            AppSharedState.loadLoginState('TARGET_LOGIN');
                            app.show("forceput/CarterNotLoggedInView");
                           // window.location.reload();
                        }
                        else if(id==="2"){
                            //SPH remove this
                        }
                        $$("userLoginMenu").hide();
                }
            }
        }
    });

    var layout = {
        type:"line",
        rows:[
            {view:"toolbar",
                type:'material',
                height: 46,
                elements:[
                    {},  {view:"icon",width: 40, icon:"user", popup: "userLoginMenu_Auditor" }

                ]},
                {
                    type:'line',
                    rows:[
                    {
                        type:'line',
                        cols:[
                            {
                                type:'line',
                                rows:[
                                {template:'Audit Action Details',height:35,css:'carter-grid-meta-selection-list-header'},
                                {
                                    view:"datatable",
                                    size:20,
                                    id:'sourceGrid',
                                    resizeColumn: {headerOnly:true},
                                    headerRowHeight:45,
                                    scroll:'platform-y',
                                    scroll:'platform-x',
                                    tooltip:true,
                                    adjust:true ,
                                    scrollAlignY:true,
                                    scrollAlignX:true,
                                      pager:"pagerA",

                                    columns:[
                                        { id:"value",   header:[ "Resource" ,{content:"selectFilter"}],hidden:false, width : 200},
                                        { id:"actionType",   header:[ "ActionType",{content:"selectFilter"}],hidden:false, width:150},
                                        { id:"createdByName",   header:[ "ActionBy",{content:"selectFilter"}],hidden:false, width:150},
                                        { id:"createdDate", header:[ "ActionDate",{ content:"dateFilter"}]},
                                        { id:"display",   header:"Description",hidden:false, fillspace:true}
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
                                },
                                {
                                    view:"pager", id:"pagerA",
                                    animate:true,
                                    size:15,
                                    height:25,
                                    template:function(data, common){
                                        var start = data.page * data.size;
                                        var end = start + data.size;
                                        var html = " <div style='width:100%; text-align:center; line-height:20px; font-size:10pt; float:left'> "+common.prev()+"&nbsp;"+(start+1)+" - "+(end<data.count?end:data.count)+" of "+(data.count)+"&nbsp;"+common.next()+"</div> ";
                                        return html;
                                    }
                                }
                            ]},
                        ]
                    }
                ]
              }
        ]
    };

    return {
        $ui:layout,
        type:"material",
        $oninit:function(view, $scope){
            $$("sourceGrid").attachEvent("data->onParse", function(driver, data){

            });
            }
    };

});
