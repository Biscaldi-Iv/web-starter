const http = require('http');
const url = require('url');
const fs = require('fs');
const process = require('process');

const PORT = 3000;
const CHRSET = 'utf-8';
const DEFAULT = ['/', '/home', '/home.html', '/index', '/index.html'];
const LOCAL = process.cwd();

function InternalError(res, err) {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.write(err.message);
}

http.createServer(function (req, res) {
    let arrival = new Date().toISOString();
    let q = url.parse(req.url, true);
    console.log(`${arrival} \t METHOD=${req.method} \t REQUEST=${q.pathname}`);
    let log = { method: req.method, url: `${q.pathname}`, time: arrival };
    if (DEFAULT.indexOf(q.pathname) <= -1) {
        //404 NOT FOUND
        res.writeHead(404, { 'Content-Type': 'text/html' });
        fs.readFile(LOCAL + '/static/404.html', CHRSET,
            function (err, data) {
                if (err) {
                    InternalError(res, err);
                    res.end();
                }
                res.write(data);
                res.end();
            });
    }
    if (req.method != 'GET') {
        //405
        res.writeHead(405, { 'Content-Type': 'text/html' });
        fs.readFile(LOCAL + '/static/405.html', CHRSET,
            function (err, data) {
                if (err) {
                    InternalError(res, err);
                    res.end();
                }
                res.write(data);
                res.end();
            });

    }
    //200
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile(LOCAL + '/static/index.html', CHRSET,
        function (err, data) {
            if (err) {
                InternalError(res, err);
                res.end();
            }
            res.write(data);
            res.end();
        });

    //Write Log
    log.response = {
        code: res.statusCode,
        message: res.statusMessage,
    };
    let logger = `${JSON.stringify(log)}\r\n`;
    fs.appendFile(LOCAL + '/mycoolserver.log', logger,
        function (err) {
            if (err) {
                console.log(err.message);
            }
            console.log(`RESPONSE: ${logger}`);
        });

}).listen(PORT);