$(document).ready(function () {
    // Obtener el ID de la categoría desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaId = urlParams.get('id');

    // Si se proporcionó un ID válido, realizar la solicitud AJAX para obtener la categoría y llenar el formulario
    if (categoriaId) {
        obtenerCategoriaYMostrarFormulario(categoriaId);
    }
});


// Evento submit del formulario para guardar o editar la categoría mediante Fetch
document.getElementById('categoriaForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const categoria = {};
    formData.forEach((value, key) => {
        categoria[key] = value;
    });

    console.log("FormData ", categoria);

    // Verificar si el formulario es para guardar o editar
    const categoriaId = document.getElementById('id_Categoria').value;
    if (categoriaId) {
        // Si se proporcionó un ID válido, realizar una solicitud PUT para editar la categoría
        categoria.id_Categoria = categoriaId;
        editarCategoria(categoria);
    } else {
        // Si no se proporcionó un ID válido, realizar una solicitud POST para guardar la categoría
        guardarCategoria(categoria);
    }
});

// Función para guardar una nueva categoría
function guardarCategoria(categoria) {
    fetch('http://localhost:8090/api/categoria/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoria)
    })
    .then(response => {
        if (!response.ok) 
            throw new Error('Error al guardar la categoría');
    })
    .then(() => {
        console.log('Categoría guardado con éxito');
        // Aquí puedes redirigir o mostrar un mensaje de éxito
        window.location.href = '/templates/listarcategoria.html';
    })
    .catch(error => console.error('Error en la solicitud Fetch:', error));
}

// Función para editar una categoría existente
function editarCategoria(categoria) {
    fetch(`http://localhost:8090/api/categoria/editar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoria)
    })
    .then(response => {
        if (!response.ok) 
            throw new Error('Error al editar la categoría');
    })
    .then(() => {
        console.log('Categoría editada con éxito');
        // Aquí puedes redirigir o mostrar un mensaje de éxito
        window.location.href = '/templates/listarcategoria.html';
    })
    .catch(error => console.error('Error en la solicitud Fetch:', error));
}




// Función para obtener la categoría específica y llenar el formulario
function obtenerCategoriaYMostrarFormulario(categoriaId) {
    fetch(`http://localhost:8090/api/categoria/buscar/${categoriaId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la categoría');
            }
            return response.json();
        })
        .then(categoria => {
            // Llenar el formulario con los datos de la categoría
            document.getElementById('id_Categoria').value = categoria.id_Categoria;
            document.getElementById('descripcion').value = categoria.descripcion;
        })
        .catch(error => console.error('Error en la solicitud Fetch:', error));
}
