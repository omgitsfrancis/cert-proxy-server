/* Title:       Reverse Proxy with Client Cert Implementation *
 * Purpose:     Automated tests dealing with client certs     *
 * Created by:  Francis Enriquez                              */

const httpProxy = require("http-proxy");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PROXY_PORT || 8000;

let proxy = httpProxy.createProxyServer({
  target: {
    protocol: "https:",
    host: process.env.TARGET_HOST,
    port: 443,
    // pfx key should also accept p12 certs
    // https://www.npmjs.com/package/http-proxy#http---https-using-a-pkcs12-client-certificate
    pfx: fs.readFileSync(`./certs/${process.env.CLIENT_CERT}`),
    passphrase: process.env.CLIENT_CERT_PASSPHRASE,
  },
  secure: false,
  changeOrigin: true,
  // SSL certs generated for localhost is required
  // https://letsencrypt.org/docs/certificates-for-localhost/
  ssl: {
    cert: fs.readFileSync(`./certs/${process.env.SSL_CERT}`),
    key: fs.readFileSync(`./certs/${process.env.SSL_KEY}`),
  },
});

console.log(`Proxy Server listening on port ${PORT}`);

proxy.listen(PORT);
