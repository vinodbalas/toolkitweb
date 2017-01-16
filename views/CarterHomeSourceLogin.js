/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "views/OrgTypeLoginForm"
],function(app,OrgTypeLoginForm){




    var layout = {
        type:'plain',
        css:'carter_not_logged_in_center_container',
        borderless:true,
        rows:[
        {type:'plain',template:'<div class="carter-source-login-header">Source Login</div>',
            height: 46,
            css:'carter_app_toolbar'},
        OrgTypeLoginForm
        ]
    };

    return {

        $ui:layout
    };

});
