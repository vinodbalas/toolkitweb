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
             completedSuccessFully=false;
        }else if(finalStatusValue==="Succeeded"){
            AppSharedState.setProcessStatusFieldValue('retrieve','processStatus',true);
             completedSuccessFully=true;
           // AppSharedState.retrieveAsyncProcessStatus=true;
        }

        AppSharedState.setProcessStatusFieldValue('retrieve','processStatusId',finalStatus.id);

        if(!finalStatusValue)
        {
            finalStatusValue="Completed...";
        }
        var retrieveProgressTemplate=$$('retrieveProgressTemplate');
        var dataTobeUpdated=[{retrieveStatusValue:completedSuccessFully?'100':0,retrieveStatusText:finalStatusValue,complete:completedSuccessFully?true:false}];
        retrieveProgressTemplate.define("data",dataTobeUpdated);
        retrieveProgressTemplate.refresh();

        var retrieveProgressTextTemplate=$$('retrieveProgressTextTemplate');
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


        var retrieveProgressTemplate=$$('retrieveProgressTemplate');
        var dataTobeUpdate=[{retrieveStatusValue:progressPercent,retrieveStatusText:progressStatus,complete:false}];
        retrieveProgressTemplate.define("data",dataTobeUpdate);

        var retrieveProgressTextTemplate=$$('retrieveProgressTextTemplate');
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