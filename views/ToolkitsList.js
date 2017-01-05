/**
 * Created by prakash on 12/25/16.
 */

define([
    'app',
    "models/AppSharedState"
],function(app,AppSharedState){


    var toolkits={
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
                {id:'codocs', text: "CODOCS", value: '', icon: "user", css: "users"},
                {id:'analog', text: "ANALOG", value: '', icon: "quote-right", css: "feedbacks"}
            ]
        },
        onClick:{
            'item':function(e, id, trg){

                debugger;

                var toolkitToLaunch=trg.id;
                if(toolkitToLaunch==="CarterNotLoggedInView"){

                   var loggedIn=AppSharedState.isLoggedIn('SOURCE_LOGIN');
                   if(loggedIn){
                       toolkitToLaunch="CarterLoggedInView";
                   }

                }
                app.show("/top/"+toolkitToLaunch);
            }
        }
    };



    return {
        type:"material",
        $ui:toolkits
    }

});