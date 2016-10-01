var io = require('socket.io-client');

var socket = io.connect('http://localhost:3000/');

// Listen for the response from the server 
socket.on('connected',function(){
	console.log("client log : connected to server!!");
});