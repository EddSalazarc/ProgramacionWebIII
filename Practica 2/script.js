function ponerCantidad(){
    document.getElementById("cantidadProducto").value=0;
}
ponerCantidad();


function ponerValores(x) {

    var nombre = document.getElementById("nombre"+x).innerText;
    var precio = document.getElementById("precio"+x).innerText;
  
    document.getElementById("ponerNombre").value = nombre;
    document.getElementById("ponerPrecio").value = precio;
    ponerCantidad();
    document.getElementById("totalPrecio").value="";
}

function limpiar(){
    event.preventDefault();
    document.getElementById("formulario").reset();
    ponerCantidad();
}

function calcular(){
    event.preventDefault();//no reset
    const cantidad = parseInt(document.getElementById("cantidadProducto").value);
    const precio =parseInt(document.getElementById("ponerPrecio").value);
            if(cantidad>0 && precio>0)
            {
                const total = precio * cantidad;
                document.getElementById("totalPrecio").value=total+"$";
            }
            else
            {
                alert("ingrese datos validos!")
            }

}






/*AVERIGUAR
const cantidadInput = document.getElementById("cantidad-producto");
    const precioUnitario = document.getElementById("poner-precio").innerText;
    const precioTotal = document.getElementById("total-precio");

    // Función para actualizar el precio total
    function actualizarPrecio() {
        const cantidad = cantidadInput.value;  // Obtener la cantidad seleccionada
        const total = cantidad * precioUnitario;  // Calcular el total
        precioTotal.innerText = total;  // Actualizar el precio total en la interfaz
    }

    // Detectar cuando cambia la cantidad
    cantidadInput.addEventListener("input", actualizarPrecio);

    // Llamar a la función para inicializar el precio total
    actualizarPrecio();
    */