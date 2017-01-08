/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "models/AppSharedState"
],function(app,AppSharedState){




    var layout = {
        type: "clean",
        $subview:true

    };

    return {
        type:"material",
        $ui:layout

    };

});
