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

function Bullet(){
	this.height = 10;
	this.width = 10;
}

var playerOne = new Character(180, 20);
var playerOneBullet = new Bullet();

var playerTwo = new Character(180, 330);
var playerTwoBullet = new Bullet();

document.addEventListener("keydown", function(event) {

	var kc = event.keyCode;
	event.preventDefault(); //Prevents browser from scrolling window

	if(kc === 68) { // D
		Controls.playerOneRight = true;
	}else if (kc === 65){ //A
		Controls.playerOneLeft = true;
	}else if (kc === 39){ //Right Arrow
		Controls.playerTwoRight = true;
	}else if (kc === 37){ //Left Arrow
		Controls.playerTwoLeft = true;
	}else if(kc === 83) { //S
 		Controls.playerOneShoot = true; 
 	}else if (kc === 32) { //Spacebar
 		Controls.playerTwoShoot = true;
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
	}else if(kc === 83) { //S
 		Controls.playerOneShoot = false; 
 	}else if (kc === 32) { //Spacebar
 		Controls.playerTwoShoot = false;
 	}
});

// document.addEventListener("keypress", function(event) {

// 	var kc = event.keyCode;

// 	if(kc === 83) { //S
// 		Controls.playerOneShoot = true; 
// 	}else if (kc === 32) { //Spacebar
// 		Controls.playerTwoShoot = true;
// 	}
// });

var Controls = {
	playerOneRight: false,
	playerOneLeft: false,
	playerOneShoot: false,

	playerTwoRight: false,
	playerTwoLeft: false,
	playerTwoShoot: false,
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
	if (Controls.playerOneShoot){
		console.log("1S");
		renderPlayerOneBullet();
	}
	if (Controls.playerTwoShoot){
		console.log("2S");
		renderPlayerTwoBullet();
	}
	window.requestAnimationFrame(Update);
	// if(!winCondtion()){
	// 	window.requestAnimationFrame(Update);	
}

// function winCondtion(){
// }

// function displayWin(winMessage){
// 	$("body").append("<p><b>" + winMessage + "</b></p>");
// }

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

function renderPlayerOneBullet(){
	ctx.fillStyle = "blue";
	ctx.fillRect((playerOne.x + 16), (playerOne.y + 50), playerOneBullet.width, playerOneBullet.height);
}

function renderPlayerTwoBullet(){
	ctx.fillStyle = "orange";
	ctx.fillRect((playerTwo.x + 16), (playerTwo.y - 20),playerTwoBullet.width, playerTwoBullet.height);
}

function prepareGame(){
	renderCanvas();
	renderPlayerOne();
	renderPlayerTwo();
}
		
setInterval(prepareGame, 10); //automates a task on a time based trigger

window.requestAnimationFrame(Update);
});