/// <reference path="../node_modules/njs-types/ngx_http_js_module.d.ts" />

function initiate(request: NginxHTTPRequest) {
  request.headersOut['Location'] = 'https://bbc.co.uk';
  request.return(302);
}

function auth_handler(request: NginxHTTPRequest) {
  request.return(401);
}

export default { initiate, auth_handler }

