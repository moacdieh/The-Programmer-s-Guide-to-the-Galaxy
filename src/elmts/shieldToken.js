class ShieldToken {
    constructor(){
        this.x = random(100,pg.width - 100);
        this.y = random(100,pg.height/2);;
        this.duration = 500;
        this.height = 50;
        this.width = 50;
    }

    draw() {
         pg.image(shieldTokenImg,this.x,this.y,this.width,this.height);
         return this;
    }

    update() {
        this.duration--;
        return this;
    }


}
