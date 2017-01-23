/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "views/CarterSourceMetaDataComponentsList",
    "views/CarterUserSelectedMetaDataComponents",
    "models/AppSharedState",
    "views/CarterUserSelectedMetaDataComponentsPreview",
    "views/TargetOrgLoginForm",
    "models/CarterWorkFlowHandler",
    "views/ValidateDeployView"

],function(app,CarterSourceMetaDataComponentsList,
           CarterUserSelectedMetaDataComponents,
           AppSharedState,
           CarterUserSelectedMetaDataComponentsPreview,
           TargetOrgLoginForm,
           CarterWorkFlowHandler,ValidateDeployView){


    var layout = {
        type:"plain",
        rows:[
            {view:"toolbar",
                type:'plain',
                height: 46,
                css:'carter_app_toolbar',
                elements:[
                    {}, {view:"label", width:180,   label:'<div class="user_login_profile">' +
                    '<span class="user_login_profile_icon">' +
                    '<i class="fa fa-user"></i>' +
                    '</span>' +
                    '<span class="user_login_profile_label">Org Login Info</span>' +
                        '<span class="user_login_profile_arrow">' +
                            '<i class="fa fa-angle-down"></i>' +
                        '</span>' +
                    '</div>', popup: "userLoginMenu" },
                    {width:5}

                ]},
                { height:70, borderless:true,
                    id:'carterWorkAreaContainer',
                    css:'carter-workflow-container',
                    type:"plain",cols:[

                    {
                        template:('<ul class="progressbar">' +
                                    '<li id="step1" class="progress_step_item active">Select from Source</li>' +
                                    '<li id="step2" class="progress_step_item">Review </li>' +
                                    '<li id="step3" class="progress_step_item">Retrieve </li>' +
                                    '<li id="step4" class="progress_step_item">Login to Target</li>' +
                                    '<li id="step5" class="progress_step_item">Validate & Deploy</li>' +
                                '</ul>'
                                ),
                        css:'carter-workflow-bar',
                        onClick:{
                            'progress_step_item':function ( e , id , trg ) {

                                //objectSelectionPreView
                                //carterLoggedInUserWorkFlowViews
                                //$$('objectSelectionPreView').show();

                                var stepClicked=trg.id;
                                if(stepClicked){
                                    app.callEvent('CARTER_STEP_CLICKED', [stepClicked,e,id, trg]);
                                }

                                //TODO
                            }
                        }
                    }
                ]
                },
            {
                view:"multiview" ,
                css:'carter-workflow-area-container',
                id:'carterLoggedInUserWorkFlowViews',
                fitBiggest:true,
                activeStepIndex:1,
                keepViews:true,
                cells:[
                    {
                        type:'plain' ,
                        id:'objectSelectionView',
                        rows:[
                            {
                                type:'plain' ,
                                cols:[
                                    CarterSourceMetaDataComponentsList,
                                    { view:"resizer" , css:'carter_left_resizer_line'} ,
                                    CarterUserSelectedMetaDataComponents

                                ]
                            }
                        ]
                    },
                    {
                        type:'plain',
                        id:'objectSelectionPreView',
                        rows:[
                            CarterUserSelectedMetaDataComponentsPreview
                        ]
                    },
                    {
                        type:'plain' ,
                        id:'retrieveFromSourceView' ,
                        rows:[{
                            type:'plain' ,
                            cols:[
                                {
                                    template:function (data){
                                        return (
                                            '<div  class="cantering_inner c100 p'+data.retrieveStatusValue+" " +(data.retrieveStatusText==="Failed"?"failed_progress":"")+' big">' +
                                            '<span >'+data.retrieveStatusValue+'%</span>' +
                                            '<div class="slice">' +
                                            '<div class="bar"></div>' +
                                            '<div class="fill"></div>' +
                                            '</div>' +
                                            '</div>'
                                        )
                                    } ,
                                    data:[{ retrieveStatusValue:0 , retrieveStatusText:'Initializing...',
                                        complete:false }] ,
                                    id:'retrieveProgressTemplate' ,
                                    css:'retrieve_progress_bar_container '
                                },
                                {
                                    id:'retrieveProgressTextTemplate' ,
                                    align:'center' ,
                                    css:' retrieve_progress_status_text_container' ,
                                    template:function (data){
                                        return(

                                            '<div class=" retrieve_progress_status_text"><span class="blink_me '+(data.retrieveStatusText==="Failed"?"failed_progress_text":"")+'"> '+data.retrieveStatusText+' </span></div>'
                                        )
                                    },
                                    data:[{
                                        retrieveStatusValue:0 ,
                                        retrieveStatusText:'Initializing...' ,
                                        complete:false
                                    }]
                                },
                                {
                                    css:'retrieve_progress_status_btn_container' ,
                                    template:'<div class=" retrieve_progress_status_text"> </div>'
                                }
                            ]
                        }
                        ]
                    } ,
                    {
                        type:'plain',
                        id:'loginToTargetOrgView',
                        rows:[
                            TargetOrgLoginForm
                        ]
                    },
                    {
                        type:'plain',
                        id:'validateAndDeployToTargetView',
                        rows:[
                            ValidateDeployView
                        ]
                    }
                ],
                on:{
                    onViewChange:function(prevID, nextID) {

                        //TODO if Any
                        //$$('userSelectionsForValidationPreview').bind($$('userSelectionsForValidationPreview'));
                        //$$('userSelectionsForValidationPreview').data.sync($$('userSelectionsForValidation'));

                    }
                },
                $onevent:{

                    CARTER_USER_SELECTION_CHANGED:function ( id, index ) {

                        var dataSource=AppSharedState.getUserSelection();

                        var sourceGrid=$$( 'sourceGrid' );
                        var userSelectionGrid = $$( 'userSelectionsForValidation' );
                        var userSelectionGridPreview = $$( 'userSelectionsForValidationPreview' );

                        //$$("listB").data.importData($$("listA"));

                        //Bind the data from App Shared State to all other components
                        //1.Selected
                        //2.Preview
                        //3.Validate

                        var isExistsAlready=sourceGrid.exists( id )
                        if(isExistsAlready){
                            //TODO
                            var sourceItem=sourceGrid.getItem(id);
                            sourceItem.selectedByUser=true;
                            sourceGrid.select(id);
                        }

                        //

                        userSelectionGrid.sync(dataSource);
                        userSelectionGridPreview.sync(dataSource);
                        sourceGrid.refresh();
                        userSelectionGrid.config.refreshFilterItems();
                        userSelectionGridPreview.config.refreshFilterItems();


                    },
                    CARTER_USER_SELECTION_REMOVED:function ( id ,item) {

                        var dataSource=AppSharedState.getUserSelection();
                        var sourceGrid=$$( 'sourceGrid' );
                        var isExistsAlready=sourceGrid.exists( id )
                        if(isExistsAlready){
                           //TODO
                            var sourceItem=sourceGrid.getItem(id);
                            sourceItem.selectedByUser=false;
                            sourceGrid.unselect(id);
                        }

                        var userSelectionGrid = $$( 'userSelectionsForValidation' );
                        var userSelectionGridPreview = $$( 'userSelectionsForValidationPreview' );
                        userSelectionGrid.sync(dataSource);
                        userSelectionGridPreview.sync(dataSource);
                        sourceGrid.refresh();
                        userSelectionGrid.config.refreshFilterItems();
                        userSelectionGridPreview.config.refreshFilterItems();


                    },
                    LOGIN_STATUS_CHANGED:function ( prefix ) {


                        if(prefix==="TARGET_LOGIN") {
                            app.callEvent('CARTER_STEP_CLICKED', ["step5",null,null, null]);
                            //$$('validateAndDeployToTargetView').show();
                        }

                    }
                },
                isTargetAlreadyLoggedIn:function (  ) {
                    var loginStatus=false;
                    loginStatus=AppSharedState.isLoggedIn("TARGET_LOGIN");

                    //TODO PING
                    /*webix.ajax(metaDataTypesListUrl,{
                        error:function(text, data, XmlHttpRequest){
                            //alert("error");
                        },
                        success:function(text, data, XmlHttpRequest){
                            if(XmlHttpRequest.status===204){

                                webix.alert({
                                    type:"alert-error",
                                    title:"Session Time out",
                                    text:"Your source org session timed out. </br>Please login again.",
                                    callback:function(){
                                        debugger;
                                        webix.storage.local.remove('SOURCE_LOGIN');
                                        app.show("forceput/CarterNotLoggedInView")
                                    }
                                });


                            }else if(XmlHttpRequest.status===200){

                                debugger;
                                $$("metaDataTypesList").parse(text);
                                AppSharedState.resetUserSelection();
                            }
                        }
                    });*/
                    return loginStatus;
                },
                confirmAlreadyLoggedInTarget:function ( callback ) {
                    if(this.isTargetAlreadyLoggedIn()) {
                        webix.confirm( {
                            title:"Already logged in to Target." ,
                            ok:"Yes" ,
                            cancel:"No" ,
                            type:"confirm-error" ,
                            text:"You have already logged in to target. Would you like to use the same session?" ,
                            callback:function ( result ) { //setting callback
                                /*webix.alert({
                                 title:"Your Choice",
                                 text:"Result" +result //using callback
                                 });*/
                                callback && callback(result)
                            }
                        } );
                    }else{
                        callback && callback(false)
                    }

                }
            }
                //,
                /*{height:50,
                    align:"center,middle",
                    cols:[
                        {},
                        {template:'Preview'},
                        {template:'Validate'},
                        {template:'Deploy'}
                        ,{}
                    ]
                }*/
        ]
    };

    return {
        $ui:layout,
        type:"material",
        $oninit:function(view, $scope){
           // $$('userSelectionsForValidation').data.sync($$('sourceGrid'));



        }
    };

});
