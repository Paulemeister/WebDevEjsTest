const http = require('http');
const fs = require('fs');
const url = require('url');
const marked = require("marked");

mysql = require("./mysql");
config = require("./config.js");

const requestListener = function (request, response) {
    let pathname = url.parse(request.url).pathname;
    console.log("Requested:", pathname);
    console.log("Type: ", request.method)

    if (request.method == "GET") {

        if (pathname == "/") {
            pathname = "/index.html";
        } else if (pathname == "/form") {
            pathname = "/form.html"
        }
        //console.log(request);
        console.log("Serving:", pathname.substring(1))
        fs.readFile(pathname.substring(1), (error, data) => {
            if (error) {
                console.error(error);
                response.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
                response.write('404 - File Not Found :(');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
                response.write(data.toString());
                console.log("Success");
            }
            response.end();
        })
    }
    else if (request.method == "POST") {
        console.log(request);
    }
}

const server = http.createServer(requestListener);
server.listen(config.port);