console.log("Sanity Check");

$(document).ready(function(){

var running = true;


/*	//Kept in to keep on eye on syntax, will remove later
	Player.prototype= {
		moveRight:function(currentPosition){
		}
	};
*/

var canvas = document.getElementById("canvas"); //Finds canvas ID in html
var ctx = canvas.getContext("2d"); //Renders the canvas as a 2D plane
canvas.width = 400;
canvas.height = 400;

function Character(positionX, positionY){
	this.x = positionX;
	this.y = positionY;
	this.height = 40;
	this.width = 40;
	//this.color = "blue";
}

var playerOne = new Character(20, 20);

var playerTwo = new Character(20, 300);

document.addEventListener("keydown", function(event) { //EventListerner added to document overall

	var kc = event.keyCode;
	event.preventDefault(); //Prevents browser from scrolling window

	if(kc === 68) {
		Controls.playerOneRight = true;
	}else if (kc === 39){
		Controls.playerTwoRight = true;
	// //68=D moves right
	// if(event.keyCode == 68)  { //Will use WASD for player 1 later
	// playerOne.x += 5;

	// //39= Up arrow, move right
	// }else if(event.keyCode == 39){ // Arrow keys for player 2 later
	// playerTwo.x += 5;

	}else if(event.keyCode == 89){ // Testing
	//running = false;
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
	window.requestAnimationFrame(Update);
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

function fun(){
	renderCanvas();
	renderPlayerOne();
	renderPlayerTwo();
}
		
setInterval(fun, 10); //automates a task on a time based trigger

window.requestAnimationFrame(Update);
});


/*

Much of the base code was lifted from a stack overflow question
http://stackoverflow.com/questions/23585320/how-to-move-object-with-keyboard-in-javascript

Reviwed the concepts that were used though via Google and Eloquent Javascript

To Do:
Figure how to enable mutiple keypresses at the same time
Set a win condition, something like if Player position > Canvas Width, they win
Notify winner
Reset Button
*/