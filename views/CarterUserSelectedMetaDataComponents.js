/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
],function(app){




    var layout = {
        type:'plain' ,
        rows:[
            {
                type:'line' ,
                cols:[
                    {
                        template:'Shortlisted Metadata for Migration ' ,
                        height:35 ,
                        css:'carter-grid-meta-shortlist-header'
                    },
                    {
                        view:'button' ,
                        value:'Retrieve Selection',
                        width:150 ,
                        click:function () {


                            debugger;
                            // &deployRequest={"types":[{"members":["EVER_SetupAutoEntRulesWO"],"name":"ApexClass"}]}

                            var objectsByType={};
                            var gridData=$$('userSelectionsForValidation').data;
                            gridData.each( function ( row ) {
                                if ( !objectsByType[row.itemType] ) {
                                    objectsByType[row.itemType] = []
                                }
                                objectsByType[row.itemType].push( row.name )
                            } );

                            var paramsObj={types:[

                            ]};

                            var toParams=Object.keys(objectsByType).map(function ( key ) {
                                var selectedType={members:objectsByType[key],name:key};
                                paramsObj.types.push(selectedType);
                            });


                            var loginStatus=webix.storage.local.get('source_status');
                            var sourceLoginDetails ;
                            var identityServiceUrl ;
                            var identityOrgId ;
                            var sessionId ;
                            var instanceUrl ;

                            if(loginStatus && loginStatus.source_info.id) {
                                sourceLoginDetails = loginStatus.source_info;
                                identityServiceUrl = sourceLoginDetails.id;
                                identityOrgId = identityServiceUrl.split( "/id/" )[1].split( "/" )[0];
                                sessionId = sourceLoginDetails.access_token;
                                instanceUrl = sourceLoginDetails.instance_url;
                            }


                            var finalParams=JSON.stringify(paramsObj);
                            //var requestParams=

                            var retrieveUrl=app.config.getApiUrl('retrieve?sourceSession={"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }&deployRequest='+escape(finalParams));


                            var promise = webix.ajax(retrieveUrl);
                            promise.then(function(realdata){

                                // debugger;
                                /*{
                                 "done" : false,
                                 "id" : "09S90000003UTrmEAG",
                                 "message" : null,
                                 "state" : "Queued",
                                 "statusCode" : null
                                 }*/


                                /* function doPoll() {
                                 $.post( 'ajax/test.html' )
                                 .done( function ( data ) {
                                 } )
                                 .always( function () {
                                 setTimeout( doPoll , 5000 );
                                 } );
                                 }*/

                                //
                                /*success*/
                            });
                            promise.fail(function(err){/*error*/});

                            //  alert( 1 );
                            //$$( 'objectSelectionPreView' ).show();
                        }
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
                            sourceItem.selectedByUser = false;
                            sourceGrid.unselect( row );

                            var selectedItem=userSelectionGrid.getItem(row);
                            selectedItem.selectedByUser = false;
                            userSelectionGrid.remove( row );

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
