/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "views/CarterTargetLoggedInInfo",
    "models/AppSharedState"
],function(app,CarterTargetLoggedInInfo,AppSharedState){

    var layout =  {
        type:'plain',
        id:'carterTargetOrgLoginForm',
        borderless:true,
        css:'carter_login_target_org',
        rows:[

            {

                type:'plain',
                borderless:true,
                css:'carter_login_target_org_panel_header',
                template:'Target org type'
            },
            {

                cols:[{},{
                    borderless:true,
                    id:'targetOrgType',
                    css:'carter-target-org-selection-radios',
                    value:'target:login',
                    view:"radio" , options:[
                        { id:"target:login" , value:"Production" , css:'carter-target-org-prod-text'} , //the initially selected item
                        { id:"target:test" , value:"Sanbox" , css:'carter-target-org-sand-text'}
                    ] , vertical:true
                },{}]
            },{

                cols:[{},{ view:"button", css: "carter-source-org-sing-in-btn", id:"target_org_sing_in_btn", value:"Sign In",  inputWidth:100 ,click:function (  ) {


                    var clickedMenuKey=$$('targetOrgType').getValue();
                    var loginHostTypeArray=clickedMenuKey.split(":");

                    var loginTypeKey=loginHostTypeArray[0];
                    var orgTypeKey=loginHostTypeArray[1];


                     if(loginTypeKey==='target'){
                        window.targetLogin({orgTypeKey:orgTypeKey});
                    }
                }},{}]
            },
            {
                css:'carter_login_target_org_bottom_row_space',
                template:''
            }
        ]
    };


    var layoutView={
        view:"multiview" ,
        id:'carterTargetLoginMultiView',
        css:'carter_target_login_multi_view carter_disabled',
        fitBiggest:true,
        disabled:true,
        keepViews:true,
        cells:[
            layout,
            { id:'targetLoggedInInfoView', rows:[CarterTargetLoggedInInfo]}

        ],
        on:{
            onViewChange:function ( prev, next ) {
                /*if(next==="carterTargetLoggedInInfo"){

                    debugger;
                    var loggedInItems=AppSharedState.getOrgLoggedInUserItems('SOURCE');
                    //carterTargetLoggedInInfo
                }*/
                
            }
        }
    };

    return {

        $ui:layoutView,
        $onevent:{

            /*TARGET_ORG_LOGIN_SUCCESS:function (  ) {

                //$$('sourceNotLoggedInInfoViewSingInForm').hide();
                if($$('targetLoggedInInfoView')) {
                    $$( 'targetLoggedInInfoView' ).show();
                }

                $$('carterTargetLoginMultiView').enable();

                $('.carter_target_login_multi_view').removeClass('carter_disabled');


                app.callEvent('TARGET_ORG_LOGIN_COMPLETE',[])
                //$$('sourceNotLoggedInInfoViewSingInBtn').hide();

            }*/
        }
    };

});
