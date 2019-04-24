//Este componente representara una clase que representara el rectangle dashed donde dentro tendra el rectangulo, los puntos y el texto

var RectangleDashed = function(x, y, width, height){
    this.group = document.createElementNS("http://www.w3.org/2000/svg", "g")
    this.rect = createRect(x, y, width, height)
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    this.setDiagonalPoints()

    this.group.appendChild(this.rect)
}

RectangleDashed.prototype.setDiagonalPoints = function(){
    this.group.appendChild(createPoint(this.x, this.y, 5))
    this.group.appendChild(createPoint(this.x + this.width, this.y, 5))
    this.group.appendChild(createPoint(this.x, this.y+ this.height, 5))
    this.group.appendChild(createPoint(this.x + this.width, this.y+ this.height, 5))
}

RectangleDashed.prototype.setPoints = function(){

}

RectangleDashed.prototype.resize = function(){

}

RectangleDashed.prototype.updateCoordinatesPoint = function(point, x, y){
    
}

RectangleDashed.prototype.getRectangleDashed = function(){
    return this.group
}

function createPoint(x, y, radius){
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circle.setAttribute("cx", x)
    circle.setAttribute("cy", y)
    circle.setAttribute("r", radius)
    circle.setAttribute("fill", "black")
    circle.setAttribute("stroke", "black")
    circle.setAttribute("tag_action", "resizing")
    return circle
}

function createRect(x, y, width, height){
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rect.setAttribute("x", x)
    rect.setAttribute("y", y)
    rect.setAttribute("width", width)
    rect.setAttribute("height", height)
    rect.setAttribute("stroke", "black")
    rect.setAttribute("fill", "transparent")
    return rect
}

