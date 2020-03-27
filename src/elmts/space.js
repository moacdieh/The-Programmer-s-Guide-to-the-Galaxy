class Space {
    constructor(star_count){
        this.star_count = star_count;
        this.randomXs = [];
        this.randomYs = [];
        for(let i = 0; i <= this.star_count ; i++){
            this.randomXs.push(random(0,pg.width));
            this.randomYs.push(random(0,pg.height));
        }
    }

    draw() {
        pg.background(0,0,0);
		for(let i = 0; i <= this.star_count ;i++){
			let s = random(2,4); //Twinkle stars
			pg.fill(255);
            pg.rect(this.randomXs[i],this.randomYs[i],s,s);
            this.randomYs[i] +=  2.5; //Stars move forward
            if(this.randomYs[i] > pg.height){
                this.randomYs[i] = 0;  
            } 
		}
        return this;
    }
    
}