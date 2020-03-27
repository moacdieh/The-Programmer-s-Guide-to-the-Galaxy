

class Monster {
	constructor() {
		this.x = random(0,pg.width - 100);
		this.speed = 10;
		this.width = 100;
		this.height = 50;
		this.sprites = [monsterImg, monsterImg,monsterImg, monsterImg,monsterImg, monsterImg,monsterImg2, monsterImg2,monsterImg2, monsterImg2,monsterImg2, monsterImg2];
		this.spriteIndex = 0;
		this.y = -this.height;
		this.score = 10;
	}
	draw() {
		pg.image(this.sprites[this.spriteIndex],this.x,this.y,this.width,this.height);
		this.spriteIndex = (this.spriteIndex + 1) % this.sprites.length;
		return this;
	}
	update(){
		this.y += this.speed;
		return this;
	}
}