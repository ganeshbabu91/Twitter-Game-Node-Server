var io = require('socket.io-client');

var socket = io.connect('http://localhost:3000/');

// Listen for the response from the server 
socket.on('connected',function(){
	console.log("client log : connected to server!!");
	var username = 'Karun';
	// Join the game created by Ganesh
	socket.emit('joinGame',{gameid: 1, user: username});

	socket.on('GameRoomReady', function(data){
		console.log("Ready to start a game. "+data.game.players[0]+ " Vs "+ data.game.players[1]);
		// Prepare current users' team information
		var gameInput = {
			user: username,
	    	gameid: data.game.id,
	    	teamPlayers: ['messi'],
	    	trackJson: {
	    		track: 'messi'
	    	}
	    }
		socket.emit("startGame",gameInput);
	});

	socket.on('liveResults', function(data){
		console.log("%o",data);
		//socket.emit('endGame');
	});
	
	// This is for testing purpose. Both parameters should come from UI
    /*var gameInput = {
    	playersArray: ['messi'],
    	trackJson: {
    		track: 'messi'
    	}
    }
	socket.emit("startGame",gameInput);*/
});