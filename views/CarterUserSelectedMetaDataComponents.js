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
        type:'line' ,
        id:'userSelectedMetaDataComponentsView',
        rows:[
            {
                type:'line' ,
                fillspace:3,
                cols:[
                    {
                        template:'Shortlisted Metadata for Review' ,
                        height:25 ,
                        css:'carter-grid-meta-shortlist-header'
                    }

                ]
            } ,
            {
                height:43 ,
                type:"line" ,
                css:'review_btn_container',
                border:true,
                cols:[
                {},
                {
                    view:'button',
                    type:"icon",
                    icon:"file-text",
                    css:'components_list_filter_btn review_step_btn',
                    label:"Review Selection >>",
                    click:function(){

                        app.callEvent('CARTER_STEP_CLICKED', ["step2"]);

                    }
                },
                    {width:5}

                ]
            },
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
                rowLineHeight:35,
                rowHeight:35,
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
                        sort:'string',
                        header:["Shortlisted Metadata Component Names" , { content:"textFilter" ,
                            compare:AppDataFormattingUtils.carterDefaultSearchComparator}] ,
                        template:AppDataFormattingUtils.carterDefaultColumnTemplateFn,
                        fillspace:3
                    } ,
                    {
                        id:"itemType" ,
                        sort:'string',
                        header:["Meta Data Type" , { content:"selectFilter" }] ,
                        template:"#itemType#" ,
                        fillspace:1
                    }
                ] ,
                on:{
                    onCheck:function ( row , col , state ) {



                        var me=this;
                        var userSelectionGrid = $$( 'userSelectionsForValidation' );
                        var sourceGrid = $$( 'sourceGrid' );
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
                        var currentItem = me.getItem( id );
                        var isSelectedAlready = userSelectionToValidate.exists( id );

                        if(isSelectedAlready) {
                            currentItem.selectedByUser = false;
                            userSelectionToValidate.remove( id.row );

                            var sourceItem=sourceGrid.getItem(id.row);
                            if(sourceItem) {
                                sourceItem.selectedByUser = false;
                            }
                        }
                           $$( 'sourceGrid' ).refresh();
                        userSelectionToValidate.refresh();
                        userSelectionToValidate.refreshFilter();
                    }
                }
            } ,
            {
                view:"pager" , id:"pagerB" ,
                animate:true ,
                size:15 ,
                height:28 ,
                template:function ( data , common ) {
                    var start = data.page * data.size;
                    var end = start + data.size;
                    var html = " <div style='width:100%; text-align:center; line-height:20px; font-size:10pt; float:left'> "+common.first() + common.prev() + "&nbsp;" + (start + 1) + " - " + (end < data.count ? end : data.count) + " of " + (data.count) + "&nbsp;" + common.next() + common.last()+"</div> ";
                    return html;
                }
            }
        ]
    }

    return {

        $ui:layout
    };

});
