// Variables
const formulario = document.querySelector('#agregar-gasto');
const listadoGastos = document.querySelector('#gastos ul')

// Eventos
cargarAddeventListeners();

function cargarAddeventListeners(){

    document.addEventListener('DOMContentLoaded', preguntarPresupuesto)
    formulario.addEventListener('submit', agregarGasto);

}



// Clases
class UI {

    listadoGastos(){

    }

    
    insertarPresupuesto(cantidad){
        const {presupuesto, restante} = cantidad;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }


    imprimirGasto(nombre , gasto){
        const gastoItem = document.createElement('li');
        gastoItem.classList.add('list-group-item','d-flex','flex-row');
        gastoItem.innerHTML = `
            <p>${nombre}</p>
            <p>${gasto}</p>
            <button class="btn btn-danger">Borrar</button>
        `
        
        listadoGastos.appendChild(gastoItem);
    }


    imprimirRestante(restante){
        document.querySelector('.restante #restante').textContent = restante;
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
}


class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(){
        this.gastos = [...this.gastos, ];
    }

    eliminarGasto(){

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
    const cantidad = document.querySelector('#cantidad').value;

    // Segundo:
    // Validar los campos
    if(nombre === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    }else if(cantidad <= 0 || isNaN(cantidad)){                  
        ui.imprimirAlerta('Cantidad no valida', 'error');
        return; 
    }else{
        ui.imprimirAlerta('Gasto agregado!');
        const restante = presupuesto.calcularRestante(cantidad);
        ui.imprimirGasto(nombre, cantidad);
        ui.imprimirRestante(restante);

        formulario.reset();
        return;
    }

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