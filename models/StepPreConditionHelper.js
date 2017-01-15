define([],function(){

	var commonStepPreConditionHelper=function (  ) {

        var theGridToHaveValues=$$("userSelectionsForValidation");
        if(theGridToHaveValues.count()){
        	return true;
		}else{
            return false;
		}
    };


	return {
        commonStepPreConditionHelper:commonStepPreConditionHelper
	};
});