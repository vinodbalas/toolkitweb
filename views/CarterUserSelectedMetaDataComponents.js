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
                        template:'To Target' ,
                        height:25 ,
                        css:'carter-grid-meta-shortlist-header'
                    }

                ]
            } ,
            {
                view:"pager" , id:"pagerB" ,
                animate:true ,
                size:15 ,
                height:32 ,
                template:function ( data , common ) {
                    var start = data.page * data.size;
                    var end = start + data.size;
                    var html = " <div class='usr-sel-metadata-type-list-pager' style='width:100%; text-align:center; line-height:20px; font-size:10pt; float:left'> " +common.first() + common.prev() + "&nbsp;" + (start + 1) + " - " + (end < data.count ? end : data.count) + " of " + (data.count) + "&nbsp;" + common.next() + common.last() +"</div> ";
                    return html;
                }
            },
            {
                height:35 , type:"line" , cols:[
                {
                    view:"search" ,
                    id:'userSelectedItemsFilter',
                    css:'carter-filter-modified-by' ,
                    placeholder:"search" ,
                    borderless:true ,
                    on:{
                        onTimedKeyPress:function (  ) {
                            var value = this.getValue().trim().toLowerCase();

                            /* function(obj){ //here it filters data!
                             return obj['xmlName'].toLowerCase().indexOf(value)>=0;
                             }*/
                            $$("userSelectionsForValidation").filter(function(obj) {
                                return AppDataFormattingUtils.carterDefaultSearchComparator( value ,obj);
                            });
                        }
                    }
                } ,
                {view:"combo",id:'selectedItemsFilterByTypeCombo',
                    css:'carter-filter-by-type-combo',
                    placeholder:'type',
                    options:[],
                    on:{
                        onChange:function (  )
                        {
                            var typeValue = this.getValue();
                            $$("userSelectionsForValidation").filter('itemType',typeValue);

                        }
                    }

                }

                ]
            },
            {
                view:"datatable" ,
                id:'userSelectionsForValidation' ,
                type:'material' ,
                css:'carter-user-selected-list-for-validation' ,
                //scroll:'xy' ,
                scroll:true,
                header:false ,
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
                        template:'<div class="rounded-checkbox">{common.checkbox()} <label for="rounded-checkbox"></label></div>',
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
                        template:"<div class='carter-source-grid-row-obj-name'>#itemType#</div>" ,
                        fillspace:1
                    }
                ] ,
                refreshFilterItems:function (  ) {

                    var userSelectionGrid = $$( 'userSelectionsForValidation' );

                    var selTypeCombo=$$('selectedItemsFilterByTypeCombo');
                    selTypeCombo.getList().clearAll();
                    var itemTypes=userSelectionGrid.collectValues("itemType");
                    selTypeCombo.getList().parse( itemTypes );
                    selTypeCombo.refresh();
                },
                on:{
                    onCheck:function ( row , col , state ) {

                        var me=this;
                        var sourceGrid = $$( 'sourceGrid' );
                        var sourceItem = sourceGrid.getItem( row );
                        AppSharedState.removeUserSelection(sourceItem.id);
                        return;
                    },
                    onItemClick:function ( id , e , node ) {
                        var me = this;
                        AppSharedState.removeUserSelection(id.row);
                        return;
                    }
                }
            }
        ]
    }

    return {

        $ui:layout
    };

});
