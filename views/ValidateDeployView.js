define([
    "app",
    "models/CarterRetrieveValidateDeployProcess",
    "models/ValidateDeployStepHelper"
],function(app,CarterRetrieveValidateDeployProcess,ValidateDeployStepHelper){


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
                                        id:'chkAllowMissingFiles' ,
                                        name:'allowMissingFiles' ,
                                        uncheckValue:"" ,
                                        checkValue:"true" ,
                                        labelWidth:0
                                    } ,
                                        {
                                            view:"checkbox" ,
                                            labelRight:"Auto Update Package" ,
                                            id:'chkAutoUpdatePackage' ,
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
                                        id:'chkIgnoreWarnings' ,
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
                                            id:'chkRollbackOnError' ,
                                            name:'rollbackOnError' ,
                                            checkValue:"true" ,
                                            labelWidth:0
                                        }]
                                } ,
                                { view:"template" , css:"" , template:"Find and Replace" , type:"section" } ,
                                {
                                    view:"scrollview" ,
                                    scroll:true ,
                                    height:240 ,
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
                            id:'validateDeployProgressContainer' ,
                            rows:[
                                {
                                    template:function (data){
                                        return (
                                        '<div  class="cantering_inner c100 p'+data.statusValue+" " +(data.statusText==="Failed"?"failed_progress":"")+' big">' +
                                        '<span >'+data.statusValue+'%</span>' +
                                        '<div class="slice">' +
                                        '<div class="bar"></div>' +
                                        '<div class="fill"></div>' +
                                        '</div>' +
                                        '</div>'
                                        )
                                    },
                                    data:[{ statusValue:0 , statusText:'' }] ,
                                    id:'validateDeployProgressTemplate' ,
                                    css:'retrieve_progress_bar_container visibility_hidden'
                                } ,
                                {
                                    id:'validateDeployProgressTextTemplate' ,
                                    align:'center' ,
                                    height:40 ,
                                    css:' retrieve_progress_status_text_container visibility_hidden' ,
                                    template:function (data){
                                        return(

                                            '<div class=" retrieve_progress_status_text"><span class="blink_me '+(data.statusText==="Failed"?"failed_progress_text":"")+'"> '+data.statusText+' </span></div>'
                                        )
                                    } ,
                                    data:[{
                                        statusValue:0 ,
                                        statusText:'' ,
                                        complete:false
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
                                    label:'Validate' ,
                                    click:function () {

                                        $( '.retrieve_progress_bar_container' ).addClass( 'visibility_show' );
                                        $( '.retrieve_progress_status_text_container' ).addClass( 'visibility_show' );
                                        if ( ValidateDeployStepHelper.canValidate() ) {
                                            $$( 'carterHomeInitialLoggedInview' ).disable();
                                            CarterRetrieveValidateDeployProcess.doValidate( ValidateDeployStepHelper.validateFinalCall , ValidateDeployStepHelper.validateProgressCall );
                                        }
                                        else {
                                            //Alert to Retrieve
                                        }
                                    }
                                } ,
                                {
                                    view:'button' ,
                                    label:'Deploy' ,
                                    css:'components_list_filter_btn' ,
                                    click:function () {

                                        $( '.retrieve_progress_bar_container' ).addClass( 'visibility_show' );
                                        $( '.retrieve_progress_status_text_container' ).addClass( 'visibility_show' );
                                        if ( ValidateDeployStepHelper.canDeploy() ) {
                                            $$( 'carterHomeInitialLoggedInview' ).disable();
                                            CarterRetrieveValidateDeployProcess.doDeploy( ValidateDeployStepHelper.deployFinalCall , ValidateDeployStepHelper.deployProgressCall );
                                        } else {
                                            //Alert to Retrieve
                                        }
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

        }
	};
	
});
