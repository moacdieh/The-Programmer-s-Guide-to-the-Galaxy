class Ship {
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.speed = 5;
		this.width = 75;
		this.height = 75;
		this.sprites = [img1, img2, img3];
		this.spriteIndex = 0;
	}
	draw() {
		image(this.sprites[this.spriteIndex],this.x,this.y,this.width,this.height);
		this.spriteIndex++;
		if(this.spriteIndex == this.sprites.length)this.spriteIndex = 0;
	}
	move(){
		if(keyIsDown(LEFT_ARROW)){
			if(this.x > 0)
				this.x -= this.speed;
		}
		if(keyIsDown(RIGHT_ARROW)){
			if(this.x + this.width < displayWidth)
				this.x += this.speed;
		}
		if(keyIsDown(UP_ARROW)){
			if(this.y > 0)
				this.y -= this.speed;
		}
		if(keyIsDown(DOWN_ARROW)){
			if(this.y + this.height < displayHeight - this.height - 30 )
				this.y += this.speed;
		}
	}
}