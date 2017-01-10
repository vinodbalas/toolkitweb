/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "views/CarterSourceMetaDataComponentsList",
    "views/CarterUserSelectedMetaDataComponents",
    "models/AppSharedState",
    "models/CarterRetrieveValidateDeployProcess",
    "views/CarterUserSelectedMetaDataComponentsPreview",
    "views/TargetOrgLoginForm"

],function(app,CarterSourceMetaDataComponentsList,CarterUserSelectedMetaDataComponents,AppSharedState,CarterRetrieveValidateDeployProcess,CarterUserSelectedMetaDataComponentsPreview,TargetOrgLoginForm){



    webix.ui({
        view:"popup",
        id:"userLoginMenu",
        css:'carter-user-login-menu-list-popup',
        head:false,
        width: 300,
        body:{
            view:"list" ,
            css:'carter-user-login-menu-list' ,
            scroll:false ,
            yCount:2 ,
            select:true ,
            borderless:true ,
            template:"#menuItemText#" ,
            data:[
                {
                    id:1 ,
                    menuItemText:"<div class='source_logout_menu'>" +
                "<span class='source_logout_menu_icon'><i class='fa fa-cloud-download'></i></span>" +
                "<span class='source_logout_menu_text'>Source Logout</span>" +
                "</div>"
                    , css:'carter-user-login-menu-item-source'
                } ,
                {
                    id:2 ,
                    menuItemText:"<div class='target_logout_menu'>" +
                "<span class='target_logout_menu_icon'><i class='fa fa-cloud-upload'></i></span>" +
                "<span class='target_logout_menu_text'>Target Logout</span>" +
                "</div>" ,
                    css:'carter-user-login-menu-list-target'
                }
            ] ,
            on:{
                "onAfterSelect":function(id){
                        if(id==="1"){
                            webix.storage.local.remove('SOURCE_LOGIN');
                            app.show("top/CarterNotLoggedInView")
                            //window.location.reload();
                            //trigger source logout event.
                            //clear index db
                        }
                        else if(id==="2"){
                            webix.storage.local.remove('TARGET_LOGIN');
                            //trigger target logout event.
                           // window.location.reload();
                            //clear index db
                        }
                        $$("userLoginMenu").hide();
                }
            }
        }
    });





    var layout = {
        type:"plain",
        rows:[
            {view:"toolbar",
                type:'head',
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
                { height:70, borderless:false, type:"head",cols:[

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
                id:'carterLoggedInUserWorkFlowViews',
                fitBiggest:true,
                activeStepIndex:1,
                keepViews:true,
                cells:[
                    {
                        type:'line' ,
                        id:'objectSelectionView',
                        rows:[
                            {
                                type:'line' ,
                                cols:[
                                    CarterSourceMetaDataComponentsList,
                                    { view:"resizer" } ,
                                    CarterUserSelectedMetaDataComponents

                                ]
                            }
                        ]
                    },
                    {
                        type:'line',
                        id:'objectSelectionPreView',
                        rows:[
                            CarterUserSelectedMetaDataComponentsPreview
                        ]
                    },
                    {
                        type:'plain' ,
                        id:'retrieveFromSourceView' ,
                        rows:[{
                            type:'line' ,
                            cols:[
                                {
                                    template:(
                                        '<div  class="cantering_inner c100 p#retrieveStatusValue# big">' +
                                        '<span >#retrieveStatusValue#%</span>' +
                                        '<div class="slice">' +
                                        '<div class="bar"></div>' +
                                        '<div class="fill"></div>' +
                                        '</div>' +
                                        '</div>'

                                    ) ,
                                    data:[{ retrieveStatusValue:0 , retrieveStatusText:'Initializing...' }] ,
                                    id:'retrieveProgressTemplate' ,
                                    css:'retrieve_progress_bar_container '
                                },
                                {
                                    id:'retrieveProgressTextTemplate' ,
                                    align:'center' ,
                                    css:' retrieve_progress_status_text_container' ,
                                    template:('<div class=" retrieve_progress_status_text"><span class="blink_me"> #retrieveStatusText# </span></div>') ,
                                    data:[{
                                        retrieveStatusValue:0 ,
                                        retrieveStatusText:'Initializing...' ,
                                        complete:false
                                    }]
                                },
                                {
                                    css:' retrieve_progress_status_btn_container' ,
                                    template:'<div class=" retrieve_progress_status_text">Buttons for next</div>'
                                }
                            ]
                        }
                        ]
                    } ,
                    {
                        type:'line',
                        id:'loginToTargetOrgView',
                        rows:[
                            TargetOrgLoginForm
                        ]
                    },
                    {
                        type:'line',
                        id:'validateAndDeployToTargetView',
                        rows:[
                            {
                                view:'button' ,
                                label:'Validate',
                                click:function () {


                                    CarterRetrieveValidateDeployProcess.doValidate( function ( finalData ) {
                                            console.log("Validate : Final Status:"+finalData)
                                        } ,
                                        function ( statusData ) {
                                            console.log("Validate : Progress:"+statusData)
                                        });

                                }
                            },
                            {
                                view:'button' ,
                                label:'Deploy',
                                css:'components_list_filter_btn' ,
                                click:function () {

                                    CarterRetrieveValidateDeployProcess.doDeploy( function ( finalData ) {
                                            console.log("Deploy : Final Status:"+finalData)
                                        } ,
                                        function ( statusData ) {
                                            console.log("Deploy : Progress:"+statusData)
                                        });

                                }
                            }
                        ]
                    }
                ],
                on:{
                    onViewChange:function(prevID, nextID) {

                        //TODO if Any
                        //$$('userSelectionsForValidationPreview').bind($$('userSelectionsForValidationPreview'));
                        //$$('userSelectionsForValidationPreview').data.sync($$('userSelectionsForValidation'));

                       // debugger;
                    }
                },
                $onevent:{

                    CARTER_STEP_CLICKED:function ( prefix ,e,id, trg) {

                        var prevIndex=$$('carterLoggedInUserWorkFlowViews').config.activeStepIndex;

                        if(prefix){
                            $("#"+prefix).addClass('active');
                        }

                        var currentNumericIndex=parseInt(prefix.substr(4));

                        if(currentNumericIndex===0 || currentNumericIndex===1){
                            currentNumericIndex=1;
                        }


                        if(prevIndex > currentNumericIndex){

                            for(var i=(currentNumericIndex+1);i<=prevIndex;i++){
                                $("#step"+i).removeClass('active');
                            }
                        }

                        if (prefix==="step1"){
                            //webix.html.addCss(trg, "active");
                            $$('objectSelectionView').show();
                        } else if(prefix==="step2") {
                            //webix.html.addCss(trg, "active");
                            $$('objectSelectionPreView').show();
                        }else if(prefix==="step3") {
                            //webix.html.addCss(trg, "active");
                           // debugger;

                            $$('retrieveFromSourceView').show();

                            var progressPercent=0;
                            function retrieveFinalCall ( finalStatus ) {

                                //progressPercent=100;

                                if(!finalStatus)
                                {
                                    finalStatus="Completed...";
                                }
                                var retrieveProgressTemplate=$$('retrieveProgressTemplate');
                                var dataTobeUpdated=[{retrieveStatusValue:'100',retrieveStatusText:'Completed...',complete:true}];
                                retrieveProgressTemplate.define("data",dataTobeUpdated);
                                retrieveProgressTemplate.refresh();

                                var retrieveProgressTextTemplate=$$('retrieveProgressTextTemplate');
                                retrieveProgressTextTemplate.define("data",dataTobeUpdated);
                                retrieveProgressTemplate.refresh();
                                retrieveProgressTextTemplate.refresh();


                                debugger;
                              /*  CarterRetrieveValidateDeployProcess.doDeploy( function ( finalData ) {
                                    //debugger;
                                } ,
                                function ( statusData ) {
                                    console.log("Progress:"+statusData)
                                });
                                */

                                //TODO Update Buttons
                                //Show hide Buttons for Retrieve.

                                /*
                                console.log("Final Listener:"+finalStatus);
                                webix.html.setValue('retrieveStatusValue', finalStatus);
                                webix.html.removeCss('retrieveStatusValue',("p"+(progressPercent)-1));
                                webix.html.addCss('retrieveStatusValue',("p"+progressPercent));*/

                            }
                            function retrieveProgressCall ( progressStatus ) {

                                progressPercent++;
                                //progressPercentCss
                                //retrieveStatusValue
                                //webix.html.setValue('retrieveStatusValue', progressStatus);
                                //webix.html.removeCss('retrieveStatusValue',("p"+(progressPercent)-1));
                                //webix.html.addCss('retrieveStatusValue',("p"+progressPercent));

                                if(!progressStatus)
                                {
                                    progressStatus="Still Working...";
                                }
                                if(progressPercent>=100){
                                    progressPercent=progressPercent-95;
                                }

                                if(progressStatus==="Succeeded"){
                                    progressPercent=100;
                                }
                                var retrieveProgressTemplate=$$('retrieveProgressTemplate');
                                var dataTobeUpdate=[{retrieveStatusValue:progressPercent,retrieveStatusText:progressStatus,complete:false}];
                                retrieveProgressTemplate.define("data",dataTobeUpdate);

                                var retrieveProgressTextTemplate=$$('retrieveProgressTextTemplate');
                                retrieveProgressTextTemplate.define("data",dataTobeUpdate);
                                retrieveProgressTemplate.refresh();
                                retrieveProgressTextTemplate.refresh();

                                console.log("Progress Listener:"+progressStatus);
                            }

                            CarterRetrieveValidateDeployProcess.doRetrieve(retrieveFinalCall,retrieveProgressCall);
                            //TODO Promise API
                            /*CarterRetrieveValidateDeployProcess.doRetrieve( function ( finalData ) {
                                //debugger;
                                CarterRetrieveValidateDeployProcess.doDeploy( function ( finalData ) {
                                    //debugger;
                                } )
                            } );*/

                            //retrieveFromSourceView



                        }else if(prefix==="step4"){
                            $$('carterLoggedInUserWorkFlowViews').config.confirmAlreadyLoggedInTarget(function ( result ) {


                                if(result){
                                    app.callEvent('CARTER_STEP_CLICKED', ["step5",null,null, null]);
                                    //$$('loginToTargetOrgView').show()
                                }else{
                                    //app.callEvent('CARTER_STEP_CLICKED', ["step4",null,null, null]);
                                    $("#step4").addClass('active');
                                    $$('loginToTargetOrgView').show()
                                }
                            });
                            //$$('loginToTargetOrgView').show();
                        }else if(prefix==="step5"){
                            //get the step5 and make it active..
                            $$('validateAndDeployToTargetView').show();
                        }

                        $$('carterLoggedInUserWorkFlowViews').config.activeStepIndex=currentNumericIndex;

                    },
                    LOGIN_STATUS_CHANGED:function ( prefix ) {

                        //debugger;
                        if(prefix==="TARGET_LOGIN") {
                            app.callEvent('CARTER_STEP_CLICKED', ["step5",null,null, null]);
                            //$$('validateAndDeployToTargetView').show();
                        }

                    }
                },
                isTargetAlreadyLoggedIn:function (  ) {
                    var loginStatus=false;
                    loginStatus=AppSharedState.isLoggedIn("TARGET_LOGIN")
                    return loginStatus;
                },
                confirmAlreadyLoggedInTarget:function ( callback ) {


                    if(this.isTargetAlreadyLoggedIn) {
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
            $$('userSelectionsForValidationPreview').data.sync($$('userSelectionsForValidation'));

        }
    };

});
