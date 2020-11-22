/// <reference path="../node_modules/njs-types/ngx_http_js_module.d.ts" />

function handler(request: NginxHTTPRequest) {
  const client_id          = request.variables['oidc_client_id'];
  const client_secret      = request.variables['oidc_client_secret'];

  request.error("OIDC handler called: " + request.uri);

  if (request.args.code) {
    var token_request_body = "grant_type=authorization_code"
      + "&code=" + request.args.code
      + "&client_id=" + client_id
      + "&client_secret=" + client_secret
      + "&redirect_uri=http://localhost:8080/oidc"

    request
      .subrequest("/oidc/token", {
        method: "POST",
        body: token_request_body
      })
      .then(tokens_response => {
        request.error("tokens response: " + JSON.stringify(tokens_response));
        return JSON.parse(tokens_response.responseBody ?? "{}");
      })
      .then(tokens => {
          const id_token = tokens['id_token'];
          if (!id_token) {
              throw new Error("id_token is not available");
          }
          request.return(200, id_token);
      })
      .catch(reason => request.return(500, reason));
  } else {
    request.return(401, request.uri);
  }  
}

function initiate(request: NginxHTTPRequest) {
  request.error("OIDC initiate called: " + request.uri);
    
  const client_id          = request.variables['oidc_client_id'];
  const authorize_endpoint = request.variables['oidc_auth_endpoint'];

  request.return(302,
    // source from configuration
    authorize_endpoint
    + "?client_id=" + client_id
    + "&redirect_uri=http://localhost:8080/oidc"
    + "&scope=openid"

    // use authorization_code grant type
    + "&response_type=code"

    // generate from request context - deep link
    + "&state=1234"
    + "&nonce=generate-me");
}

export default { handler, initiate }

