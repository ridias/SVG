//const Circle = require("../components/circlev.js")

window.onload = function(){
    let viewObject = new ViewProject()
    let view = viewObject.getView()
    //let line = new Line(100,100, 80, 80)
    //let circle2 = new Circle(200, 200, 40)

    let rectangleDashed = new RectangleDashed(100, 100, 200, 200)
    document.getElementById("x").innerHTML = 0
    document.getElementById("y").innerHTML = 0
    //circle2.addText("Text")
    //view.appendChild(circle2.getCircle())
    //view.appendChild(line.getLine())

    view.appendChild(rectangleDashed.getRectangleDashed())
    document.body.appendChild(view)
}


var ViewProject = function(name){
    this.name = name
    this.isNotRotating = true
    this.isNotResizing = true
    this.isNotMoving = true
    this.selectedElement = null
    this.view = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    this.view.setAttribute("width", 800)
    this.view.setAttribute("height", 800)
    this.view.setAttribute("id", "view")
    this.view.setAttribute("viewBox", "0 0 800 800")


    this.view.addEventListener("mousedown", (event) => {
        if(event.target.tagName == "svg"){
            //remove all limits
            event.preventDefault();
        }else if(event.target.attributes["tag_action"] == undefined){
            this.isNotMoving = false
            this.points = this.view.createSVGPoint()
            this.selectedElement = getGroupComponent(event.target) 
        }else if(event.target.attributes["tag_action"].value == "rotating"){
            this.isNotRotating = false
            this.points = this.view.createSVGPoint()
            this.selectedElement = getGroupComponent(event.target)
        }else if(event.target.attributes["tag_action"].value == "resizing"){
            this.isNotResizing = false   
            this.selectedElement = event.target
            this.points = this.view.createSVGPoint()
        }
    })
    
    
    this.view.addEventListener("mousemove", (event) => { 
        document.getElementById("x").innerHTML = event.clientX
        document.getElementById("y").innerHTML = event.clientY
        if(!this.isNotMoving){
            let cursorPoint = this.getCursorPoints(event)
            moving(this.selectedElement, cursorPoint.x, cursorPoint.y)
        }else if(!this.isNotRotating){
            let cursorPoint = this.getCursorPoints(event)
            rotating(this.selectedElement, cursorPoint.x, cursorPoint.y)
        }else if(!this.isNotResizing){
            let cursorPoint = this.getCursorPoints(event)
            this.selectedElement.setAttribute("cx", cursorPoint.x)
            this.selectedElement.setAttribute("cy", cursorPoint.y)
            
        }
    })

    this.view.addEventListener("mouseup", (event) => {
        this.isNotRotating = true
        this.isNotResizing = true
        this.isNotMoving = true
        console.log(this.selectedElement)
        this.selectedElement = null
    })

    this.view.addEventListener("mouseleave", (event) =>{
        this.isNotRotating = true
        this.isNotResizing = true
        this.isNotMoving = true
        console.log(this.selectedElement)
        this.selectedElement = null
    })
}

ViewProject.prototype.getView = function(){
    return this.view
}

ViewProject.prototype.addComponentSVG = function(component){
    this.view.appendChild(component)
}

ViewProject.prototype.getCursorPoints = function(event){
    this.points.x = event.clientX
    this.points.y = event.clientY
    return this.points.matrixTransform(this.view.getScreenCTM().inverse());
}


function moving(element, towardsX, towardsY){
    let xy = element.attributes["origin"].value.split(" ")
    document.getElementById("x").innerHTML = towardsX + " y el resto es de " + (towardsX - xy[0])
    document.getElementById("y").innerHTML = towardsY + " y el resto es de " + (towardsY - xy[1])
    element.setAttribute("transform", "translate(" + (towardsX - xy[0]) + " " + (towardsY - xy[1]) + ") rotate(" + element.attributes["degrees"].value + " 200 200)")
    element.setAttribute("translation_remain", (towardsX - xy[0]) + " " + (towardsY - xy[1]))
    element.setAttribute("rotate_dashed", towardsX + " " + towardsY)
    this.circle.setAttribute("cx", towardsX)
    this.circle.setAttribute("cy", towardsY)
    
}

function rotating(element, towardsX, towardsY){
    let xy = element.attributes["rotate_dashed"].value.split(" ")
    document.getElementById("towardX").innerHTML = "TowardX: " + xy[0]
    document.getElementById("towardY").innerHTML = "TowardY: " + xy[1]
    var angle = Math.atan2(towardsY - xy[1], towardsX - xy[0])
    document.getElementById("angle").innerHTML = "Angle: " + angle
    var degrees = angle * 180 / Math.PI + 90 ;
    document.getElementById("degrees").innerHTML = "Degrees: " + degrees
    element.setAttribute("degrees", degrees)
    element.setAttribute("transform", "rotate(" + degrees + " " + xy[0] + " " + xy[1] + ") translate(" + element.attributes["translation_remain"].value + ")")
}

function resizing(){
    
}

function getGroupComponent(element){
    let group = null
    while(element.parentNode.tagName != "svg"){
        group = element.parentNode
        element = element.parentNode
    }
    return group
}

/*ViewProject.prototype.removeAllLimitsFromComponents = function(event){
    if(event.target.tagName !== "svg"){ return ; }
    for(let i = 0; i < event.target.childNodes.length; i++){
        if(event.target.childNodes[i].nodeName !== "g"){ continue }
        if(event.target.childNodes[i].getAttribute("selected") == null){ continue }
        if(event.target.childNodes[i].getAttribute("selected") == "true"){
            let group = event.target.childNodes[i]
            for(let i = 0; i < 11; i++)
                group.removeChild(group.childNodes[group.childNodes.length - 1])
            
            event.target.childNodes[i].setAttribute("selected", "false")
        }
    }
    this.view = event.target
}*/