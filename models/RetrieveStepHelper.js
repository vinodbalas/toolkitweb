define([
    'app',
    "models/AppSharedState"
],function(app,AppSharedState){

    var progressPercent=0;
    function retrieveFinalCall ( finalStatus ) {

        //progressPercent=100;
        var finalStatusValue=finalStatus.status;
        var completedSuccessFully=true;
        if(finalStatusValue==="Failed"){
            //AppSharedState.retrieveAsyncProcessId=null;
            //AppSharedState.retrieveAsyncProcessStatus=false;
            AppSharedState.setProcessStatusFieldValue('retrieve','processStatus',false);
            app.callEvent('DO_RETRIEVE_ERROR');
             completedSuccessFully=false;
        }else if(finalStatusValue==="Succeeded"){
            AppSharedState.setProcessStatusFieldValue('retrieve','processStatus',true);
             completedSuccessFully=true;
            app.callEvent('DO_RETRIEVE_COMPLETE');
           // AppSharedState.retrieveAsyncProcessStatus=true;
        }

        AppSharedState.setProcessStatusFieldValue('retrieve','processStatusId',finalStatus.id);

        if(!finalStatusValue)
        {
            finalStatusValue="Completed...";
        }
        finalStatusValue=finalStatusValue.toLowerCase();
        var retrieveProgressTemplate=$$('stepProgressTemplate');
        var dataTobeUpdated=[{statusValue:completedSuccessFully?'100':0,statusText:("Retrieve "+finalStatusValue), status:finalStatusValue, complete:completedSuccessFully?true:false}];
        retrieveProgressTemplate.define("data",dataTobeUpdated);
        retrieveProgressTemplate.refresh();

        var retrieveProgressTextTemplate=$$('stepProgressTextTemplate');
        retrieveProgressTextTemplate.define("data",dataTobeUpdated);
        retrieveProgressTemplate.refresh();
        retrieveProgressTextTemplate.refresh();

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
    function retrieveProgressCall ( progressStatus ) {

        progressPercent++;
        //progressPercentCss
        //retrieveStatusValue
        //webix.html.setValue('retrieveStatusValue', progressStatus);
        //webix.html.removeCss('retrieveStatusValue',("p"+(progressPercent)-1));
        //webix.html.addCss('retrieveStatusValue',("p"+progressPercent));

        if(!progressStatus)
        {
            progressStatus="Still Working...";
        }
        //AppSharedState.retrieveAsyncProcessStatus=false;

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

        progressStatus=progressStatus.toLowerCase();
        var retrieveProgressTemplate=$$('stepProgressTemplate');
        var dataTobeUpdate=[{statusValue:progressPercent,statusText:("Retrieve "+progressStatus), status:progressStatus,complete:false}];
        retrieveProgressTemplate.define("data",dataTobeUpdate);

        var retrieveProgressTextTemplate=$$('stepProgressTextTemplate');
        retrieveProgressTextTemplate.define("data",dataTobeUpdate);
        retrieveProgressTemplate.refresh();
        retrieveProgressTextTemplate.refresh();

        console.log("Progress Listener:"+progressStatus);
    }


    return {
        retrieveFinalCall: retrieveFinalCall,
        retrieveProgressCall:retrieveProgressCall
	};
});