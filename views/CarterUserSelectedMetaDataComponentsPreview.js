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
                        template:'Review Shortlisted Metadata  ' ,
                        height:35 ,
                        css:'carter-grid-meta-shortlist-header'
                    },
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
                    }

                ]
            } ,
            {
                view:"datatable" ,
                id:'userSelectionsForValidationPreview' ,
                type:'material' ,
                css:'carter-user-selected-list-for-validation' ,
                scroll:'xy' ,
                header:true ,
                pager:'pagerC' ,
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
                        header:["Shortlisted Metadata Component Names" , { content:"textFilter",
                            compare:AppDataFormattingUtils.carterDefaultSearchComparator }] ,
                    template:AppDataFormattingUtils.carterDefaultColumnTemplateFn,
                        fillspace:3
                    } ,
                    {
                        id:"itemType" ,
                        header:["Meta Data Type" , { content:"selectFilter" }] ,
                        template:"#itemType#" ,
                        fillspace:1
                    }
                ] ,
                data:[]
            } ,
            {
                view:"pager" , id:"pagerC" ,
                animate:true ,
                size:15 ,
                height:25 ,
                template:function ( data , common ) {
                    var start = data.page * data.size;
                    var end = start + data.size;
                    var html = " <div style='width:100%; text-align:center; line-height:20px; font-size:10pt; float:left'> " + common.prev() + "&nbsp;" + (start + 1) + " - " + (end < data.count ? end : data.count) + " of " + (data.count) + "&nbsp;" + common.next() + "</div> ";
                    return html;
                }
            }
        ]
    }

    return {

        $ui:layout

    };

});
