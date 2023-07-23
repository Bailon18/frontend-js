// Cargar los cargos al cargar la página
$(document).ready(function () {
  fetchCargos();

  // Obtener el ID del trabajador desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const trabajadorId = urlParams.get("id");

  // Si se proporcionó un ID válido, realizar la solicitud AJAX para obtener el trabajador y llenar el formulario
  if (trabajadorId) {
    obtenerTrabajadorYMostrarFormulario(trabajadorId);
  }
});

// Función para cargar los cargos mediante Fetch
function fetchCargos() {
  fetch("http://localhost:8090/api/cargo/list")
    .then((response) => response.json())
    .then((data) => {
      const cargoSelect = document.getElementById("cargo");
      cargoSelect.innerHTML = '<option value="" disabled selected>Seleccione un cargo</option>';
      data.forEach((cargo) => {
        const option = document.createElement("option");
        option.value = cargo.id_Cargo;
        option.text = cargo.descripcion;
        cargoSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching cargos:", error));
}

// Evento submit del formulario para guardar o editar el trabajador mediante Fetch
document.getElementById("trabajadorForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const trabajador = {};
  formData.forEach((value, key) => {
    if (key === "cargo") {
      trabajador[key] = {
        id_Cargo: value,
      };
    } else {
      trabajador[key] = value;
    }
  });

  console.log("FormData ", trabajador);

  // Verificar si el formulario es para guardar o editar
  const cargoId = document.getElementById("id_Cargo").value;
  if (cargoId) {
    // Si se proporcionó un ID válido, realizar una solicitud PUT para editar el trabajador
    trabajador.id_Cargo = cargoId;
    editarTrabajador(trabajador);
  } else {
    // Si no se proporcionó un ID válido, realizar una solicitud POST para guardar el trabajador
    guardarTrabajador(trabajador);
  }
});

// Función para guardar un nuevo trabajador
function guardarTrabajador(trabajador) {
  fetch("http://localhost:8090/api/trabajador/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trabajador),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error al guardar el trabajador");
    })
    .then(() => {
      console.log("Trabajador guardado con éxito");
      // Aquí puedes redirigir o mostrar un mensaje de éxito
      window.location.href = "/templates/listartrabajador.html";
    })
    .catch((error) => console.error("Error en la solicitud Fetch:", error));
}

// Función para editar un trabajador existente
function editarTrabajador(trabajador) {
  fetch(`http://localhost:8090/api/trabajador/editar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trabajador),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error al editar el trabajador");
    })
    .then(() => {
      console.log("Trabajador editado con éxito");
      // Aquí puedes redirigir o mostrar un mensaje de éxito
      window.location.href = "/templates/listartrabajador.html";
    })
    .catch((error) => console.error("Error en la solicitud Fetch:", error));
}

// Función para obtener el trabajador específico y llenar el formulario
function obtenerTrabajadorYMostrarFormulario(trabajadorId) {
  fetch(`http://localhost:8090/api/trabajador/buscar/${trabajadorId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener el trabajador");
      }
      return response.json();
    })
    .then((trabajador) => {
      // Llenar el formulario con los datos del trabajador
      document.getElementById("id_Trabajador").value = trabajador.id_Trabajador;
      document.getElementById("nombre").value = trabajador.nombre;
      document.getElementById("apellidos").value = trabajador.apellidos;
      document.getElementById("dni").value = trabajador.dni;
      document.getElementById("fecha_nacimiento").value = trabajador.fecha_nacimiento;
      document.getElementById("telefono").value = trabajador.telefono;
      document.getElementById("email").value = trabajador.email;
      document.getElementById("cargo").value = trabajador.cargo.id_Cargo;
    })
    .catch((error) => console.error("Error en la solicitud Fetch:", error));
}
