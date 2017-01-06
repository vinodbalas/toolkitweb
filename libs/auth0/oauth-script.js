

var CALLBACK_URL='http://localhost:8080/toolkitweb/';
var CALLBACK_LANDING_URL="http://localhost:8080/toolkitweb/";

//var clientID='3MVG9Y6d_Btp4xp52EFScYV5XZBLyEnIssCD.1mqQxKYNQ_UXVCB45DXHHcJYYCnr9JHF2.H0aFSQ.KsVNVEF';
var clientID='3MVG9Y6d_Btp4xp52EFScYV5XZMS4ZqYm2b9UhmHrp6hBci2rJenYTDIgL_mZIUHwFJ9d73XC34M6Xw3YBye3';
//var ParentWindowToolkitRef=window.opener.Toolkit;

var SOURCE_LOGIN_STORE_KEY='SOURCE_LOGIN';
var TARGET_LOGIN_STORE_KEY='TARGET_LOGIN';

function sourceLogin(params)
{

    localStorage.setItem("SOURCE_LOGIN",JSON.stringify({appStateUrl:window.location.href,source_clicked:true}));



        var url="https://"+(params.orgTypeKey || "test")+'.salesforce.com/services/oauth2/authorize?client_id='+escape(clientID)+"&display=touch&scope=full&redirect_uri="+escape(CALLBACK_URL)+"&response_type=token"

            var windowSize = "width=" + window.innerWidth + ",height=" + window.innerHeight + ",scrollbars=no";
            window.open(url, "SOURCE_LOGIN", windowSize);

}

var sourceObj=JSON.parse(localStorage.getItem("SOURCE_LOGIN"));
if(sourceObj) {
    var sStatus = sourceObj.source_clicked;
    var sourceUrl = sourceObj.source_info;
    var curLoc = window.location.href;
    var appStateUrl=sourceObj.appStateUrl;
    //debugger;
    if ( !sourceUrl && sStatus && curLoc.indexOf( 'access_token=' ) !=1 ) {

        var oauthResponse = {};

        if (window.location.hash) {
            var message = window.location.hash.substr(1);
            var nvps = message.split('&');
            for (var nvp in nvps) {
                var parts = nvps[nvp].split('=');
                oauthResponse[parts[0]] = unescape(parts[1]);
            }

        }

        localStorage.setItem( "SOURCE_LOGIN" , JSON.stringify( { source_clicked:true ,appStateUrl:curLoc, source_info:oauthResponse,loggedInTime:new Date() } ) );



        window.opener.Toolkit.handleLoginResult("SOURCE_LOGIN");
        window.close();
        //window.location = appStateUrl;
    }
}



function targetLogin(params)
{

    localStorage.setItem("TARGET_LOGIN",JSON.stringify({appStateUrl:window.location.href,target_clicked:true}));

    var url="https://"+(params.orgTypeKey || "test")+'.salesforce.com/services/oauth2/authorize?client_id='+escape(clientID)+"&display=touch&scope=full&redirect_uri="+escape(CALLBACK_URL)+"&response_type=token"

    var windowSize = "width=" + window.innerWidth + ",height=" + window.innerHeight + ",scrollbars=no";
    window.open(url, "TARGET_LOGIN", windowSize);

    //window.open(url);
}

var tgtObj=JSON.parse(localStorage.getItem("TARGET_LOGIN"));
if(tgtObj) {
    var tgtStatus = tgtObj.target_clicked;
    var tgtSaveUrl = tgtObj.target_info;
    var tgtUrl = window.location.href;
    var appStateUrl=tgtObj.appStateUrl;

    if ( !tgtSaveUrl && tgtStatus && tgtUrl.indexOf( 'access_token=' ) !=-1 ) {

        var oauthResponse = {};

        if (window.location.hash) {
            var message = window.location.hash.substr(1);
            var nvps = message.split('&');
            for (var nvp in nvps) {
                var parts = nvps[nvp].split('=');
                oauthResponse[parts[0]] = unescape(parts[1]);
            }

        }

        localStorage.setItem("TARGET_LOGIN" , JSON.stringify( { target_clicked:true , appStateUrl:tgtUrl,source_info:oauthResponse,loggedInTime:new Date()  } ) );


        window.opener.Toolkit.handleLoginResult("TARGET_LOGIN");
        window.close();

    }
}