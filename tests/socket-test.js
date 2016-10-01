var io = require('socket.io-client');

var socket = io.connect('https://twitter-game-node-server.herokuapp.com/');

// Listen for the response from the server 
socket.on('connected',function(){
	console.log("client log : connected to server!!");
	socket.emit("readTweets");
});