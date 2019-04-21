class Boss{
    constructor(){
        this.height = 250;
        this.width = 250;
        this.x = displayWidth/2 - this.width/2;
        this.y = displayHeight/2 - this.height - 100;
        this.health = 100;
    }
    draw(){
        image(bossImg,this.x,this.y,this.width,this.height);
    }
}