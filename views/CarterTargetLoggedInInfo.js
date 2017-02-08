/**
 * Created by prakash on 1/4/17.
 */
define( [
    "app"
] , function ( app ) {
    var layout = {
            rows:[
                {
                    template:'<a href="javascript:void(0);" class="new_login_link" >New Login</a>',
                    height:25,
                    onClick:{
                        'new_login_link':function ( e , id , trg ) {
                            $$( 'carterTargetOrgLoginForm' ).show();
                        }
                    }
                },
        {
            view:"scrollview",
            id:'carterTargetLoggedInInfo' ,
            scroll:"y",
            body:{
                borderless:true,
                id:'carterTargetLoggedInInfoListContainer',
                view:"datalayout",
                data:[

                ],

                rows:[{
                    css:'carter_target_logged_in_view' ,
                    name:"$value",
                    height:100,
                    template:("<div class='target_logged_in_display_wrapper' style='height: 200px !important;'>" +

                    "<div class='target_logged_in_display_container'>" +
                    "<div class='target_logged_in_info_field target_user_full_name' id='ttargetUserFullName'>#organizationName#</div>" +
                    "<div class='target_logged_in_info_field target_email' id='ttargetUserEmail'>#userEmail#</div>" +
                    "<div class='target_logged_in_info_field target_user_type'  id='ttargetUserType'>#userFullName#</div>" +
                    "<div class='target_logged_in_info_field target_org_name' id='ttargetOrganizationName'>#userType#</div>" +
                    "</div>" +
                    "</div>"),
                    onClick:{
                        'target_logout_login_form':function (  ) {
                            app.callEvent('TARGET_LOGOUT_CLICKED',[]);

                        }
                    }
                }


                ]
            }
        }
    ]

    };


    /*$$('carterTargetLoggedInInfo').show();
    $( '#targetOrganizationName' ).text( info.organizationName );
    $( '#targetUserEmail' ).text( info.userEmail );
    $( '#targetUserFullName' ).text( info.userFullName );
    $( '#targetUserType' ).text( info.userType );*/
    return { $ui:layout };
} );
