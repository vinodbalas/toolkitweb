/**
 * Created by Prakash on 12/25/16.
 */
define([
    "app",
    "views/Auditor/AuditorHomeViewLeftBar",
    "views/Auditor/Login",
    "views/Auditor/MetaDataTypesList",
    "views/Auditor/AuditActionDetails",
    "models/AppSharedState"
],function(app,AuditorHomeViewLeftBar, Login, MetaDataTypesList, AuditActionDetails,AppSharedState){


    var access_token=AppSharedState.isLoggedIn('SOURCE_LOGIN');

    var cmpToRender={};

    if(access_token)
    {
        cmpToRender={
            css:'bg_clean',
            cols:[
                MetaDataTypesList,
                { view:"resizer"},
                {
                    gravity:4,
                    rows:[
                        AuditActionDetails
                    ]
                }
            ],
            responsive:"auditorHomeInitial"
        };


    }else{
        cmpToRender={
            cols:[
                AuditorHomeViewLeftBar,
                {
                    gravity:4,
                    rows:[
                        Login
                    ]
                }
            ],
            responsive:"auditorHomeInitial"
        };
    }

    var layout = {
        type: "clean",
        id:'auditorHomeInitial',
        rows:[
            cmpToRender

        ]
    };

    return {
        type:"material",
        $ui:layout ,
        $oninit:function (  ) {
            //debugger;
            $('body').addClass('auditor_body_wrapper');

        }
    };

});
