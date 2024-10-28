class Obstacle{
  constructor(string){
    if(string === "left"){
      this.factor = leftTrajectory.dist()/centerTrajectory.dist();//il rapporto tra la lunghezza di questo segmento e quello centrale serve perche' la velocita' percepita sia uguale tra le varie corsie
      this.position = createVector(xOffset + (bMaggiore - bMinore)/2 + bMinore/10, yOffset); // ostacolo posizionato a meta' della corsia di sinistra
      this.dir = leftTrajectory.end.copy().sub(leftTrajectory.start).normalize(); //vettore normalizzato per indicare la direzione che dovra' seguire l'ostacolo
    }
    if(string === "leftCenter"){
      this.factor = leftCenterTrajectory.dist()/centerTrajectory.dist();
      this.position = createVector(xOffset + (bMaggiore - bMinore)/2 + 3 * bMinore/10, yOffset);
      this.dir = leftCenterTrajectory.end.copy().sub(leftCenterTrajectory.start).normalize();
    }
    if(string === "center"){
      this.factor = 1;
      this.position = createVector(xOffset + (bMaggiore - bMinore)/2 + 5 * bMinore/10, yOffset);
      this.dir = centerTrajectory.end.copy().sub(centerTrajectory.start).normalize();
    }
    if(string === "rightCenter"){
      this.factor = rightCenterTrajectory.dist()/centerTrajectory.dist();
      this.position = createVector(xOffset + (bMaggiore - bMinore)/2 + 7 * bMinore/10, yOffset);
      this.dir = rightCenterTrajectory.end.copy().sub(rightCenterTrajectory.start).normalize();
    }
    if(string === "right"){
      this.factor = rightTrajectory.dist()/centerTrajectory.dist();
      this.position = createVector(xOffset + (bMaggiore - bMinore)/2 + 9 * bMinore/10, yOffset);
      this.dir = rightTrajectory.end.copy().sub(rightTrajectory.start).normalize();
    }
    this.vel = this.dir.copy().mult(this.factor * 2); //velocita' ottenuta moltiplicando fattore per la direzione
    this.scalingFactor = 1;
    this.color = color(Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256));
  }

  move(){
    this.scalingFactor = 1 + (bMaggiore/bMinore - 1)/tAltezza * (this.position.y - yOffset); //coefficiente dell'interpolazione lineare basata sulla distanza dell'ostacolo dall'osservatore
    this.position.add(this.vel.copy().mult(this.scalingFactor + speedDifficulty)); //la velocita' percepita corrisponde al vettore direzione moltiplicato per il fattore di scaling
  }
  show(){
    rect(this.position.x,this.position.y - dim * this.scalingFactor/2, dim * this.scalingFactor); //this.position.y - dim * this.scalingFactor serve perche' la base dell'ostacolo risulti centrata rispetto alla corsia secondo la prospettiva. La dimensione dell'ostacolo aumenta linearmente con l'avvicinamento dell'ostacolo all'osservatore
  }
}