

class Monster {
	constructor() {
		this.x = random(0,displayWidth - 75);
		this.speed = 2;
		this.width = 100;
		this.height = 50;
		this.sprites = [monsterImg, monsterImg,monsterImg, monsterImg,monsterImg, monsterImg,monsterImg2, monsterImg2,monsterImg2, monsterImg2,monsterImg2, monsterImg2];
		this.spriteIndex = 0;random(0,11);
		this.y = -this.height;
		this.score = 10;
	}
	draw() {
		image(this.sprites[this.spriteIndex],this.x,this.y,this.width,this.height);
		this.spriteIndex++;
		if(this.spriteIndex > this.sprites.length-1)this.spriteIndex = 0;
	}
	move(){
		this.y += this.speed;
	}
}