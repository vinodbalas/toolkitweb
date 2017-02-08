/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "models/AppSharedState",
    "models/AppDataFormattingUtils"
],function(app,AppSharedState,AppDataFormattingUtils){

    var layout = {
        type:'head' ,
        id:'userSelectedMetaDataComponentsPreView',
        rows:[
            {
                type:'line' ,
                cols:[
                    {
                        template:'Review' ,
                        height:35 ,
                        css:'carter-grid-meta-shortlist-header'
                    }

                    /*,
                    {
                        view:'button',
                        height:35 ,
                        type:"icon",
                        icon:"file-text",
                        css:'components_list_filter_btn review_step_btn',
                        label:"Retrieve Selected From Source Org >>",
                        click:function(){

                            //Highlight Step
                            //$$('retrieveFromSourceView').show();
                            app.callEvent('CARTER_STEP_CLICKED', ["step3",null,null, null]);

                        }
                    }*/

                ]
            } ,
            {
                view:"pager" , id:"userSelectionsForValidationPreviewPager" ,
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
                    id:'userSelectedItemsPreviewFilter',
                    css:'carter-filter-modified-by' ,
                    placeholder:"search" ,
                    borderless:true ,
                    on:{
                        onTimedKeyPress:function (  ) {
                            var value = this.getValue().trim().toLowerCase();

                            /* function(obj){ //here it filters data!
                             return obj['xmlName'].toLowerCase().indexOf(value)>=0;
                             }*/
                            $$("userSelectionsForValidationPreview").filter(function(obj) {
                                return AppDataFormattingUtils.carterDefaultSearchComparator( value ,obj);
                            });
                        }
                    }
                } ,
                {view:"combo",id:'selectedItemsPreviewFilterByTypeCombo',
                    css:'carter-filter-by-type-combo',
                    placeholder:'type',
                    options:[],
                    on:{
                        onChange:function (  )
                        {
                            var typeValue = this.getValue();
                            $$("userSelectionsForValidationPreview").filter('itemType',typeValue);

                        }
                    }

                }

            ]
            },
            {
                view:"datatable" ,
                id:'userSelectionsForValidationPreview' ,
                type:'material' ,
                css:'carter-user-selected-list-for-validation' ,
                scroll:true ,
                header:false ,
                pager:'userSelectionsForValidationPreviewPager' ,
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
                        template:'<div class="rounded-checkbox">{common.checkbox()} <label for="rounded-checkbox"></label></div>',
                        checkValue:true,
                        uncheckValue:false
                    } ,
                    {
                        id:"name" ,
                        header:["Shortlisted Metadata Component Names" , { content:"textFilter",
                            compare:AppDataFormattingUtils.carterDefaultSearchComparator }] ,
                    template:AppDataFormattingUtils.carterDefaultColumnTemplateFn,
                        fillspace:3
                    } ,
                    {
                        id:"itemType" ,
                        header:["Meta Data Type" , { content:"selectFilter" }] ,
                        template:"<div class='carter-source-grid-row-obj-name'>#itemType#</div>" ,
                        fillspace:1
                    }
                ] ,
                data:[],

                refreshFilterItems:function (  ) {

                    var userSelectionGrid = $$( 'userSelectionsForValidationPreview' );

                    var selTypeCombo=$$('selectedItemsPreviewFilterByTypeCombo');
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

        $ui:layout,
        $oninit:function(view, $scope){
            //debugger;
        }

    };

});
