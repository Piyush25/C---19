 var tower, towerImage;
 var climber, climberImage, climberGroup;
var door,doorImage,doorGroup;
var ghost,ghostImage; 
var invisibleblock, invisibleblockGroup;
var gameState = "play" 

function preload(){
  
 towerImage = loadImage("tower.png");
 climberImage = loadImage("climber.png");
 doorImage = loadImage("door.png");
 ghostImage = loadImage("ghost-standing.png");
 spookysound = loadSound("spooky.wav") ;
}

function setup(){
  
  createCanvas (600, 600);
  
  spookysound.loop()
  
  climberGroup = new Group()
  doorGroup = new Group()
  invisibleblockGroup = new Group()
  
  var score = 0;
  
  tower = createSprite(300, 300);
  tower.addImage("tower",towerImage);
  tower.velocityY=3; 
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale= 0.4;
  
  
}

function draw(){
  
  background(0);
  
  if(gameState=="play"){
  
  if(tower.y>400){
    tower.y = 300;
  }
    
  if (keyDown("left_arrow")) {
    ghost.x=ghost.x-3;
    
  }
  
   
  if (keyDown("right_arrow")) {
    ghost.x=ghost.x+3;
  
  }
  
  if (keyDown("space")){
 ghost.velocityY=-5;
  }
 
  ghost.velocityY=ghost.velocityY+0.8; 
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;  
  }
  
  if(invisibleblockGroup.isTouching ( ghost)|| ghost.y>800){
    ghost.destroy();
    gameState = "end"
  }
  
  spawndoors()
  
  
  drawSprites();
}
if (gameState=="end"){
  
  stroke("yellow")
  fill("yellow")
  textSize(35)
  text("gameover",200,200)
}
} 
  function spawndoors(){
    if(frameCount % 240==0){
      
      
    door = createSprite(200,-50 );  
     door.addImage(doorImage)
      
      var climber = createSprite(200,10)
      climber.addImage(climberImage)
      
      var invisibleblock = createSprite (200, 15)
     invisibleblock.width = climber.width 
     invisibleblock.height = 2 
      
       door.x= Math.round (random(120,400))
      door.velocityY=3;
       
      climber.x=door.x;              
      climber.velocityY=3;
      
      invisibleblock.x=door.x
      invisibleblock.velocityY=3
      
      
      door.lifetime = 500;
      climber.lifetime = 500;
       invisibleblock.lifetime=500 
      
     
      climber.scale=0.8;
    door.scale= 0.9;
   
    
      
     
      
      climberGroup.add(climber);
      doorGroup.add(door);
      invisibleblock.debug=true
 invisibleblock.setCollider("rectangle",0,0);
      invisibleblockGroup.add(invisibleblock);
       ghost.depth=door.depth+climber.depth+1;
  }
  
    
    
  }
    
  
  
  
  
