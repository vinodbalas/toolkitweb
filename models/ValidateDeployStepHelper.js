define([
    'app',
    "models/AppSharedState"
],function(app,AppSharedState){

    var progressPercent=0;
    function validateOrDeployFinalCall ( finalStatus ,processType) {

        //progressPercent=100;

        var finalStatusValue=finalStatus.status;
        if(finalStatusValue==="Failed"){
            AppSharedState.setProcessStatusFieldValue(processType,'processStatus',false);
        }else if(finalStatusValue==="Succeeded"){
            AppSharedState.setProcessStatusFieldValue(processType,'processStatus',true);
        }
        AppSharedState.setProcessStatusFieldValue(processType,'processStatusId',finalStatus.id);


        if(!finalStatusValue)
        {
            finalStatusValue="Completed...";
        }
        //{ statusValue:0 , statusText:'Initializing...' }
        var validateDeployProgressTemplate=$$('validateDeployProgressTemplate');
        var dataTobeUpdated=[{statusValue:'100',statusText:'Completed...',complete:true}];
        validateDeployProgressTemplate.define("data",dataTobeUpdated);
        validateDeployProgressTemplate.refresh();

        var validateDeployProgressTextTemplate=$$('validateDeployProgressTextTemplate');
        validateDeployProgressTextTemplate.define("data",dataTobeUpdated);
        validateDeployProgressTemplate.refresh();
        validateDeployProgressTextTemplate.refresh();

		/*  CarterRetrieveValidateDeployProcess.doDeploy( function ( finalData ) {

		 } ,
		 function ( statusData ) {
		 console.log("Progress:"+statusData)
		 });
		 */

        //TODO Update Buttons
        //Show hide Buttons for Retrieve.

		/*
		 console.log("Final Listener:"+finalStatus);
		 webix.html.setValue('retrieveStatusValue', finalStatus);
		 webix.html.removeCss('retrieveStatusValue',("p"+(progressPercent)-1));
		 webix.html.addCss('retrieveStatusValue',("p"+progressPercent));*/

    }
    function validateOrDeployProgressCall ( progressStatus ) {

        progressPercent++;
        //
        //progressPercentCss
        //retrieveStatusValue
        //webix.html.setValue('retrieveStatusValue', progressStatus);
        //webix.html.removeCss('retrieveStatusValue',("p"+(progressPercent)-1));
        //webix.html.addCss('retrieveStatusValue',("p"+progressPercent));

        if(!progressStatus)
        {
            progressStatus="Still Working...";
        }

        var statusKey=progressStatus.toLowerCase();
        if(statusKey=="queued"){
            progressPercent=25;
		}else if(statusKey=="pending"){
            progressPercent=45;
		}else if(statusKey=="inprogress"){
            progressPercent=75;
        }else if(statusKey=="succeeded"){
            progressPercent=100;
        }else if(statusKey=="failed"){
            progressPercent=100;
        }

//{ statusValue:0 , statusText:'Initializing...' }
        var validateDeployProgressTemplate=$$('validateDeployProgressTemplate');
        var dataTobeUpdate=[{statusValue:progressPercent,statusText:progressStatus,complete:false}];
        validateDeployProgressTemplate.define("data",dataTobeUpdate);

        var validateDeployProgressTextTemplate=$$('validateDeployProgressTextTemplate');
        validateDeployProgressTextTemplate.define("data",dataTobeUpdate);
        validateDeployProgressTemplate.refresh();
        validateDeployProgressTextTemplate.refresh();

        console.log("Progress Listener:"+progressStatus);
    }


    //AppSharedState.setProcessStatusFieldValue('retrieve','processStatus',false);

    function validateFinalCall ( finalStatus ) {
        webix.alert({
            title:"Validate",
            ok:"OK",
            text: 'Validate Completed Successfully',
            callback:function(){

                $$('carterHomeInitialLoggedInview').enable();
            }
        });

        validateOrDeployFinalCall(finalStatus,'validate');
    }
    function validateProgressCall (  progressStatus) {
        validateOrDeployProgressCall(progressStatus,'validate');
    }

    function deployFinalCall ( finalStatus ) {
        webix.alert({
            title:"Deploy",
            ok:"OK",
            text: 'Deploy Completed Successfully',
            callback:function(){
                $$('carterHomeInitialLoggedInview').enable();
            }
        });


        validateOrDeployFinalCall(finalStatus,'deploy');
    }
    function deployProgressCall (  progressStatus) {
        validateOrDeployProgressCall(progressStatus,'deploy');
    }

    return {
        validateFinalCall: validateFinalCall,
        validateProgressCall:validateProgressCall,
        deployFinalCall:deployFinalCall,
        deployProgressCall:deployProgressCall,
        canValidate:function (  ) {
            var retrieveStatus=AppSharedState.getProcessStatusFieldValue('retrieve','processStatus');
            if(retrieveStatus){
                return true;
            }
            return false;
        },
        canDeploy:function (  ) {
            var retrieveStatusOrValidateStatus=AppSharedState.getProcessStatusFieldValue('retrieve','processStatus');
            /*if(retrieveStatusOrValidateStatus){
                retrieveStatusOrValidateStatus=AppSharedState.getProcessStatusFieldValue('validate','processStatus');
            }*/
            if(retrieveStatusOrValidateStatus){
                return true;
            }
            return false;
        }
	};
});