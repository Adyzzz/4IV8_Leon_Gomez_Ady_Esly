var instrucciones = [
    "Utiliza las flechas de navegcaión para mover las piezas",
    "Para ordenas las piezas guiate por la imagen Objetico"
];

//Para fuardar los movimientos necesitammos una areglo
var movimientos =[];

//tengo que saber cuales son las posiciones del rompecabezas original.
var rompe = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

//necesito otra variable ára saber que orden del rompecabezas es el correcto
var rompeCorrecta = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

// necesito conocer la posición de la ficha/pieza vacia
var filaVacia = 2;
var columnaVacia = 2;

//necesito una funcioón que se encargue de mostrar la lista de isntrucciones
function mostrarInstrucciones(instrucciones){
    for(var i = 0; i < instrucciones.length; i++){
        mostrarInstruccionesLista(instrucciones [i],"lista.instrucciones")
    }
}

function mostrarInstrucciones(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;

    ul.appendChild(li);
}