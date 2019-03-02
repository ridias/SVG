

var View = function(name){
    this.name = name
    this.view = document.createElementNS('http://www.w3.org/2000/svg', "svg")
    this.components = []


    this.view.setAttribute("width", "800")
    this.view.setAttribute("height", "800")
    
}

View.prototype.setView = view => this.view = view

View.prototype.getView = function(){
    return this.view
}

View.prototype.addComponentToSVG = function(component){
    this.view.appendChild(component)
}

View.prototype.addComponent = function(){
    this.components.push()
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

window.onload = function(){
    console.log("Esta funcionando hasta ahora")
    let myView = new View("my-project")
    console.log("Por aqui tambien esta funcionando")
    console.log(myView.getView())
    //testing
    let circle = new Circle(200, 200, 50, myView.getView())
    myView.addComponentToSVG(circle.getCircle())
    document.body.appendChild(myView.getView())
    
    
    
    
    
    
    
    
    
    let example = 
    "<svg width='500' height='500'>" +
        "<g component='circle'>" +
            "<circle cx='50' cy='50' r='20'></circle>"+
        '</g>'+
    '</svg>'

    myView.disassembleTextSVG(example)
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

