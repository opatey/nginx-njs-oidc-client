/// <reference path="../node_modules/njs-types/ngx_http_js_module.d.ts" />

function handler(request: NginxHTTPRequest) {
  request.error("OIDC handler called: " + request.uri);

  if (request.uri.indexOf("code=") > 0) {
    // exchange with IDP, set session and redirect
  } else {
    request.return(401, request.uri);
  }  
}

function initiate(request: NginxHTTPRequest) {
  request.error("OIDC initiate called: " + request.uri);

  request.return(302,
    // source from configuration
    "https://login.microsoftonline.com/94db9e7d-6399-47cb-87ba-f83853e100d0/oauth2/v2.0/authorize"
    + "?client_id=b40f9fdf-73b8-4480-9723-6bc01c2e6449"
    + "&redirect_uri=http://localhost:8080/oidc"
    + "&scope=openid"

    // use authorization_code grant type
    + "&response_type=code"

    // generate from request context - deep link
    + "&state=1234"
    + "&nonce=generate-me");
}

export default { handler, initiate }

