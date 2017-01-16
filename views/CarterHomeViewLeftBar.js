/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
],function(app){


    var layout = {
        type:'plain',
        css:'carter_not_logged_in_left_container',
        width:'100%',
        rows:[
        {type:'plain',

            borderless:true,
            template:'<div class="carter-toolkit-title">CARTER</div>', height:48 ,css:'meta-data-type-header-not-logged-in'},
        {type:'plain',
            borderless:true,
            template:'<div class="carter-toolkit-desc">' +
            '“The bottom line is this: Peace will come to Israel and the Middle East only when the Israeli government is willing to compadmap for Peace, with ohes of a majotments--by accepting its legal borders. All Arab neighbors must pledge to honor Israel\'s right to global ae Israeli confiscation and colonization of Palestinian territories."</div>',css:'carter_not_logged_in_left_description_container'}
    ]};

    return {

        $ui:layout
    };

});
