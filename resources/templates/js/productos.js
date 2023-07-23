// URL del API
const apiURL = 'http://localhost:8090/api/producto/list';

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

  data.forEach((producto) => {
    const fila = `
      <tr>
        <td>${producto.id_Producto}</td>
        <td>${producto.nombre}</td>
        <td>${producto.descripcion}</td>
        <td>${producto.precio_compra}</td>
        <td>${producto.precio_venta}</td>
        <td>${producto.stock}</td>
        <td>${producto.descuento}</td>
        <td>${producto.categoria.descripcion}</td>
        <td class="actd">
          <a class="bx bx-edit icon1" href="formularioProducto.html?id=${producto.id_Producto}"></a>
          &nbsp; &nbsp;
        </td>
        <td>
          <button type="button" class="bx bx-trash icon2" onclick="mostrarVentanaModal('${producto.nombre}')"></button>
        </td>
      </tr>
    `;
    tabla.insertAdjacentHTML('beforeend', fila);
  });

}

// Función para mostrar la ventana modal
function mostrarVentanaModal(nombreProducto) {
  Swal.fire({
    title: 'Estamos trabajando...',
    html: `Eliminando el producto: <strong>${nombreProducto}</strong>`,
    icon: 'info',
    showConfirmButton: false,
    width: '400px', // Ancho personalizado
    height: '200px', // Altura personalizada
    timer: 1500 // El tiempo que quieres que aparezca la ventana modal antes de cerrarse automáticamente (en milisegundos)
  });
}

// Llamar a la función para obtener los datos y llenar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', obtenerDatosYLLenarTabla);
