// Cargar las categorías al cargar la página
$(document).ready(function () { 
  fetchGeneros();

  // Obtener el ID del cliente desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const clienteId = urlParams.get("id");

  // Si se proporcionó un ID válido, realizar la solicitud AJAX para obtener el cliente y llenar el formulario
  if (clienteId) {
    obtenerClienteYMostrarFormulario(clienteId);
  }
});

// Función para cargar las categorías mediante Fetch
function fetchGeneros() {
  fetch("http://localhost:8090/api/genero/list")
    .then((response) => response.json())
    .then((data) => {
      const generoSelect = document.getElementById("genero");
      generoSelect.innerHTML = '<option value="" disabled selected>Seleccione un género</option>';
      data.forEach((genero) => {
        const option = document.createElement("option");
        option.value = genero.id_Genero;
        option.text = genero.descripcion;
        generoSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching géneros:", error));
}

// Evento submit del formulario para guardar o editar el cliente mediante Fetch
document.getElementById("clienteForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const cliente = {};
  formData.forEach((value, key) => {
    if (key === "genero") {
      cliente[key] = {
        id_Genero: value,
      };
    } else {
      cliente[key] = value;
    }
  });

  console.log("FormData ", cliente);

  // Verificar si el formulario es para guardar o editar
  const clienteId = document.getElementById("id_Cliente").value;
  if (clienteId) {
    // Si se proporcionó un ID válido, realizar una solicitud PUT para editar el cliente
    cliente.id_Cliente = clienteId;
    editarCliente(cliente);
  } else {
    // Si no se proporcionó un ID válido, realizar una solicitud POST para guardar el cliente
    guardarCliente(cliente);
  }
});

// Función para guardar un nuevo cliente
function guardarCliente(cliente) {
  fetch("http://localhost:8090/api/cliente/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error al guardar el cliente");
    })
    .then(() => {
      console.log("Cliente guardado con éxito");
      // Aquí puedes redirigir o mostrar un mensaje de éxito
      window.location.href = "/templates/listarcliente.html";
    })
    .catch((error) => console.error("Error en la solicitud Fetch:", error));
}

// Función para editar un cliente existente
function editarCliente(cliente) {
  fetch(`http://localhost:8090/api/cliente/editar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error al editar el cliente");
    })
    .then(() => {
      console.log("Cliente editado con éxito");
      // Aquí puedes redirigir o mostrar un mensaje de éxito
      window.location.href = "/templates/listarcliente.html";
    })
    .catch((error) => console.error("Error en la solicitud Fetch:", error));
}

// Función para obtener el cliente específico y llenar el formulario
function obtenerClienteYMostrarFormulario(clienteId) {
  fetch(`http://localhost:8090/api/cliente/buscar/${clienteId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener el cliente");
      }
      return response.json();
    })
    .then((cliente) => {
      // Llenar el formulario con los datos del cliente
      document.getElementById("id_Cliente").value = cliente.id_Cliente;
      document.getElementById("nombre").value = cliente.nombre;
      document.getElementById("apellido").value = cliente.apellido;
      document.getElementById("dni").value = cliente.dni;
      document.getElementById("fecha_nacimiento").value = cliente.fecha_nacimiento;
      document.getElementById("telefono").value = cliente.telefono;
      document.getElementById("direccion").value = cliente.direccion;
      document.getElementById("genero").value = cliente.genero.id_Genero;
    })
    .catch((error) => console.error("Error en la solicitud Fetch:", error));
}
