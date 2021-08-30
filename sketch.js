var npc,egypt,bg,run,player,obstacle
var obstaclesGroup

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var gameState=1
var restartButton
var score=0
var jump,gameOverSound
function preload()
{
	bg=loadImage("images/egypt-.jpg")
	npc=loadAnimation("images/npc.gif")
	run=loadAnimation("images/Running.gif")
rb=loadImage("images/restart.png")
gameOver=loadSound('gameOver.wav')
jump=loadSound('jump.mp3')
}

function setup() {
	createCanvas(800, 700);
	engine = Engine.create();
	obstaclesGroup=new Group()
	world = engine.world;
egypt=createSprite(400,130)
egypt.addImage(bg)
egypt.scale=3
	egypt.velocityX=-3
	player=createSprite(100,580)
	player.addAnimation("play",run)
	player.scale=0.3
	ground=createSprite(200,670,400,10)
	ground.visible=false
	restartButton=createSprite(400,420)

	restartButton.addImage(rb)
	restartButton.scale=0.3
	restartButton.visible=false
	Engine.run(engine);
}


function draw() {
  rectMode(CENTER);
  background(0);
  drawSprites()
  if(egypt.x<0){
	egypt.x=400
	
}
if(gameState===1){
	score=score+Math.round(getFrameRate()/61)
	textSize(30)
	fill("black")
	text('Score: '+score,300,20)
	



	spawnObstacles();
  if(keyDown("space")&&player.y>=400){
	  player.velocityY=-10
	jump.play()
	
  }
	
	player.velocityY+=0.8

if (obstaclesGroup.isTouching(player)){
	gameState=0
	
	gameOver.play()
}
}
if(gameState===0){
player.velocityY=0

	obstaclesGroup.setVelocityXEach(0)
	obstaclesGroup.setLifetimeEach(-1)
	// player.destroy();
	// obstaclesGroup.destroyEach()
	textSize(50)
	fill("green")
	stroke("black")
	strokeWeight(3)
	text("Game Over",300,350)
	// egypt.velocityX=0
	restartButton.visible=true
	if(mousePressedOver(restartButton)){
Reset();

	}
}
player.collide(ground)
  Engine.update(engine);
}		
function Reset(){
gameState=1
restartButton.visible=false
obstaclesGroup.destroyEach();
// egypt.velocityX=-3
}
function spawnObstacles(){
	if(frameCount%200===0){
	
	
	obstacle=createSprite(800,Math.round(random(550,580)))
	obstacle.addAnimation("avc",npc)
	obstacle.scale=0.5

	obstacle.velocityX=-5
	obstacle.lifetime=160
	obstaclesGroup.add(obstacle)
	}

}