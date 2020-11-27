# nginx-njs-oidc-client

## Getting started

Local prerequisites:
  * node.js
  * docker

### Build from source
`npm install` at repository root and then a one-shot build:
```
tsc
```

To watch `src/`, run:
```
npm run tsc:watch
```
which signals the local nginx container to reload its configuration on a successful build.

### Run NGINX with OIDC Configuration
Register an OIDC Relying Party with your favourite Identity Provider for `authorization_code` grant type and Redirect URI `http://localhost:8080/`.

Add a `.env` file to the root of the repo:
```
OIDC_TOKEN_ENDPOINT=
OIDC_AUTH_ENDPOINT=
OIDC_CLIENT_ID=
OIDC_CLIENT_SECRET=
```
with values from the Identity Provider and Relying Party configuration.

Run `docker-compose up` to start the local envir