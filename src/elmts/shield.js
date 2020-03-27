class Shield {
    constructor(ship){
        this.ship = ship;
        this.x = ship.x;
        this.y = ship.y - 20;
        this.offset = 20;
        this.duration = 500;
        this.height = 30;
        this.width = 75;
    }

    draw() {
        pg.image(shieldImg,this.x,this.y,this.width,this.height);
        // fill(0,167,250);
        // textFont(font);
        // textSize(3);
        // text(this.duration,5,60);
        return this;
    }


    update(){
        this.x = this.ship.x;
        this.y = this.ship.y - this.offset;
        this.duration--;
        return this;
    }
}