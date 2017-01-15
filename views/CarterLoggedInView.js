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
        css:'carter_logged_in_container carter_app_wrapper',
        type:'line',
        cols:[
            MetaDataTypesList,/*border: 1px solid #ffffff;*/
            { view:"resizer" , css:'carter_left_resizer'},
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
        css:'carter_logged_in_view carter_abstract_container',
        id:'carterHomeInitialLoggedInview',
        rows:[
            cmpToRender

        ]
    };


    return {
        type:"material" ,
        css:'carter_logged_in_view_top carter_abstract_container_top',
        $ui:layout
    }
});
