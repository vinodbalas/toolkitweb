/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "models/AppSharedState",
    "models/AppDataFormattingUtils"
],function(app,AppSharedState,AppDataFormattingUtils){

    ///Users/prakash/Documents/PublicGit/toolkitweb/views/CarterDeployStatusView.js
    ///Users/prakash/Documents/PublicGit/toolkitweb/views/CarterUserSelectedMetaDataComponentsPreview.js
    var layout = {
        view:"scrollview" ,
        scroll:true ,
        height:240 ,
        borderless:true ,
        body:{
            rows:[{
                type:'head' ,
                id:'userSelectedMetaDataComponentsPreView' ,
                rows:[
                    {
                        view:"pager" , id:"userSelectionsForValidationPreviewPager" ,
                        animate:true ,
                        size:15 ,
                        height:32 ,
                        template:function ( data , common ) {
                            var start = data.page * data.size;
                            var end = start + data.size;
                            var html = " <div class='usr-sel-metadata-type-list-pager' style='width:100%; text-align:center; line-height:20px; font-size:10pt; float:left'> " + common.first() + common.prev() + "&nbsp;" + (start + 1) + " - " + (end < data.count ? end : data.count) + " of " + (data.count) + "&nbsp;" + common.next() + common.last() + "</div> ";
                            return html;
                        }
                    } ,
                    {
                        height:35 , type:"line" , cols:[
                        {
                            view:"search" ,
                            id:'userSelectedItemsPreviewFilter' ,
                            css:'carter-filter-modified-by' ,
                            placeholder:"search" ,
                            borderless:true ,
                            on:{
                                onTimedKeyPress:function () {
                                    var value = this.getValue().trim().toLowerCase();
                                    /* function(obj){ //here it filters data!
                                     return obj['xmlName'].toLowerCase().indexOf(value)>=0;
                                     }*/
                                    $$( "userSelectionsForValidationPreview" ).filter( function ( obj ) {
                                        return AppDataFormattingUtils.carterDefaultSearchComparator( value , obj );
                                    } );
                                }
                            }
                        } ,
                        {
                            view:"combo" , id:'selectedItemsPreviewFilterByTypeCombo' ,
                            css:'carter-filter-by-type-combo' ,
                            placeholder:'type' ,
                            options:[] ,
                            on:{
                                onChange:function () {
                                    var typeValue = this.getValue();
                                    $$( "userSelectionsForValidationPreview" ).filter( 'itemType' , typeValue );
                                }
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
                        tooltip:true ,
                        pager:'userSelectionsForValidationPreviewPager' ,
                        checkboxRefresh:true ,
                        resizeColumn:true ,
                        leftSplit:2 ,
                        columns:[
                            {
                                id:"selectedByUser" ,
                                width:40 ,
                                header:["" ] ,
                                css:"left" ,
                                template:'<div class="rounded-checkbox">{common.checkbox()} <label for="rounded-checkbox"></label></div>' ,
                                checkValue:true ,
                                uncheckValue:false
                            } ,
                            {
                                id:"name" ,
                                header:["Component Name"] ,
                                template:AppDataFormattingUtils.carterDefaultColumnTemplateFn ,
                                fillspace:1
                            } ,
                            {
                                id:"itemType" ,
                                header:["Meta Data Type"] ,
                                template:"<div class='carter-source-grid-row-obj-name'>#itemType#</div>" ,
                                fillspace:1
                            } ,
                            {
                                id:"status" ,
                                header:["Status"] ,
                                template:"<div class='carter-source-grid-row-obj-name'>#status#</div>" ,
                                fillspace:1 ,
                                hidden:true
                            } ,
                            {
                                id:"problem" ,
                                header:["Problem"] ,
                                template:"<div class='carter-source-grid-row-obj-name'>#problem#</div>" ,
                                fillspace:1
                            } , {
                                id:"problemType" ,
                                header:["Problem Type"] ,
                                template:"<div class='carter-source-grid-row-obj-name'>#problemType#</div>" ,
                                fillspace:1
                            } , {
                                id:"fileName" ,
                                header:["File Name"] ,
                                template:"<div class='carter-source-grid-row-obj-name'>#fileName#</div>" ,
                                fillspace:1 ,
                                hidden:true
                            }
                        ] ,
                        data:[] ,
                        refreshFilterItems:function () {
                            var userSelectionGrid = $$( 'userSelectionsForValidationPreview' );
                            var selTypeCombo = $$( 'selectedItemsPreviewFilterByTypeCombo' );
                            selTypeCombo.getList().clearAll();
                            var itemTypes = userSelectionGrid.collectValues( "itemType" );
                            selTypeCombo.getList().parse( itemTypes );
                            selTypeCombo.refresh();
                        } ,
                        on:{
                            onCheck:function ( row , col , state ) {
                                var me = this;
                                var sourceGrid = $$( 'sourceGrid' );
                                var sourceItem = sourceGrid.getItem( row );
                                AppSharedState.removeUserSelection( sourceItem.id );
                            } ,
                            onItemClick:function ( id , e , node ) {
                                //var me = this;
                                //AppSharedState.removeUserSelection( id.row );
                            }
                        }
                    }
                    ,
                    {
                        height:5
                    }
                ]
            }
            ]
        }
    };



    var window={
        view:"window",
        id:"statusViewWindow",
        css:'status-view-window',
        move:false,
        height:800,
        width:600,
        borderless:true,
        resize:true,
        position:"center",
        head:{
            view:"toolbar", borderless:true, css:'status-view-window-toolbar',margin:-4, cols:[{ borderless:true,template:'Deploy Status'},
                {view:"toggle", type:"iconButton",width:45,
                    offIcon:"fa fa-window-minimize",  onIcon:"fa fa-window-maximize",click:function (  ) {
                    $$("statusViewWindow").config.fullscreen = !$$("statusViewWindow").config.fullscreen;
                    $$("statusViewWindow").resize();

                }},
                { view:"icon", icon:"times-circle",
                    click:"$$('statusViewWindow').hide();"}
            ]
        },

        body:layout
    };

    webix.ui(window);

    return {
        $oninit:function(view, $scope){
        }

    };

});
