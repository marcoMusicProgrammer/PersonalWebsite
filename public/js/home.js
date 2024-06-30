let buttonZoom1 = document.getElementById("button-zoom-1")
let buttonZoom2 = document.getElementById("button-zoom-2")
let text = document.getElementById("body-section")

let zoom = 1

function zoomIn() {

    zoom = zoom + 0.1
    text.style.transform = `scale(${zoom})`

    console.log("ciao")
    
}

function zoomOut() {

    zoom = zoom - 0.1
    text.style.transform = `scale(${zoom})`

}


buttonZoom1.onclick = ()=> {zoomIn()}
buttonZoom2.onclick = ()=> {zoomOut()}