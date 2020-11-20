/// <reference path="../node_modules/njs-types/ngx_http_js_module.d.ts" />

function handler(request: NginxHTTPRequest) {
  request.error("OIDC handler called: " + request.uri);
  
  request.return(401, request.uri);
}

function initiate(request: NginxHTTPRequest) {
  request.error("OIDC initiate called: " + request.uri);

  request.return(302, "https://bbc.co.uk");
}

export default { handler, initiate }

