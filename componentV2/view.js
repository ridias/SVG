

var View = function(name){
    this.name = name
    this.view = document.createElementNS('http://www.w3.org/2000/svg', "svg")
    this.components = []
    this.positionComponentClicked = -1
    this.selectedComponent = null
    this.view.setAttribute("width", "800")
    this.view.setAttribute("height", "800")


    this.view.addEventListener("click", getPositionFromTheArrayComponent.bind(this))

    this.view.addEventListener("mousedown", setupAction)
    this.view.addEventListener("mousemove", executeAction)
    this.view.addEventListener("mouseup", stopAction)
    this.view.addEventListener("mouseleave", stopAction)
    
}

View.prototype.setView = function(view){ this.view = view }

View.prototype.getView = function(){ return this.view }

View.prototype.addComponentToSVG = function(componentSVG){
    this.view.appendChild(componentSVG)
}

View.prototype.addComponent = function(component){
    this.components.push(component)
}

View.prototype.getComponent = function(position){
    return this.component[position]
}

View.prototype.getPositionForComponent = function(){
    return this.components.length
}

View.prototype.updateEvents = function(){
    /*this.view.addEventListener("mousedown", setupAction.bind(this.selectedComponent))
    this.view.addEventListener("mousemove", executeAction.bind(this.selectedComponent))
    this.view.addEventListener("mouseup", stopAction.bind(this.selectedComponent))
    this.view.addEventListener("mouseleave", stopAction.bind(this.selectedComponent))*/
}


View.prototype.disassembleTextSVG = function(text){
    text = text.replace(/[<>]/g, " ")
    text = text.split(/[ ]+/)
    text.shift()
    text.pop()
    console.log(text)

    for(let i = 0; i < text.length; i++){
        
    }
}

View.prototype.setActionsToComponents = function(components){
    
}

function setupAction(event){
    console.log("Estamos dentro de setupAction")
    console.log(event)
}

function executeAction(event){
    console.log("Estamos dentro de executeAction")
    console.log(event)
}

function stopAction(event){
    console.log("Estamos dentro de stop action")
    console.log(event)
}

function getPositionFromTheArrayComponent(event){
    let component = event.target
    while(component.parentNode.tagName !== "svg"){
        component = component.parentNode
    }
    this.positionComponentClicked = component.attributes["posArray"].value
    this.selectedComponent = this.components[this.positionComponentClicked]
    console.log(this.components)
    console.log(this.selectedComponent)
}



window.onload = function(){
    console.log("Esta funcionando hasta ahora")
    let myView = new View("my-project")
    //testing
    let circle = new Circle(200, 200, 50, myView.getView())
    circle.setPosition(myView.getPositionForComponent())
    myView.addComponent(circle)
    myView.addComponentToSVG(circle.getCircle())
    document.body.appendChild(myView.getView())
    
    
    
    
    
    
    
    
    
    let example = 
    "<svg width='500' height='500'>" +
        "<g component='circle'>" +
            "<circle cx='50' cy='50' r='20'></circle>"+
        '</g>'+
    '</svg>'

    //myView.disassembleTextSVG(example)
}
        




//Se necesitara clases que puedan establecer las acciones tipicas de un componente
// Por ejemplo: establecer los limites del componente, moverlo, rotar, redimensionar...

/*
    <svg width=500 height="500">
        <g component="circle">
            <circle> ... 
        </g>

        <g component="complex">
            <g component="circle">..
            <g component="rect">...
            <g component="circle">...
        </g>
    </svg>

*/

