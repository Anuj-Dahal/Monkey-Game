
var monkey , monkey_running , still_monkey;
var ground, groundImage;
var bg, bgImage;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score=0;
var time=0;
var play = 0;
var end = 1;
var gameState = 0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  still_monkey = loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage = loadImage("jungle.png");
}



function setup() {
  createCanvas(400,400);
  bg = createSprite(600,200,400,400);
  bg.addImage(bgImage);
  bg.velocityX = -5;
  bg.scale = 0.2;
  monkey = createSprite(55,302,20,20);
  monkey.addAnimation("still", still_monkey);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.13;
  ground = createSprite(200,350,600,20);
  ground.x = 300;
  ground.velocityX = -4

  bananaGroup = new Group();
  obstacleGroup = new Group();


  
  
  
  
  
  

}


function draw() {
  background(200);
  stroke("black");
  strokeWeight(5);
  textSize(20);
  fill("white");


  if (gameState === play){
      time=Math.ceil(frameCount/frameRate())
      if (keyDown("space")&&monkey.y === 300.09){
    monkey.velocityY = -17;
  }
      if (monkey.isTouching(bananaGroup)){
    score=score+1;
    bananaGroup.destroyEach();
  }
    monkey.changeAnimation("running", monkey_running);
  spawnBananas();
  spawnObstacles();
}
  if (gameState === end){
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    score = score+0;
    time = time+0;
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    monkey.changeAnimation("still", still_monkey);
    bg.velocityX = 0;
  }

  if (monkey.isTouching(obstacleGroup)){
    gameState = 1;
  }
  if (ground.x < 100){
      ground.x = ground.width/2;
    }
  if (bg.x < -10){
      bg.x = 980;
    }

  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  


  drawSprites();
  text("Bananas: "+score,280,32);
  text("Survival Time: "+time,15,32);
}

function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(400,300,10,40);
   obstacle.velocityX = -8;
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.23;
   obstacle.lifetime = 90;
   obstacle.setCollider("rectangle",0,0,300,300);
   obstacleGroup.add(obstacle);
 }
}
function spawnBananas(){
    if (frameCount % 80 === 0){
    banana = createSprite(400,Math.round(random(120,200)),10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 110;
    bananaGroup.add(banana);
  }
}




