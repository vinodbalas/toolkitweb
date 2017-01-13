define(["app"],function(app){


    var defaultDateFormatFn=webix.Date.dateToStr( "%m/%d/%y" );//"%m-%d-%y %H:%i:%s"
    //AppDataFormattingUtils.carterDefaultSearchComparator

    function filterCarterMetaDataTypeComponents(filter, obj){
        filter=filter?filter.toLowerCase():"";
        var name=obj.name?obj.name.toString().toLowerCase():"";
        var modBy=obj.modifiedBy?obj.modifiedBy.toLowerCase():"";
        var mOn=obj.modifiedOn?defaultDateFormatFn( new Date( obj.modifiedOn ) ) .toLowerCase():"";

        if (name.indexOf(filter) !== -1) return true;
        if (modBy.indexOf(filter)!=-1) return true;
        if (mOn.indexOf(filter)!=-1) return true;

        return false;
    }

    function filterByDateRange(startDate, endDate, obj){

        var objModifiedOn=moment(obj.modifiedOn)//.getDate();
        if(!objModifiedOn.isValid()){

            return false;

        }else if(!startDate && !endDate)
        {
            return false

        }else{
            //var objDate=new Date( objModifiedOn );
            //var mObjDate=moment(objDate);
            objModifiedOn=moment(obj.modifiedOn).startOf('day');
            var mStartDate=moment(startDate).startOf('day');
            var mEndDate=moment(endDate).endOf('day');

            if(objModifiedOn.isSameOrAfter(mStartDate) && objModifiedOn.isSameOrBefore(mEndDate)){
                return true;
            }

        }
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
        carterDefaultColumnTemplateFn:carterDefaultColumnTemplate,
        filterByDateRange:filterByDateRange,
    };



    return returnObject

});