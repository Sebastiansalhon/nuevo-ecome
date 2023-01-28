const stockProductos = [
    {
        id: 1,
        nombre: "Hamburguesa Notable",
        desc: "Hamburgesa doble carne con doble queso cheddar y panceta ahumada.",
        precio: 430,
        cantidad: 1,
        img: "burgericon.png",
    },
    {
        id: 2,
        nombre: "Hamburguesa Magistral",
        desc: "Hamburgesa comun con lechuga, tomate, queso y salsa dolce",
        precio: 200,
        cantidad: 1,
        img: "burgericon.png",
    },
    {
        id: 3,
        nombre: "Hamburguesa 4.0",
        desc: "4 Carnes con queso, panceta ahumada, cebolla caramelizda y salsa dolce",
        precio: 540,
        cantidad: 1,
        img: "burgericon.png",
    },
]

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal")
const comprar = document.querySelector("#comprar")
const activarFuncion = document.querySelector("#activarFuncion")


if(activarFuncion){
activarFuncion.addEventListener('click', procesarCompra)
}



let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    mostrarCarrito ()
})


stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, cantidad, img } = prod;
    if(contenedor){
    contenedor.innerHTML +=
        `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">${desc}</p>
    <p class="card-text">Precio:${precio}</p>
    <p class="card-text">${cantidad}</p>
    <button onclick="agregarProducto(${id})"class="btn btn-primary">Agregar a carrito</button>
</div>
</div>
    `
}
}
)

if(comprar){
comprar.addEventListener('click', () => {
    if(carrito.length === 0) {
        Swal.fire({
            
        })
    }else{
        location.href = "orden.html"
        procesarCompra();
    }
})
}

function agregarProducto (id){

const item = stockProductos.find((prod)=> prod.id === id)
    carrito.push(item);
    mostrarCarrito();
}

if(vaciarCarrito){
vaciarCarrito. addEventListener('click', () =>  {
    carrito.length = []
    mostrarCarrito()
})
}


//Pintar carrito


const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if(modalBody){
    
    modalBody.innerHTML="";
    carrito.forEach ((prod) => {
        const {id, nombre, desc, precio, cantidad, img} = prod
        modalBody.innerHTML += `
        <div class = "modal-contenedor>
        <div>
        <img class="img-fluid" scr="${img}"/>
        </div>

        <div>
        <p>Producto: ${nombre}</p>
        <p>Descripcion: ${desc}</p>
        <p>Cantidad: ${cantidad}</p>

        <button onclick ="eliminarProducto(${id})" class="btn btn-danger">Eliminar Producto</button>
        </div>
        
        
        </div>
        `
    
    });
}

    if(carrito.length === 0) {
        modalBody.innerHTML = `
        <p>Aun no se agrego nada</p>`
    }

    carritoContenedor.textContent = carrito.length


    if(precioTotal){
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0 )
}
    guardarStorage();
};

function eliminarProducto(id) {
    const burgerId = id;
    carrito = carrito.filter ((burger) => burger.id !== burgerId);
    mostrarCarrito();
};


function guardarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}


if(procesarCompra){
function procesarCompra(){
    carrito.forEach((prod) => {
        const listaCompra = document.querySelector("#lista-compra tbody")
        const {id, nombre, precio, cantidad} = prod

        const row = document.createElement("tr");
        row.innerHTML += `
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>${precio * cantidad}</td>
        `

        listaCompra.appendChild(row);
    }
);
}
}

