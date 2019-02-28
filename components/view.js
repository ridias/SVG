//const Circle = require("../components/circlev.js")

window.onload = function(){
    let viewObject = new ViewProject()
    let view = viewObject.getView()
    let circle1 = new Circle(50, 50, 30)
    let circle2 = new Circle(200, 200, 40)
    circle1.addText("Text")
    circle2.addText("Text")
    view.appendChild(circle1.getCircle())
    view.appendChild(circle2.getCircle())
    document.body.appendChild(view)
}


var ViewProject = function(name){
    this.name = name
    this.isNotRotating = true
    this.isNotResizing = true
    this.isNotMoving = true
    this.points = null
    this.selectedElement = null
    this.view = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    this.view.setAttribute("width", 800)
    this.view.setAttribute("height", 800)

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
            this.selectedElement = getGroupComponent(event.target)
        }
    })
    
    
    this.view.addEventListener("mousemove", (event) => { 
        if(!this.isNotMoving){
            let cursorPoint = this.getCursorPoints(event)
            moving(this.selectedElement, cursorPoint.x, cursorPoint.y)
        }else if(!this.isNotRotating){
            let cursorPoint = this.getCursorPoints(event)
            rotating(this.selectedElement, cursorPoint.x, cursorPoint.y)
        }else if(!this.isNotResizing){
            console.log("Start resizing element")
            console.log(this.selectedElement)
        }
    })

    this.view.addEventListener("mouseup", (event) => {
        this.isNotRotating = true
        this.isNotResizing = true
        this.isNotMoving = true
        //this.selectedElement.setAttribute("rotation", this.selectedElement.attributes["rotation"].value)
        //this.selectedElement.setAttribute("translation", this.selectedElement.attributes["translation"].value)
        console.log(this.selectedElement)
        this.selectedElement = null
    })

    this.view.addEventListener("mouseleave", (event) =>{
        this.isNotRotating = true
        this.isNotResizing = true
        this.isNotMoving = true
        //this.selectedElement.setAttribute("rotation", this.selectedElement.attributes["rotation"].value)
        //this.selectedElement.setAttribute("translation", this.selectedElement.attributes["translation"].value)
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
    let xy = element.attributes["rotate_dashed"].value.split(" ")
    //element.setAttribute("translation", "" + (towardsX - xy[0]) + " " + (towardsY - xy[1]))
    element.setAttribute("transform", "translate(" + (towardsX - xy[0]) + " " + (towardsY - xy[1]) + ")")
}

function rotating(element, towardsX, towardsY){
    let xy = element.attributes["rotate_dashed"].value.split(" ")
    var angle = Math.atan2(towardsY - xy[1], towardsX - xy[0])
    var degrees = angle * 180 / Math.PI + 90;
    //element.setAttribute("rotation", "" + degrees + " " + xy[0] + " " + xy[1])
    element.setAttribute("transform", "rotate(" + degrees + ") translate(" + element.attributes["translation"].value+ ")")
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