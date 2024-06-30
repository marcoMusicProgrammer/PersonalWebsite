var ctx = document.querySelector("canvas").getContext("2d");

function setup() {
                
            frameRate(30)

}

let write = ["Benvenuto","Welcome","Bievenue","Bienvenido"]
let color = ["white","red","black","purple"]

function welcome(name,color,x_pos,y_pos){

                                    // ctx.strokeWeight(2)
                                    // ctx.fillStyle = "purple"
                                    // ctx.rect(x_pos,y_pos,20,20)
                                    // ctx.fill()
                                    ctx.fillStyle = color;
                                    ctx.font = "bold 50px serif";
                                    ctx.fillText(name,x_pos,y_pos,)
}


function draw() {

                let x = Math.floor(Math.random()*4)

                welcome(write.at(x),color.at(x),random(-100,windowWidth),random(-10,windowHeight))

}
