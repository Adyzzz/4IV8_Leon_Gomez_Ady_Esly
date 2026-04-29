function validarn(evento){
    var teclado = (document.all)?evento.KeyCode:evento.which;
    if(teclado == 8) return true;
    //creo mi expresion regular
    var patron = /[0-9\d]/

    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}   

function interes(){
    var valor = document.getElementById('cantidadi').value;
    
    var interes = parseFloat(valor);
    var subtotal = interes * .10;
    var total = subtotal + interes;

    document.getElementById('sueldoi').value = "$ " + total;
}

function borrar(){
    document.getElementById('sueldoi').value ="";
    document.getElementById('cantidadi').value ="";
}