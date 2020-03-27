class Repeater {

    constructor(time_limit, action){
        this.time_limit = time_limit;
        this.time = time_limit;
        this.action = action; 
    }

    tick(){
        this.time--;
        if(this.time == 0){
            this.time = this.time_limit;
            this.action();
        }
    }

}