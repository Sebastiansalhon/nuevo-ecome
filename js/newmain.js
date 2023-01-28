// let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
// const nombre = document.querySelector("#nombre");
// const contacto = document.querySelector("#numero");
// const direccion = document.querySelector("#direcicon");

// const menu = document.querySelector("#contenedorMenu");

// const pedirMenu = async() => {
//     const resp = await fetch("/js/data.json")
//     const data = await resp.json();

//     data.forEach((burger) => {
//         const li = document.createElement("li")
//         li.innerHTML = `
//         <h4>${burger.nombre}</h4
//         <p>${burger.descripcion}</p>
//         <p>${burger.precio}</p>\
//         <button id=${burger.id}>Agregar a carrtito</button>
//         `;
//         menu.append(li);
//     });
// };
// pedirMenu();




// const productos = [];

// let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// const carritoContenedor = document.createElement('contenedorCarrito');
// class Producto {
//     constructor(id, nombre, precio, desc){
//         this.id = id
//         this.nombre = nombre
//         this.precio = precio
//         this.desc = desc
//     }

//     pintarProducto() {
//         const tarjeta = `
//         <div>
//         <h4>${this.nombre}</h4
//         <div>
//         <p>${this.desc}</p>
//         </div>
//         <div>
//         <p>${this.precio}</p>
//         </div>
//         <div>
//         <button id=${this.id}>Agregar a carrtito</button>
//         </div<
//         </div>
//         `
//         const menu = document.querySelector('#contenedorMenu')
//         menu.innerHTML += tarjeta
//     }

//     agregarEvento () {
//         const btnAgregar = document.getElementById(`${this.id}`)
//         const buscarProducto = productos.find ( p => p.id == this.id)
//         btnAgregar.addEventListener ('click' , () => agregarAlCarrito(buscarProducto))
//     }
//     }
    




// fetch('/js/data.json')
//     .then (res => res.json())
//     .then (data => {
//         data.forEach(prod => {
//         let nuevoProducto = new Producto (prod.id, prod.nombre, prod.precio, prod.desc)
//         productos.push(nuevoProducto)
//     })
//     productos.forEach( e => {
//         e.pintarProducto()
//     })
//     productos.forEach (e => {
//         e.agregarEvento()
//     })
// })
//     .catch (error => console.log(error))



// function agregarAlCarrito(producto) {
//     const enCarrito = carrito.find(prod => prod.id === producto.id)

//     if(!enCarrito) {
//         carrito.push({...producto, cantidad: 1 })
//         localStorage.setItem ('carrito', JSON.stringify(carrito))
//     } else {
//         let carroFiltrado = carrito.filter (prod => prod.id != enCarrito.id)
//         carrito = [
//             ...carroFiltrado,
//             {
//                 ...enCarrito,
//                 cantidad: enCarrito.cantidad + 1
//             }
//         ]
//         localStorage.setItem('carrito', JSON.stringify(carrito))
//     }
//     contador.innerHTML = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
// }


// const contador = document.getElementById('carritoContador')
// contador.innerHTML = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)



// function carritoHTML () {
//     enCarrito.forEach ((producto => {
//         const row = document.createElement('p')
//         row.innerHTML => `
//         `
//     }))
// }




const nombre = document.getElementById('nombre')
const numContacto = document.getElementById('numero')
const direccion = document.getElementById('direccion')

const contenedorMenu = document.getElementById('contenedorMenu')
const templateCard = document.getElementById('templateCard').content
const templateFooter = document.getElementById('templateFooter').content
const templateCarrito = document.getElementById('templateCarrito').content
const fragment = document.createDocumentFragment()
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const realizarPedido = document.getElementById('btn-pedido')


let carrito = {}
document.addEventListener('DOMContentLoaded', () => {
    fetchInfo()
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})


contenedorMenu.addEventListener('click', e => {
    agregarCarrito(e)

})

items.addEventListener ('click', e => {
    btnAccion (e)
})
const fetchInfo = async () => {
    try {
        const res = await fetch('/js/data.json')
        const data = await res.json()
        pintarCards(data)
    }catch (error){
        console.log (errpr)
    }
}


const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.nombre
        templateCard.querySelector('span').textContent = producto.descripcion
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('.btn-dark').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    contenedorMenu.appendChild(fragment)
}


const agregarCarrito = e => {

    if(e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)

    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        nombre: objeto.querySelector('h5').textContent,
        descripcion: objeto.querySelector('span').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito [producto.id] = {...producto}
    pintarCarrito()
}

const pintarCarrito = () => {
    items.innerHTML = ""
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent =producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter ()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito Vacio - Sin orden.</th>
        `
        return
    }
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0 )
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad*precio , 0)
    console.log(nPrecio);

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const btnVaciar = document.getElementById ('vaciarCarrito')
    btnVaciar.addEventListener('click', () => {
        Swal.fire('Vaciaste el carrito.')
        carrito = {}
        pintarCarrito()
    })
}

const btnAccion = e =>{
    if(e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }
    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad == 0){
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()

    }
    e.stopPropagation()
}




realizarPedido.addEventListener ('click', () =>{
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tu pedido se realizo con exito',
        showConfirmButton: false,
        timer: 2000
    })
})



















