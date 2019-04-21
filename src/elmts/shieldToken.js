class ShieldToken {
    constructor(){
        this.x = random(100,displayWidth - 100);
        this.y = random(100,displayHeight/2);;
        this.duration = 500;
        this.height = 50;
        this.width = 50;
    }

    draw() {
         image(shieldTokenImg,this.x,this.y,this.width,this.height);
         this.duration--;
    }


}
