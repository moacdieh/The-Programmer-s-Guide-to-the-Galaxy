class Ship {
	constructor(id) {
		this.x = pg.width/2 - 75/2;;
		this.y = pg.height - 75;
		this.speed = 10;
		this.width = 75;
		this.height = 75;
		this.sprites = [ship1, ship2, ship3];
		this.spriteIndex = 0;
		this.id = id;
		this.ship_direction = {
			going_down : false,
			going_up : false,
			going_left : false,
			going_right : false
		};
	}

	draw() {
		pg.image(this.sprites[this.spriteIndex], this.x, this.y, this.width, this.height);
		this.spriteIndex = (this.spriteIndex + 1) % this.sprites.length;
		return this;
	}

	update() {
		if(this.ship_direction.going_left){
			this.left();
		}
		if(this.ship_direction.going_right){
			this.right();
		}
		if(this.ship_direction.going_up){
			this.up();
		}
		if(this.ship_direction.going_down){
			this.down();
		}
		return this;
	}

	left(){
		if (this.x > 0) //left
					this.x -= this.speed;
	}

	right(){
		if (this.x + this.width < pg.width) //right
					this.x += this.speed;
	}

	up() {
		if (this.y > 0) //up
			this.y -= this.speed;
	}

	down() {
		if (this.y < pg.height - this.height) //down
			this.y += this.speed;
	}
	
}