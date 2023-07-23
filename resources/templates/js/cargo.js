// URL del API
const apiURL = "http://localhost:8090/api/cargo/list";

// Función para obtener los datos del API y llenar la tabla
function obtenerDatosYLLenarTabla() {
  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los datos del API");
      }
      return response.json();
    })
    .then((data) => {
      // Llamada a la función para llenar la tabla con los datos recibidos
      llenarTabla(data);
    })
    .catch((error) => {
      console.error("Error en la solicitud Fetch:", error);
    });
}

// Función para llenar la tabla con los datos recibidos del API
function llenarTabla(data) {
  const tabla = document.querySelector("table tbody");
  tabla.innerHTML = ""; // Limpiar el contenido actual de la tabla

  data.forEach((cargo) => {
    const fila = `
      <tr>
        <td>${cargo.id_Cargo}</td>
        <td>${cargo.descripcion}</td>
        <td>${cargo.sueldo}</td>
        <td class="actd">
          <a class="bx bx-edit icon1" href="formulariocargo.html?id=${cargo.id_Cargo}"></a>
          &nbsp; &nbsp;
        </td>
      </tr>
    `;
    tabla.insertAdjacentHTML("beforeend", fila);
  });
}

// Llamar a la función para obtener los datos y llenar la tabla al cargar la página
document.addEventListener("DOMContentLoaded", obtenerDatosYLLenarTabla);
