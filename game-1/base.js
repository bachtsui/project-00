$(document).ready(function(){

var running = true;

var canvas = document.getElementById("canvas"); //Finds canvas ID in html
var ctx = canvas.getContext("2d"); //Renders the canvas as a 2D plane
canvas.width = 400;
canvas.height = 400;

function Character(positionX, positionY){
	this.x = positionX;
	this.y = positionY;
	this.height = 40;
	this.width = 40;
}

var playerOne = new Character(20, 20);

var playerTwo = new Character(20, 300);

document.addEventListener("keydown", function(event) { //EventListerner added to document overall

	var kc = event.keyCode;
	event.preventDefault(); //Prevents browser from scrolling window

	if(kc === 68) { // D
		Controls.playerOneRight = true;
	}else if (kc === 39){ //Up Arrow
		Controls.playerTwoRight = true;
	}
});

document.addEventListener("keyup", function(event) {

	var kc = event.keyCode;
	event.preventDefault(); //Prevents browser from scrolling window

	if(kc === 68) {
		Controls.playerOneRight = false;
	}else if (kc === 39){
		Controls.playerTwoRight = false;
	}
});

/*
The idea behind the keydown and keyup blocks
is that the program keeps track of what keys
are being held down using true and false statements.

Got this idea through Eloquent Javascript and 
Stack Overflow.
*/

var Controls = {
	playerOneRight: false,
	playerTwoRight: false,
};


function Update(){
	if(Controls.playerOneRight){
		playerOne.x += 3;
	}
	if(Controls.playerTwoRight){
		playerTwo.x += 3; 
	}
	if(!winCondtion()){
		window.requestAnimationFrame(Update);
		//Built in method, seems like it redraws the canvas continuously from my understanding
	}	
}



function winCondtion(){
	if(playerOne.x > 400){
		displayWin("Player One Won!");
		return true;
	}else if(playerTwo.x > 400){
		displayWin(" Player Two Won!");
		return true;
	}
	return false;
}

function displayWin(winMessage){
	$("body").append("<p><b>" + winMessage + "</b></p>");
}

function renderCanvas(){
	ctx.fillStyle = "#000000"; //color
	ctx.fillRect(0, 0, 400, 400);  //Draws out the canvas, I think
} 

function renderPlayerOne(){ //draws out PlayerOne
	ctx.fillStyle = "blue";
	ctx.fillRect(playerOne.x, playerOne.y, playerOne.width, playerOne.height);
}

function renderPlayerTwo(){ //draws out PlayerTwo
	ctx.fillStyle = "orange";
	ctx.fillRect(playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height);
}

function prepareGame(){
	renderCanvas();
	renderPlayerOne();
	renderPlayerTwo();
}
		
setInterval(prepareGame, 10); //automates a task on a time based trigger
});


/*

Much of the base code was lifted from a stack overflow question
http://stackoverflow.com/questions/23585320/how-to-move-object-with-keyboard-in-javascript

Reviwed the concepts that were used though via Google and Eloquent Javascript
*/