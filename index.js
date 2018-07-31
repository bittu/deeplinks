var path = require('path')
var fs = require('fs')
var express = require('express')
var https = require('https')
var http = require('http')

// var certOptions = {
//   key: fs.readFileSync(path.resolve('server.key')),
//   cert: fs.readFileSync(path.resolve('server.crt'))
// }

var app = express()

app.get('/', (req, res) => {
	res.send(`<!doctype html>
			<html>
				<head>
					<link rel="alternate" href="android-app://com.test.bt/https/10.0.2.2/openapp.html" />
				</head>
				<body>
					<a href="/openapp.html">Click here</a>
					<a href="/openapp.html?hello">Click here for hello</a>
				</body>
			</html>`)
});

/* signed */
app.get('/.well-known/assetlinks.json', (req, res) => {
	res.json(`[{
				  "relation": ["delegate_permission/common.handle_all_urls"],
				  "target": {
				    "namespace": "android_app",
				    "package_name": "com.test.bt",
				    "sha256_cert_fingerprints":
				    ["FE:F4:6E:66:4C:61:FC:1D:4E:F7:F6:A7:65:38:EA:85:D0:81:F0:C0:6D:23:83:CC:2A:F6:4C:EE:BF:9C:3C:CE"]
				  }
				}]`)
})

/* debug */
/*app.get('/.well-known/assetlinks.json', (req, res) => {
	res.json(`[{
				  "relation": ["delegate_permission/common.handle_all_urls"],
				  "target": {
				    "namespace": "android_app",
				    "package_name": "com.test.bt",
				    "sha256_cert_fingerprints":
				    ["86:7C:7C:F6:94:C6:5A:BE:00:47:B9:FF:3A:0B:E5:88:B9:54:6D:BA:38:B7:C1:6F:73:0C:70:6E:00:BF:90:B2"]
				  }
				}]`)
})*/

app.get('/openapp.html', (req, res) => {
	res.send(`<!doctype html>
			<html>
				<head>
					<link rel="alternate" href="android-app://com.test.bt/https/10.0.2.2/openapp.html" />
				</head>
				<body>
					<h1>This page will redirect user to playstore</h1>
				</body>
			</html>`)
})

// var server = https.createServer(certOptions, app).listen(3000)
var server = http.createServer(app).listen(80);