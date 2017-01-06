/**
 * Created by prakash on 1/4/17.
 */
{
    view:'button' ,
        value:'Retrieve Selection',
    width:150 ,
    click:function () {


    debugger;
    // &deployRequest={"types":[{"members":["EVER_SetupAutoEntRulesWO"],"name":"ApexClass"}]}

    var objectsByType={};
    var gridData=$$('userSelectionsForValidation').data;
    gridData.each( function ( row ) {
        if ( !objectsByType[row.itemType] ) {
            objectsByType[row.itemType] = []
        }
        objectsByType[row.itemType].push( row.name )
    } );

    var paramsObj={types:[

    ]};

    Object.keys(objectsByType).map(function ( key ) {
        var selectedType={members:objectsByType[key],name:key};
        paramsObj.types.push(selectedType);
    });


    var loginStatus=webix.storage.local.get('source_status');
    var sourceLoginDetails ;
    var identityServiceUrl ;
    var identityOrgId ;
    var sessionId ;
    var instanceUrl ;

    if(loginStatus && loginStatus.source_info.id) {
        sourceLoginDetails = loginStatus.source_info;
        identityServiceUrl = sourceLoginDetails.id;
        identityOrgId = identityServiceUrl.split( "/id/" )[1].split( "/" )[0];
        sessionId = sourceLoginDetails.access_token;
        instanceUrl = sourceLoginDetails.instance_url;
    }


    var finalParams=JSON.stringify(paramsObj);
    //var requestParams=

    var retrieveUrl=app.config.getApiUrl('retrieve?sourceSession={"sessionId":"'+escape(sessionId)+'","instanceUrl":"'+escape(instanceUrl)+'","organizationId":"'+escape(identityOrgId)+'" }&deployRequest='+escape(finalParams));


    var promise = webix.ajax(retrieveUrl);
    promise.then(function(realdata){

        // debugger;
        /*{
         "done" : false,
         "id" : "09S90000003UTrmEAG",
         "message" : null,
         "state" : "Queued",
         "statusCode" : null
         }*/


        /* function doPoll() {
         $.post( 'ajax/test.html' )
         .done( function ( data ) {
         } )
         .always( function () {
         setTimeout( doPoll , 5000 );
         } );
         }*/

        //
        /*success*/
    });
    promise.fail(function(err){/*error*/});

    //  alert( 1 );
    //$$( 'objectSelectionPreView' ).show();
}
}