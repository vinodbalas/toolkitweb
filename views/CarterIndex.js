/**
 * Created by prakash on 1/4/17.
 */
define([
    "app"
],function(app,AppSharedState,AppEventHandlers){

    var layout = {
        type: "clean",
        id:'carterHomeInitial',
        rows:[
            { $subview:true}

        ]
    };

    return {$ui:layout};
});
