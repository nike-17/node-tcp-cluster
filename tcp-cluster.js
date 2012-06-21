var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;


if (cluster.isMaster) {
	// Fork workers.
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('death', function(worker) {
		console.log('worker ' + worker.pid + ' died');
	});
} else {

	var server = net.createServer();
	server.listen(PORT, HOST);

	console.log('Server listening on ' + HOST +':'+ PORT);

	server.on('connection', function(sock) {
		console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

	});

	server.on('data', function(data) {
		console.log('DATA ' + sock.remoteAddress + ': ' + data);
		sock.write(data);
	});
}

