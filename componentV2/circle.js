
var Circle = function(cx, cy, radius, svg){
    this.x = cx
    this.y = cy
    this.radius = radius
    this.name = "circle"
    this.component = document.createElementNS("http://www.w3.org/2000/svg", "g")
    this.circle = createCircle(this.x, this.y, this.radius, "white")
    //this.rectangleDashed = document.createElementNS("http://www.w3.org/2000/svg", "g")
    this.svg = svg
    this.pointsCTM = this.svg.createSVGPoint()
    this.circleClicked = false
    this.isMoving = false
    this.isRotating = false
    this.isResizing = false

    this.component.appendChild(this.circle)




    /*this.circle.addEventListener("mousedown", setupAction.bind(this))
    this.circle.addEventListener("mousemove", executeAction.bind(this))
    this.circle.addEventListener("mouseup", stopAction.bind(this))
    this.circle.addEventListener("mouseleave", stopAction.bind(this))*/

}

Circle.prototype.setPosition = function(posArray){ this.circle.setAttribute("posArray", posArray)}

Circle.prototype.getName = function() { return this.name }
Circle.prototype.getCx = function() { return this.x }
Circle.prototype.getCy = function() { return this.y }
Circle.prototype.getRadius = function() { return this.radius }
Circle.prototype.getCircle = function() { return this.circle }
Circle.prototype.getPosition = function() { return this.circle.attributes["posArray"].value}



Circle.prototype.getLimits = function(){
    return [this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2]
}

Circle.prototype.setRectangleDashed = function(){
    let limits = this.getLimits()
    let x = limits[0], y = limits[1], width = limits[2], height = limits[3]
    this.setLimitsFourPoints()
    this.rectangleDashed.appendChild(createPoint(width / 2 + x, y, 4, "blue"))
    this.rectangleDashed.appendChild(createPoint(x, height / 2 + y, 4, "blue"))
    this.rectangleDashed.appendChild(createPoint(x + width, height / 2 + y, 4, "blue"))
    this.rectangleDashed.appendChild(createPoint(width / 2 + x, y + height, 4, "blue"))
}

Circle.prototype.removeRectangleDashed = function(){
    this.circle.removeChild(this.circle.childNodes[this.circle.childNodes.length - 1])
}

Circle.prototype.setLimitsFourPoints = function(){
    let limits = this.getLimits()
    let x = limits[0], y = limits[1], width = limits[2], height = limits[3]
    this.rectangleDashed.appendChild(createRectDashed(x, y, width, height, "rectDashed"))
    this.rectangleDashed.appendChild(createPoint(x, y, 4, "blue"))
    this.rectangleDashed.appendChild(createPoint(x + width, y, 4, "blue"))
    this.rectangleDashed.appendChild(createPoint(x, y + height, 4, "blue"))
    this.rectangleDashed.appendChild(createPoint(x + width, y + height, 4, "blue"))
    this.rectangleDashed.appendChild(createLine(width / 2 + x, y, width / 2 + x, y - 20 ))
    let rotation = createCircle(width / 2 + x, y - 25, 4, "blue")
    rotation.setAttribute("tag_action", "rotating")
    this.rectangleDashed.appendChild(rotation)
    this.circle.setAttribute("rotate_dashed", "" + (width / 2 + x) + " " + (height / 2 + y))
}

Circle.prototype.moveTo = function(cursorX, cursorY){
    console.log(cursorX)
    console.log(cursorY)
    //this.circle.setAttribute("transform", "translate(" + (cursorX - this.x) + " " + (cursorY - this.y) + ")")
    //this.x += (cursorX - this.x)
    //this.y += (cursorY - this.y)
    this.circle.setAttribute("cx", cursorX)
    this.circle.setAttribute("cy", cursorY)
}

Circle.prototype.rotate = function(cursorX, cursorY){
    console.log("X: " + this.x)
    console.log("Y: " + this.y)

    let angle = Math.atan2(cursorY - this.y, cursorX - this.x)
    let degrees = angle * 180 / Math.PI + 90;
    this.circle.setAttribute("transform", "rotate(" + degrees + " " + this.x + " " + this.y +  ")")
}

Circle.prototype.getSuperParentNode = function(){
    let component = this.circle
    while(component.parentNode.tagName !== "svg"){
        component = component.parentNode
    }
    this.svg = component.parentNode
}


function showLimits(){
    if(!this.circleClicked){
        this.setRectangleDashed()
        this.circle.appendChild(this.rectangleDashed)
        this.circleClicked = true
    }else{
        this.circle.setAttribute("selected", "false")
        this.removeRectangleDashed()
        this.circleClicked = false
    }
}


function setupAction(event){
    console.log("Estoy en setupAction de circulo")
    console.log(event)
    if(event.target.attributes["tag_action"] == undefined){
        this.isMoving = true
        this.circleClicked = true
        if(this.circle.childNodes[this.circle.childNodes.length - 1].childNodes.length < 1){
            this.setRectangleDashed()
            this.circle.appendChild(this.rectangleDashed)
        }
    }else if(event.target.attributes["tag_action"].value == "rotating"){
        this.isRotating = true
        let cursorPoint = this.pointsCTM.matrixTransform(this.svg.getScreenCTM().inverse())
        this.rotate(cursorPoint.x, cursorPoint.y)
    }else if(event.target.attributes["tag_action"].value == "resizing"){
        this.isResizing = true
    }
}

function executeAction(event){
    this.pointsCTM.x = event.clientX
    this.pointsCTM.y = event.clientY
    if(this.isMoving){
        let cursorPoint = this.pointsCTM.matrixTransform(this.svg.getScreenCTM().inverse())
        this.moveTo(cursorPoint.x, cursorPoint.y)
    }else if(this.isRotating){
        
    }else if(this.isResizing){
        //we don't know yet how to do it here
    }
}

function stopAction(event){
    this.isMoving = false
    this.isRotating = false
    this.isResizing = false
}


//helpers
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
