/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "views/CarterSourceMetaDataComponentsList",
    "views/CarterUserSelectedMetaDataComponents"
],function(app,CarterSourceMetaDataComponentsList,CarterUserSelectedMetaDataComponents){



    webix.ui({
        view:"popup",
        id:"userLoginMenu",
        css:'carter-user-login-menu-list-popup',
        head:false,
        width: 300,
        body:{
            view:"list",
            css:'carter-user-login-menu-list',
            scroll:false,
            yCount:4,
            select:true,
            borderless:true,
            template:"#menuItemText#",
            data:[
                {id:1, menuItemText:"Source Logout",css:'carter-user-login-menu-item-source'},
                {id:2, menuItemText:"Target Logout",css:'carter-user-login-menu-list-target'}
            ],
            on:{
                "onAfterSelect":function(id){
                        if(id==="1"){
                            /*
                            webix.storage.local.remove('source_status');
                            window.location.reload();
                            */
                            //trigger source logout event.
                            //clear index db
                        }
                        else if(id==="2"){
                            //webix.storage.local.remove('target_status');
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
        type:"line",
        rows:[
            {view:"toolbar",
                type:'material',
                height: 46,
                elements:[
                    {},  {view:"icon",width: 40, icon:"user", popup: "userLoginMenu" }

                ]},
                { height:70, borderless:true, type:"clean",cols:[

                    {
                        template:('<ul class="progressbar">' +
                                    '<li id="step1" class="progress_step_item active">Select from Source</li>' +
                                    '<li id="step2" class="progress_step_item">Preview </li>' +
                                    '<li id="step3" class="progress_step_item">Retrieve </li>' +
                                    '<li id="step4" class="progress_step_item">Login to Target</li>' +
                                    '<li id="step5" class="progress_step_item">Validate and Deploy</li>' +
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
                                    app.callEvent('CARTER_STEP_CLICKED', [stepClicked]);
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
                            {
                                template :'Preview Tab'
                            }
                        ]
                    }
                ],
                $onevent:{
                    CARTER_STEP_CLICKED:function ( prefix ) {
                        debugger;
                        //app.show('top/CarterLoggedInView');

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
        }
    };

});
