document.addEventListener('DOMContentLoaded', function() {
    // Asegurarse de que el formulario se haya cargado
    document.getElementById('registroForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto

        // Obtener los valores de los campos
        const cedula = document.getElementById('cedula').value;
        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;
        const correo = document.getElementById('correo').value;
        const contraseña = document.getElementById('contraseña').value;

        // Imprimir los datos a enviar para verificar
        console.log({
            id_cliente: cedula,
            nombre: nombre,
            direccion: direccion,
            correo: correo,
            password: contraseña
        });

        // Crear objeto con los datos
        const datos = {
            id_cliente: cedula,
            nombre: nombre,
            direccion: direccion,
            correo: correo,
            password: contraseña
        };

        // Enviar los datos al backend
        fetch('/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
        .then(response => {
            // Si la respuesta es exitosa
            if (response.ok) {
                return response.json();
            } else {
                // Si la respuesta no es exitosa
                throw new Error('Error al registrar el usuario');
            }
        })
        .then(data => {
            alert(data.mensaje); // Mensaje del servidor
            window.location.href = '/login'; // Cambia la URL a la página de login
        })
        .catch(error => {
            console.error('Error:', error); // Imprimir el error en la consola
            alert('Ocurrió un error');
        });
    });
});