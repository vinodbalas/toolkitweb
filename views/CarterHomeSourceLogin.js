/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "views/OrgTypeLoginForm"
],function(app,OrgTypeLoginForm){




    var layout = {rows:[
        {template:'<div class="carter-source-login-header">Source Login</div>', height:50},
        OrgTypeLoginForm
        ]
    };

    return {

        $ui:layout
    };

});
