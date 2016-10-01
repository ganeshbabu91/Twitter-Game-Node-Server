var io = require('socket.io-client');

var socket = io.connect('http://localhost:3000/');

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