define(['app',
    'models/AppSharedState',
    "models/UserInfoUtils"
],function(app,AppSharedState,UserInfoUtils){



	return {
        $ui:{subview:true,hidden:true},
	    $onevent:{

            LOGIN_STATUS_CHANGED:function ( prefix ) {

                //debugger;
                AppSharedState.loadLoginState('SOURCE_LOGIN');
                AppSharedState.loadLoginState('TARGET_LOGIN');

                var toolKitToLogin=webix.storage.local.get("TOOLKIT_TO_LOGIN");


                var currentToolKitInfo=AppSharedState.getCurrentToolKitInfo();
                if(toolKitToLogin===currentToolKitInfo.name)
                {
                    if ( prefix === "SOURCE_LOGIN" ) {
                        if ( currentToolKitInfo.loggedInView ) {
                            if(currentToolKitInfo.reloadOnLogin){
                                webix.storage.local.remove("TOOLKIT_TO_LOGIN");
                                // document.location.reload();
                            }else {
                                webix.storage.local.remove("TOOLKIT_TO_LOGIN");
                                //app.show( 'forceput/' + currentToolKitInfo.loggedInView );
                            }
                        }
                    }
                }

                app.callEvent( "GET_USER_INFO_FOR_LOGIN" ,[prefix]);

               // app.callEvent( "GET_USER_INFO_FOR_LOGIN" ,['TARGET_LOGIN']);


            },

        GET_USER_INFO_FOR_LOGIN:function(prefix){

                //disable few thinfs
            if ( prefix === "SOURCE_LOGIN" ) {
                UserInfoUtils.getSourceOrgUserInfo();
            }
            if ( prefix === "TARGET_LOGIN" ) {
                debugger;
                UserInfoUtils.getTargetOrgUserInfo();
            }
        },



        USER_INFO_SOURCE:function ( data ) {

            /*"{
             "success" : true,
             "message" : null,
             "data" : {
             "organizationName" : "BARCLAYS",
             "userEmail" : "sph.prakash@gmail.com",
             "userFullName" : "Prakash S",
             "userType" : "Standard"
             }
             }"*/
            if(data && data.data) {
                var info = data.data;
                $$('carterSourceLoggedInInfo').show();
                $( '#sourceOrganizationName' ).text( info.organizationName );
                $( '#sourceUserEmail' ).text( info.userEmail );
                $( '#sourceUserFullName' ).text( info.userFullName );
                $( '#sourceUserType' ).text( info.userType );

                app.callEvent('SOURCE_ORG_LOGIN_SUCCESS',[])

                /*$( '#lsourceOrganizationName' ).text( info.organizationName );
                $( '#lsourceUserEmail' ).text( info.userEmail );
                $( '#lsourceUserFullName' ).text( info.userFullName );
                $( '#lsourceUserType' ).text( info.userType );*/

            }else{

                app.callEvent('SOURCE_ORG_LOGIN_SUCCESS',[]);
                //app.callEvent('SOURCE_LOGOUT_SUCCESS',[]);
                //app.show("forceput/CarterNotLoggedInView");
            }



        },
        USER_INFO_TARGET:function ( data ) {

            if(data && data.data) {
                var info=data.data;
                $$('carterTargetLoggedInInfo').show();
                $( '#targetOrganizationName' ).text( info.organizationName );
                $( '#targetUserEmail' ).text( info.userEmail );
                $( '#targetUserFullName' ).text( info.userFullName );
                $( '#targetUserType' ).text( info.userType );

                app.callEvent('TARGET_ORG_LOGIN_SUCCESS',[]);

                $( '#ttargetOrganizationName' ).text( info.organizationName );
                $( '#ttargetUserEmail' ).text( info.userEmail );
                $( '#ttargetUserFullName' ).text( info.userFullName );
                $( '#ttargetUserType' ).text( info.userType );

            }else{
                app.callEvent('TARGET_LOGOUT_SUCCESS',[]);

            }

        }
	}
	};
});