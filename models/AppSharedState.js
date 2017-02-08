define(["app"],function(app){

	var state={
	    SOURCE_LOGIN:{},
	    TARGET_LOGIN:{},

        retrieveAsyncProcessId:null,
        retrieveStatusAsyncProcessId:null,
        retrieveAsyncProcessStatus:false,

        validateAsyncProcessId:null,
        validateStatusAsyncProcessId:null,
        validateAsyncProcessStatus:false,

        deployAsyncProcessId:null,
        deployStatusAsyncProcessId:null,
        deployAsyncProcessStatus:false,

        currentToolkitInfo:null,
        processStatusInfo:{

	        retrieve:{
	            processId:null,
                processStatusId:null,
                processStatus:false
            },
            validate:{
                processId:null,
                processStatusId:null,
                processStatus:false
            },
            deploy:{
                processId:null,
                processStatusId:null,
                processStatus:false
            }

        },
        userSelection: new webix.DataCollection({ data:[] ,
        on:{
            onAfterAdd:function ( id, index ) {

                //app.call
                this.sort('name','asc');
                app.callEvent('CARTER_USER_SELECTION_CHANGED', [id, index]);
                console.log("Selection Added");
            },
            onAfterDelete:function ( id ) {

                var deletedItem=this.getItem(id);
               // app.callEvent('CARTER_USER_SELECTION_CHANGED', [id,deletedItem]);
                app.callEvent('CARTER_USER_SELECTION_REMOVED', [id,deletedItem]);
                console.log("Selection Removed");
            }
        }
        })

    };

    function getCurrentLoginItem ( keyItem ) {

        var values = {},
            keys = Object.keys(localStorage),
            i = keys.length;

        while ( i-- ) {
            var key=keys[i];
            var item=JSON.parse(localStorage.getItem(key));


            if(item.prefix===keyItem) {
                values[item.loggedInTime]=item;
            }
        }

        var returnKeys=Object.keys(values);
        if(returnKeys) {
            return values[returnKeys[0]];
        }else{
            return null;
        }




    }

    function getOrgLoggedInUserItems ( orgType ) {

        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while ( i-- ) {
            var key=keys[i];
            if(key.indexOf(orgType+"_"+"USER_INFO_")!=-1) {
                var item = JSON.parse( localStorage.getItem( key ) );
                values.push(item);
            }
        }

        return values;



    }



	function  loadLoginState ( prefix ) {

        var loginStatus=null;
        var typeKey=null;
        if(prefix==="SOURCE_LOGIN"){

            loginStatus=getCurrentLoginItem('SOURCE');
            typeKey='source_info';

        }else if(prefix==="TARGET_LOGIN"){

            debugger;
            loginStatus=getCurrentLoginItem('TARGET');
            typeKey='target_info';
        }

	    //TODO
        if(loginStatus && loginStatus[typeKey] && loginStatus[typeKey].id) {
            var sourceLoginDetails = loginStatus[typeKey];
            var identityServiceUrl = sourceLoginDetails.id;
            var identityOrgId = identityServiceUrl.split( "/id/" )[1].split( "/" )[0];
            var sessionId = sourceLoginDetails["access_token"];
            var instanceUrl = sourceLoginDetails["instance_url"];

            state[prefix]={
                identityOrgId:identityOrgId,
                sessionId:sessionId,
                instanceUrl:instanceUrl
            }
        }
    }

    //init state
    loadLoginState('SOURCE_LOGIN');
    loadLoginState('TARGET_LOGIN');



    return {
        STATE:state ,
        getOrgLoggedInUserItems:getOrgLoggedInUserItems,
        loadLoginState:loadLoginState,
        isLoggedIn:function ( prefix ) {
            var me=this;
            var returnValue = false;
            var loginStatus = me.STATE[prefix];
            if(!loginStatus && !loginStatus.identityOrgId)//If exisiting
            {
                loadLoginState(prefix);//RELOAD and Check
            }
            loginStatus = me.STATE[prefix];
            if ( loginStatus && loginStatus.identityOrgId ) {
                returnValue = true;
            }
            return returnValue;
        },
        getOrgLogInInfo:function ( prefix ) {
            var me=this;
            if(!prefix){
                prefix="SOURCE_LOGIN";
            }

            var orgLoginInfo = me.STATE[prefix];
            return orgLoginInfo;
        },
        addOrRemoveUserSelection:function ( item ) {
            var isExistAlready=state.userSelection.exists( item.id )
            if(!isExistAlready) {
                item.selectedByUser = true;
                item.status='';
                item.fileName='';
                item.problem='';
                item.problemType='';

                state.userSelection.add( item );
            }else{
                item.selectedByUser = false;
                this.removeUserSelection(item.id);
            }
        },
        removeUserSelection:function ( id ) {
            var isExistAlready=state.userSelection.exists(id )
            if(isExistAlready) {
                state.userSelection.remove( id );
            }
        },
        updateUserSelection:function ( id, objKeyValues ) {
            var isExistAlready=state.userSelection.exists( id )
            if(isExistAlready) {
                var item=state.userSelection.getItem(id);
                for(var key in objKeyValues){
                    item[key]=objKeyValues[key];
                }/*
                item.status=status;
                item.fileName='';
                item.problem='';
                item.problemType='';*/
            }
        },
        resetUserSelection:function (  ) {
            state.userSelection.clearAll();
        },
        getUserSelection:function (  ) {
            return state.userSelection;

        },
        setProcessStatusFieldValue:function ( processKey, field, value ) {

            this.STATE.processStatusInfo[processKey][field]=value;

        },
        isProcessCompleted:function ( processKey ,skipProcessIdCheck) {

            var processInfo=this.STATE.processStatusInfo[processKey];

            if((skipProcessIdCheck || processInfo.processId) && processInfo.processStatus){
                return true;
            }else{
                return false;
            }
        },
        getProcessStatusFieldValue:function (processKey, field  ) {
            return this.STATE.processStatusInfo[processKey][field];
        },
        getSettingValue:function ( key ) {

            return this.STATE.settings[key] || { };
        },
        setCurrentToolKitInfo:function ( tookitInfo ) {
            this.STATE.currentToolkitInfo=tookitInfo;
        },
        getCurrentToolKitInfo:function (  ) {
            return this.STATE.currentToolkitInfo;
        }
    }

});