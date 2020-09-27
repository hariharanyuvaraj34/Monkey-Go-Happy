var monkey, monkey_running, banana, score, bg, ground;
var gameState, bananasGroup, obstaclesGroup;
var ground, obstacle, backg, obstacleimage, bananaimage;

function preload(){

  monkey_running = loadAnimation("monkey1.png", "monkey2.png", "monkey3.png", "monkey4.png", "monkey5.png", "monkey6.png", "monkey7.png", "monkey8.png", "monkey9.png", "monkey10.png");
  
  backg = loadImage("jungle.jpg");
  obstacleimage = loadImage("stone.png")
  bananaimage = loadImage("banana.png");
}



function setup() {
  createCanvas(400,400);
  
  gameState = "start";
  
  bg = createSprite(0, 20, 100, 100);
  bg.addImage("jungle", backg);
  
  ground = createSprite(200, 300, 400, 10);
  
  monkey = createSprite(70,250,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;
  
  bananasGroup = createGroup();
  obstaclesGroup = createGroup();
  
  score = 0;
}



function draw(){
  background("black");
  drawSprites();
  
  ground.visible = false;
  monkey.collide(ground);
  
  bg.velocityX = -5;
  
  if (bg.x < 0){
    bg.x = bg.width/2;
  }
  
  if (gameState == "start"){
    monkey.visible = false;
    bg.visible = false;
    
    textSize(30);
    stroke("red");
    fill("red");
    text("Press 'Space' To Start", 50, 200);
  }
  
  
  // changing the gameState 
  if (gameState == "start" && keyDown("space")){
    gameState = "play";
    bg.visible = true;
    monkey.visible = true;
  }
  
  
  if (gameState == "play"){
    spawnObstacles();
    
    if(keyDown("space") && monkey.y >= 245)
    {
      monkey.velocityY = -17;
    }
    monkey.velocityY += 0.8;
    
    stroke("white");
    fill("white");
    text("Score: " + score, 300, 30);
    
    spawnBananas(); 
    if (monkey.isTouching(bananasGroup)){
      score = score + 2; 
      bananasGroup.destroyEach();
    }
    
    if (monkey.isTouching(obstaclesGroup)){
      bananasGroup.destroyEach();
      obstaclesGroup.destroyEach();
      gameState = "end";
    }
    
    switch(score)
    {
      case 10: monkey.scale = 0.1;
        break;
      case 20: monkey.scale = 0.12;
        break;
      case 30: monkey.scale = 0.14;
        break;
      case 40: monkey.scale = 0.16;
        break;
      case 50:monkey.scale = 0.18;
        break;
        default: 
        break;
    }
    
  }
  
  if (gameState == "end"){
    monkey.visible = false;
    bg.visible = false;
    score = 0;
    
    textSize(30);
    stroke("red");
    fill("red");
    text("!!!Game Over!!!", 100, 200);
    
    textSize(18);
    stroke("blue");
    fill("blue");
    text("Press 'r' to restart", 120, 250);
  }
  
  
  if (gameState == "end" && keyDown("r")){
    gameState = "start";
  }
}


function spawnBananas(){
  if (frameCount % 120 == 0){
    banana = createSprite(400, 0, 10 , 10);
    banana.addAnimation("banana", bananaimage); 
    banana.scale = 0.08;
    
    banana.y = random(100,150);
    
    banana.velocityX = -5;
    banana.lifetime = 150;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananasGroup.add(banana);
  }
}


function spawnObstacles(){
  if(frameCount % 100 === 0) {
    obstacle = createSprite(400,265,10,40);
    obstacle.velocityX = -5 ;
    obstacle.addImage("Stone", obstacleimage);
    obstacle.lifetime = 150;
    obstacle.scale = 0.15;
        
    obstaclesGroup.add(obstacle);
  }
}

