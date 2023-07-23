// Cargar las categorías al cargar la página
$(document).ready(function () {
    fetchCategorias();

    // Obtener el ID del producto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get('id');

    // Si se proporcionó un ID válido, realizar la solicitud AJAX para obtener el producto y llenar el formulario
    if (productoId) {
        obtenerProductoYMostrarFormulario(productoId);
    }
});

// Función para cargar las categorías mediante Fetch
function fetchCategorias() {
    fetch('http://localhost:8090/api/categoria/list')
        .then(response => response.json())
        .then(data => {
            const categoriaSelect = document.getElementById('categoria');
            categoriaSelect.innerHTML = '<option value="" disabled selected>Seleccione una categoría</option>';
            data.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id_Categoria;
                option.text = categoria.descripcion;
                categoriaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching categorías:', error));
}

// Evento submit del formulario para guardar o editar el producto mediante Fetch
document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const producto = {};
    formData.forEach((value, key) => {
        if (key === 'categoria') {
            producto[key] = {
                id_Categoria: value
            };
        } else {
            producto[key] = value;
        }
    });

    console.log("FormData ", producto);

    // Verificar si el formulario es para guardar o editar
    const productoId = document.getElementById('id_Producto').value;
    if (productoId) {
        // Si se proporcionó un ID válido, realizar una solicitud PUT para editar el producto
        producto.id_Producto = productoId;
        editarProducto(producto);
    } else {
        // Si no se proporcionó un ID válido, realizar una solicitud POST para guardar el producto
        guardarProducto(producto);
    }
});

// Función para guardar un nuevo producto
function guardarProducto(producto) {
    fetch('http://localhost:8090/api/producto/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
    .then(response => {
        if (!response.ok) 
            throw new Error('Error al guardar el producto');
    })
    .then(() => {
        console.log('Producto guardado con éxito');
        // Aquí puedes redirigir o mostrar un mensaje de éxito
        window.location.href = '/templates/listarproducto.html';
    })
    .catch(error => console.error('Error en la solicitud Fetch:', error));
}

// Función para editar un producto existente
function editarProducto(producto) {
    fetch(`http://localhost:8090/api/producto/editar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
    .then(response => {
        if (!response.ok) 
            throw new Error('Error al editar el producto');
    })
    .then(() => {
        console.log('Producto editado con éxito');
        // Aquí puedes redirigir o mostrar un mensaje de éxito
        window.location.href = '/templates/listarproducto.html';
    })
    .catch(error => console.error('Error en la solicitud Fetch:', error));
}




// Función para obtener el producto específico y llenar el formulario
function obtenerProductoYMostrarFormulario(productoId) {
    fetch(`http://localhost:8090/api/producto/buscar/${productoId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el producto');
            }
            return response.json();
        })
        .then(producto => {
            // Llenar el formulario con los datos del producto
            document.getElementById('id_Producto').value = producto.id_Producto;
            document.getElementById('nombre').value = producto.nombre;
            document.getElementById('descripcion').value = producto.descripcion;
            document.getElementById('precio_compra').value = producto.precio_compra;
            document.getElementById('precio_venta').value = producto.precio_venta;
            document.getElementById('stock').value = producto.stock;
            document.getElementById('descuento').value = producto.descuento;
            document.getElementById('categoria').value = producto.categoria.id_Categoria;
        })
        .catch(error => console.error('Error en la solicitud Fetch:', error));
}
