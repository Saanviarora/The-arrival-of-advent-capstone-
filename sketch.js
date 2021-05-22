var PLAY=1
var END=0;
  var gameState=PLAY;
var snowman,snowman_running, snowman_collided
var ground, groundImage;
var invisibleGround
var hollyleaf, hollyleafImage;
var score=0;
var life=3;
var obstacle; 
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var fireworks, fireworkImage;
var angel, angelImage;
var santaclaus, santaclausImage;
var snowflakes, snowflakesImage;

function preload(){
  snowman_running= loadImage("SNOWMAN.png")
  snowman_collided=loadImage("SNOWMANAB.png")
  groundImage=loadImage("groundabcd.png")
  hollyleafImage= loadImage("HOLLY LEAF.png")
  obstacle1= loadImage("obstacle.png")
   obstacle2= loadImage("obstacleb.png")
   obstacle3= loadImage("obstacled.png")
  obstacle4= loadImage("obstaclee.png")
  obstacle5= loadImage("obstaclef.png")
  obstacle6= loadImage("obstacler.png")
  fireworkImage = loadImage("fireworks.png")
  angelImage= loadImage("Angel.png")
  santaclausImage= loadImage("Santa claus.png")
  snowflakesImage= loadImage("Snowflake.png")
 
}
function setup() {
  createCanvas(800,600);
  
  
   ground= createSprite(400,570,1200,100)
  ground.addImage( groundImage)
  ground.x= ground.width/2;
  
   snowman = createSprite(70,490,20,20);
 // snowman.addImage(snowman_collided);
 
  snowman.addImage( snowman_running);
  
  snowman.scale=0.3;
  snowman.debug=true;
  snowman.setCollider("rectangle", 0,0,200,snowman.height)
  
 invisibleGround=createSprite(400,580,800,10)
  invisibleGround.visible=false;
  
  hollyGroup = new Group();
  angelGroup=new Group();
  fireworksGroup=new Group();
  hollyleafGroup=new Group();
  obstaclesGroup= new Group();
  santaclausGroup= new Group();
  snowflakesGroup=new Group();
  
 
  
}

function draw() {
   background(0);
   textSize(20);
  fill(500);
  text("Score: "+ score, 500,40);
text("life: "+ life , 500,60);
  
  if (gameState===PLAY){
    hollyleaf();
  spawnObstacles();
  fireworks();
  angel();
  santaclaus();
 snowflakes();
   //score = score + Math.round(getFrameRate()/60);
    if(hollyGroup.isTouching(snowman)){
      score= score+1
     
      hollyGroup[0].destroy()
    }
  if(score >= 0){
      ground.velocityX = -10;
    }else{
      ground.velocityX = -(6 + 3*score/100);
    }
  
    if(keyDown("space") && snowman.y >= 200) {
      snowman.velocityY = -15;
    }
  
    //add gravity
    snowman.velocityY = snowman.velocityY + 0.8
   
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(obstaclesGroup.isTouching(snowman)){
        gameState = END;
    }
  }
else if (gameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    snowman.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    hollyleafGroup.setVelocityXEach(0);
    fireworksGroup.setVelocityXEach(0);
  angelGroup.setVelocityXEach(0);
   santaclausGroup.setVelocityXEach(0);
   snowflakesGroup.setVelocityXEach(0);
    
    
    
    
    snowman.changeImage(snowman_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    hollyleafGroup.setLifetimeEach(-1);
   fireworksGroup.setLifetimeEach(-1);
   angelGroup.setLifetimeEach(-1);
   santaclausGroup.setLifetimeEach(-1);
   snowflakesGroup.setLifetimeEach(-1);
  

 
 
  
}
  snowman.collide(invisibleGround)
  drawSprites()
}
function hollyleaf(){
   if (frameCount % 100 === 0) {
    var hollyl = createSprite(600,120,40,10);
    hollyl.y = Math.round(random(80,420));
    hollyl.addImage(hollyleafImage);
    hollyl.scale = 0.19;
    hollyl.velocityX = -3;
    
     //assign lifetime to the variable
    hollyl.lifetime = 200;
    
    //adjust the depth
    hollyl.depth = snowman.depth;
    snowman.depth = snowman.depth + 1;
     hollyGroup.add(hollyl)
    
  
}
}
function spawnObstacles(){
   if(frameCount % 200 === 0) {
    var obstacle = createSprite(600,520,20,20);
    //obstacle.debug = true;
    obstacle.velocityX = -3;
    obstacle.debug= true
     
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle
     
     obstacle.setCollider("rectangle",0,0,300,200)
    obstacle.scale = 0.26;
    obstacle.lifetime = 300;
     
   obstaclesGroup.add (obstacle);
}
 
}
function fireworks(){
   if(frameCount % 350 === 0) {
    var firew = createSprite(600,55,20,20);
    firew.y = Math.round(random(30,170));
    firew.addImage(fireworkImage);
    firew.scale = 0.2;
    firew.velocityX = -3;
    
     //assign lifetime to the variable
    firew.lifetime = 200;
   fireworksGroup.add(firew) 
}
  
}
function angel(){
   if(frameCount % 600 === 0) {
    var angela = createSprite(0,55,20,20);
    angela.y = Math.round(random(200,205));
    angela.addImage(angelImage);
    angela.scale = 0.2;
    angela.velocityX = 3;
    
     //assign lifetime to the variable
   angela.lifetime=200;
     angelGroup.add(angela)
}
}
function santaclaus(){
    if(frameCount % 700 === 0) {
    var santac = createSprite(0,350,20,20);
    santac.y = Math.round(random(100,101));
    santac.addImage(santaclausImage);
    santac.scale = 0.3;
    santac.velocityX = 3;
    
     //assign lifetime to the variable
    santac.lifetime = 200
      santaclausGroup.add(santac)
}
}
function snowflakes(){
   if(frameCount % 200 === 0) {
    var snowf = createSprite(300,90,20,20);
    snowf.x = Math.round(random(100,541));
    snowf.addImage(snowflakesImage);
    snowf.scale = 0.15;
    snowf.velocityY = 3;
    
     //assign lifetime to the variable
  snowf.lifetime=200;
     snowflakesGroup.add(snowf)
}
}
