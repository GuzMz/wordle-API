const API= "https://random-word-api.herokuapp.com/word?length=5&lang=es";

let diccionario = ["APPLE", "ANGEL", "MOUSE", "HOUSE", "PLATE", "PLACE"]
let random = Math.random()*diccionario.length //numero aleatorio entre 0 y 5
random = Math.floor(random)
let palabraSecreta = diccionario[random]

fetch(API).then((response)=>{
    response.json()
    .then((data)=>{
        palabraSecreta = data[0].toUpperCase()
        console.log("Word (for debug purposes): "+data)
})})

let oportunidades = 6;
attemptTicker("Intentos: "+oportunidades)

let button = document.getElementById("guess-button")
let input = document.getElementById("guess-input")
let replayButton = null;
let grid = document.getElementById("grid")

button.addEventListener("click", enter)

function enter(){
    let intento = input.value.toUpperCase()
    if (intento.length == 5){
        const GRID = document.getElementById("grid");
        let row = document.createElement("div")
        row.className = "row"
        
        for (let i in palabraSecreta){
            let letra = document.createElement("span")
            letra.className = "letter"
            letra.innerHTML = intento[i]
            row.appendChild(letra)
            if (palabraSecreta[i] == intento [i]){
                letra.style.backgroundColor = "lightgreen";
            } else if(palabraSecreta.includes(intento[i])){
                letra.style.backgroundColor = "yellow";
            } else{
                letra.style.backgroundColor = "lightgray";
            }
        }
        GRID.appendChild(row)
        oportunidades--
        attemptTicker("Intentos: "+oportunidades)
        if(oportunidades == 0){
            gameOver("Perdiste");
        }
        if (intento == palabraSecreta){
            gameOver("Ganaste")
        }
    } else {
        alert("Entrada no válida. Por favor ingrese una palabra con 5 letras.");
    }
}

function gameOver(mensaje){
    button.disabled = true;
    input.disabled = true;
    let contenedor = document.getElementById("guesses");
    contenedor.innerHTML = "<h3>" + mensaje + "</h3>";
    
    let reintento = document.createElement("button");
    reintento.id = "retry-button";
    let texto = document.createTextNode("Jugar de nuevo");
    reintento.appendChild(texto)

    let lugar = document.getElementById("retry-location");
    lugar.appendChild(reintento);
    replayButton = document.getElementById("retry-button");
    replayButton.addEventListener("click", playAgain)
}

function attemptTicker(mensaje){
    let contenedor = document.getElementById("guesses");
    contenedor.innerHTML = "<h3>" + mensaje + "</h3>";
}

function playAgain(){
    fetch(API).then((response)=>{
        response.json()
        .then((data)=>{
            palabraSecreta = data[0].toUpperCase()
            console.log("Word (for debug purposes): "+data)
    })})
    button.disabled = false;
    input.disabled = false;
    
    oportunidades = 6;
    attemptTicker("Intentos: "+oportunidades)
    
    grid = document.getElementById("grid")
    grid.remove();
    let reintento = document.getElementById("retry-button");
    reintento.remove();
    console.log("Works (debug)");
    
    let recreateGrid = document.createElement("div");
    recreateGrid.id = "grid";
    let lugar = document.getElementById("supergrid");
    lugar.appendChild(recreateGrid);
}