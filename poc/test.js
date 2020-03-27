
let socket;

function preload() {
    socket = io();
}

function setup() {
    createCanvas(displayWidth, displayHeight);
    socket.emit('start', {
        displayWidth : displayWidth,
        displayHeight : displayHeight
    });

}

function draw(){
    background(0);

    

}


