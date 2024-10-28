let bMaggiore = 1200;
let bMinore = 350;
let tAltezza = 800;
let xOffset; // coordinata x del vertice in basso a sinistra del trapezio
let yOffset; //coordinata y dei due vertici superiori

let leftPath;
let leftCenterPath;
let rightCenterPath;
let rightPath;

let leftTrajectory; 
let leftCenterTrajectory;
let centerTrajectory;
let rightCenterTrajectory;
let rightTrajetory;

let dim = bMinore/5 - 30; //dimensione iniziale dell'ostacolo

let img;

let gameIsOver = false;

let speedDifficulty = 1;

let points = 0;
let spawnTime = 800;
let pressed = false; 
let arr = [];

function preload() {
  img = loadImage('rogues.png');
}

function keyReleased() {
  pressed = false;
}

function spawn(){
  let j = Math.floor(Math.random() * 4) + 1;
  for(let k = 0; k < j; k++){
    let i = Math.floor(Math.random() * 5);
    switch(i){
      case 0:
        arr.push(new Obstacle("left"));
        break;
      case 1:
        arr.push(new Obstacle("leftCenter"));
        break;
      case 2:
        arr.push(new Obstacle("center"));
        break;
      case 3:
        arr.push(new Obstacle("rightCenter"));
        break;
      case 4:
        arr.push(new Obstacle("right"));
        break;
    }
  }
  setTimeout(spawn,spawnTime -  Math.log(points + 1)/Math.log(2) * 8);
}


function checkCollision(){
  for(let i = 0; i < arr.length - 1; i++){
    if( arr[i].position.y + dim/2  >= player.position.y + player.h && //controllo verticale
        player.position.x + player.w/2 <= arr[i].position.x + dim/2 && //controllo orizzontale
        player.position.x + player.w/2 >= arr[i].position.x - dim/2)
    { 
      gameIsOver = true;
    }
  }
}

function newGame(){
  arr = []; // azzero l'array contenente gli ostacoli
  player.position.x = xOffset + 5 * bMaggiore/10 - player.w/2; //riporto il personaggio nella corsia centrale
  gameIsOver = false;  
  spawnTime = 800;
  speedDifficulty = 1;
  points = 0;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  xOffset = (windowWidth - bMaggiore)/2; // offset orizzontale per posizionare il trapezio al centro della finestra
  yOffset = (windowHeight - tAltezza)/2; //  offset verticale per posizionare il trapezio al centro della finestra

  player = new Player();


  // costruire le divisioni tra le varie corsie
  leftPath = new Path(xOffset + (bMaggiore - bMinore)/2 + bMinore/5, yOffset, // x del vertice in alto a sinistra + 1/5 della base minore, y del vertice in alto
                      xOffset + bMaggiore/5, yOffset + tAltezza); // x del vertice in basso a sinitra + 1/5 della base minore, y del vertice in basso
  
  leftCenterPath = new Path(xOffset + (bMaggiore - bMinore)/2 + 2*bMinore/5, yOffset,
                            xOffset + 2 * bMaggiore/5, yOffset + tAltezza);

  rightCenterPath = new Path(xOffset + (bMaggiore - bMinore)/2 + 3 * bMinore/5, yOffset,
                             xOffset + 3 * bMaggiore/5, yOffset + tAltezza);

  rightPath = new Path(xOffset + (bMaggiore - bMinore)/2 + 4 * bMinore/5, yOffset,
                                  xOffset + 4 * bMaggiore/5, yOffset + tAltezza);

  // costruire i vettori traiettoria per gli ostacoli
  leftTrajectory = new Path(xOffset + (bMaggiore - bMinore)/2 + bMinore/10, yOffset,
                            xOffset + bMaggiore/10, yOffset + tAltezza);
  leftCenterTrajectory = new Path(xOffset + (bMaggiore - bMinore)/2 + 3 * bMinore/10, yOffset,
    xOffset +3 * bMaggiore/10, yOffset + tAltezza);
  centerTrajectory = new Path(xOffset + (bMaggiore - bMinore)/2 + 5 * bMinore/10, yOffset,
    xOffset + 5 * bMaggiore/10, yOffset + tAltezza);
  rightCenterTrajectory = new Path(xOffset + (bMaggiore - bMinore)/2 + 7 * bMinore/10, yOffset,
    xOffset + 7 * bMaggiore/10, yOffset + tAltezza);
  rightTrajectory = new Path(xOffset + (bMaggiore - bMinore)/2 + 9 * bMinore/10, yOffset,
    xOffset + 9 * bMaggiore/10, yOffset + tAltezza);

  rectMode(CENTER); //punto di riferimento dei rettangoli diventa il centro del rettangolo e non il vertice in alto a sinistra
  spawn();
}

function draw() {
  background(100);
  fill(0);
  stroke(0);
  quad(xOffset + (bMaggiore - bMinore)/2, yOffset, // vertice in alto a sinistra
       xOffset + (bMaggiore - bMinore)/2 + bMinore, yOffset, //vertice in alto a destra
       xOffset + bMaggiore, yOffset+tAltezza, //vertice in basso a destra
       xOffset, yOffset + tAltezza // vertice in basso a sinistra
      );
  // mostrare divisioni tra corsie
  leftPath.show();
  leftCenterPath.show();
  rightCenterPath.show();
  rightPath.show();

  fill(203, 212, 211);
  textSize(40);
  text("Score: " + points,windowWidth/2 - textWidth("Score:  ")/2,40);
  if(!gameIsOver){
    for(let i = 0; i < arr.length - 1 ; i++){
      fill(arr[i].color);
      arr[i].show();
      arr[i].move();
      if(arr[i].position.y > windowHeight){
        arr.splice(arr[i],1); //elimino gli ostacoli che si trovano oltre la schermata
        points++;
        speedDifficulty += Math.log(1 + speedDifficulty)/30; //aumento della velocita' 
      }
    }
    
    if (keyIsPressed === true){
      if(!pressed){
        if(keyCode === RIGHT_ARROW && player.position.x <= rightPath.end.x){ // se freccia destra e' premuta e se il player non si trova nella corsia di sinitra 
         pressed = true; 
         player.position.x += bMaggiore/5; // personaggio si muove a destra di una corsia
        }
        if(keyCode === LEFT_ARROW && player.position.x >= leftPath.end.x){ //se freccia sinistra e' premuta e se il player non si trova nella corsia di destra
         pressed = true;
         player.position.x -= bMaggiore/5; // personaggio si muove a sinistra di una corsia
        }   
      }
    }
    checkCollision();
  }
  else{ //se gameIsOver === true disegno rettangolo con schermata gameOver
    fill(235, 180, 52);
    rect(windowWidth/2,windowHeight/2 - windowHeight/20,800,600);
    fill(92, 173, 171);
    textSize(50);
    textW = textWidth("GAME OVER");
    text("GAME OVER", windowWidth/2 - textW/2,windowHeight/2 - windowHeight/20);
    textSize(30);
    textW = textWidth("You've scored " + points + " points");
    text("\nYou've scored " + points + " points", windowWidth/2 - textW/2,windowHeight/2 - windowHeight/20);
    textSize(20);
    textW = textWidth("Press any key to restart");
    text("\n\n\nPress any key to restart", windowWidth/2 - textW/2,windowHeight/2 - windowHeight/20);
    if(keyIsPressed === true)
      newGame(); 
    
  }
  image(img,player.position.x,player.position.y,100,100);
}