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
		cluster.fork();
	});
} else {
	net.createServer(function(socket){
		socket.on('data', function(data) {
			socket.write(data);
		});
	}).listen(PORT, HOST);
}

