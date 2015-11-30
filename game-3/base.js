$(document).ready(function(){
console.log("Sanity Check");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 
canvas.width = 400;
canvas.height = 400;

var animating = true;

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
	event.preventDefault();

	if(kc === 68) { // D
		Controls.playerOneRight = true;
	}else if (kc === 65){ //A
		Controls.playerOneLeft = true;
	}else if (kc === 87){  //W
		Controls.playerOneUp = true;
	}else if (kc === 83){
		Controls.playerOneDown = true;
	}else if (kc === 39){ //Right Arrow
		Controls.playerTwoRight = true;
	}else if (kc === 37){ //Left Arrow
		Controls.playerTwoLeft = true;
 	}else if (kc === 38){ //Up Arrow
 		Controls.playerTwoUp = true;
 	}else if (kc === 40){ //Down Arrow
 		Controls.playerTwoDown = true;
 	}
});

document.addEventListener("keyup", function(event) {

	var kc = event.keyCode;

	if(kc === 68) { // D
		Controls.playerOneRight = false;
	}else if (kc === 65){ //A
		Controls.playerOneLeft = false;
	}else if (kc === 83){
		Controls.playerOneDown = false;
	}else if (kc === 87){ //Right Arrow
		Controls.playerOneUp = false;
	}else if (kc === 39){ //Right Arrow
		Controls.playerTwoRight = false;
	}else if (kc === 37){ //Left Arrow
		Controls.playerTwoLeft = false;
	}else if (kc === 38){ //Up Arrow
 		Controls.playerTwoUp = false;
 	}else if (kc === 40){ //Down Arrow
 		Controls.playerTwoDown = false;
 	}
});

var Controls = {
	playerOneRight: false,
	playerOneLeft: false,
	playerOneUp: false,
	playerOneDown: false,

	playerTwoRight: false,
	playerTwoLeft: false,
	playerTwoUp: false,
	playerTwoDown: false
};


function Update(){
	if(playerOne.x > playerTwo.x &&
		playerOne.x < (playerTwo.x + playerTwo.width) &&
		playerOne.y > playerTwo.y &&
		playerOne.y < (playerTwo.y + playerOne.height)){
		console.log("Player 1 win");
		displayWin("Player One Won!");
		animating = false;
	} 
	if(Controls.playerOneRight && playerOne.x < (canvas.width - playerOne.width)){
		playerOne.x += 3;
	}
	if(Controls.playerOneLeft && playerOne.x > 0){
		playerOne.x -= 3;
	}
	if(Controls.playerOneUp && playerOne.y > 0){
		playerOne.y -=3;
	}
	if(Controls.playerOneDown && playerOne.y < canvas.height - playerOne.height){
		playerOne.y +=3;
	}
	if(Controls.playerTwoRight && playerTwo.x < (canvas.width - playerTwo.width)){
		playerTwo.x += 3.5; 
	}
	if(Controls.playerTwoLeft && playerTwo.x > 0){
		playerTwo.x -= 3.5; 
	}
	if(Controls.playerTwoUp && playerTwo.y > 0){
		playerTwo.y -= 3.5;
	}
	if(Controls.playerTwoDown && playerTwo.y < canvas.height - playerTwo.height){
		playerTwo.y += 3.5;
	}
}

 $(".btn").click(function() {
 	window.location.reload();
 });

function displayWin(winMessage){
 	$("body").append("<p><b>" + winMessage + "</b></p>");
}

function setTimer(){
	console.log("Timer Running.");
	setTimeout(function() 
		{ animating = false;
		 $("body").append("<p><b> Player Two Won! </b></p>");	
		 }, 10000);
}

function renderCanvas(){
	ctx.fillStyle = "#000000"; //color
	ctx.fillRect(0, 0, 400, 400);  //Draws out the canvas, (x, y, width, height)
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
	Update();
	renderCanvas();
	renderPlayerOne();
	renderPlayerTwo();
	if(animating){
		window.requestAnimationFrame(prepareGame); //used for Win condition
	}
}

window.requestAnimationFrame(prepareGame);
setTimer();
});