 // array de productos
const productos = [
   /* {id:0, nombre:"Tropical", medida: "190x80", tecnologia: "Espuma", densidad: "Baja densidad", peso: 60, precio: 40000, cantidad: 1, imagen: "img/tropical 140.jpg"},
    {id:1, nombre:"Princess", medida: "190x80", tecnologia: "Espuma", densidad: "Media densidad", peso: 85, precio: 50000, cantidad: 1, imagen: "img/Princess-80-x23.jpg"},
    {id:2, nombre:"Exclusive", medida: "190x80", tecnologia: "Espuma", densidad: "Alta densidad", peso: 120, precio: 60000, cantidad: 1, imagen: "img/Exclusive-80.jpg"},
    {id:3, nombre:"Tropical", medida: "190x140", tecnologia: "Espuma", densidad: "Baja densidad", peso: 120, precio: 80000, cantidad: 1, imagen: "img/tropical 140.jpg"},
    {id:4, nombre:"Princess", medida: "190x140", tecnologia: "Espuma", densidad: "Media densidad", peso: 160, precio: 100000, cantidad: 1, imagen: "img/Princess-80-x23.jpg"},
    {id:5, nombre:"Exclusive", medida: "190x140", tecnologia: "Espuma", densidad: "Alta densidad", peso: 200, precio: 120000, cantidad: 1, imagen: "img/Exclusive-80.jpg"}

 */
]


//Array carrito
let carroCompras = []


//obtener elementos
const productosCarro = document.getElementById("cantidad-carro")
const listadoProductos = document.getElementById("contenedor-productos")
const listadoProductosCarrito = document.getElementById("carrito-contenedor")
const precioTotal = document.getElementById("total-carro")
//Variables
let cantidadCarro = 0
let precioTotalCarro = 0







      


//Funcion que carga los productos del array
const mostrarProductos = () =>{ 
  
  productos.forEach((producto, index) => {
    if(producto.tecnologia == "Espuma"){         
        const div = document.createElement("div")
        div.innerHTML += `
        <div class="producto">
                        <img class="producto-imagen" src="${producto.imagen}" alt="1">
                        <div class="producto-detalles" id="id"> 
                            <h3 class="producto-titulo">Modelo: ${producto.nombre}</h3>
                            <p class="producto-precio">- Medida: ${producto.medida}</p>
                            <p class="producto-precio">- ${producto.tecnologia} ${producto.densidad}</p>
                            <p class="producto-precio">- Soporte de peso: ${producto.peso} Kg. por lado</p>
                            <p class="producto-precio">- Precio de lista: $${producto.precio}</p>
                            <button class="producto-agregar" id="producto-agregar-${index}">Agregar</button>
                            </div>
                    </div>
        `
        
        listadoProductos.appendChild(div)
      } else {
        const div = document.createElement("div")
        div.innerHTML += `
        <div class="producto">
                        <img class="producto-imagen" src="${producto.imagen}" alt="1">
                        <div class="producto-detalles" id="id"> 
                            <h3 class="producto-titulo">Modelo: ${producto.nombre}</h3>
                            <p class="producto-precio">- Medida: ${producto.medida}</p>
                            <p class="producto-precio">- ${producto.tecnologia}</p>
                            <p class="producto-precio">- Precio de lista: $${producto.precio}</p>
                            <button class="producto-agregar" id="producto-agregar-${index}">Agregar</button>
                            </div>
                    </div>
        `
        
        listadoProductos.appendChild(div)

      }
        const id = document.getElementById(`producto-agregar-${index}`)


// para mostrar cosas que se agregan al carro con toastify
const btnAgregar = document.getElementById(`producto-agregar-${index}`)

btnAgregar.addEventListener("click", () => {
    carroVacio = false
    console.log(btnAgregar)
    Toastify({
        text: `Producto agregado: ${producto.nombre} ${producto.medida}`,
        duration: 2000,
        gravity: "top",
        position: "right",
        style:{
            background: "linear-gradient(to bottom, #293132, #474044, #4F5165, #547AA5, #50D8D7)",
            borderRadius: "1rem"
        }

    }).showToast()
})

 //listener para agregar evento de agregar productos al carro
    id.addEventListener("click", (e) =>{ 
        const seRepite = carroCompras.some(producto => producto.id ==index)
    console.log(seRepite)
    if (!seRepite){
        carroCompras.push(producto) // Agregar el producto al carrito
        mostrarCarro()
        precioTotalCarro+=producto.precio
        cantidadCarro++
        productosCarro.innerText = cantidadCarro
        precioTotal.innerText = "$" + precioTotalCarro
        console.log(cantidadCarro)
        console.log(carroCompras)
        actualizarPrecio(carroCompras)
    } else {
        // Si el producto ya está en el carrito, buscamos el índice del producto
        const indexEnCarrito = carroCompras.findIndex(producto => producto.id === index)

        // Sumamos 1 a la cantidad del producto en el carrito
        carroCompras[indexEnCarrito].cantidad += 1
        mostrarCarro()
        precioTotalCarro+=producto.precio
        cantidadCarro++
        productosCarro.innerText = cantidadCarro
        precioTotal.innerText = "$" + precioTotalCarro
        console.log(cantidadCarro)
        console.log("Cantidad sumada:", carroCompras[indexEnCarrito].cantidad)
        actualizarPrecio(carroCompras)
    }
    })        
})  
    
}

// mostrar html en carro simulando una promesa
function simularPromesa(data, delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data)
      }, delay)
    })
  }

  const jsonUrl = 'data.json';

// Usar fetch para obtener el contenido del archivo JSON
fetch(jsonUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error de red: ${response.status}`)
    }
    return response.json()
  })
  .then(dataArray => {
    // Almacenar los datos obtenidos en el array 'productos'
    productos.push(...dataArray)
    let timerInterval
Swal.fire({
  title: 'Estamos cargando los productos',
  icon: 'warning',
  html: 'Se cerrara automaticamente cuando cargue la pagina. o presiona "continuar navegando" para explorar el resto de la pagina',
  cancelButtonText:'Continuar navegando',
  showCancelButton: true,
  showCloseButton: true,
  timer: 7000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('Pagina cargada correctamente.')
  }
})
    const promise = simularPromesa(dataArray, 7000)

promise.then(() => {
    mostrarProductos()    
}).catch((error) => {
  console.error('Ocurrió un error:', error)
})
    
    
 // Verificar que los datos se hayan almacenado correctamente
  })
  .catch(error => {
    console.error('Ocurrió un error:', error)
  })



