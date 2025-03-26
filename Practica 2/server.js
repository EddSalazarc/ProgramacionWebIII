const express=require("express");// para configurar el puerto guardamos la libreria en una constante
const mysql = require("mysql");
const app = express(); //para acceder a su metodos

let conexion =mysql.createConnection({
    host:"localhost",
    database:"web3",
    user:"root",
    password:"",
})

// Medir el tiempo de ejecución de la consulta
console.time("Tiempo de ejecución");

    //inicio con esto hacemos visible nuestro proyecto
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
//fin

//cuando se preciona el boton mandamos los datos mediante la acción validar  con el metodo post

app.post("/validar", function(req,res) {
    console.timeEnd("Tiempo de ejecución"); // Imprime el tiempo en milisegundos

    const datos = req.body;//guardamos en una variable todo lo que tiene el body
    let nombreProducto =datos.ponerNombre;
    let cantidadProduc =datos.cantidadProducto;
    let precioProducto =datos.ponerPrecio;
    let totalProducto =datos.totalPrecio;

    //datos usuario
    let nombre  = datos.nombreUser;
    let apellido = datos.apelliUser;
    let carnet   = datos.ciUser;
    
    let registrar ="INSERT INTO venta(nombre,cantidad,precio,total) VALUES ('"+nombreProducto+"','"+cantidadProduc+"','"+precioProducto+"','"+totalProducto+"')"; 

    let usuario="INSERT INTO persona(id_persona,nombre,apellido) VALUES ('"+carnet+"','"+nombre+"','"+apellido+"')";
    conexion.query(registrar,function(error){
        if(error)
        {
            throw error;
        }
        else
        {
            console.log("datos del producto almacenados correctamente");
        }
    });

    conexion.query(usuario,function(error){
        if(error)
        {
            throw error;
        }
        else
        {
            console.log("datos del usuario almacenados correctamente");
        }
    });

});

app.listen(3000,function(){
    console.log("servidor creado correctamente en el puerto http://localhost:3000");
});
