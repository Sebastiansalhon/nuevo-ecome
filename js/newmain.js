//variables
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

//integracion "api" de datos
const fetchInfo = async () => {
    try {
        const res = await fetch('/js/data.json')
        const data = await res.json()
        pintarCards(data)
    }catch (error){
        console.log (errpr)
    }
}

// Agregar las tarjetas de los objetos en el DOM
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
//Mostrar articulos del carrito
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

//apartado donde se visualiza cantidades sumadas, total sumado y vaciar carrito
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
// botones de suma y resta de cantidades en el carrito.
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



let validar = () => {
    let inputRequeridos = document.querySelectorAll('.formulario [required]')
    let error = false;
    for(let i = 0; i< inputRequeridos.length; i++){
        if(inputRequeridos[i].value == ''){
            inputRequeridos[i].classList.add('inputError')
            error = true;
        }else{
            inputRequeridos[i].classList.remove('inputError')
        }
    }

    return error;
};

let obtenerDatos = () => {
    let error = validar();
    if(error ){
        Swal.fire({
            'title': 'Ingrese los datos para validar su pedido',
            'text': '(Todos los campos son obligatorios)',
            'icon' : 'warning'
        })
    }else{
        Swal.fire({
            'title': 'Tu orden quedo ingresada correctamente',
            'text': 'Te avisaremos cuando este lista!',
            'icon' : 'success',
        })

    }
}

realizarPedido.addEventListener ('click', obtenerDatos )


















