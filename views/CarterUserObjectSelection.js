/**
 * Created by prakash on 12/25/16.
 */
define([
    "app"
],function(app){



    webix.ui({
        view:"popup",
        id:"userLoginMenu",
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
                {id:1, menuItemText:"Source Logout",css:'carter-user-login-menu-item-source'},
                {id:2, menuItemText:"Target Logout",css:'carter-user-login-menu-list-target'}
            ],
            on:{
                "onAfterSelect":function(id){

                        if(id==="1"){

                            webix.storage.local.remove('source_status');
                            window.location.reload();
                            //trigger source logout event.
                            //clear index db
                        }
                        else if(id==="2"){
                            //webix.storage.local.remove('target_status');
                            //trigger target logout event.
                           // window.location.reload();
                            //clear index db
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
                    {},  {view:"icon",width: 40, icon:"user", popup: "userLoginMenu" }

                ]},
                { height:60, borderless:true, type:"clean",cols:[
                    { template:'<span class="numberCircle">1</span> Shortlist Metadata Components form Source Org',css:'work-flow-cell-step1'}, //here you place any component you like
                    {template:'>',width:50},
                    { template:'<span class="numberCircle">2</span> Preview ' ,css:'work-flow-cell-step2'},
                    {template:'>',width:50},
                    { template:'<span class="numberCircle">3</span> Login to Target' ,css:'work-flow-cell-step3'},
                    {template:'>',width:50},
                    { template:'<span class="numberCircle">4</span> Validate and Deploy' ,css:'work-flow-cell-step4'}
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
                                {template:'Metadata Selection From Source',height:35,css:'carter-grid-meta-selection-list-header'},
                                    { height:35,type:"line",cols:[
                                        {
                                            view:"combo",
                                            type:"material",
                                            css:'carter-filter-modified-by',
                                            placeholder:"Modified By",
                                            borderless:true,
                                            options:[
                                                {id:1, value:"One"},
                                                {id:2, value:"Two"},
                                                {id:3, value:"Three"}
                                            ]
                                        },
                                        {
                                            view: "datepicker",
                                            type:"material",

                                            borderless:true,
                                            css:'carter-filter-datepicker-from',
                                            placeholder: "Last Modified From: dd/mm/yyy hh:mm",
                                            timepicker: true
                                        },
                                        {
                                            view: "datepicker",
                                            type:"material",

                                            borderless:true,
                                            css:'carter-filter-datepicker-to',
                                            placeholder: "To:  dd/mm/yyy hh:mm",
                                            timepicker: true
                                        }


                                    ]},


                                /*{ view:"search", placeholder:"Search here" ,id:"sourceObjectSearch"},*/
                                {
                                    view:"datatable",
                                    type:"material",
                                    id:'sourceGrid',
                                    css:'carter-user-selected-list-of-meta-components',
                                    scroll:'native-y',
                                    scrollAlignY:true,
                                    checkboxRefresh:true,
                                    select: "row",
                                    gravity:5,
                                    headerRowHeight:45,
                                    multiselect: true,
                                    currentType:null,
                                    //header:false,
                                    pager:"pagerA",
                                    columns:[
                                        { id:"selectedByUser", width:40,header:["", { content:"masterCheckbox", css:"center master_checkbox" ,contentId:"sourceGrid_masterCheckbox"}],
                                             css:"left",
                                            template:"{common.checkbox()}"
                                        },
                                        { id:"name",   header:["Meta Data Components", {content:"textFilter"}],fillspace:2,template:function (obj) {

                                        //return "<span style='color:green;'>"+obj.votes+"</span>";
                                            var myformat = webix.Date.dateToStr("%m/%d/%y %H:%i:%s");
                                            //myformat(obj.start)
                                                return "<div class='carter-source-grid-row-for-selection'> <span class='arter-source-grid-row-obj-name'>"+obj.name+"</span> <span class='arter-source-grid-row-obj-modby'>"+obj.modifiedBy+"</span>  <span class='arter-source-grid-row-obj-mod-date'>"+myformat(new Date(obj.modifiedOn))+"</span></div>"
                                            }
                                        },
                                        { id:"modifiedBy",   header:"",hidden:true},
                                        { id:"modifiedOn",   header:"",hidden:true},
                                        { id:"itemType",   header:"",hidden:true},
                                        { id:"id",   header:"",hidden:true},
                                    ],
                                    url:'',
                                    ready:function(){
                                        if (!this.count()){ //if no data is available
                                            webix.extend(this, webix.OverlayBox);
                                            this.showOverlay("<div style=''>There is no data</div>");
                                        }
                                    },

                                    on:{
                                        /*"data->onStoreUpdated":function(){
                                            var me=this;
                                            me.data.each(function(dataItem, i){
                                                if(dataItem) {
                                                    //obj.index = i+1;
                                                    dataItem.id = me.config.currentType + "~~" + dataItem["name"];
                                                }
                                            });


                                          //  this.data.sort("name", "asc");

                                        },*/
                                    onBeforeLoad:function(){
                                        // debugger;
                                        this.showOverlay("Loading...");
                                    },
                                    onAfterLoad:function(){
                                        //debugger;
                                        this.hideOverlay();

                                        //debugger;
                                        //this.data.sort("name", "asc");
                                       // $$('metaDataTypesList').markSorting("xmlName", "asc");

                                    },
                                    onCheck:function (  row, col , state) {
                                        var me=this;

                                        var selectedForValidateGrid= $$( 'userSelectionsForValidation' );

                                        var checkAllCheckbox = me.getHeaderContent("selection_for_validation_masterCheckbox");
                                        var checkAllStatus=checkAllCheckbox.isChecked();
                                        //TODO MasterCheck


                                        var isExistAlready=selectedForValidateGrid.exists(row);

                                            if(state)
                                            {
                                                me.select(row);
                                                //currentItem.selectedByUser=true;


                                                if(!isExistAlready) {
                                                    selectedForValidateGrid.add( me.getItem(row ));
                                                }

                                            }else{
                                                me.unselect(row);
                                                if(isExistAlready) {
                                                    selectedForValidateGrid.remove( row );
                                                }
                                            }
                                        //console.log(state,row);
                                        selectedForValidateGrid.refreshFilter();
                                            me.refresh();

                                    },
                                    onItemClick: function(id, e, node) {
                                        var me = this;

                                        /** Checkbox Selection **/
                                        var selectedForValidateGrid= $$( 'userSelectionsForValidation' );
                                        //var currentRow=me.getItem(id.row);
                                        var currentItem=me.getItem(id);

                                        currentItem.selectedByUser = currentItem.selectedByUser!=null?currentItem.selectedByUser===false?true:false:true;
                                        //me.refresh(id.row);
                                        /**/


                                        //var selectedTypeItem=me.getItem(id);
                                        if(currentItem.selectedByUser) {
                                            currentItem.selectedByUser=true;
                                            selectedForValidateGrid.add( currentItem );

                                        }else{

                                            var isExistsAlready=selectedForValidateGrid.exists(row);

                                            if(isExistsAlready) {
                                                selectedForValidateGrid.remove( currentItem.id);
                                                currentItem.selectedByUser=false;
                                            }


                                        }
                                        $$('sourceGrid').refresh();

                                        me.refresh(id.row);
                                        selectedForValidateGrid.refresh();

                                        selectedForValidateGrid.refreshFilter(); //all filters

                                        //$$("userSelectionsForValidation").getFilter("itemType").setValue(me.config.currentType);
                                        //$$("userSelectionsForValidation").group("itemType");
                                        //
                                    },
                                    "data->onParse":function(driver, data){
                                        var me=this;
                                            //for json data
                                          //  debugger;
                                        var userSelectionGrid= $$( 'userSelectionsForValidation' );
                                        //var selectedItemTypeComponentIds=userSelectionGrid.collectValues('id');

                                        data=data.map(function(item){
                                                var itemType=me.config.currentType;
                                                item.itemType=itemType

                                                var itemId=itemType + "~~" + item["name"];

                                                item.id = itemId;
                                                var isSelectedAlready=userSelectionGrid.exists(itemId);
                                                //get from state and apply
                                                item.selectedByUser=isSelectedAlready;
                                                return item;
                                            });

                                            //webix.message("Count of records "+data.length);
                                        }
                                    }
                                },
                                {
                                    view:"pager", id:"pagerA",
                                    animate:true,
                                    size:15,
                                    height:25,
                                    template:function(data, common){
                                        //debugger;
                                        var start = data.page * data.size;
                                        var end = start + data.size;
                                        var html = " <div style='width:100%; text-align:center; line-height:20px; font-size:10pt; float:left'> "+common.prev()+"&nbsp;"+(start+1)+" - "+(end<data.count?end:data.count)+" of "+(data.count)+"&nbsp;"+common.next()+"</div> ";
                                        return html;
                                    }
                                    //group:5
                                }

                            ]},
                            {view:"resizer"},
                            {
                                type:'plain',
                                rows:[
                                    {template:'Shortlisted Metadata for Migration ',height:35,css:'carter-grid-meta-shortlist-header'},
                                    /*{ view:"search", placeholder:"Search here" ,id:"targetObjectSearch"},*/
                                    {
                                        view:"datatable",
                                        id:'userSelectionsForValidation',
                                        type:'material',
                                        css:'carter-user-selected-list-for-validation',
                                        scroll:'xy',
                                        header:true,
                                        pager:'pagerB',
                                        headerRowHeight:45,
                                        resizeColumn: true,
                                        scrollAlignY:true,
                                        columns:[
                                            { id:"selectedByUser", width:40,header:["", { content:"masterCheckbox", css:"center master_checkbox"  ,contentId:"selection_for_validation_masterCheckbox"}],
                                                css:"left",
                                                template:"{common.checkbox()}"
                                            },

                                            { id:"name", header:["Shortlisted Metadata Component Names", {content:"textFilter"}], template:" #name#", fillspace:3},
                                            { id:"itemType", header:["Meta Data Type", {content:"selectFilter"}],  template:"#itemType#",fillspace:1}
                                        ],
                                        data:[
                                        ],
                                        on:{

                                        onItemClick: function(id, e, node) {

                                            var me= this;
                                            var sourceGrid= $$( 'sourceGrid' );
                                            var sourceItem=sourceGrid.getItem(id);
                                                sourceItem.selectedByUser=false;
                                                sourceGrid.unselect(id);
                                                me.remove( id );

                                            me.refresh();
                                            sourceGrid.refresh();
                                            me.refreshFilter();
                                            me.refresh(id.row);

                                        },

                                        onCheck:function (  row, col , state) {

                                            var me=this;
                                            var sourceGrid= $$( 'sourceGrid' );

                                            var checkAllCheckbox = me.getHeaderContent("selection_for_validation_masterCheckbox");
                                            var checkAllStatus=checkAllCheckbox.isChecked();
                                            //TODO MasterCheck

                                            if(!state)
                                            {
                                                var sourceItem=sourceGrid.getItem(row);
                                                sourceItem.selectedByUser=false;
                                                sourceGrid.unselect(row);
                                                me.remove( row );
                                            }

                                            me.refresh();
                                            sourceGrid.refresh();
                                            $$("pagerB").refresh();
                                            $$("pagerA").refresh();
                                            me.refreshFilter();
                                            //console.log(state,row);

                                        },
                                            onCollectValues:function(id, req){
                                                if (req.values.length>0 && req.values[0].value == "")
                                                    req.values[0].value = "Select something";
                                            }
                                        }

                                    },
                                    {
                                        view:"pager", id:"pagerB",
                                        animate:true,
                                        size:15,
                                        height:25,
                                        template:function(data, common){
                                            //debugger;
                                            var start = data.page * data.size;
                                            var end = start + data.size;
                                            var html = " <div style='width:100%; text-align:center; line-height:20px; font-size:10pt; float:left'> "+common.prev()+"&nbsp;"+(start+1)+" - "+(end<data.count?end:data.count)+" of "+(data.count)+"&nbsp;"+common.next()+"</div> ";
                                            return html;
                                        }
                                        //group:5
                                    }

                                ]}
                        ]
                    }
                ]

                }//,
                /*{height:50,
                    align:"center,middle",
                    cols:[
                        {},
                        {template:'Preview'},
                        {template:'Validate'},
                        {template:'Deploy'}
                        ,{}
                    ]
                }*/
        ]
    };

    return {
        $ui:layout,
        type:"material",
        $oninit:function(view, $scope){ /*after creating*/


            $$("sourceGrid").attachEvent("data->onParse", function(driver, data){
                //for json data
               // debugger;
               // webix.message("Count of records "+data.length);
            });
           // alert('1');
            }
    };

});
