/**
 * Created by prakash on 1/4/17.
 */
define([
    "app",
    "views/CarterHomeView",
    "views/MetaDataTypesList",
    "views/CarterUserObjectSelection"
],function(app,CarterHomeView,MetaDataTypesList,CarterUserObjectSelection){

    var cmpToRender={


        type:'plain',
        rows:[{
            id:'carterLoggedInview',
            type:'plain',
            css:'carter_logged_in_container carter_app_wrapper',
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
    },
            {height:2}]
    };

    $('body').addClass('carter_page_wrapper');

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
