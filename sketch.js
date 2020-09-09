var gameState;
var PLAY = 1;
var END = 0;


var ghost, ghostImageJ, ghostImageS;
var tower,tower2, towerImage;
var climber, invisClimber, climberImage;
var door, doorImage;
var DCGroup;

function preload(){
  
  towerImage = loadImage("tower.png");
  
  ghostImageJ = loadImage("ghost-jumping.png");
  ghostImageS = loadImage("ghost-standing.png");
  
  climberImage = loadImage("climber.png");
  doorImage = loadImage("door.png");
  
}

function setup(){
  createCanvas(500,600);
  
  gameState = PLAY;

  tower = createSprite(250,400);
  tower.addImage(towerImage);
  tower.scale = .85;
  
  ghost = createSprite(250,100);
  ghost.addImage(ghostImageS);
  ghost.scale = .5;
  
  DGroup = new Group();
  CGroup = new Group();
  ICGroup = new Group();
}
function draw(){
  background("white");
  
  tower.velocityY = -5;
  if(tower.y <= 100){
    tower.y = 300;
  }
      
  if(gameState === PLAY){
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    if(keyDown("LEFT_ARROW")){
      ghost.x = ghost.x - 10;
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x + 10;
    }
   ghost.velocityY = ghost.velocityY + 0.8;
   spawnDC();
  }else if(gameState === END){
    ghost.destroy();
    tower.destroy();
    background("black");
    fill("orange");
    textSize(20);
    text("GAME OVER", 200,300);
    DGroup.setLifetimeEach(0);
    CGroup.setLifetimeEach(0);
    ICGroup.setLifetimeEach(0);
  }
  if(ghost.isTouching(ICGroup)|| ghost.y >= 600){
      ghost.destroy();
      gameState = END;
    }
  drawSprites();
}

function spawnDC(){
  
  if(frameCount % 120 === 0){
    
   door = createSprite(200, -60, 10, 10);
   door.addImage(doorImage);
   door.x = Math.round(random(80,420));
   door.velocityY = 5;
   door.lifetime = 122;
    
   climber = createSprite(200, 10, 10, 10);
   climber.addImage(climberImage);
   climber.velocityY = 5;
   climber.lifetime = 122;
   climber.x = door.x;
   
    invisClimber = createSprite(200, 0, 30, 2);
    invisClimber.x = door.x;
    invisClimber.velocityY = 5;
    invisClimber.shapeColor = "red";
    invisClimber.width = climber.width;
    DGroup.add(door);
    CGroup.add(climber);
    ICGroup.add(invisClimber);
    ghost.depth = invisClimber.depth;
    ghost.depth = ghost.depth + 1;
    
  }
  
}
