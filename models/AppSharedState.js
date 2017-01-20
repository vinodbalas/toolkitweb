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
        settings:{
	        paging:{
	            size:15
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

	function  loadLoginState ( prefix ) {

        var loginStatus=webix.storage.local.get(prefix);
        if(loginStatus && loginStatus.source_info && loginStatus.source_info.id) {
            var sourceLoginDetails = loginStatus.source_info;
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
        loadLoginState:loadLoginState,
        isLoggedIn:function ( prefix ) {
            var me=this;
            var returnValue = false;
            var loginStatus = me.STATE[prefix];
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