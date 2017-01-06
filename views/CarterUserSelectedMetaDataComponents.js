/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "views/CarterHomeView",
    "views/MetaDataTypesList",
    "views/CarterUserObjectSelection",
    "views/CarterLoggedInView",
    "models/AppSharedState"
],function(app,CarterHomeView,MetaDataTypesList,CarterUserObjectSelection,CarterLoggedInView,AppSharedState){




    var layout = {
        type:'plain' ,
        id:'userSelectedMetaDataComponentsView',
        rows:[
            {
                type:'line' ,
                cols:[
                    {
                        template:'Shortlisted Metadata for Migration ' ,
                        height:35 ,
                        css:'carter-grid-meta-shortlist-header'
                    }

                ]
            } ,
            /*{ view:"search", placeholder:"Search here" ,id:"targetObjectSearch"},*/
            {
                view:"datatable" ,
                id:'userSelectionsForValidation' ,
                type:'material' ,
                css:'carter-user-selected-list-for-validation' ,
                scroll:'xy' ,
                header:true ,
                pager:'pagerB' ,
                headerRowHeight:45 ,
                checkboxRefresh:true ,
                resizeColumn:true ,
                scrollAlignY:true ,
                columns:[
                    {
                        id:"selectedByUser" ,
                        width:40 ,
                        header:["" , {
                            content:"masterCheckbox" ,
                            css:"center master_checkbox",
                            contentid:'masterCheckBoxUserSelection'
                        }] ,
                        css:"left" ,
                        template:"{common.checkbox()}",
                        checkValue:true,
                        uncheckValue:false
                    } ,
                    {
                        id:"name" ,
                        header:["Shortlisted Metadata Component Names" , { content:"textFilter" }] ,
                        template:" #name#" ,
                        fillspace:3
                    } ,
                    {
                        id:"itemType" ,
                        header:["Meta Data Type" , { content:"selectFilter" }] ,
                        template:"#itemType#" ,
                        fillspace:1
                    }
                ] ,
                //url:"indexdb->carterdb/UserSelectionForValidate",
                //save:"indexdb->carterdb/UserSelectionForValidate",
                //data:[] ,
                on:{
                    onCheck:function ( row , col , state ) {
                        /*var userSelectionsForValidation = $$( 'userSelectionsForValidation' );
                         var sourceGrid = $$( 'sourceGrid' );
                         if ( !state ) {
                         var sourceItem = sourceGrid.getItem( row );
                         if ( sourceItem ) {
                         sourceItem.selectedByUser = false;
                         sourceGrid.unselect( row );
                         userSelectionsForValidation.remove( row );
                         }
                         }
                         userSelectionsForValidation.refresh();
                         sourceGrid.refresh();
                         $$( "pagerB" ).refresh();
                         $$( "pagerA" ).refresh();*/



                        var me=this;
                        var userSelectionGrid = $$( 'userSelectionsForValidation' );
                        var sourceGrid = $$( 'sourceGrid' );

                        //var isSelectedAlready = userSelectionGrid.exists( row );

                        if ( !state ) {

                            var sourceItem = sourceGrid.getItem( row );
                            if(sourceItem) {
                                sourceItem.selectedByUser = false;
                                sourceGrid.unselect( row );
                            }

                            var selectedItem=userSelectionGrid.getItem(row);
                            if(selectedItem) {
                                selectedItem.selectedByUser = false;
                                userSelectionGrid.remove( row );
                            }

                            /*me.unselect( row );

                             userSelectionGrid.remove( row );
                             */
                        }

                        userSelectionGrid.refresh();
                        sourceGrid.refresh();
                        $$( "pagerB" ).refresh();
                        $$( "pagerA" ).refresh();


                    },
                    onItemClick:function ( id , e , node ) {
                        var me = this;
                        /** Checkbox Selection **/
                        var userSelectionToValidate = $$( 'userSelectionsForValidation' );
                        var sourceGrid= $$( 'sourceGrid' );
                        //var currentRow=me.getItem(id.row);
                        var currentItem = me.getItem( id );
                        // currentItem.selectedByUser = currentItem.selectedByUser != null ? currentItem.selectedByUser === false ? true : false : true;
                        var isSelectedAlready = userSelectionToValidate.exists( id );
                        //me.refresh(id.row);
                        /**/
                        //var selectedTypeItem=me.getItem(id);
                        //if ( currentItem.selectedByUser ) {

                        if(isSelectedAlready) {
                            currentItem.selectedByUser = false;
                            userSelectionToValidate.remove( id.row );

                            var sourceItem=sourceGrid.getItem(id.row);
                            sourceItem.selectedByUser = false;
                        }
                        // } else {
                        /*if(isSelectedAlready) {
                         currentItem.selectedByUser = false;
                         userSelectionToValidate.remove( currentItem.id );
                         }*/

                        // }
                        //currentItem.refresh();
                        $$( 'sourceGrid' ).refresh();
                        userSelectionToValidate.refresh();
                        userSelectionToValidate.refreshFilter(); //all filters
                        //$$("userSelectionsForValidation").getFilter("itemType").setValue(me.config.currentType);
                        //$$("userSelectionsForValidation").group("itemType");
                        //
                    }
                }
            } ,
            {
                view:"pager" , id:"pagerB" ,
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
