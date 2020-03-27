let soundtrack;
let ship1, ship2, ship3, monsterImg, monsterImg2, shieldImg, shieldTokenImg;

let space, shieldToken;
let shields = [];
let ships = {};
let bullets = [];
let monsters = [];

let gameOver = false;
let paused = false;
let font;
let score = 0;

let monsterRepeater, shieldTokenRepeater;

let socket;
let room;

let pg;

//gold ideas
/**
 * Evolving backgrounds
 * Put your head
 */

p5.disableFriendlyErrors = true;

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function preload() {
	soundtrack = loadSound('media/pgg-ost.mp3');

	httpGet('/room').then(function(result) {
		room = result;
		console.log(room);
		socket = io();
		socket.emit('new_game', room);

		socket.on('disconnected', function (id) {
			for (let i = shields.length -1; i >= 0 ; i--){
				if(shields[i].ship.id == id){
					shields.splice(i,1);
					break;
				}
			}
			for(let i in ships){
				if(i == id){
					delete ships[id];
				}
			}
		});

		socket.on('reset', function(){
			resetGame();
		});

		socket.on('pause', function(){
			pauseGame();
		});

		socket.on('shoot', function (id) {
			try{
				shootFromShip(ships[id])
			} catch (e){
				//fire and forget
			}
		});

		socket.on('move', function (id,sd) {
			ships[id].ship_direction = sd;
		});

		socket.on('register', function(shipId){
			console.log('Ship ' + shipId + ' connected');
			monsters=[];
			ships[shipId] = new Ship(shipId);
			shields.push(new Shield(ships[shipId]));
		});
	});
	
}

function shootFromShip(ship) {
	bullets.push(new Bullet(ship.x + ship.width/2 + 28 - 2.5,ship.y));
	bullets.push(new Bullet(ship.x + ship.width/2 - 28 - 2.5,ship.y));
}

function loadMedia() {
	ship1 = loadImage('media/ship1.png');
	ship2 = loadImage('media/ship2.png');
	ship3 = loadImage('media/ship3.png');
	monsterImg = loadImage('media/monster1.png');
	monsterImg2 = loadImage('media/monster2.png');
	shieldImg = loadImage('media/shield.png');
	shieldTokenImg = loadImage('media/shield_token.png');
	font = loadFont('media/font.ttf');
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	image(pg,0,0,windowWidth,windowHeight);
}

function setup() {
	loadMedia();
	createCanvas(windowWidth,windowHeight);
	pg = createGraphics(1280, 720);

	shieldToken = new ShieldToken();
	space = new Space(150);
	
	monsterRepeater = new Repeater(5, function() {
		if(score % 100 == 0 && score > 0 && monsterRepeater.time_limit > 1 ){

		}
		
			monsters.push(new Monster());
	});
	
	shieldTokenRepeater = new Repeater(1000, function() {
		shieldToken = new ShieldToken();
	});

//	ships['testShip'] = new Ship('testShip');
//	shields.push(new Shield(ships.testShip));
}



function draw() {
	//testShip();
	image(pg,0,0,windowWidth,windowHeight);
	clear();

	space.draw();

	if(gameOver){
		Banner.draw('GAME OVER', 'Press ENTER');
		image(pg,0,0,windowWidth,windowHeight);
		return;
	} 

	if(paused) {
		Banner.draw('Paused','Press   P');
		image(pg,0,0,windowWidth,windowHeight);
		return;
	}

	//Ships
	for (let shipId in ships){
		ships[shipId].draw().update();
		if(collide(ships[shipId],shieldToken)){
			shieldToken = null;
			shields.push(new Shield(ships[shipId]));
		}
	}

	//Bullets
	for (let j = bullets.length - 1; j >=0 ; j--) {
		let bullet = bullets[j];
		bullet.draw().update();
		for (let i = monsters.length-1; i >= 0; i--) {
			let monster = monsters[i];
			if(collide(bullet,monster)){
				monsters.splice(i,1);
				bullets.splice(j,1);
				score += monster.score;
				break;
			}
		}
	}

	//Monsters
	for (let i = monsters.length-1; i >= 0; i--) {
		let monster = monsters[i];
		monster.draw().update();
		//Monster vs ship
		for(let shipId in ships){
			if(collide(ships[shipId],monster)){
					endGame();
				}
		}
		//Shield vs Monster
		shields.forEach(shield => {
			if(collide(shield,monster)){
				monsters.splice(i,1);
				score += monster.score;
			}
		});
		//Monster out of bounds
		if(monster.y > pg.height +  monster.height)
			monsters.splice(i,1);
	}

	//Shield
	for (let i = shields.length - 1; i >= 0; i--) {
		shields[i].draw().update();
		if(shields[i].duration <= 0)shields.splice(i,1);
	}
	
	//ShieldToken
	if (shieldToken){
		shieldToken.draw().update();
		if (shieldToken.duration <= 0){
			shieldToken = null;
		}
	} 

	monsterRepeater.tick();
	shieldTokenRepeater.tick();

	pg.fill(255);
	pg.textFont(font);
	pg.textSize(50);
	pg.text('Room '+room ,5, 40);
	pg.text(score,5,80);
	pg.textSize(20);
	pg.text('fr ' + frameRate().toFixed(),pg.width-50, 20);
	pg.text('nm '+ monsters.length, pg.width-50,40);
	pg.text('pd ' + pixelDensity(),pg.width-50, 60);

	image(pg,0,0,windowWidth,windowHeight);
}

function keyPressed(){
	if(keyCode === ENTER){
		resetGame();
	} else if(keyCode === 80){ //p
		pauseGame();
	} else if (keyCode === 77) { //m
		toggleSoundtrack(); 
	} else if (keyIsDown(32)){
		//shootFromShip(ships.testShip);
	}
}

function testShip() {
	if (keyIsDown(UP_ARROW)){
		ships.testShip.up();
	} 
	if (keyIsDown(DOWN_ARROW)){
		ships.testShip.down();
	}
	if (keyIsDown(LEFT_ARROW)){
		ships.testShip.left();
	}
	if (keyIsDown(RIGHT_ARROW)){
		ships.testShip.right();
	}
	
	
}

function collide(a,b){
	if (a !== null && b !== null &&
		a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y) return true;
		return false;
}

function toggleSoundtrack() {
	if (soundtrack.isLooping()) {
		soundtrack.pause();
	}
	else {
		soundtrack.loop();
	}
}

function pauseGame(){
	paused = !paused;
}

function endGame(){
	gameOver = true;
}

function resetGame(){
	bullets = [];
	monsters = [];
	shields = [];
	gameOver = false;
	score = 0;
	for (let shipId in ships){
		shields.push(new Shield(ships[shipId]));
	}
}
