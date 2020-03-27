class Ship {
	constructor(x, y, id) {
		this.x = x;
		this.y = y;
		this.speed = 10;
		this.width = 75;
		this.height = 75;
		this.sprites = [img1, img2, img3];
		this.spriteIndex = 0;
		this.id = id;
	}

	draw() {
		image(this.sprites[this.spriteIndex], this.x, this.y, this.width, this.height);
		this.spriteIndex++;
		if (this.spriteIndex == this.sprites.length) this.spriteIndex = 0;
	}

	left(){
		if (this.x > 0) //left
					this.x -= this.speed;
	}

	right(){
		if (this.x + this.width < displayWidth) //right
					this.x += this.speed;
	}

	up() {
		if (this.y > 0) //up
			this.y -= this.speed;
	}
	down() {
		if (this.y + this.height < displayHeight - this.height - 30) //down
			this.y += this.speed;
	}
	
}