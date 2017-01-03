/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
],function(app){


    var layout =  {
        rows:[{
            template:'<div class="carter-login-org-select-title"> Target Login</div>',
            height:50
        },
            {
                template:''
            },
            {
                cols:[{},{
                    id:'targetOrgType',
                    css:'carter-target-org-selection-radios',
                    value:'target:login',
                    view:"radio" , options:[
                        { id:"target:login" , value:"Production" , css:'carter-target-org-prod-text'} , //the initially selected item
                        { id:"target:test" , value:"Sanbox" , css:'carter-target-org-sand-text'}
                    ] , vertical:true
                },{}]
            },{

                cols:[{},{ view:"button", css: "button_primary button_raised carter-target-org-sing-in-btn", id:"my_button", value:"Sign In",  inputWidth:100 ,click:function (  ) {


                    var clickedMenuKey=$$('targetOrgType').getValue();
                    var loginHostTypeArray=clickedMenuKey.split(":");

                    var loginTypeKey=loginHostTypeArray[0];
                    var orgTypeKey=loginHostTypeArray[1];


                    //sourceLoginProduction
                    if(loginTypeKey==='target'){
                        window.targetLogin({orgTypeKey:orgTypeKey});
                    }
                    /*else if(loginTypeKey==='source'){
                        window.sourceLogin({orgTypeKey:orgTypeKey});
                    }*/
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
