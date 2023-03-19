// Variables
const formulario = document.querySelector('#agregar-gasto');
const listadoGastos = document.querySelector('#gastos ul')
const botonEliminarItem = document.querySelector('#eliminarItem');

// Eventos
cargarAddeventListeners();

function cargarAddeventListeners(){

    document.addEventListener('DOMContentLoaded', preguntarPresupuesto)
    formulario.addEventListener('submit', agregarGasto);

}



// Clases
class UI {

    insertarPresupuesto(cantidad){
        const {presupuesto, restante} = cantidad;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }


    imprimirGasto(gastos){
        console.log(gastos)
        gastos.forEach(gasto => {
            const {nombre, cantidad, id} = gasto;
            const gastoItem = document.createElement('li');
            gastoItem.dataset.id = id;
            gastoItem.classList.add('list-group-item','d-flex','justify-content-between','align-items-center','flex-row');
            gastoItem.innerHTML = `
            <p class="fw-bolder text-muted text-capitalize">${nombre}</p>
            <p class="badge badge-pill bg-dark text-wrap text-white">$${cantidad}</p>

            <a href="#" class="btn btn-danger text-white">Borrar &times;</a>
            `
        
            listadoGastos.appendChild(gastoItem);
        });
    }


    imprimirRestante(restante){
        document.querySelector('.restante #restante').textContent = restante;
    }


    nivelGasto(nivelPresupuesto){
        const divRestante = document.querySelector('.restante');
        const {restante, presupuesto} = nivelPresupuesto;

        if(restante <= (50*presupuesto)/100 && restante > (25*presupuesto)/100){
            divRestante.classList.remove('alert-success')
            divRestante.classList.add('alert-warning');
            console.log('amarillo')
        }else if(restante <= (25*presupuesto)/100 && restante > 0){
            divRestante.classList.remove('alert-success')
            divRestante.classList.add('alert-danger');
            console.log('rojo')
        }


    }


    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;

        setTimeout(() => {
            divMensaje.remove();
        }, 2000);

        document.querySelector('.primario').insertBefore(divMensaje, formulario);
    }

    limpiarListado(){
        while(listadoGastos.firstChild){
            listadoGastos.removeChild(listadoGastos.firstChild)
        }
    }


}


class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
    }

    eliminarGasto(){
        this.gastos = this.gastos.filter(gasto => gasto.id !== gasto.id);
    }

    calcularRestante(cantidad){
        this.restante = this.restante - cantidad;
        return this.restante;
    }
    
}

// Instancias
const ui = new UI();
let presupuesto;



// Funciones
function agregarGasto(evento){
    evento.preventDefault();

    // Primero:
    // Leer datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    // Segundo:
    // Validar los campos
    if(nombre === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    }else if(Number(nombre)){
        ui.imprimirAlerta('El campo nombre no puede ser un número.', 'error')
        return;
    }else if(cantidad <= 0 || isNaN(cantidad)){                  
        ui.imprimirAlerta('Cantidad no valida', 'error');
        return; 
    }

    // generar objeto con el gasto:
    const gasto = {
        nombre, 
        cantidad, 
        id: Date.now()
    }
    
    // Generamos el restante
    const restante = presupuesto.calcularRestante(cantidad);

    // Generamos un gasto
    presupuesto.nuevoGasto(gasto);

    // Alerta
    ui.imprimirAlerta('Gasto agregado!');
    
    // imprimir los gastos
    const {gastos} = presupuesto;
    console.log(gastos)
    // Limpiamos el duplicado del li
    ui.limpiarListado();
    ui.imprimirGasto(gastos);

    ui.nivelGasto(presupuesto);
    // Imprimimos el restante
    ui.imprimirRestante(restante);

    // Reseteamos el formulario
    formulario.reset();

}

function eliminarGastoHTML(){
    console.log();
}


function preguntarPresupuesto(){
    const presupuestoUsuario = prompt("Cual es tu presupuesto?");

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();
    }else{
        console.log(presupuestoUsuario)
    }

    presupuesto = new Presupuesto(presupuestoUsuario);
    ui.insertarPresupuesto(presupuesto);
    console.log("Este es el presupuesto :", presupuesto);

}