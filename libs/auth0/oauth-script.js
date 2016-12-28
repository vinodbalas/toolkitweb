

var CALLBACK_URL='http://localhost:8080/toolkitweb/';
var CALLBACK_LANDING_URL="http://localhost:8080/toolkitweb/";

//var clientID='3MVG9Y6d_Btp4xp52EFScYV5XZBLyEnIssCD.1mqQxKYNQ_UXVCB45DXHHcJYYCnr9JHF2.H0aFSQ.KsVNVEF';
var clientID='3MVG9Y6d_Btp4xp52EFScYV5XZMS4ZqYm2b9UhmHrp6hBci2rJenYTDIgL_mZIUHwFJ9d73XC34M6Xw3YBye3';

function sourceLogin(params)
{

    localStorage.setItem('source_status',JSON.stringify({appStateUrl:window.location.href,source_clicked:true}));
/*
    var auth0 = new Auth0( {
        popup:true ,
        domain:(params.orgTypeKey || "test")+'.salesforce.com/services/oauth2/',
        scope:'full' ,
         ,
        callbackURL: CALLBACK_URL,
        responseType:'token'
    } );
    auth0.login( {}  );*/


        var url="http://"+(params.orgTypeKey || "test")+'.salesforce.com/services/oauth2/authorize?client_id='+escape(clientID)+"&scope=full&redirect_uri="+escape(CALLBACK_URL)+"&response_type=token"

        window.location=url;

}

var sourceObj=JSON.parse(localStorage.getItem('source_status'));
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

        localStorage.setItem( 'source_status' , JSON.stringify( { source_clicked:true ,appStateUrl:curLoc, source_info:oauthResponse,loggedInTime:new Date() } ) );
        window.location = appStateUrl;
    }
}



function targetLogin(params)
{

    localStorage.setItem('target_status',JSON.stringify({appStateUrl:window.location.href,target_clicked:true}));

    var url="http://"+(params.orgTypeKey || "test")+'.salesforce.com/services/oauth2/authorize?client_id='+escape(clientID)+"&scope=full&redirect_uri="+escape(CALLBACK_URL)+"&response_type=token"

    window.location=url;
}

var tgtObj=JSON.parse(localStorage.getItem('target_status'));
if(tgtObj) {
    var tgtStatus = tgtObj.target_clicked;
    var tgtSaveUrl = tgtObj.target_info;
    var tgtUrl = window.location.href;
    var appStateUrl=tgtObj.appStateUrl;
    //debugger;
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

        localStorage.setItem( 'target_status' , JSON.stringify( { source_clicked:true , appStateUrl:tgtUrl,target_info:oauthResponse,loggedInTime:new Date()  } ) );
        window.location = appStateUrl || CALLBACK_LANDING_URL;
    }
}