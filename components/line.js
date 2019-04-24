var Line = function(x1, y1, x2, y2){

    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2

    this.line = document.createElementNS("http://www.w3.org/2000/svg", "g")

    this.line.appendChild(createLine(x1,y1,x2,y2))
}

Line.prototype.getLine = function(){ return this.line}

Line.prototype.setLimits = function(){

}


function createLine(x1,y1,x2,y2){
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line.setAttribute("x1", x1)
    line.setAttribute("y1", y1)
    line.setAttribute("x2", x2)
    line.setAttribute("y2", y2)
    line.setAttribute("stroke", "black")
    return line
}