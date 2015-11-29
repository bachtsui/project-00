$(document).ready(function(){

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 
canvas.width = 400;
canvas.height = 400;

function Character(positionX, positionY){
	this.x = positionX;
	this.y = positionY;
	this.height = 40;
	this.width = 40;
}

var playerOne = new Character(180, 20);

var playerTwo = new Character(180, 330);

document.addEventListener("keydown", function(event) {

	var kc = event.keyCode;
	event.preventDefault(); //Prevents browser from scrolling window

	if(kc === 68) { // D
		Controls.playerOneRight = true;
	}else if (kc === 65){ //A
		Controls.playerOneLeft=true;
	}else if (kc === 39){ //Right Arrow
		Controls.playerTwoRight = true;
	}else if (kc === 37){ //Left Arrow
		Controls.playerTwoLeft = true;
	}
});

document.addEventListener("keyup", function(event) {

	var kc = event.keyCode;

	if(kc === 68) { // D
		Controls.playerOneRight = false;
	}else if (kc === 65){ //A
		Controls.playerOneLeft= false;
	}else if (kc === 39){ //Right Arrow
		Controls.playerTwoRight = false;
	}else if (kc === 37){ //Left Arrow
		Controls.playerTwoLeft = false;
	}
});

var Controls = {
	playerOneRight: false,
	playerOneLeft: false,
	playerTwoRight: false,
	playerTwoLeft: false,
};


function Update(){
	if(Controls.playerOneRight && playerOne.x < (canvas.width - playerOne.width)){
		//Prevent square leaving screen, this way also make changing values easier
		playerOne.x += 3;
	}
	if(Controls.playerOneLeft && playerOne.x > 0){
		playerOne.x -= 3;
	}
	if(Controls.playerTwoRight && playerTwo.x < (canvas.width - playerTwo.width)){
		playerTwo.x += 3; 
	}
	if(Controls.playerTwoLeft && playerTwo.x > 0){
		playerTwo.x -= 3; 
	}
	window.requestAnimationFrame(Update);
	// if(!winCondtion()){
	// 	window.requestAnimationFrame(Update);
		//Built in method, seems like it redraws the canvas continuously from my understanding	
}

// function winCondtion(){
// 	if(playerOne.x > 400){
// 		displayWin("Player One Won!");
// 		return true;
// 	}else if(playerTwo.x > 400){
// 		displayWin(" Player Two Won!");
// 		return true;
// 	}
// 	return false;
// }

// function displayWin(winMessage){
// 	$("body").append("<p><b>" + winMessage + "</b></p>");
// }

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

window.requestAnimationFrame(Update);
});