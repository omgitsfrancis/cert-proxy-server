# Client Cert Proxy Server
Simple node reverse proxy server that allows for client certificates to be attached. Intended use is client certificate authentication for Test Automation. 

## Setup

```
git clone https://github.com/omgitsfrancis/cert-proxy-server
cd cert-proxy-server
npm install
```

Generate SSL certs for localhost and place them in the certs\ folder - https://letsencrypt.org/docs/certificates-for-localhost/

Copy client certificate to the certs\ folder.

Create a `.env` file using `.env.example` as a template and place it in the projct's root folder:

```
TARGET_HOST={Host that proxy server should target - don't add https or forward slashes}
PROXY_PORT={Port of the proxy server to be served on - default 8000}
CLIENT_CERT={Client certificate file name (.pfx or .p12?) within certs\ folder}
CLIENT_CERT_PASSPHRASE={passphrase of the client certificate}
SSL_CERT={Localhost SSL Cert}
SSL_KEY={Localhost SSL Key}
```

Your folder structure should be like this:

```
cert-proxy-server
├── README.md
├── node_modules
├── certs
│   ├── PLACE_CERTS_HERE
│   ├── localhost.crt
│   ├── localhost.key
│   └── my_client_cert.pfx
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
└── server.js
```

## Run Proxy Server

```
node server.js
```

Nagivate to your reverse proxy server https://localhost:8000

NOTE: Make sure to use **https**
