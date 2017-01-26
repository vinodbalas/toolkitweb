define([
	'app',
	'models/CarterRetrieveValidateDeployProcess',
	'models/RetrieveStepHelper',
	'models/StepPreConditionHelper',
    'models/AppSharedState'
],function(app,CarterRetrieveValidateDeployProcess,RetrieveStepHelper,StepPreConditionHelper,AppSharedState){



	var carterStepClickHandler=function ( prefix ,e,id, trg)
    {

        var currentNumericIndex=parseInt(prefix.substr(4));
        if(currentNumericIndex===0 || currentNumericIndex===1){
            currentNumericIndex=1;
        }

    	var preConditionRes=StepPreConditionHelper.commonStepPreConditionHelper();
    	if(!preConditionRes && currentNumericIndex!=1){

            webix.alert({
                type:"alert-error",
                title:"Step Pre Condition",
                ok:"OK",
                text: 'Please Select minimum of 1 component'
            });

    		return;
		}

		if(currentNumericIndex===4){
    	    /*if(!AppSharedState.getProcessStatusFieldValue('retrieve','processStatus')){

                webix.alert({
                    type:"alert-error",
                    title:"Retrieve Step :Pre Condition",
                    ok:"OK",
                    text: 'Please Complete Retrieve Step to continue logging in to target'
                });

    		return;

            }*/
		}

        var prevIndex=$$('carterLoggedInUserWorkFlowViews').config.activeStepIndex;

        if(prefix){
            $("#"+prefix).addClass('active');
        }






        if(prevIndex > currentNumericIndex){

            for(var i=(currentNumericIndex+1);i<=prevIndex;i++){
                $("#step"+i).removeClass('active');
            }
        }

        if (prefix==="step1"){
            //webix.html.addCss(trg, "active");
            $$('objectSelectionView').show();
        } else if(prefix==="step2") {
            //if(count of user selected ret)
            //webix.html.addCss(trg, "active");
            $$('objectSelectionPreView').show();
        }else if(prefix==="step3") {
            //if(count of user selected ret)
            $$('retrieveFromSourceView').show();


           // CarterRetrieveValidateDeployProcess.doRetrieve(RetrieveStepHelper.retrieveFinalCall,RetrieveStepHelper.retrieveProgressCall);
            //TODO Promise API
			/*CarterRetrieveValidateDeployProcess.doRetrieve( function ( finalData ) {

			 CarterRetrieveValidateDeployProcess.doDeploy( function ( finalData ) {

			 } )
			 } );*/

            //retrieveFromSourceView



        }else if(prefix==="step4"){
            AppSharedState.loadLoginState('TARGET_LOGIN');
            ///if(count of user selected ret)
            $$('carterLoggedInUserWorkFlowViews').config.confirmAlreadyLoggedInTarget(function ( result ) {


                if(result){
                    app.callEvent('CARTER_STEP_CLICKED', ["step5",null,null, null]);
                    //$$('loginToTargetOrgView').show()
                }else{
                    //app.callEvent('CARTER_STEP_CLICKED', ["step4",null,null, null]);
                    $("#step4").addClass('active');
                    $$('loginToTargetOrgView').show()
                }
            });
            //$$('loginToTargetOrgView').show();
        }else if(prefix==="step5"){
            $$('validateAndDeployToTargetView').show();
        }

        $$('carterLoggedInUserWorkFlowViews').config.activeStepIndex=currentNumericIndex;

    }
	function initWorkFlowProcess(){

		app.on('CARTER_STEP_CLICKED',carterStepClickHandler);

	}

    initWorkFlowProcess();

	return {

	};
});