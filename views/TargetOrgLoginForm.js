/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
],function(app){

    var layout =  {
        type:'plain',
        css:'carter_login_target_org',
        rows:[
            {
                borderless:true,
                height:50,
                cols:[
                    {},
                    {
                        borderless:true,
                        type:'plain',
                        template:'<div class="carter_login_target_org_select_title">Select Org Type to login to Target</div>',
                        css:'carter_login_target_org_panel_header'
                    },
                    {}
                ]
            },
            {
                css:'carter_login_target_org_select_org',
                type:'plain',

                template:''
            },
            {

                cols:[{},{},{
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

                cols:[{},{},{ view:"button", css: "button_primary button_raised carter-target-org-sing-in-btn", id:"target_org_sing_in_btn", value:"Sign In",  inputWidth:100 ,click:function (  ) {


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

    return {

        $ui:layout
    };

});
