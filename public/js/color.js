const colorChange = document.getElementById("li")
const title1 = document.getElementById("titolooo")

let colors = ["blue","red","orange","purple","yellow"]
let counter = 0

function changeColor() {

    counter = (counter + 1) % 5
    title1.style.color = colors[counter]

}

colorChange.onclick = ()=>{changeColor()}