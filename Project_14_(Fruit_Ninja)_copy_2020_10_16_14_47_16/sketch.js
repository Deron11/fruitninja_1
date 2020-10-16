var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;
var gameover,gameoverI,gameOsong;

var knife,knife_image;
var fruitsgroup ,fruit1 , fruit2, fruit3 ,fruit4;
var aliensgroup ,alien1 ,alien2;

function preload(){
  knife_image = loadImage("sword.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  
  gameoverI = loadImage("gameover.png")
  gameOsong = loadSound("gameover.mp3")
 
}


function setup(){
  createCanvas(400, 400);
  knife = createSprite(200,200,20,20);
  knife.addImage("knife",knife_image);
  knife.scale = 0.5;
  
  gameover =  createSprite(200,200,50,50);
  gameover.addImage("game",gameoverI);
  gameover.visible = false;

  fruitsgroup  = createGroup();
  aliensgroup  = createGroup();
  }
function draw(){
  background(193,154,107);
  text("Score: "+ score, 300,50);
  if(gameState === PLAY) {
    knife.x = mouseX;
    knife.y = mouseY;
    spawn_fruits();
    spawn_alien();
    if(fruitsgroup.isTouching(knife)){
      fruitsgroup.setLifetimeEach(0);
      score = score + 1;
    }
    if(aliensgroup.isTouching(knife))  {
      aliensgroup.setLifetimeEach(0);
      score = score - 3;
    }
    if(score < 0){
      gameState = END;
    }
    }
  if(gameState === END) {
    gameover.visible = true;
    fruitsgroup.setLifetimeEach(0);
  }
  if(keyWentDown("space") && gameState === END){
    reset();
  }
  
  drawSprites();
  }

function reset() {
  score = 0;
  gameover.visible = false ; 
  gameState = PLAY;
}

function spawn_fruits() {
if (frameCount % 100 === 0){
   var fruit = createSprite(0,0,10,40);
  fruit.velocityY = (2 + score/2);
  fruit.scale = 0.2;
  fruit.x = Math.round(random(25,375));
  var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
              default: break;
              
    } 
   fruit.lifetime = 200;
    fruitsgroup.add(fruit);
    }
    }
function spawn_alien(){
  if (frameCount % 140 === 0){
   var alien = createSprite(0,0,10,40);
  alien.velocityY = (2 + score/2);
  alien.scale = 0.8;
  alien.x = Math.round(random(25,375));
  var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: alien.addImage(alien1);
              break;
      case 2: alien.addImage(alien2);
              break;
              default: break;
    } 
    alien.lifetime = 200;
    aliensgroup.add(alien);
    
    }
}