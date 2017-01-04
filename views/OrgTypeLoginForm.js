/**
 * Created by prakash on 12/25/16.
 */
define([
    "app"
],function(app){




    var layout =  {
        rows:[{
            template:'<div class="carter-login-org-select-title">Login</div>',
            height:50
        },
            {
                template:''
            },
            {
                cols:[{},{
                    id:'sourceOrgType',
                    css:'carter-source-org-selection-radios',
                    value:'source:login',
                    view:"radio" , options:[
                        { id:"source:login" , value:"Production" , css:'carter-source-org-prod-text'} , //the initially selected item
                        { id:"source:test" , value:"Sanbox" , css:'carter-source-org-sand-text'}
                    ] , vertical:true
                },{}]
            },{

                cols:[{},{ view:"button", css: "button_primary button_raised carter-source-org-sing-in-btn", id:"my_button", value:"Sign In",  inputWidth:100 ,click:function (  ) {


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
                template:''
            }
        ]
    };

    return {

        $ui:layout
    };

});
