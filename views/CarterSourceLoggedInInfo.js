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
                        alert( 1 );
                        $$( 'sourceNotLoggedInInfoViewSingInForm' ).show();
                    }
                }
            },
            {
                view:"scrollview" ,
                id:'carterSourceLoggedInInfo' ,
                scroll:"y" ,
                body:{
                    borderless:true ,

                    view:"datalayout" ,
                    data:[

                    ] ,
                    id:'carterSourceLoggedInInfoListContainer',
                    rows:[
                        {
                            borderless:true ,
                            name:"$value",
                            height:150,
                            css:'carter_source_logged_in_view' ,
                            template:("<div class='source_logged_in_display_wrapper' style=''>" +
                            "<div class='source_logged_in_display_container'>" +
                            "<div class='source_logged_in_info_field source_user_full_name' id='lsourceUserFullName'>#userFullName#</div>" +
                            "<div class='source_logged_in_info_field source_email' id='lsourceUserEmail'>#userEmail#</div>" +
                            "<div class='source_logged_in_info_field source_user_type' id='lsourceUserType'>#userType#</div>" +
                            "<div class='source_logged_in_info_field source_org_name' id='lsourceOrganizationName'>#organizationName#</div>" +
                            "</div>" +
                            "</div>") ,
                            onClick:{
                                'source_logout_login_form':function () {
                                    app.callEvent( 'SOURCE_LOGOUT_CLICKED' , [] );
                                }
                            }
                        }
                    ]
                }
            }
        ]
    };
    return { $ui:layout };
} );
