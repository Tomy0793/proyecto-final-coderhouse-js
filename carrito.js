
// Modal para carrito
const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementsByClassName("close")[0];

//obtener datos carro
const vaciarCarro = document.getElementById("vaciar-carro")
const eliminarProducto = document.querySelector(".modal-content")
const confirmarCompra = document.getElementById("carrito-acciones-comprar")
let carroVacio = true
    
// Abrir modal al hacer clic en el botón
openModalBtn.addEventListener("click", () => {
modal.style.display = "block"
});

// Cerrar modal al hacer clic en la "x"
closeModalBtn.addEventListener("click", () => {
modal.style.display = "none"
})

// Cerrar modal al hacer clic fuera del contenido del modal
window.addEventListener("click", (event) => {
if (event.target === modal) {
    modal.style.display = "none"
}
})


//funcion que elimina array carro completo
const actualizarCarro = () =>{
    listadoProductosCarrito.innerHTML = ""
            carroCompras = []
            precioTotalCarro = 0
            precioTotal.innerText = "$" + precioTotalCarro
            cantidadCarro = 0
            productosCarro.innerText = cantidadCarro
            carroVacio = true
}

//Borrar total carro
vaciarCarro.addEventListener("click", () =>{
    if(carroVacio == true){
        Swal.fire(
            'Carro vacio',
            'Vuelve al sector de productos para agregarlos',
            'warning'
          )
    }else{     
    
    Swal.fire({
        title: 'Queres vaciar todo el carro?',
        text: "Presiona nuevamente vaciar para hacerlo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Vaciar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Carro Vaciado',
                'Su carro fue vaciado satisfactoriamente',
                'success'
                
            )
        actualizarCarro()
        }
    })
    }    
})

// confirmacion de borrar carro

//Muestra contenido carro compras en modal
const mostrarCarro = () => {

listadoProductosCarrito.innerHTML = ""

carroCompras.forEach((producto) => {   
    const div = document.createElement("div")

    div.innerHTML += `
                <div class="producto-carro">
                        <img class="producto-imagen-carro" src="${producto.imagen}" alt="1">
                        <div class="producto-detalles-carrito" id="id"> 
                        <h3 class="producto-titulo">Modelo: ${producto.nombre}</h3>
                        <p class="producto-precio">- Medida: ${producto.medida}</p>
                        <p class="producto-precio">- Precio de lista: $${producto.precio}</p>
                        <div class="botonera"><button class="boton-sumar-cantidad" ><i class="bi bi-dash-circle"></i></button><p class="producto-precio">${producto.cantidad}</p><button class="boton-restar-cantidad"><i class="bi bi-plus-circle"></i></button></div>
                        <p class="producto-precio">- Precio final: $${producto.cantidad * producto.precio}</p>
                        <button class="carrito-producto-eliminar" id="carrito-producto-eliminar" value ="${producto.id}">Borrar</button>
                        </div>
                </div>`
    listadoProductosCarrito.appendChild(div)


}

)}

//muestra que el producto fue eliminado con toastify
const mostrarProductoEliminado = (nombreProducto, medidaProducto) =>{
    Toastify({
        text: `Producto eliminado: ${nombreProducto} ${medidaProducto}`,
        duration: 2000,
        gravity: "top",
        position: "left",
        style:{
            background: "linear-gradient(to bottom, #293132, #474044, #4F5165, #547AA5, #50D8D7)",
            borderRadius: "1rem"
        }

    }).showToast()
}

//Actualiza precios totales del carro
const actualizarPrecio = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
    productosCarro.innerText = totalCantidad
    precioTotal.innerText = "$" + totalCompra
    console.log(productosCarro)
    console.log(precioTotal)
    guardarCarritoStorage(carroCompras)
  
}

//Elimina productos del carro
const eliminarProductoCarrito = (id) => {
    const productoIndex = carroCompras.findIndex(producto => producto.id == id)
    carroCompras.splice(productoIndex, 1)
    mostrarCarro(carroCompras)
    actualizarPrecio(carroCompras)
}



//listener eliminar producto
eliminarProducto.addEventListener("click", (e) =>{
    e.stopPropagation()
    if(e.target.classList.contains("carrito-producto-eliminar")){
        const nombreProductoEliminado = carroCompras.find(producto => producto.id === parseInt(e.target.value)).nombre
        const medidaProductoEliminado = carroCompras.find(producto => producto.id === parseInt(e.target.value)).medida
        eliminarProductoCarrito(e.target.value)
        mostrarProductoEliminado(nombreProductoEliminado, medidaProductoEliminado)
        


    }

})

// Función para guardar el carrito en localStorage
const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


// Función para obtener el carrito desde el almacenamiento local
const obtenerCarritoStorage = () => {
    const carritoJSON = localStorage.getItem('carrito');
    return JSON.parse(carritoJSON) || []; // Si no hay datos, devuelve una matriz vacía
}

//Funcion para cargar carrito desde localstorage
const cargarCarrito = () => {
    const carritoStorage =   obtenerCarritoStorage()
    if (carritoStorage && Array.isArray(carritoStorage) && carritoStorage.length > 0) {
        carroCompras = carritoStorage
        mostrarCarro(carroCompras)
        actualizarPrecio(carroCompras)
    } else {
        carroCompras = [] // Vaciar el carrito en caso de no haber datos válidos en el almacenamiento
        mostrarCarro(carroCompras)
        actualizarPrecio(carroCompras)
    }
}

// consumo de api emailjs
const btn = document.getElementById('button');

document.getElementById('form')
.addEventListener('submit', function(event) {
    event.preventDefault()

    btn.value = 'enviando...'

    const serviceID = 'default_service'
    const templateID = 'template_dsxrj0r'

    emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
    btn.value = 'Comprar'
    
    Swal.fire(        
        'Compra exitosa, te enviamos un correo con la informacion!',
        'success'
    
    )
    }, (err) => {
    btn.value = 'Comprar';
    console.log(JSON.stringify(err))
    })
})

btn.addEventListener("click", (e) =>{
    listadoProductosCarrito.innerHTML = ""
        actualizarCarro()
})