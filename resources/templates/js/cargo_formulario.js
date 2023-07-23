$(document).ready(function () {
  // Obtener el ID del cargo desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const cargoId = urlParams.get("id");

  // Si se proporcionó un ID válido, realizar la solicitud AJAX para obtener el cargo y llenar el formulario
  if (cargoId) {
    obtenerCargoYMostrarFormulario(cargoId);
  }
});

// Evento submit del formulario para guardar o editar el cargo mediante Fetch
document.getElementById("cargoForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const cargo = {};
  formData.forEach((value, key) => {
    cargo[key] = value;
  });

  console.log("FormData ", cargo);

  // Verificar si el formulario es para guardar o editar
  const cargoId = document.getElementById("id_Cargo").value;
  if (cargoId) {
    // Si se proporcionó un ID válido, realizar una solicitud PUT para editar el cargo
    cargo.id_Cargo = cargoId;
    editarCargo(cargo);
  } else {
    // Si no se proporcionó un ID válido, realizar una solicitud POST para guardar el cargo
    guardarCargo(cargo);
  }
});

// Función para guardar un nuevo cargo
function guardarCargo(cargo) {
  fetch("http://localhost:8090/api/cargo/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cargo),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error al guardar el cargo");
    })
    .then(() => {
      console.log("Cargo guardado con éxito");
      // Aquí puedes redirigir o mostrar un mensaje de éxito
      window.location.href = "/templates/listarcargo.html";
    })
    .catch((error) => console.error("Error en la solicitud Fetch:", error));
}

// Función para editar un cargo existente
function editarCargo(cargo) {
  fetch(`http://localhost:8090/api/cargo/editar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cargo),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error al editar el cargo");
    })
    .then(() => {
      console.log("Cargo editado con éxito");
      // Aquí puedes redirigir o mostrar un mensaje de éxito
      window.location.href = "/templates/listarcargo.html";
    })
    .catch((error) => console.error("Error en la solicitud Fetch:", error));
}

// Función para obtener el cargo específico y llenar el formulario
function obtenerCargoYMostrarFormulario(cargoId) {
  fetch(`http://localhost:8090/api/cargo/buscar/${cargoId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener el cargo");
      }
      return response.json();
    })
    .then((cargo) => {
      // Llenar el formulario con los datos del cargo
      document.getElementById("id_Cargo").value = cargo.id_Cargo;
      document.getElementById("descripcion").value = cargo.descripcion;
      document.getElementById("sueldo").value = cargo.sueldo;
    })
    .catch((error) => console.error("Error en la solicitud Fetch:", error));
}
