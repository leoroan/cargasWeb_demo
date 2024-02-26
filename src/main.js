console.log("hello");

let data = [
  // {
  //   "idf": "1",
  //   "nombre": "Ejemplo",
  //   "apellido": "Apellido",
  //   "dni": "12345678",
  //   "patente": "ABC123",
  //   "estado": "pendiente"
  // },
  // {
  //   "idf": "2",
  //   "nombre": "Otro",
  //   "apellido": "Ejemplo",
  //   "dni": "87654321",
  //   "patente": "XYZ789",
  //   "estado": "pendiente"
  // }
]

document.getElementById('registroForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar que se envíe el formulario

  // Obtener los elementos del formulario
  var nombreInput = document.getElementById('nombre');
  var apellidoInput = document.getElementById('apellido');
  var dniInput = document.getElementById('dni');
  var patenteInput = document.getElementById('patente');

  // Obtener los valores de los campos del formulario
  var nombre = nombreInput.value;
  var apellido = apellidoInput.value;
  var dni = dniInput.value;
  var patente = patenteInput.value;

  // Crear un objeto con los datos del formulario
  var registro = {
    id: Math.floor(100000000 + Math.random() * 900000000),
    nombre: nombre,
    apellido: apellido,
    dni: dni,
    patente: patente,
    estado: "pendiente"
  };

  // Agregar el nuevo registro al array
  data.push(registro);

  // Limpiar los campos del formulario estableciendo su valor en una cadena vacía
  nombreInput.value = '';
  apellidoInput.value = '';
  dniInput.value = '';
  patenteInput.value = '';

  // Convertir el array a formato JSON
  var nuevoContenidoJSON = JSON.stringify(data);

  // Imprimir el contenido actualizado en la consola
  console.log(nuevoContenidoJSON);
});



document.getElementById('modalEmpleado').addEventListener('shown.bs.modal', function () {
  var tablaRegistros = document.getElementById('tablaRegistros');
  tablaRegistros.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos registros

  data.forEach(function (registro, index) {
    var fila = document.createElement('tr');

    var columnaNumero = document.createElement('th');
    columnaNumero.setAttribute('scope', 'row');
    columnaNumero.textContent = index + 1;

    var columnaNombre = document.createElement('td');
    columnaNombre.textContent = registro.nombre;

    var columnaApellido = document.createElement('td');
    columnaApellido.textContent = registro.apellido;

    var columnaDNI = document.createElement('td');
    columnaDNI.textContent = registro.dni;

    var columnaPatente = document.createElement('td');
    columnaPatente.textContent = registro.patente;

    var columnaEstado = document.createElement('td');
    var botonEstado = document.createElement('button');
    botonEstado.classList.add('btn');
    botonEstado.classList.add('btn-sm');
    if (registro.estado === "pendiente") {
      botonEstado.textContent = "Pendiente";
      botonEstado.classList.add('btn-warning');
    } else {
      botonEstado.textContent = "Aceptado";
      botonEstado.classList.add('btn-success');
    }
    columnaEstado.appendChild(botonEstado);

    var columnaInput = document.createElement('td');
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', "EXPT-000"); // Aquí establece el valor que desees para el input
    input.classList.add('form-control');
    columnaInput.appendChild(input);

    var columnaCambiarEstado = document.createElement('td');
    var botonCambiarEstado = document.createElement('button');
    botonCambiarEstado.textContent = "Aceptar";
    botonCambiarEstado.classList.add('btn', 'btn-info', 'btn-sm');
    botonCambiarEstado.addEventListener('click', function () {
      if (botonEstado.textContent === "Pendiente") {
        botonEstado.textContent = "Aceptado";
        botonEstado.classList.remove('btn-warning');
        botonEstado.classList.add('btn-success');
      } else {
        if (botonEstado.textContent === "Aceptado") {
          botonEstado.textContent = "Pendiente";
          botonEstado.classList.remove('btn-success');
          botonEstado.classList.add('btn-warning');
        }
      }
    });
    columnaCambiarEstado.appendChild(botonCambiarEstado);

    var columnaCambiarEstado2 = document.createElement('td');
    var botonCambiarEstado2 = document.createElement('button');
    botonCambiarEstado2.textContent = "Rechazar";
    botonCambiarEstado2.classList.add('btn', 'btn-info', 'btn-sm');
    botonCambiarEstado2.addEventListener('click', function () {
      if (botonEstado.textContent === "Pendiente") {
        botonEstado.textContent = "Rechazado";
        botonEstado.classList.remove('btn-warning');
        botonEstado.classList.add('btn-danger');
      } else {
        if (botonEstado.textContent === "Rechazado") {
          botonEstado.textContent = "Pendiente";
          botonEstado.classList.remove('btn-danger');
          botonEstado.classList.add('btn-warning');
        }
      }
    });
    columnaCambiarEstado2.appendChild(botonCambiarEstado2);


    fila.appendChild(columnaNumero);
    fila.appendChild(columnaNombre);
    fila.appendChild(columnaApellido);
    fila.appendChild(columnaDNI);
    fila.appendChild(columnaPatente);
    fila.appendChild(columnaEstado);
    fila.appendChild(columnaInput);
    fila.appendChild(columnaCambiarEstado);
    fila.appendChild(columnaCambiarEstado2);

    tablaRegistros.appendChild(fila);
  });
});