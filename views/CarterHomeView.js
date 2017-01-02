/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "views/CarterHomeViewLeftBar",
    "views/CarterHomeSourceLogin",
    "views/MetaDataTypesList",
    "views/CarterUserObjectSelection"
],function(app,CarterHomeViewLeftBar,CarterHomeSourceLogin,MetaDataTypesList,CarterUserObjectSelection){


    var lsSourceLoginObj=localStorage.getItem('source_status');
    var objSourceLoginObj=JSON.parse(lsSourceLoginObj);
    //app.objSourceLoginObj=objSourceLoginObj;

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
                        CarterUserObjectSelection
                    ]
                }
            ],
            responsive:"carterHomeInitial"
        };

        var identityServiceUrl=objSourceLoginObj.source_info.id;
        var identityOrgId=identityServiceUrl.split("/id/")[1].split("/")[0];


        webix.proxy.indexdb.create(identityOrgId, {}, null, function (  ) {
            
        });
        

    }else{
        cmpToRender={
            cols:[
                CarterHomeViewLeftBar,
                /*{ view:"resizer"},*/
                {
                    gravity:4,
                    rows:[
                        CarterHomeSourceLogin
                    ]
                }
            ],
            responsive:"carterHomeInitial"
        };
    }


    var layout = {
        type: "clean",
        id:'carterHomeInitial',
        rows:[
            cmpToRender

        ]
    };

    return {
        type:"material",
        $ui:layout
    };

});
