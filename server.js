// ===================================
// `tail -f` in Node.js and WebSockets
// ===================================
//
// Usage:
// 
// git clone git://gist.github.com/718035.git tail.js
// cd tail.js
// git submodule update --init
//
// node server.js /path/to/your.log
//
// Connect with browser and watch changes in the logfile
//
//

var http     = require('http'),
    socketIo = require('socket.io'),
    fs       = require('fs'),
    auth     = require('http-auth'),
    basic    = auth.basic({
      realm: "Youdar EasyAccounting System.",
      file : __dirname + "/users.htpasswd" // gevorg:gpass, Sarah:testpass ...
    });


var spawn = require('child_process').spawn,
    port  = process.env.PORT || 8082;

var filename = process.argv[2];
if (!filename) return util.puts("Usage: node <server.js> <filename>");

// -- Node.js Server ----------------------------------------------------------

var server = http.createServer(basic, function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile(__dirname + '/index.html', function (err, data) {
    res.write(data, 'utf8');
    res.end();
  });
});
server.listen(port, '0.0.0.0');

// -- Setup Socket.IO ---------------------------------------------------------

var io = socketIo.listen(server);

io.on('connection', function (client) {
  console.log('Client connected');
  var tail = spawn("tail", ["-f", filename]);
  client.send({filename: filename});

  tail.stdout.on("data", function (data) {
    console.log(data.toString('utf-8'));
    client.send({tail: data.toString('utf-8')})
  });

});

console.log('Server running at http://0.0.0.0:' + port + '/, connect with a browser to see tail output');
