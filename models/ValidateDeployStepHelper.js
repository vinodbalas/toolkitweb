define([
    'app',
    "models/AppSharedState"
],function(app,AppSharedState){

    var progressPercent=0;
    function validateOrDeployFinalCall ( finalStatus ,processType) {

        //progressPercent=100;

        var finalStatusValue=finalStatus.status;
        var completedSuccessFully=true;
        if(finalStatusValue==="Failed"){
            AppSharedState.setProcessStatusFieldValue(processType,'processStatus',false);
            completedSuccessFully=false;
            if(processType==="deploy") {
                app.callEvent( 'DO_DEPLOY_ERROR', [finalStatus]);
            }
        }else if(finalStatusValue==="Succeeded"){
            AppSharedState.setProcessStatusFieldValue(processType,'processStatus',true);
            completedSuccessFully=true;
            if(processType==="deploy") {
                app.callEvent( 'DO_DEPLOY_COMPLETE' ,[finalStatus]);
            }
        }
        AppSharedState.setProcessStatusFieldValue(processType,'processStatusId',finalStatus.id);


        if(!finalStatusValue)
        {
            finalStatusValue="Completed...";
        }
        finalStatusValue=finalStatusValue.toLowerCase();
        //{ statusValue:0 , statusText:'Initializing...' }
        var validateDeployProgressTemplate=$$('stepProgressTemplate');
        var dataTobeUpdated=[{statusValue:finalStatusValue==="failed"?0:100,statusText:("Deploy "+finalStatusValue), status:finalStatusValue,complete:completedSuccessFully?true:false}];
        validateDeployProgressTemplate.define("data",dataTobeUpdated);
        validateDeployProgressTemplate.refresh();

        var validateDeployProgressTextTemplate=$$('stepProgressTextTemplate');
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
            progressPercent=0;
        }

        progressStatus=progressStatus.toLowerCase();

//{ statusValue:0 , statusText:'Initializing...' }
        var validateDeployProgressTemplate=$$('stepProgressTemplate');
        var dataTobeUpdate=[{statusValue:progressPercent,statusText:("Deploy "+progressStatus), status:progressStatus,complete:false}];
        validateDeployProgressTemplate.define("data",dataTobeUpdate);

        var validateDeployProgressTextTemplate=$$('stepProgressTextTemplate');
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
            text: 'Validate Completed with :'+finalStatus.status+" Status",
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
        /*webix.alert({
            title:"Deploy",
            ok:"OK",
            text: 'Deploy Completed with :'+finalStatus.status+" Status",
            callback:function(){

            }
        });*/
        $$('carterHomeInitialLoggedInview').enable();


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