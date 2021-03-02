/*ALICIA MARTÍNEZ LÓPEZ - Desarrollo Full-Stack (GR1)*/ 

//Determinamos las variables 
var numero_dni = document.getElementById("numero_dni");
var letra_dni = document.getElementById("letra_dni");
var submit_dni = document.getElementById("submit_dni");
var reintentar = document.getElementById("reintentar");

//Añadimos los arrays con las letras establecidas tanto en mayúsuclas como en minúsculas
var letraNumero = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];
var letraNumeroMinuscula = ["t","r","w","a","g","m","y","f","p","d","x","b","n","j","z","s","q","v","h","l","c","k","e"];

//Creamos una función que se ejecutará al pulsar el botón
submit_dni.onclick = function(){
    //Comprobamos los datos
    comprobarDatos();
};

//Añadimos un evento: al pulsar enter en el input letra se envían los datos
letra_dni.addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {
        //Comprobamos los datos
        comprobarDatos();
    }
});

//Añadimos un evento: al pulsar enter en el input nuúmero se envían los datos
numero_dni.addEventListener("keypress", function(e){
    if (e.keyCode === 13) {
        //Comprobamos los datos
        comprobarDatos();
    }
});

//Creamos una función que se ejecutará al clickar enter
letra_dni.onkeypress = function(){
    if(characterCode == 13) {
        //Comprobamos los datos
        comprobarDatos();
    }
};

//Generamos la función que comprobará los datos introducidos 
function comprobarDatos() {
    //Generamos las variables locales de texto de los errores
    var error_rellenarNumero = "";
    var error_rellenarLetra = "";
    var error_caracteresNumero = "";
    var error_caracteresLetra = "";
    var error_numeroLetra = "";
    var error_letraNumero = "";

    var numeros = /^[0-9]+$/;
    var letras = /^[A-Za-z]+$/;

    if (numero_dni.value == "") { //El número del dni no pueden estar vacía
        error_rellenarNumero = " Debes rellenar el campo del número del DNI.";
        numero_dni.value = "";
    } else { //Si hay contenido en el input, se pasan a las siguientes comprobaciones
        if (numero_dni.value.length > 8 || numero_dni.value.length < 8 ) { //El número del DNI debe contener  8 caracteres
            error_caracteresNumero = " El número del DNI debe tener 8 caracteres.";
            numero_dni.value = "";
        }
        else if (numero_dni.value.match(letras)) { //El número del DNI no pueden ser letras
            error_numeroLetra = " El número del DNI no puede contener letras.";
            numero_dni.value = "";
        }
    }
    
    if (letra_dni.value.length > 1) { //La letra del DNI no puede ser más de una
        error_caracteresLetra = " La letra del DNI debe tener 1 caracter.";
        letra_dni.value = "";
    } else if (letra_dni.value.match(numeros)) { //El número del DNI no pueden ser letras
        error_letraNumero = " La letra del DNI no puede contener números.";
        letra_dni.value = "";
    }

    /*La función devolverá un String (que se mostrará en un alert) que incluirá una lista de todos los errores
    De esta forma evitamos cantidad innecesaria de alerts seguidos.*/
    if(error_rellenarNumero != "" || error_rellenarLetra != "" || error_caracteresNumero != "" || error_caracteresLetra != "" || error_numeroLetra != ""  || error_letraNumero != "" ) {
        alert("Se encuentran los siguientes errores: " + error_rellenarNumero + error_letraNumero + error_caracteresNumero + error_rellenarLetra + error_caracteresLetra + error_numeroLetra);
    } else { //Si no hay errores, calculamos el valor de la letra
        calcularLetra();
    }
}

function calcularLetra() {
    //Dividimos el valor recibido entre 23
    var resultado_obtenido = numero_dni.value%23;
    //Recibimos el valor del input letra
    var letra_obtenida = letra_dni.value;
    //Localizamos donde irá el resultado
    var H1_resultado = document.getElementById("resultado");
    var p_resultado = document.getElementById("coincide");

    for(var i = 0; i < letraNumero.length; i++){ //Revisamos todas las posiciones del array
        if(i==resultado_obtenido){ //Si la posición del array coincide con el obtenido...
            if (letraNumero[i]==letra_obtenida || letraNumeroMinuscula[i]==letra_obtenida) {//... y si el valor de la letra coincide con la recibida...
                H1_resultado.innerHTML = "La letra que encaja con tu número es " + letraNumero[i];
                p_resultado.innerHTML = "¡Coincide con la obtenida!";
                p_resultado.style.color = "green";
                reintentar.style.display = "block";
            } else {
                H1_resultado.innerHTML = "La letra que encaja con tu número es " + letraNumero[i];
                p_resultado.innerHTML = "NO Coincide con la obtenida :(";
                p_resultado.style.color = "red";
                reintentar.style.display = "block";
            }
        }
    }
}

//Si hacemos click en reintentar se reinicia la página
reintentar.onclick = function(){
    location.reload();
};