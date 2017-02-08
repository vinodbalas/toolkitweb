/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "views/SourceLoginForm",
    "views/TargetOrgLoginForm",
    "models/AppSharedState",
    "models/UserInfoUtils"
],function(app,SourceLoginForm,TargetOrgLoginForm,AppSharedState,UserInfoUtils){




    var layout = {
        type:'plain',
        css:'carter_not_logged_in_center_container',
        borderless:true,
        rows:[
            {
                // view:"toolbar",
                hidden:false,
                height:100,
                id:"carterSfdcLoginBottomToolbar",
                cols:[
                    {
                        borderless:true,
                        css:'personalization_block',
                        template:('<div class="personalization_block_links">' +
                        '<span class="personalization_prompt_text">for a personalized experience and more features, please sign-up with</span>' +
                        '<a  class="singn_up_type linkedin_link" id="linkedin" href="javascript:void(0);"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>' +
                        '<a class="singn_up_type facebok_link" id="facebook" href="javascript:void(0);"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>' +
                        '<a  class="singn_up_type google_link"id="google" href="javascript:void(0);"><i class="fa fa-google-plus" aria-hidden="true"></i></a>'+
                        '<span class="signup_or_text">or</span><a id="register" class="singn_up_type register_link" href="javascript:void(0);">register for a new account</i></a>'+
                        '<span class="signup_separator">|</span><a id="register" class="singn_up_type register_link" href="javascript:void(0);">login</i></a>'+
                        '</div>')
                    }
                ]
            },
        {type:'plain',template:'<div class="carter-source-login-header">Source and Target Login</div>',
            height: 48,
            borderless:true,
            css:'carter_app_toolbar'
        },
            {
                cols:[SourceLoginForm,
                    { template:'<div class="divider_line"></div>', width:'1',css:'divider_line_cmp'} ,
                TargetOrgLoginForm,
                ]
            },
            {
                height:60,
                id:'loginTermsContinue',
                css:'login_terms_continue carter_disabled',
                disabled:true,
                cols:[
                    {},

                {
                    view:"checkbox",
                    id:'termsCheckbox',
                    css:'terms_continue_checkbox',
                    borderless:true,
                    value:0,
                    height:30,
                    width:25,
                    on:{
                        'onChange':function ( newv , oldv ) {

                            if(newv){

                                $('.app_continue_link').removeClass('carter_disabled');
                                $('.terms_continue_button_wrapper').removeClass('carter_disabled');
                                $$('continueButton').enable();
                            }else{
                                $('.app_continue_link').addClass('carter_disabled');
                                $('.terms_continue_button_wrapper').addClass('carter_disabled');
                                $$('continueButton').disable();
                            }
                        }
                    }
                    //continueButton

                },
                {
                    height:30,
                    borderless:true,
                    css:'terms_continue_text_wrapper carter_disabled',
                    template:"<span class='terms_continue_text'>i agree to the <a href='javascript:void(0);' class='terms_link'>terms</a> of usage.</span>",
                    onClick:{
                        'terms_link':function ( e , id , trg ) {
                            var id=trg.id;
                            if(id==="terms_link"){
                                //show terms in a window.
                            }
                        }
                    }
                },
                    {
                        height:30,
                        borderless:true,
                        id:'continueButton',
                        disabled:true,
                        css:'terms_continue_button_wrapper carter_disabled',
                        template:"<a class='app_continue_link' href='javascript:void(0);'><span >continue.</span></a>",
                        onClick:{
                            'app_continue_link':function ( e , id , trg ) {
                                debugger;
                                this.$scope.show('CarterLoggedInView');
                                  //  app.show('CarterLoggedInView');
                            }
                        }
                    },
                    {width:20}
            ]
            }



        ]
    };

    return {

        $ui:layout,
        $oninit:function(view, $scope) {

            webix.extend($$("carterSourceLoginMultiView"), webix.ProgressBar);
            webix.extend($$("carterTargetLoginMultiView"), webix.ProgressBar);

            if(AppSharedState.isLoggedIn("SOURCE_LOGIN")){
                app.callEvent( "GET_USER_INFO_FOR_LOGIN" ,['SOURCE_LOGIN']);
               // app.callEvent('SOURCE_ORG_LOGIN_SUCCESS',[])
            }
            if(AppSharedState.isLoggedIn("TARGET_LOGIN")){
                app.callEvent( "GET_USER_INFO_FOR_LOGIN" ,['TARGET_LOGIN']);
                //app.callEvent('TARGET_ORG_LOGIN_SUCCESS',[])
            }

        },
        $onevent:{

            SOURCE_TARGET_LOGIN_SUCCESS:function (  ) {

                $$('loginTermsContinue').enable();
                $('.login_terms_continue').removeClass('carter_disabled');

            },
            CHECK_BOTH_ORG_LOGIN_STATUS:function (  ) {

                if(AppSharedState.isLoggedIn('SOURCE_LOGIN') && AppSharedState.isLoggedIn('TARGET_LOGIN')){
                    app.callEvent('SOURCE_TARGET_LOGIN_SUCCESS',[]);
                }
            },

            SOURCE_LOGOUT_CLICKED:function (  ) {

                UserInfoUtils.sourceLogout();
            },
            SOURCE_LOGOUT_SUCCESS:function (  ) {
                $$('sourceNotLoggedInInfoViewSingInForm').show();
            },
            TARGET_LOGOUT_CLICKED:function (  ) {

                UserInfoUtils.targetLogout();
            },
            TARGET_LOGOUT_SUCCESS:function (  ) {

                $$('carterTargetOrgLoginForm').show();
            },
            TARGET_ORG_LOGIN_COMPLETE:function(){

                //$$('carterSfdcLoginBottomToolbar').show();
            },
            UPDATE_PROGRESS:function (status,viewId) {
                var tgtLoginView=$$(viewId);
                if(status==="progress"){

                    tgtLoginView.showProgress({icon:'circle-o-notch'});
                }
                else if(status==="failed"){

                    tgtLoginView.hideProgress();
                }
                else if(status==="success"){
                    tgtLoginView.hideProgress();
                }
            },
            USER_INFO_PROGRESS_SOURCE:function ( status ) {
                app.callEvent('UPDATE_PROGRESS',[status,'carterSourceLoginMultiView']);
            },
            USER_INFO_PROGRESS_TARGET:function ( status ) {
                app.callEvent('UPDATE_PROGRESS',[status,'carterTargetLoginMultiView']);
            },

            SOURCE_ORG_LOGIN_SUCCESS:function (  ) {
                //$$('sourceNotLoggedInInfoViewSingInForm').hide();

                //getOrgLoggedInUserItems
                var sourceList=AppSharedState.getOrgLoggedInUserItems('SOURCE');
                var cnt=$$('carterSourceLoggedInInfoListContainer');
                cnt.data.clearAll()
                cnt.define('data',{data:sourceList});
                cnt.refresh();
                //add(sourceList[0]);
                $$('sourceLoggedInInfoView').show();

                $$('carterTargetLoginMultiView').enable();
                $('.carter_target_login_multi_view').removeClass('carter_disabled');

                app.callEvent('CHECK_BOTH_ORG_LOGIN_STATUS',[]);

                //$$('sourceNotLoggedInInfoViewSingInBtn').hide();

            },
            TARGET_ORG_LOGIN_SUCCESS:function (  ) {

                //$$('sourceNotLoggedInInfoViewSingInForm').hide();

                var targetList=AppSharedState.getOrgLoggedInUserItems('TARGET');
                var cnt=$$('carterTargetLoggedInInfoListContainer');
               if(cnt.data) {cnt.data.clearAll();}
                cnt.define('data',{data:targetList});
                cnt.refresh();

                if($$('targetLoggedInInfoView')) {
                    $$( 'targetLoggedInInfoView' ).show();
                }

                app.callEvent('CHECK_BOTH_ORG_LOGIN_STATUS',[]);
                //app.callEvent('TARGET_ORG_LOGIN_COMPLETE',[])
                //$$('sourceNotLoggedInInfoViewSingInBtn').hide();

            }
        }
    };

});
