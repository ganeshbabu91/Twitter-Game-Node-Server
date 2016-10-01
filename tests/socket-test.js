var io = require('socket.io-client');

var socket = io.connect('https://twitter-game-node-server.herokuapp.com/');

// Listen for the response from the server 
socket.on('connected',function(){
	console.log("client log : connected to server!!");
	// This is for testing purpose. Both parameters should come from UI
    var gameInput = {
    	playersArray: ['messi','ronaldo'],
    	trackJson: {
    		track: 'messi,ronaldo'
    	}
    }
	socket.emit("startGame",gameInput);
});