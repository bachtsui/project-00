$(document).ready(function(){

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 
canvas.width = 700;
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
		setTimeout(function() { playerOne.canShoot = true; }, 500);
	}else if(player === 2){
		playerTwo.canShoot = false;
		setTimeout(function() { playerTwo.canShoot = true; }, 500);
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
	}else if (kc === 87){  //W
		Controls.playerOneUp = true;
	}else if (kc === 83){ //S
		Controls.playerOneDown = true;

	}else if (kc === 39){ //Right Arrow
		Controls.playerTwoRight = true;
	}else if (kc === 37){ //Left Arrow
		Controls.playerTwoLeft = true;
	}else if (kc === 38){ //Up Arrow
 		Controls.playerTwoUp = true;
 	}else if (kc === 40){ //Down Arrow
 		Controls.playerTwoDown = true;

	}else if(kc === 16 && playerOne.canShoot) { //Shift	
		bulletArray.push(new Bullet(playerOne.x + 25, playerOne.y + 12 , 1));
		disableShooting(1);
 	}else if (kc === 32 && playerTwo.canShoot) { //Spacebar
		bulletArray.push(new Bullet(playerTwo.x + 25, playerTwo.y + 12, 2));
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
	}else if (kc === 83){ //S
		Controls.playerOneDown = false;
	}else if (kc === 87){ //W
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
	if(Controls.playerOneRight && playerOne.x < (canvas.width - playerOne.width)){
		//Prevent square leaving screen, this way also make changing values easier
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
		playerTwo.x += 3; 
	}
	if(Controls.playerTwoLeft && playerTwo.x > 0){
		playerTwo.x -= 3; 
	}
	if(Controls.playerTwoUp && playerTwo.y > 0){
		playerTwo.y -= 3;
	}
	if(Controls.playerTwoDown && playerTwo.y < canvas.height - playerTwo.height){
		playerTwo.y += 3;
	}
	for(var i = 0; i < bulletArray.length; i++){
		// if(bulletArray[i].x > playerOne.x && 
		// 	bulletArray[i].x < (playerOne.x + playerOne.width) &&
		// 	bulletArray[i].y < (playerOne.y + playerOne.height)){
		// 	displayWin("Player Two Won!");
		// 	animating = false;
		// }else if(bulletArray[i].x > playerTwo.x && 
		// 	bulletArray[i].x < (playerTwo.x + playerTwo.width) &&
		// 	bulletArray[i].y > playerTwo.y){
		// 	displayWin("Player One Won!");
		// 	animating = false;
		// //Collison, need to be fixed though still
		if(bulletArray[i].x > 700 || bulletArray[i].x < 0){
			bulletArray.splice(bulletArray[i],1);
		//need to remove bullets, otherwise slowdowns occur
		}else if(bulletArray[i].player === 1){
			bulletArray[i].x +=7;
		}else if (bulletArray[i].player === 2){
			bulletArray[i].x +=7;
		}
	}
}

 // $(".btn").click(function() {
 // 	window.location.reload();
 // });



function displayWin(winMessage){
 	$("body").append("<p><b>" + winMessage + "</b></p>");
}

function renderCanvas(){
	ctx.fillStyle = "#000000"; //color
	ctx.fillRect(0, 0, 700, 400);  //Draws out the canvas, (x, y, width, height)
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