const http = require('http');
const fs = require('fs');
const path = require('path');

const CSS_FILE = path.join(__dirname, 'custom.css');
let clients = [];

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.url === '/events') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        res.write('data: connected\n\n');
        clients.push(res);
        req.on('close', () => { clients = clients.filter(c => c !== res); });

    } else if (req.url.startsWith('/custom.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(fs.readFileSync(CSS_FILE, 'utf8'));

    } else {
        res.writeHead(404);
        res.end();
    }
}).listen(8080, () => console.log('Serving on :8080'));

fs.watch(CSS_FILE, (event) => {
    if (event === 'change') {
        console.log('CSS changed — pushing reload');
        clients.forEach(c => c.write('data: reload\n\n'));
    }
});