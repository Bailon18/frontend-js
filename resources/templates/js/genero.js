// URL del API
const apiURL = 'http://localhost:8090/api/genero/list';

// Función para obtener los datos del API y llenar la tabla
function obtenerDatosYLLenarTabla() {
  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener los datos del API');
      }
      return response.json();
    })
    .then((data) => {
      // Llamada a la función para llenar la tabla con los datos recibidos
      llenarTabla(data);
    })
    .catch((error) => {
      console.error('Error en la solicitud Fetch:', error);
    });
}


// Función para llenar la tabla con los datos recibidos del API
function llenarTabla(data) {
  const tabla = document.querySelector('table tbody');
  tabla.innerHTML = ''; // Limpiar el contenido actual de la tabla

  data.forEach((genero) => {
    const fila = `
      <tr>
        <td>${genero.id_Genero}</td>
        <td>${genero.descripcion}</td>
        <td class="actd">
          <a class="bx bx-edit icon1" href="formulariogenero.html?id=${genero.id_Genero}"></a>
          &nbsp; &nbsp;
        </td>
        <td>
          <button type="button" class="bx bx-trash icon2" onclick="mostrarVentanaModal('${genero.descripcion}')"></button>
        </td>
      </tr>
    `;
    tabla.insertAdjacentHTML('beforeend', fila);
  });

}

// Función para mostrar la ventana modal
function mostrarVentanaModal(nombreGenero) {
  Swal.fire({
    title: 'Estamos trabajando...',
    html: `Eliminando el género: <strong>${nombreGenero}</strong>`,
    icon: 'info',
    showConfirmButton: false,
    width: '400px', // Ancho personalizado
    height: '200px', // Altura personalizada
    timer: 1500 // El tiempo que quieres que aparezca la ventana modal antes de cerrarse automáticamente (en milisegundos)
  });
}

// Llamar a la función para obtener los datos y llenar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', obtenerDatosYLLenarTabla);
