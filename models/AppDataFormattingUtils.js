define(["app"],function(app){


    var defaultDateFormatFn=webix.Date.dateToStr( "%m-%d-%y %H:%i:%s" );

    function filterCarterMetaDataTypeComponents(value, filter, obj){
        filter=filter?filter.toLowerCase():"";
        var name=obj.name?obj.name.toString().toLowerCase():"";
        var modBy=obj.modifiedBy?obj.modifiedBy.toLowerCase():"";
        var mOn=obj.modifiedOn?defaultDateFormatFn( new Date( obj.modifiedOn ) ) .toLowerCase():"";

        if (name.indexOf(filter) !== -1) return true;
        if (modBy.indexOf(filter)!=-1) return true;
        if (mOn.indexOf(filter)!=-1) return true;

        return false;
    }


    function carterDefaultColumnTemplate( obj ) {

        //return "<span style='color:green;'>"+obj.votes+"</span>";
        var defDateFormatFn=defaultDateFormatFn;

        var template="<div class='carter-source-grid-row-for-selection'> " +
            "<div class='carter-source-grid-row-obj-name'>" + (obj.name?obj.name:"" )+ "</div> " +
            "<div class='carter-grid-sub-info'>" +
            "<span class='carter-source-grid-row-obj-modby'>" + (obj.modifiedBy?obj.modifiedBy:"") + "</span> " +
            " <span class='carter-source-grid-row-obj-mod-date'>" + (obj.modifiedOn ? defDateFormatFn( new Date( obj.modifiedOn ) ):"") + "</span>" +
            "</div>" +
            "</div>";
        return template;
    }

	var returnObject={
	    defaultDateFormatFunction:defaultDateFormatFn,
        carterDefaultSearchComparator:filterCarterMetaDataTypeComponents,
        carterDefaultColumnTemplateFn:carterDefaultColumnTemplate
    };



    return returnObject

});