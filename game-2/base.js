$(document).ready(function(){

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
	this.canShoot = true; //Will use to limit bullets fire timing
}

function Bullet(x,y,player){
	this.x = x;
	this.y = y;
	this.player = player;
	this.height = 10;
	this.width = 10;
}

function disableShooting(player){
	if(player === 1){
		playerOne.canShoot = false;
		setTimeout(function() { playerOne.canShoot = true; }, 1000);
	}else if(player === 2){
		playerTwo.canShoot = false;
		setTimeout(function() { playerTwo.canShoot = true; }, 1000);
	}
}
//setTimeout will execute a block of code after a certain amount of time
//We use this function to prevent players from rapidly shooting bullets

var playerOne = new Character(180, 10);

var playerTwo = new Character(180, 350);

var bulletArray = [];

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
	}else if(kc === 83 && playerOne.canShoot) { //S	
		bulletArray.push(new Bullet(playerOne.x + 16, playerOne.y + 40, 1));
		disableShooting(1);
 	}else if (kc === 32 && playerTwo.canShoot) { //Spacebar
		bulletArray.push(new Bullet(playerTwo.x + 16, playerTwo.y - 20, 2));
		disableShooting(2);
 	}
 	//Note to self: Creates a new bullet object and adds it to the array
});

document.addEventListener("keyup", function(event) {

	var kc = event.keyCode;

	if(kc === 68) { // D
		Controls.playerOneRight = false;
	}else if (kc === 65){ //A
		Controls.playerOneLeft = false;
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
	playerTwoLeft: false
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
	for(var i = 0; i < bulletArray.length; i++){
		if(bulletArray[i].x > playerOne.x && 
			bulletArray[i].x < (playerOne.x + playerOne.width) &&
			bulletArray[i].y < (playerOne.y + playerOne.height)){
			displayWin("Player Two Won!");
			animating = false;
		}else if(bulletArray[i].x > playerTwo.x && 
			bulletArray[i].x < (playerTwo.x + playerTwo.width) &&
			bulletArray[i].y > playerTwo.y){
			displayWin("Player One Won!");
			animating = false;
		//Collison, need to be fixed though still
		}else if(bulletArray[i].y > 400 || bulletArray[i].y < 0){
			bulletArray.splice(bulletArray[i],1);
		//need to remove bullets, otherwise slowdowns occur
		}else if(bulletArray[i].player === 1){
			bulletArray[i].y +=3;
		}else if (bulletArray[i].player === 2){
			bulletArray[i].y -=3;
		}
	}
}

 $(".btn").click(function() {
 	window.location.reload();
 });



function displayWin(winMessage){
 	$("body").append("<p><b>" + winMessage + "</b></p>");
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

function renderBullets(){
	for(var i = 0; i < bulletArray.length; i++){
		if(bulletArray[i].player === 1){
			ctx.fillStyle = "blue";
		}else if (bulletArray[i].player === 2){
			ctx.fillStyle = "orange";
		}
		ctx.fillRect(bulletArray[i].x, bulletArray[i].y, bulletArray[i].width, bulletArray[i].height);
	}
}

function prepareGame(){
	Update();
	renderCanvas();
	renderPlayerOne();
	renderPlayerTwo();
	renderBullets();
	if(animating){
		window.requestAnimationFrame(prepareGame); //used for Win condition
	}
}

window.requestAnimationFrame(prepareGame);
});


/*
Notes
Couldn't get keypress to shoot bullet, ask why

Still need to fix up the collison for the squares and bullets,
not quite right yet.
*/