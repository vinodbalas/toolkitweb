/**
 * Created by prakash on 12/25/16.
 */

define([
    'app',
    "models/AppSharedState"
],function(app,AppSharedState){



    var toolkitsList=[
        {id:'CarterNotLoggedInView', toolkitPageBodyCss:'carter_page_wrapper', loggedInView:'CarterLoggedInView', name: "CARTER"},
        {id:'Auditor', toolkitPageBodyCss:'auditor_body_wrapper',name: "AUDITOR", },
        {id:'Analyser', toolkitPageBodyCss:'analyser_body_wrapper',name: "ANALYSER", },
        {id:'Documenter', toolkitPageBodyCss:'documenter_body_wrapper',name: "DOCUMENTER", }
    ];

    function createToolkitItem(toolKitInfo){

        var toolkitConfig=JSON.stringify(toolKitInfo);
        return {
            minWidth:200, height:300,
            css:'toolkit_item',
            rows:[{
                onClick:{
                    'toolkit_item_wrapper':function(e, id, trg){

                        var toolkitToLaunch=trg.id;
                        var currentToolkit=toolkitsList.filter(function ( item ) {
                            if(item.id===toolkitToLaunch){
                                return true;
                            }
                        });

                        if(currentToolkit.length>0) {
                            $( 'body' ).addClass( currentToolkit[0].toolkitPageBodyCss )
                        }

                        AppSharedState.loadLoginState('SOURCE_LOGIN');
                        AppSharedState.loadLoginState('TARGET_LOGIN');

                        if(toolkitToLaunch==="CarterNotLoggedInView"){

                            var loggedIn=AppSharedState.isLoggedIn('SOURCE_LOGIN');
                            if(loggedIn){
                                toolkitToLaunch="CarterLoggedInView";
                            }

                        }
                        // Bad hack, discuss with Prakash
                        if(toolkitToLaunch == 'Auditor'){
                            toolkitToLaunch = toolkitToLaunch + "/" + trg.id
                        }else if(toolkitToLaunch == 'Analyser'){
                            toolkitToLaunch = toolkitToLaunch + "/" + trg.id
                        }
                        app.show("forceput/"+toolkitToLaunch);
                    }
                },
                template:('<div id="'+toolKitInfo.id+'" class="toolkit_item_wrapper">' +
                '<div class="toolkit_item_img_wrapper">' +
                '<img class="toolkit_item_img" src="assets/images/design/white_circle.png" alt="'+toolKitInfo['name']+'">' +
                '<div class="toolkit_item_desc"  >' + toolKitInfo['name'] + '</div>' +
                '</div>' +
                '</div>')
            }]
        }
    };


var toolKitUiList=toolkitsList.map(function ( toolkitConfig ) {

    return createToolkitItem(toolkitConfig);

});

    var toolkits = {
        align:'center',
        css:'toolkit_item_container',
        view:"flexlayout",
        cols:toolKitUiList
    };

    //var toolkits=flex;


      /*  {
        height: 136,
        id:'toolkits-list',
        css: "tiles",
        template: function(data){
            var t = null;
            var items = data.items;
            var html = "<div class='flex_tmp'>";
            for(var i=0; i < items.length; i++){
                t = items[i];
                html += "<div id='"+t.id+"' class='item "+t.css+"'>";
                html += "<div class='webix_icon icon fa-"+ t.icon+"'></div>";
                html += "<div class='details'><div class='value'>"+t.value+"</div><div class='text'>"+t.text+"</div></div>";
                html += "</div>";
            }
            html += "</div>";
            return html;
        },
        data: {
            items:[
                {id:'CarterNotLoggedInView', loggedInView:'CarterLoggedInView', text: "CARTER", value: '', icon: "check-square-o", css: "orders CarterHomeView"},
                {id:'Auditor', text: "AUDITOR", value: '', icon: "user", css: "users"},
                {id:'Analyser', text: "ANALYSER", value: '', icon: "quote-right", css: "feedbacks"},
                {id:'Documenter', text: "DOCUMENTER", value: '', icon: "quote-right", css: "feedbacks"}
            ]
        },
        onClick:{
            'item':function(e, id, trg){
                var toolkitToLaunch=trg.id;
                if(toolkitToLaunch==="CarterNotLoggedInView"){

                   var loggedIn=AppSharedState.isLoggedIn('SOURCE_LOGIN');
                   if(loggedIn){
                       toolkitToLaunch="CarterLoggedInView";
                   }

                }
                // Bad hack, discuss with Prakash
                if(toolkitToLaunch == 'Auditor'){
                  toolkitToLaunch = toolkitToLaunch + "/" + trg.id
                }else if(toolkitToLaunch == 'Analyser'){
                  toolkitToLaunch = toolkitToLaunch + "/" + trg.id
                }
                app.show("/top/"+toolkitToLaunch);
            }
        }
    };*/



    return {
        type:"toolkits_list",
        $ui:toolkits
    }

});
