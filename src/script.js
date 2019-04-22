let img1,img2,img3,monsterImg,monsterImg2,shieldImg,shieldTokenImg,bossImg;
let startX,startY;
let ship,shieldToken,boss;
let shield = null;
let bullets = [];
let monsters = [];
let randomXs = [];
let randomYs = [];
let gameOver = false;
let font;
let score = 0;

let monsterTimer = 50;
let monsterTimerMax = 15;
let shieldTokenRarity = 4500;
let maxShieldTokenRarity = 500;

function setup() {
	createCanvas(displayWidth,displayHeight)
	img1 = loadImage('media/ship1.png');
	img2 = loadImage('media/ship2.png');
	img3 = loadImage('media/ship3.png');
	monsterImg = loadImage('media/monster1.png');
	monsterImg2 = loadImage('media/monster2.png');
	shieldImg = loadImage('media/shield.png');
	shieldTokenImg = loadImage('media/shield_token.png');
	bossImg = loadImage('media/boss1.png');
	font = loadFont('media/font.ttf');

	startX = displayWidth/2 - 75/2;
	startY = displayHeight - 400;

	ship = new Ship(startX,startY);
	shieldToken = new ShieldToken();

	boss = new Boss();

	for(let i = 0; i <= 100 ; i++){
		randomXs.push(random(0,displayWidth));
		randomYs.push(random(0,displayHeight));
	}

}

function draw() {
	
	//Stary space 
	background(0,0,0);
	for(let i = 0; i <= 100 ; i++){
		let s = random(1,3); //Twinkle stars
		rect(randomXs[i],randomYs[i],s,s);
		randomYs[i] += 5; //Stars move forward
		if(randomYs[i] > displayHeight) randomYs[i] = 0;
	}

	//Bullets
	for (let i = 0; i < bullets.length; i++) {
		const bullet = bullets[i];
		bullet.draw();
		bullet.move();
	}

	//Ship
	ship.draw();
	ship.move();

	//ShieldToken
	if (shieldToken !== null){
		shieldToken.draw();
		if (shieldToken.duration <= 0){
			shieldToken = null;
		}
	} else {
		shieldTokenRarity --;
		if (shieldTokenRarity <= 0){
			shieldToken = new ShieldToken();
			shieldTokenRarity = maxShieldTokenRarity;
		}
	}

	//Shield + duration
	if(shield !== null) {
		shield.draw();
		shield.move();
		fill(0,167,250);
		textFont(font);
		textSize(20);
		text(shield.duration,5,60);
		if(shield.duration <= 0)shield = null;
	}
	
	//Monsters
	for (let i = 0; i < monsters.length; i++) {
		const monster = monsters[i];
		monster.draw();
		monster.move();
	}

	boss.draw();

	//Gameover
	if(gameOver){
		fill(0);
		rect(0,0,displayWidth,displayHeight);
		push();
		translate(displayWidth/2,displayHeight/2);
		fill(255);
		textFont(font);
		textSize(100);
		textAlign(CENTER,CENTER);
		text('GAME OVER',0,-100);
		textSize(50);
		text('Press ENTER',0,0);
		pop();
	} else {
		fill(255);
		textFont(font);
		textSize(50);
		text(score,5,40);
	}
	
	//Action: get a shield
	if(collide(ship,shieldToken)){
			shieldToken = null;
			shield = new Shield(ship);
	}

	//Action: Monster collision checks
	for (let i = monsters.length-1; i >= 0; i--) {
		const monster = monsters[i];

		//Monster vs bullet
		for (let j = bullets.length - 1; j >=0 ; j--) {
			const bullet = bullets[j];
			if(collide(bullet,monster)){
				monsters.splice(i,1);
				bullets.splice(j,1);
				score += monster.score;
			}
		}

		//Monster vs ship
		if(collide(ship,monster)){
			endGame();
		}

		//Shield vs Monster
		if(collide(shield,monster)){
			monsters.splice(i,1);
			score += monster.score;
		}

		//Monster out of bounds
		if(monster.y + monster.height > displayHeight)
			monsters.splice(i,1);
	}
	
	//Monster generation timer
	if(monsterTimer == 0){
		monsterTimer = monsterTimerMax;
		monsters.push(new Monster());
	}
	monsterTimer--;

	
}

function keyPressed(){
	if(keyCode === 32){
		bullets.push(new Bullet(ship.x + ship.width/2 - 2.5,ship.y));
	} else if(keyCode === ENTER){
			resetGame();
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

function endGame(){
	gameOver = true;
}

function resetGame(){
	if(gameOver){
		ship = new Ship(startX,startY);
		bullets = [];
		monsters = [];
		gameOver = false;
		score = 0;
		shield = null;
	}
}