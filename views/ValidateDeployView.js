define([
    "app",
    "models/CarterRetrieveValidateDeployProcess",
    'models/RetrieveStepHelper',
    "models/ValidateDeployStepHelper",
    "models/AppSharedState"
],function(app,CarterRetrieveValidateDeployProcess,RetrieveStepHelper,ValidateDeployStepHelper,AppSharedState){




    var layout = {
        view:"form",
        id:'validateDeployForm',
        borderless:true,
        elements:[{
            css:"validate_deploy_container" ,
            rows:[
                {
                    cols:[
                        {
                            rows:[
                                { view:"template" , css:"" , template:"Parameters" , type:"section" } ,
                                {
                                    cols:[{
                                        view:"checkbox" ,
                                        labelRight:"Allow Missing Files" ,
                                        id:'allowMissingFiles' ,
                                        name:'allowMissingFiles' ,
                                        uncheckValue:"" ,
                                        checkValue:"true" ,
                                        labelWidth:0
                                    } ,
                                        {
                                            view:"checkbox" ,
                                            labelRight:"Auto Update Package" ,
                                            id:'autoUpdatePackage' ,
                                            name:'autoUpdatePackage' ,
                                            uncheckValue:"" ,
                                            checkValue:"true" ,
                                            labelWidth:0
                                        }
                                    ]
                                } ,
                                {
                                    cols:[{
                                        view:"checkbox" ,
                                        labelRight:"Ignore Warnings" ,
                                        uncheckValue:"" ,
                                        id:'ignoreWarnings' ,
                                        name:'ignoreWarnings' ,
                                        checkValue:"true" ,
                                        labelWidth:0
                                    } ,
                                        {
                                            view:"checkbox" ,
                                            labelRight:"Perform Retrieve" ,
                                            uncheckValue:"" ,
                                            id:'chkPerformRetrieve' ,
                                            name:'performRetrieve' ,
                                            checkValue:"true" ,
                                            labelWidth:0
                                        }
                                    ]
                                } ,
                                {
                                    cols:[{
                                        view:"checkbox" ,
                                        labelRight:"Purge On Delete" ,
                                        uncheckValue:"" ,
                                        id:'chkPugeOnDelete' ,
                                        name:'pugeOnDelete' ,
                                        checkValue:"true" ,
                                        labelWidth:0
                                    } ,
                                        {
                                            view:"checkbox" ,
                                            labelRight:"Rollback On Error" ,
                                            uncheckValue:"" ,
                                            id:'rollbackOnError' ,
                                            name:'rollbackOnError' ,
                                            checkValue:"true" ,
                                            labelWidth:0
                                        }]
                                } ,{
                                    cols:[
                                        {
                                            view:"checkbox" ,
                                            labelRight:"Validate Only" ,
                                            uncheckValue:"" ,
                                            id:'checkOnly' ,
                                            name:'checkOnly' ,
                                            checkValue:"true" ,
                                            labelWidth:0
                                        }]
                                } ,
                                { view:"template" , css:"" , template:"Find and Replace" , type:"section" } ,
                                {
                                    view:"scrollview" ,
                                    scroll:true ,
                                    height:200 ,
                                    borderless:true ,
                                    body:{
                                        borderless:true ,
                                        id:"patternReplaceTemplateRowContainer" ,
                                        counter:1,
                                        rows:[
                                            {
                                                id:'patternReplaceTemplateRow' ,
                                                cols:[
                                                    {
                                                        view:"text" ,
                                                        attributes:{class:'carter_find_string'},
                                                        placeholder:"Find text/pattern"
                                                    } ,
                                                    {
                                                        view:"text" ,
                                                        attributes:{class:'carter_replace_string'},
                                                        placeholder:"Replace text/pattern"
                                                    } ,
                                                    {
                                                        view:"button" ,
                                                        value:"+" ,
                                                        width:50 ,
                                                        click:function addFindReplaceRow () {
                                                            var parentContainer = $$( 'patternReplaceTemplateRowContainer' );
                                                            var counter=parentContainer.config.counter;
                                                            var addedView = parentContainer.addView( {
                                                                cols:[
                                                                    {
                                                                        view:"text" ,
                                                                        attributes:{class:'carter_find_string'},
                                                                        placeholder:"Find text/pattern"
                                                                    } ,
                                                                    {
                                                                        view:"text" ,
                                                                        //css:'replace_string',
                                                                        attributes:{class:'carter_replace_string'},
                                                                        //name:'txtReplaceString['+counter+']' ,
                                                                        placeholder:"Replace text/pattern"
                                                                    } ,
                                                                    {
                                                                        view:"button" ,
                                                                        value:"+" ,
                                                                        width:50 ,
                                                                        click:addFindReplaceRow
                                                                    } ,
                                                                    {
                                                                        view:"button" ,
                                                                        value:"-" ,
                                                                        width:50 ,
                                                                        click:function () {
                                                                            parentContainer.removeView( addedView )
                                                                        }
                                                                    }
                                                                ]
                                                            } );

                                                            parentContainer.config.counter=counter+1;
                                                        }
                                                    } ,
                                                    { view:"button" , value:"-" , width:50 , css:'visibility_hidden' }
                                                ]
                                            }
                                        ]
                                    }
                                } ,
                                { view:"spacer" }
                            ]
                        } ,
                        {
                            id:'stepProgressContainer' ,
                            rows:[
                                {
                                    template:function (data){
                                        return (
                                        '<div  class="cantering_inner c100 p'+data.statusValue+" " +(data.status.toLowerCase()==="failed"?"failed_progress":"")+' big">' +
                                        '<span >'+data.statusValue+'%</span>' +
                                        '<div class="slice">' +
                                        '<div class="bar"></div>' +
                                        '<div class="fill"></div>' +
                                        '</div>' +
                                        '</div>'
                                        )
                                    },
                                    data:[{ statusValue:0 , statusText:'',status:'' }] ,
                                    id:'stepProgressTemplate' ,
                                    css:'retrieve_progress_bar_container visibility_hidden'
                                } ,
                                {
                                    id:'stepProgressTextTemplate' ,
                                    align:'center' ,
                                    height:40 ,
                                    css:' retrieve_progress_status_text_container visibility_hidden' ,
                                    template:function (data){
                                        return(

                                            '<div class=" retrieve_progress_status_text"><span class="blink_me '+(data.status.toLowerCase()==="failed"?"failed_progress_text":"")+'"> '+data.statusText+' </span></div>'
                                        )
                                    } ,
                                    data:[{
                                        statusValue:0 ,
                                        statusText:'' ,
                                        complete:false,
                                        status:''
                                    }]
                                }
                            ] ,
                            padding:7
                        }
                    ]
                } ,
                {} ,
                {
                    rows:[
                        {
                            cols:[
                                /*{ view:"button" , value:"View Selected Items" , width:200 } ,*/
                                { view:"spacer" } ,
                                {} ,
                                {
                                    view:'button' ,
                                    label:'View Status' ,
                                    id:'viewStatusButton',
                                    hidden:true,
                                    statusData:null,
                                    click:function () {

                                        //debugger;
                                        //console.log(this.statusData);
                                        app.callEvent('SHOW_DEPLOY_STATUS_IN_WINDOW',[this.statusData]);


                                        return;
                                    }
                                } ,
                                {
                                    view:'button' ,
                                    label:'Deploy' ,
                                    css:'components_list_filter_btn' ,
                                    click:function () {

                                         $( '.retrieve_progress_bar_container' ).addClass( 'visibility_show' );
                                         $( '.retrieve_progress_status_text_container' ).addClass( 'visibility_show' );
                                        app.callEvent('DO_RETRIEVE');


                                    }
                                }
                            ]
                        }
                    ]
                } ,
                {}
            ]
        }]
    };



	return {
		$ui:layout,
        css:'validate_deploy_abs_container',
        $oninit:function (  ) {

        },$onevent:{
            DO_RETRIEVE:function ( id , index ) {
                $$( 'carterHomeInitialLoggedInview' ).disable();

                CarterRetrieveValidateDeployProcess.doRetrieve(RetrieveStepHelper.retrieveFinalCall,RetrieveStepHelper.retrieveProgressCall);
            },
            DO_RETRIEVE_COMPLETE:function (  ) {

                app.callEvent('DO_DEPLOY');

            },
            DO_RETRIEVE_ERROR:function ( finalStatus ) {
                $$( 'carterHomeInitialLoggedInview' ).enable();
                //TODO
            },
            DO_DEPLOY:function (  ) {

                if ( ValidateDeployStepHelper.canDeploy() ) {

                    CarterRetrieveValidateDeployProcess.doDeploy( ValidateDeployStepHelper.deployFinalCall , ValidateDeployStepHelper.deployProgressCall );
                } else {
                    //Alert to Retrieve
                }

            },
            DO_DEPLOY_COMPLETE:function ( finalStatus ) {

                $$('viewStatusButton').statusData=finalStatus;
                $$( 'carterHomeInitialLoggedInview' ).enable();

                webix.confirm("Deployment Success </br> Do you want to download the list as PDF?", function(result){

                    if(result) {
                        webix.toPDF( $$( "userSelectionsForValidation" ) , {
                            // orientation:"landscape",
                            filename:"Deployment-Success-Report" ,
                            filterHTML:true ,
                            columns:{
                                name:{ header:"Name" , template:webix.template( "#name#" ) } ,
                                itemType:{ header:"Type" , template:webix.template( "#itemType#" ) }
                            } ,
                            docHeader:{
                                text:"Deployment Success Report by forceput.com." ,
                                textAlign:"center" ,
                                color:0x663399
                            }
                        } ).then(function ( data ) {
                            AppSharedState.resetUserSelection();

                            $$('metaDataTypesList').clearSelection();
                            $$('metaDataTypesList').refresh();
                            $$('pagerMetaDataTypeList').refresh();

                            $$('sourceGrid').clearAll();
                            $$('sourceGrid').refresh();

                            $$('pagerSourceGrid').refresh();

                            $$('userSelectionsForValidation').refresh();
                            $$('userSelectionsForValidationPager').refresh();

                            $$('userSelectionsForValidationPreview').refresh();
                            $$('userSelectionsForValidationPreviewPager').refresh();



                            app.callEvent('CARTER_STEP_CLICKED', ["step1",null,null, null]);

                        });
                    }else{

                    }



                });


                //TODO
                //1.Clear Selection.
                //2.Clear process Status

                //app.triggerEvent('DO_DEPLOY_COMPLETE');
            },
            DO_DEPLOY_ERROR:function ( finalStatus ) {

                var statusButton=$$('viewStatusButton');
                statusButton.statusData=finalStatus;
                statusButton.show();
                $$( 'carterHomeInitialLoggedInview' ).enable();

                app.callEvent('SHOW_DEPLOY_STATUS_IN_WINDOW',[finalStatus,true]);

                webix.confirm("Deployment Failed </br> Do you want to download the list as PDF?", function(result){

                    if(result) {
                        webix.toPDF( $$( "userSelectionsForValidation" ) , {
                            orientation:"landscape",
                            filename:"Deployment-Failed-Report" ,
                            filterHTML:true ,
                            columns:{
                                name:{ header:"Name", template:webix.template( "#name#" ) } ,
                                itemType:{ header:"Type" ,width:'80' ,template:webix.template( "#itemType#" ) },
                                problem:{ header:"Problem" , template:webix.template( "#problem#" ) },
                                problemType:{ header:"Problem Type",width:'80' , template:webix.template( "#problemType#" ) }
                            } ,
                            docHeader:{
                                text:"Deployment (Failed) Report. by forceput.com." ,
                                textAlign:"center" ,
                                color:0x663399
                            }
                        } );
                    }else{

                    }

                });

                //app.triggerEvent('DO_DEPLOY_ERROR');
            }
        }
	};
	
});
