/**
 * Created by Prakash on 12/25/16.
 */
define([
    "app",
    "views/Auditor/AuditorHomeViewLeftBar",
    "views/Auditor/Login",
    "views/Auditor/MetaDataTypesList",
    "views/Auditor/AuditActionDetails"
],function(app,AuditorHomeViewLeftBar, Login, MetaDataTypesList, AuditActionDetails){
    var lsSourceLoginObj=localStorage.getItem('SOURCE_LOGIN');
    var objSourceLoginObj=JSON.parse(lsSourceLoginObj);
    var access_token=(objSourceLoginObj&& objSourceLoginObj.source_info && objSourceLoginObj.source_info.access_token)?objSourceLoginObj.source_info['access_token']:null;
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

        var identityServiceUrl=objSourceLoginObj.source_info.id;
        var identityOrgId=identityServiceUrl.split("/id/")[1].split("/")[0];

        webix.proxy.indexdb.create(identityOrgId, {}, null, function (  ) {
          //Check with SPH if this is required.
        });
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
        $ui:layout
    };

});
