const bodies=Matter.Bodies;
const Engine=Matter.Engine;
const World=Matter.World;
var Arthur,arthur,boss1,boss1img,boss2,boss2img,boss3,boss3img,boss4,boss4img,nenemy1,nenemy2,ground,bulletimg
var engine,world,Monkey,backgroundImg,groundimg,bullet1,boss1;
var score=0
var bullet,bullet1,bullet2,bullet3
var ObstaclesGroup 
var bossGroup,bossGroup2,bossGroup3
var ArthurGroup
var bulletGroup,bulletGroup2,bulletGroup3,bulletGroup4
var gameState = "spawnOb"
var bosslife=14
var playerlife=8
var youwin,youlose

function preload(){
  gettime();
nenemy1=loadImage("nenemy1.png")
arthur=loadImage("arthur.png")
boss1img=loadImage("boss1.png")
boss2img=loadImage("boss2.png")
boss3img=loadImage("boss3.png")
boss4img=loadImage("arthur.png")
bulletimg=loadImage("bullet.png")
groundimg=loadImage("ground.png")
youwin=loadImage("timemachine.jpg")
youlose=loadImage("youlose.jpg")
}


function setup() {
engine=Engine.create();
world=engine.world
createCanvas(displayWidth-20,displayHeight-20)
ArthurGroup =createGroup();

Arthur=createSprite(displayWidth/2-500,displayHeight/2+80,50,50)
ArthurGroup.add(Arthur)
Arthur.addImage(arthur)
Arthur.scale=0.2
ground=createSprite(displayWidth/2,displayHeight-270,displayWidth,20,)
ground.addImage(groundimg)
ground.scale=0.7
ObstaclesGroup = createGroup();
bossGroup = createGroup();
bossGroup2 = createGroup();
bossGroup3 = createGroup();
bulletGroup = createGroup();
bulletGroup2 = createGroup();
bulletGroup3 = createGroup();
bulletGroup4 = createGroup();
}

function draw() {
Engine.update(engine);
if(backgroundImg){
  background(backgroundImg);
}
if(gameState==="endplayer"){
  background(youwin)

}
if(gameState==="endgame"){
  background(youlose)
}



if(keyWentDown("SPACE")){
  
  bullet=createSprite(Arthur.position.x+25,Arthur.position.y-5,5,5)
  bullet.addImage(bulletimg)
  bullet.scale=0.1
  bullet.shapeColor = "black"
  bullet.velocityX=10;
  bulletGroup.add(bullet);
 
}

if(gameState==="spawnOb"){
 spawnObstacles() 

if(bulletGroup.isTouching(ObstaclesGroup)){
  bulletGroup.destroyEach()
  ObstaclesGroup.destroyEach()
  score=score+10
}
if(ArthurGroup.isTouching(ObstaclesGroup)){
  playerlife--
}
}
if(score===100){
  gameState="spawnBoss"

}
if(score===150){
  gameState="endplayer"
  
}
if(playerlife===0){
  gameState="endgame"
}







if(gameState==="spawnBoss") {
  spawnBOSS();

    if(frameCount%250===0){
      bullet1=createSprite(boss1.x+25,boss1.y-5,5,5)
      bullet1.addImage(bulletimg)
      bullet1.scale=0.1
      bullet1.shapeColor = "black"
      bullet1.velocityX=-10;
      bulletGroup2.add(bullet1);
     
    }
  if(bulletGroup2.isTouching(ArthurGroup)){
    playerlife--;
    bulletGroup2.destroyEach();
    
  }
  if(bulletGroup.isTouching(bossGroup)){
bosslife--
bulletGroup.destroyEach();
  }
 
if(bosslife===0){
  bossGroup.destroyEach()
  score=score+50
  bosslife = 6
}

}
Arthur.collide(ground)







fill(255,0,0)
textSize(30)
text("Score  "+  score,displayWidth-500,100)
text("PlayerLife  "+playerlife,displayWidth-800,100)
text("BossLife  "+bosslife,displayWidth-1000,100)

text("PRESS SPACE TO SHOOT && DONt touch BRown GUY    ",displayWidth-1200,150)

if(gameState==="endgame"){
  fill(255,0,0)
  textSize(30)
  text("You Win",displayWidth-800,500) 
}
drawSprites();
console.log(frameCount)






}


function spawnObstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(displayWidth-20,displayHeight-370,10,40);
    obstacle.velocityX = - 6
    obstacle.addImage(nenemy1)
    obstacle.scale=0.2;
    //generate random obstacles
    
    ObstaclesGroup.add(obstacle)
    //assign scale and lifetime to the obstacle           
    
  
  }}
  function spawnBOSS(){
    if(frameCount%250===0){
   boss1 = createSprite(displayWidth-20,displayHeight-350,10,40);
    boss1.velocityX = - 6
    boss1.addImage(boss1img)

    
    boss1.scale=0.3;
    //generate random obstacles
    bossGroup.add(boss1);
    }

  }


  
async function gettime(){
  var response= await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON= await response.json()
  var datetime=responseJSON.datetime
  var hour=datetime.slice(11,13)
  if(hour>06&&hour<19){
bg="bg.png"

  }else{
    bg="bg2.jpg"  
  }
  backgroundImg= loadImage(bg);

}

