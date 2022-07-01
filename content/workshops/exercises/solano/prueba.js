var img;

function preload(){
    img = loadImage('/workshops/exercises/solano/fire_breathing.jpg');
}

function setup(){
    createCanvas(100, 100, WEBGL);
}

function draw(){
    background(20,155,255); 
    fill(0,0,0); cursor("none"); 
    image(img,-50,-50,100,100);
}