/**
 * Created by prakash on 1/4/17.
 */
define([
    "app",
    "views/CarterHomeView",
    "views/MetaDataTypesList",
    "views/CarterUserObjectSelection",
    "models/AppSharedState"
],function(app,CarterHomeView,MetaDataTypesList,CarterUserObjectSelection,AppSharedState){

    var cmpToRender={
        id:'carterLoggedInview',
        type:'line',
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

    var layout = {
        type: "clean",
        id:'carterHomeInitialLoggedInview',
        rows:[
            cmpToRender

        ]
    };


    return {
        type:"material" ,
        $ui:layout
    }
});
