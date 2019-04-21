class Shield {
    constructor(ship){
        this.x = ship.x;
        this.y = ship.y - 20;
        this.offset = 20;
        this.duration = 1000;
        this.height = 30;
        this.width = 75;
        this.flipFlop = false;
    }

    draw() {
        if(this.flipFlop) {
            image(shieldImg,this.x,this.y,this.width,this.height);
        }
        this.flipFlop = !this.flipFlop;
    }


    move(){
        this.x = ship.x;
        this.y = ship.y - this.offset;
        this.duration--;
    }
}