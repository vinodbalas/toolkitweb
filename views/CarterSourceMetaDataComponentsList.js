/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "views/CarterHomeView",
    "views/MetaDataTypesList",
    "views/CarterUserObjectSelection",
    "views/CarterLoggedInView",
    "models/AppSharedState",
    "models/AppDataFormattingUtils"
],function(app,CarterHomeView,MetaDataTypesList,CarterUserObjectSelection,CarterLoggedInView,AppSharedState,AppDataFormattingUtils){


    var layout = {
        type:'plain' ,
        rows:[
            {
                template:'Source' ,
                height:25 ,
                css:'carter-grid-meta-selection-list-header'
            } ,
            {
                view:"pager" , id:"pagerA" ,
                animate:true ,
                size:15 ,
                height:32 ,
                template:function ( data , common ) {
                    //debugger;
                    var start = data.page * data.size;
                    var end = start + data.size;
                    var html = " <div class='usr-sel-metadata-type-list-pager' style='width:100%; text-align:center; line-height:20px; font-size:10pt; float:left'> " +common.first() + common.prev() + "&nbsp;" + (start + 1) + " - " + (end < data.count ? end : data.count) + " of " + (data.count) + "&nbsp;" + common.next() + common.last() +"</div> ";
                    return html;
                }
                //group:5
            },
            {
                height:35 , type:"line" , cols:[
                {
                    view:"search" ,
                    id:'filterbylastmodifiedcombo',
                    css:'carter-filter-modified-by' ,
                    placeholder:"search" ,
                    borderless:true ,
                    on:{
                        onTimedKeyPress:function (  ) {
                            var value = this.getValue().trim().toLowerCase();

                           /* function(obj){ //here it filters data!
                                return obj['xmlName'].toLowerCase().indexOf(value)>=0;
                            }*/
                            $$("sourceGrid").filter(function(obj) {
                                return AppDataFormattingUtils.carterDefaultSearchComparator( value ,obj);
                            });
                        }
                    }
                } ,
                {
                    view:"datepicker" ,
                    type:"material" ,
                    id:'filterByLmdFrom',
                    borderless:true ,
                    css:'carter-filter-datepicker-from' ,
                    placeholder:"From: mm/dd/yyyy" ,
                    timepicker:false,
                    icon:''
                } ,
                {
                    view:"datepicker" ,
                    type:"material" ,
                    id:'filterByLmdTo',
                    borderless:true ,
                    css:'carter-filter-datepicker-to' ,
                    placeholder:"To: mm/dd/yyyy" ,
                    timepicker:false,
                    on:{
                        onChange:function (  ) {
                            //debugger;
                            var toDateValue = this.getValue();//.toLowerCase();
                            var fromDateValue=$$('filterByLmdFrom').getValue();
                            if(!fromDateValue) return;

                            /* function(obj){ //here it filters data!
                             return obj['xmlName'].toLowerCase().indexOf(value)>=0;
                             }*/
                            $$("sourceGrid").filter(function(obj) {
                                return AppDataFormattingUtils.filterByDateRange( fromDateValue,toDateValue ,obj);
                            });
                        }
                    }
                },
                 {
                 view:'button',
                 type:"icon",
                 icon:"filter",
                 css:'components_list_filter_btn',
                 width:40,
                 click:function (  ) {
                     var sourceGrid=$$('sourceGrid')

                     var filterValueLmby=$$('filterbylastmodifiedcombo').getValue();
                     var filterByLmdFrom=$$('filterByLmdFrom').getValue();
                     var filterByLmdTo=$$('filterByLmdTo').getValue();

                     if(filterValueLmby)
                     {
                         //filter by lmby
                         //sourceGridvar text = node.previousSibling.value;
                         //if (!text) return grid.filter();

                         sourceGrid.filter(function(obj){  //grid is a dataTable instance
                             var conditionLMBy=false;
                             var conditionLMD=false;

                             if(obj.modifiedBy === filterValueLmby)
                             {
                                 conditionLMBy=true;
                             }
                             //new Date(obj.modifiedOn)
                             if(filterByLmdFrom && filterByLmdTo)
                             {

                                 var fromDate=new Date(filterByLmdFrom);
                                 var toDate=new Date(filterByLmdTo);
                                 var curObjDate=new Date(obj.modifiedOn);

                                 if(curObjDate>=fromDate && curObjDate <=toDate)
                                 {

                                     console.log("curObjDate:"+curObjDate+" :fromDate:"+fromDate+": :toDate:"+toDate);
                                     conditionLMD=true;
                                 }
                             }
                             //debugger;
                             var finalFilterApplied=conditionLMBy && conditionLMD;
                             return finalFilterApplied;
                         });


                         if(filterByLmdFrom && filterByLmdTo)
                         {
                             //filter by and filter
                         }
                     }else
                     {
                         return sourceGrid.filter();
                     }

                        //last modified by  var sourceGrid=$$('sourceGrid');
                     //lastmodifiedon modifiedBy


                    }
                 }
            ]
            } ,
            /*{ view:"search", placeholder:"Search here" ,id:"sourceObjectSearch"},*/
            {
                view:"datatable" ,
                id:'sourceGrid' ,
                css:'carter-user-selected-list-of-meta-components' ,
                scroll:'native-y' ,
                scrollAlignY:true ,
                checkboxRefresh:true ,
                select:"row" ,
                rowLineHeight:35,
                rowHeight:35,
                gravity:5 ,
                headerRowHeight:45 ,
                multiselect:true ,
                currentType:null ,
                header:false,
                pager:"pagerA" ,
                columns:[
                    {
                        id:"selectedByUser" ,
                        width:40 ,
                        header:["" , {
                            content:"masterCheckbox" ,
                            css:"center master_checkbox"
                        }] ,
                        css:"checkcolumn" ,
                        template:'<div class="rounded-checkbox">{common.checkbox()} <label for="rounded-checkbox"></label></div>',
                        checkValue:true,
                        uncheckValue:false
                    } ,
                    {
                        id:"name" ,
                        header:["Meta Data Components" , {
                            content:"textFilter" ,
                            compare:AppDataFormattingUtils.carterDefaultSearchComparator
                        }] ,
                        fillspace:2 ,
                        sort:'string' ,
                        template:AppDataFormattingUtils.carterDefaultColumnTemplateFn
                    },
                    { id:"modifiedBy" , header:"" , hidden:true } ,
                    { id:"modifiedOn" , header:"" , hidden:true } ,
                    { id:"itemType" , header:"" , hidden:true } ,
                    { id:"id" , header:"" , hidden:true } ,
                ] ,
                url:'' ,
                ready:function () {
                    if ( !this.count() ) { //if no data is available
                        webix.extend( this , webix.OverlayBox );
                        this.showOverlay( "<div style='...'>There is no data</div>" );
                        this.refresh();
                    }
                } ,
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
                    onBeforeLoad:function () {
                        // debugger;
                        this.showOverlay( "Loading..." );
                    } ,
                    onAfterLoad:function () {
                        //debugger;
                        this.hideOverlay();
                        //debugger;
                        this.data.sort("name", "asc");
                        var metaDataTypeList= $$('metaDataTypesList');

                        metaDataTypeList.markSorting("xmlName", "asc");

                        /*var sourceGrid=$$('sourceGrid');

                        var filterByCombo=$$('filterbylastmodifiedcombo');
                        filterByCombo.getList().clearAll();
                        filterByCombo.getList().parse( sourceGrid.collectValues("modifiedBy") );
                        filterByCombo.refresh();*/



                    } ,
                    onCheck:function ( row , col , state ) {

                        var me=this;
                        var userSelectionGrid = $$( 'userSelectionsForValidation' );
                        var isSelectedAlready = userSelectionGrid.exists( row );

                        if ( state ) {
                            //currentItem.selectedByUser=true;
                            //var isSelectedAlready = userSelectionGrid.exists( row );
                            if(!isSelectedAlready) {
                                me.select( row );
                                userSelectionGrid.add( this.getItem( row ) );
                            }
                        } else {

                            if(isSelectedAlready) {
                                me.unselect( row );
                                userSelectionGrid.remove( row );
                            }

                        }

                        userSelectionGrid.refresh();
                        //console.log(state,row);
                    } ,
                    onItemClick:function ( id , e , node ) {
                        var me = this;
                        /** Checkbox Selection **/
                        var userSelectionToValidate = $$( 'userSelectionsForValidation' );
                        //var currentRow=me.getItem(id.row);
                        var currentItem = me.getItem( id );
                        var isSelectedByUser = !currentItem.selectedByUser;
                        var isSelectedAlready = userSelectionToValidate.exists( id );
                        //me.refresh(id.row);
                        /**/
                        //var selectedTypeItem=me.getItem(id);
                        if ( !isSelectedAlready ) {

                            currentItem.selectedByUser = true;
                            userSelectionToValidate.add( currentItem );

                        } else {

                            currentItem.selectedByUser = false;
                            userSelectionToValidate.remove( currentItem.id );


                        }
                        //currentItem.refresh();
                        $$( 'sourceGrid' ).refresh();
                        userSelectionToValidate.refresh();
                        userSelectionToValidate.refreshFilter(); //all filters
                        //$$("userSelectionsForValidation").getFilter("itemType").setValue(me.config.currentType);
                        //$$("userSelectionsForValidation").group("itemType");
                        //
                    } ,
                    "data->onParse":function ( driver , data ) {
                        var me = this;
                        //for json data
                        var userSelectionGrid = $$( 'userSelectionsForValidation' );
                        //var selectedItemTypeComponentIds=userSelectionGrid.collectValues('id');
                        data = data.data.map( function ( item ) {
                            var itemType = me.config.currentType;
                            item.itemType = itemType
                            var itemId = itemType + "~~" + item["name"];
                            item.id = itemId;
                            var isSelectedAlready = userSelectionGrid.exists( itemId );
                            //get from state and apply
                            item.selectedByUser = isSelectedAlready?true:false;
                            return item;
                        } );
                        //webix.message("Count of records "+data.length);
                    }
                }
            }

        ]
    }

    return {

        $ui:layout
    };

});
