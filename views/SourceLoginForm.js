/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "views/CarterSourceLoggedInInfo"
],function(app,CarterSourceLoggedInInfo){


    var layout =  {
        type:'plain',
        id:'sourceNotLoggedInInfoViewSingInForm',
        css:'carter_login_source_org',
        rows:[

            {

                type:'plain',
                borderless:true,
                css:'carter_login_source_org_panel_header',
                template:'Source org type'
            },
            {
                //id:'sourceNotLoggedInInfoViewSingInForm',
                cols:[{},{
                    borderless:true,
                    id:'sourceOrgType',
                    css:'carter-source-org-selection-radios',
                    value:'source:login',
                    view:"radio" , options:[
                        { id:"source:login" , value:"Production" , css:'carter-source-org-prod-text'} , //the initially selected item
                        { id:"source:test" , value:"Sanbox" , css:'carter-source-org-sand-text'}
                    ] , vertical:true
                },{}]
            },


            {
                //id:'sourceNotLoggedInInfoViewSingInBtn',
                cols:[{},{ view:"button", css: "carter-source-org-sing-in-btn",  value:"Sign In",  inputWidth:100 ,click:function (  ) {


                    var clickedMenuKey=$$('sourceOrgType').getValue();
                    var loginHostTypeArray=clickedMenuKey.split(":");

                    var loginTypeKey=loginHostTypeArray[0];
                    var orgTypeKey=loginHostTypeArray[1];


                    //sourceLoginProduction
                    if(loginTypeKey==='source'){
                        window.sourceLogin({orgTypeKey:orgTypeKey});
                    }else if(loginTypeKey==='target'){
                        window.targetLogin({orgTypeKey:orgTypeKey});
                    }
                }},{}]
            },
            {
                css:'carter_login_source_org_bottom_row_space',
                template:''
            }
        ]
    };


    var layoutView={
        view:"multiview" ,
        id:'carterSourceLoginMultiView',
        fitBiggest:true,
        keepViews:true,
        cells:[

            layout,
            { id:'sourceLoggedInInfoView', rows:[CarterSourceLoggedInInfo]}

        ]
    };

    return {

        $ui:layoutView,
        on:{
            onViewChange:function ( prev, next ) {
                debugger;
                /*if(next==="carterTargetLoggedInInfo"){

                 debugger;
                 var loggedInItems=AppSharedState.getOrgLoggedInUserItems('SOURCE');
                 //carterTargetLoggedInInfo
                 }*/

            }
        },
        $onevent:{

            /*SOURCE_ORG_LOGIN_SUCCESS:function (  ) {

                //$$('sourceNotLoggedInInfoViewSingInForm').hide();
                $$('sourceLoggedInInfoView').show();
                $$('carterTargetLoginMultiView').enable();

                $('.carter_target_login_multi_view').removeClass('carter_disabled');
                //$$('sourceNotLoggedInInfoViewSingInBtn').hide();

            }*/
        }
    };

});
