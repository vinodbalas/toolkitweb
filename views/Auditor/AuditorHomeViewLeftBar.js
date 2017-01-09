/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
],function(app){

    var layout = {rows:[
        {template:'<div class="auditor-toolkit-title">AUDITOR</div>', height:50},
        {template:'<div class="auditor-toolkit-desc">Description of Auditor</div>'}
    ]};

    return {
        $ui:layout
    };

});
