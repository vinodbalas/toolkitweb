/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "views/OrgTypeLoginForm"
],function(app,OrgTypeLoginForm){




    var layout = {rows:[
        {template:"Source Login", height:50},
        OrgTypeLoginForm
        ]
    };

    return {

        $ui:layout
    };

});
