class Bullet {

	constructor(x,y){
		this.x = x;
		this.y = y;
		this.width = 5;
		this.height = 10;
		this.speed = 20;
	}

	draw() {
		pg.fill(255,0,0);
		pg.rect(this.x,this.y,this.width,this.height);
		return this;
	} 

	update() {
		this.y -= this.speed;
		return this;
    }
    
}