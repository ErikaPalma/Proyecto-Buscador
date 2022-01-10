//Variables

const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

//Contenedor para resultados
const resultado = document.querySelector("#resultado");

const maxYear = new Date().getFullYear(); //Año actual
const minYear = maxYear - 10;

//Generar objeto con la búsqueda

const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

//Eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarCoches(coches); //muestra los coches al cargar

  //Llena las opciones del select de año
  llenarSelect();
});

marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;

  filtrarCoche();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = e.target.value;
  filtrarCoche();
});

minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;
  filtrarCoche();
});

maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;
  filtrarCoche();
});

puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = e.target.value;
  filtrarCoche();
});

transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarCoche();
});

color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  filtrarCoche();
  console.log(datosBusqueda);
});

//Funciones

function mostrarCoches(coches) {
  limpiarHTML();
  coches.forEach((coche) => {
    const cocheHTML = document.createElement("p");

    const { marca, modelo, year, precio, puertas, color, transmision } = coche;

    cocheHTML.textContent = `
        ${marca} ${modelo} - ${year},
        Precio: ${precio} € - ${puertas} Puertas - Color: ${color} - Transimisión: ${transmision}
    `;
    //insertar en el HTML
    resultado.appendChild(cocheHTML);
  });
}

function limpiarHTML() {
  /*Esta función se crea porque el appendChild añade los coches al final, pero no borra lo anterior.
    Para que el filtrado muestre únicamente lo solicitado, hay que borrar el HTML antes de recorrer los coches */

  //Mientras haya un hijo, va a estar eliminando el primer hijo
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

//Genera los años del select
function llenarSelect() {
  for (let i = maxYear; i > minYear; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);
  }
}

//Función que filtra según la búsqueda
function filtrarCoche() {
  const resultado = coches
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);
  console.log(resultado);

  if (resultado.length) {
    //Si el array tiene algún elemento, muestro los coches
    mostrarCoches(resultado); //para que se muestren los resultados filtrados en el HTML
  }
  //Si no hay elementos, muestro un mensaje de error
  else {
    sinResultado();
  }
}

function sinResultado() {
  limpiarHTML();
  const sinResultado = document.createElement("div");
  sinResultado.classList.add("alerta", "error");
  sinResultado.textContent = "No hay resultados para esa búsqueda";
  resultado.appendChild(sinResultado);
}

/*Estas funciones siempre van a tomar la iteración del objeto actual como si 
estuviéramos trabajando con filter*/
function filtrarMarca(coche) {
  //1º compruebo si hay algo, porque al inicio de la búsqueda puede estar vacío
  if (datosBusqueda.marca) {
    //Este coche que retorna es el que estamos iterando
    return coche.marca === datosBusqueda.marca;
  }
  //Si el usuario no ha seleccionado nada, devuelvo el coche completo
  return coche;
}

function filtrarYear(coche) {
  if (datosBusqueda.year) {
    //year es de tipo number, pero desde el formulario viene como string por eso hay que parsear
    return coche.year === parseInt(datosBusqueda.year);
  }
  return coche;
}

function filtrarMinimo(coche) {
  if (datosBusqueda.minimo) {
    return coche.precio >= parseInt(datosBusqueda.minimo);
  }
  return coche;
}

function filtrarMaximo(coche) {
  if (datosBusqueda.maximo) {
    return coche.precio <= parseInt(datosBusqueda.maximo);
  }
  return coche;
}

function filtrarPuertas(coche) {
  if (datosBusqueda.puertas) {
    return coche.puertas === parseInt(datosBusqueda.puertas);
  }
  return coche;
}

function filtrarTransmision(coche) {
  if (datosBusqueda.transmision) {
    return coche.transmision === datosBusqueda.transmision;
  }
  return coche;
}

function filtrarColor(coche) {
  if (datosBusqueda.color) {
    return coche.color === datosBusqueda.color;
  }
  return coche;
}
