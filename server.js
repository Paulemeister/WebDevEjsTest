const http = require('http');
const fs = require('fs');
const url = require('url');
const marked = require("marked");
const path = require("path");
const qs = require("querystring");
const ejs = require("ejs");

//mysql = require("./mysql");
config = require("./config.js");

const paths = {
    "/": "/index.html",
    "/form": "/form.html",
    "/md": "/test.md"
}

const requestListener = function (request, response) {
    console.log(request.url);
    let url = new URL(request.url,"http://127.0.0.1:8080");
    let pathname = url.pathname;
    console.log("Requested:", pathname);
    console.log("Type: ", request.method)

    if (request.method == "GET") {

        if (pathname in paths) {
            pathname = paths[pathname];
        }
        //console.log(request);
        console.log("Serving:", pathname.substring(1))

        if (!fs.existsSync("./rendered/"+pathname.substring(1))){
            renderPage(pathname.substring(1));
        }
        fs.readFile("./rendered/"+pathname.substring(1), (error, data) => {
            if (error) {
                
                console.error(error);
                response.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
                response.write('404 - File Not Found :(');
                response.end();
            }
            else {
    
                response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });

                response.write(data.toString());
                
                console.log("Success");
            }
            response.end();
            
        })

    }
    else if (request.method == "POST") {
        //1
        request.on("data",function(data) {
            //4
            let result = qs.parse(data.toString());
            console.log(result);
        });
        //2
        request.on("end",function(){
            //5
            response.end();
        });
        //3

    }
    //never executes
}

function renderPage(pathname) {
    let html = "This Page is empty. Maybe it didn't render?";
    let name =pathname.split(".")[0];
    let ejspath = "./sites/"+name +".ejs";
    console.log("rendering ./sites/"+name +".ejs")
    try {
        let contents =fs.readFileSync(ejspath);
        html = ejs.render(contents.toString(),null,{filename: ejspath});//{views:["./"]});
    }
    catch (error) {
        console.error(error);
        return false;
    }

    fs.writeFile("./rendered/"+name+".html",html,(error)=>{
        if (error){
            console.error(error);
            return false;
        }
    });
    return true;
}

const server = http.createServer(requestListener);
server.listen(config.port);