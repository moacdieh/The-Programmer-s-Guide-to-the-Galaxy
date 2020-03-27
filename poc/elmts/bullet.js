class Bullet {

	constructor(x,y){
		this.x = x;
		this.y = y;
		this.width = 5;
		this.height = 10;
		this.speed = 20;
	}

	draw() {
		fill(255,0,0);
		rect(this.x,this.y,this.width,this.height);
	} 

	move() {
		this.y -= this.speed;
    }
    
}