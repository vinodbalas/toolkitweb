/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
],function(app){



    var layout = {
        type:'line' ,
        rows:[
            {
                template:'Metadata Selection From Source' ,
                height:35 ,
                css:'carter-grid-meta-selection-list-header'
            } ,
            {
                height:35 , type:"line" , cols:[
                {
                    view:"combo" ,
                    id:'filterbylastmodifiedcombo',
                    type:"material" ,
                    css:'carter-filter-modified-by' ,
                    placeholder:"Modified By" ,
                    borderless:true ,
                    options:[
                    ]
                } ,
                {
                    view:"datepicker" ,
                    type:"material" ,
                    id:'filterByLmdFrom',
                    borderless:true ,
                    css:'carter-filter-datepicker-from' ,
                    placeholder:"Last Modified From: dd/mm/yyy hh:mm" ,
                    timepicker:true
                } ,
                {
                    view:"datepicker" ,
                    type:"material" ,
                    id:'filterByLmdTo',
                    borderless:true ,
                    css:'carter-filter-datepicker-to' ,
                    placeholder:"To:  dd/mm/yyy hh:mm" ,
                    timepicker:true
                },
                 {
                 view:'button',
                 css:"webix_icon fa-filter",
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
                type:"material" ,
                id:'sourceGrid' ,
                css:'carter-user-selected-list-of-meta-components' ,
                scroll:'native-y' ,
                scrollAlignY:true ,
                checkboxRefresh:true ,
                select:"row" ,
                gravity:5 ,
                headerRowHeight:45 ,
                multiselect:true ,
                currentType:null ,
                //header:false,
                pager:"pagerA" ,
                columns:[
                    {
                        id:"selectedByUser" ,
                        width:40 ,
                        header:["" , {
                            content:"masterCheckbox" ,
                            css:"center master_checkbox"
                        }] ,
                        css:"left" ,
                        template:"{common.checkbox()}",
                        checkValue:true,
                        uncheckValue:false
                    } ,
                    {
                        id:"name" ,
                        header:["Meta Data Components" , { content:"textFilter" }] ,
                        fillspace:2 ,
                        template:function ( obj ) {

                            //return "<span style='color:green;'>"+obj.votes+"</span>";
                            var myformat = webix.Date.dateToStr( "%m/%d/%y %H:%i:%s" );
                            //myformat(obj.start)
                            return "<div class='carter-source-grid-row-for-selection'> <span class='arter-source-grid-row-obj-name'>" + obj.name + "</span> <span class='arter-source-grid-row-obj-modby'>" + obj.modifiedBy + "</span>  <span class='arter-source-grid-row-obj-mod-date'>" + myformat( new Date( obj.modifiedOn ) ) + "</span></div>"
                        }
                    } ,
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

                        var sourceGrid=$$('sourceGrid');

                        var filterByCombo=$$('filterbylastmodifiedcombo');
                        filterByCombo.getList().clearAll();
                        filterByCombo.getList().parse( sourceGrid.collectValues("modifiedBy") );
                        filterByCombo.refresh();



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
                        data = data.map( function ( item ) {
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
            } ,
            {
                view:"pager" , id:"pagerA" ,
                animate:true ,
                size:15 ,
                height:25 ,
                template:function ( data , common ) {
                    //debugger;
                    var start = data.page * data.size;
                    var end = start + data.size;
                    var html = " <div style='width:100%; text-align:center; line-height:20px; font-size:10pt; float:left'> " + common.prev() + "&nbsp;" + (start + 1) + " - " + (end < data.count ? end : data.count) + " of " + (data.count) + "&nbsp;" + common.next() + "</div> ";
                    return html;
                }
                //group:5
            }
        ]
    }

    return {

        $ui:layout
    };

});