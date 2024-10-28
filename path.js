class Path{
  constructor(x1,y1,x2,y2){
    this.start = createVector(x1,y1); //vettore contenente le coordinate del punto di partenza del segmento
    this.end = createVector(x2,y2); //vettore contenente le coordinate del punto di arrivo del segmento
  }
  show(){
    stroke(100);
    strokeWeight(2);
    line(this.start.x,this.start.y,this.end.x,this.end.y);
  }
  dist(){
    return  Math.sqrt(Math.pow((this.start.x-this.end.x),2) + Math.pow((this.start.y-this.end.y),2));
  }
}