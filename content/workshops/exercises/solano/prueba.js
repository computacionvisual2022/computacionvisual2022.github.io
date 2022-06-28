var img;

function preload(){
    img = loadImage('/workshops/exercises/solano/fire_breathing.jpg');
}

function setup(){
    createCanvas(100, 100, WEBGL);
}

function draw(){
    image(img,this.x,this.y);
}