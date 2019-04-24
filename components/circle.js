var Circle = function(x, y, radius){
    this.name = "circle"
    this.circle = document.createElementNS("http://www.w3.org/2000/svg", "g")
    this.circleClicked = false
    this.group = document.createElementNS("http://www.w3.org/2000/svg", "g")
    this.x = x
    this.y = y
    this.r = radius
    this.circle.setAttribute("origin", x + " " + y)
    this.circle.setAttribute("translation_remain", "0 0")
    this.circle.setAttribute("degrees", "0")
    this.circle.setAttribute("rotate_dashed", x + " " + y)
    this.circle.setAttribute("role", "main")
    this.circle.appendChild(createCircle(x, y, radius, "transparent"))

    this.circle.addEventListener("mousedown", showLimits.bind(this))
}

Circle.prototype.getCircle = function(){
    return this.circle
}

Circle.prototype.getLimits = function(){
    return [this.x - this.r, this.y - this.r, this.r * 2, this.r * 2]
}

Circle.prototype.setLimits = function(){
    limits = this.getLimits()
    x = limits[0], y = limits[1], width = limits[2], height = limits[3]
    this.setLimitsFourPoints()
    this.group.appendChild(createPoint(width / 2 + x, y, 4, "blue"))
    this.group.appendChild(createPoint(x, height / 2 + y, 4, "blue"))
    this.group.appendChild(createPoint(x + width, height / 2 + y, 4, "blue"))
    this.group.appendChild(createPoint(width / 2 + x, y + height, 4, "blue"))
}

Circle.prototype.setLimitsFourPoints = function(){
    limits = this.getLimits()
    x = limits[0], y = limits[1], width = limits[2], height = limits[3]
    this.group.appendChild(createRectDashed(x, y, width, height, "rectDashed"))
    this.group.appendChild(createPoint(x, y, 4, "blue"))
    this.group.appendChild(createPoint(x + width, y, 4, "blue"))
    this.group.appendChild(createPoint(x, y + height, 4, "blue"))
    this.group.appendChild(createPoint(x + width, y + height, 4, "blue"))
    this.group.appendChild(createLine(width / 2 + x, y, width / 2 + x, y - 20 ))
    let rotation = createCircle(width / 2 + x, y - 25, 4, "blue")
    rotation.setAttribute("tag_action", "rotating")
    this.group.appendChild(rotation)
}

Circle.prototype.removeLimits = function(){
    this.circle.removeChild(this.circle.childNodes[this.circle.childNodes.length - 1])
}

Circle.prototype.addText = function(value){
    let text = createText(this.x + 30, this.y + 30, value)
    this.circle.appendChild(text)
    
}

function showLimits(){
    if(!this.circleClicked){
        this.circle.setAttribute("selected", "true")
        this.setLimits()
        this.circle.appendChild(this.group)
        this.circleClicked = true
    }/*else{
        this.circle.setAttribute("selected", "false")
        this.removeLimits()
        this.circleClicked = false
    }*/
}


function createCircle(x, y, radius, color){
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circle.setAttribute("cx", x)
    circle.setAttribute("cy", y)
    circle.setAttribute("r", radius)
    circle.setAttribute("fill", color)
    circle.setAttribute("stroke", "black")
    return circle
}

function createPoint(x, y, radius, color){
    let circle = createCircle(x, y, radius, color)
    circle.setAttribute("tag_action", "resizing")
    return circle
}

function createRectDashed(x, y, width, height, style){
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rect.setAttribute("x", x)
    rect.setAttribute("y", y)
    rect.setAttribute("width", width)
    rect.setAttribute("height", height)
    rect.setAttribute("class", style)
    return rect
}

function createLine(x1, y1, x2, y2){
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line.setAttribute("x1", x1)
    line.setAttribute("x2", x2)
    line.setAttribute("y1", y1)
    line.setAttribute("y2", y2)
    line.setAttribute("stroke", "black")
    line.setAttribute("stroke-width", 0.5)
    return line
}

function createText(x, y, value){
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text")
    text.setAttribute("x", x)
    text.setAttribute("y", y)
    text.innerHTML = value
    return text
}

//module.exports = Circle