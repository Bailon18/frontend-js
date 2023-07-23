$(document).ready(function () {
    // Obtener el ID del género desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const generoId = urlParams.get('id');

    // Si se proporcionó un ID válido, realizar la solicitud AJAX para obtener el género y llenar el formulario
    if (generoId) {
        obtenerGeneroYMostrarFormulario(generoId);
    }
});


// Evento submit del formulario para guardar o editar el género mediante Fetch
document.getElementById('generoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const genero = {};
    formData.forEach((value, key) => {
        genero[key] = value;
    });

    console.log("FormData ", genero);

    // Verificar si el formulario es para guardar o editar
    const generoId = document.getElementById('id_Genero').value;
    if (generoId) {
        // Si se proporcionó un ID válido, realizar una solicitud PUT para editar el género
        genero.id_Genero = generoId;
        editarGenero(genero);
    } else {
        // Si no se proporcionó un ID válido, realizar una solicitud POST para guardar el género
        guardarGenero(genero);
    }
});

// Función para guardar un nuevo género
function guardarGenero(genero) {
    fetch('http://localhost:8090/api/genero/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genero)
    })
    .then(response => {
        if (!response.ok) 
            throw new Error('Error al guardar el género');
    })
    .then(() => {
        console.log('Género guardado con éxito');
        // Aquí puedes redirigir o mostrar un mensaje de éxito
        window.location.href = '/templates/listargenero.html';
    })
    .catch(error => console.error('Error en la solicitud Fetch:', error));
}

// Función para editar un género existente
function editarGenero(genero) {
    fetch(`http://localhost:8090/api/genero/editar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genero)
    })
    .then(response => {
        if (!response.ok) 
            throw new Error('Error al editar el género');
    })
    .then(() => {
        console.log('Género editada con éxito');
        // Aquí puedes redirigir o mostrar un mensaje de éxito
        window.location.href = '/templates/listargenero.html';
    })
    .catch(error => console.error('Error en la solicitud Fetch:', error));
}


// Función para obtener el género específico y llenar el formulario
function obtenerGeneroYMostrarFormulario(generoId) {
    fetch(`http://localhost:8090/api/genero/buscar/${generoId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el genero');
            }
            return response.json();
        })
        .then(genero => {
            // Llenar el formulario con los datos del género
            document.getElementById('id_Genero').value = genero.id_Genero;
            document.getElementById('descripcion').value = genero.descripcion;
        })
        .catch(error => console.error('Error en la solicitud Fetch:', error));
}
