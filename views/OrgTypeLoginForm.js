/**
 * Created by prakash on 12/25/16.
 */
define([
    "app"
],function(app){




    var layout =  {
        type:'plain',
        css:'carter_login_source_org',
        rows:[
            {
                borderless:true,
                height:50,
                cols:[
                    {},
                    {
                        borderless:true,
                        type:'plain',
                        template:'<div class="carter_login_source_org_select_title">Select source org type</div>',
                        css:'carter_login_source_org_panel_header'
                    },
                    {}
                ]
            },
            {
                css:'carter_login_source_org_select_org',
                type:'plain',

                template:''
            },
            {

                cols:[{},{},{
                    borderless:true,
                    id:'sourceOrgType',
                    css:'carter-source-org-selection-radios',
                    value:'source:login',
                    view:"radio" , options:[
                        { id:"source:login" , value:"Production" , css:'carter-source-org-prod-text'} , //the initially selected item
                        { id:"source:test" , value:"Sanbox" , css:'carter-source-org-sand-text'}
                    ] , vertical:true
                },{}]
            },{

                cols:[{},{},{ view:"button", css: "button_primary button_raised carter-source-org-sing-in-btn", id:"my_button", value:"Sign In",  inputWidth:100 ,click:function (  ) {


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

    return {

        $ui:layout
    };

});
