/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
],function(app){

/*
    header:'<div class="carter-toolkit-title">CARTER</div>',
        css:'carter-toolkit-name',*/

    var layout = {rows:[
        {template:'<div class="carter-toolkit-title">CARTER</div>', height:50},
        {template:'<div class="carter-toolkit-desc">Description of Carter</div>'}
    ]};

    return {

        $ui:layout
    };

});
