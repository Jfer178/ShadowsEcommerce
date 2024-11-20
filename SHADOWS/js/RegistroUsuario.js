document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener los valores de los campos
    const cedula = document.getElementById('cedula').value;
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;

    // Validación simple (puedes agregar más validaciones)
    if (cedula === "" || nombre === "" || direccion === "" || correo === "" || contraseña === "") {
        document.getElementById('errorMessage').textContent = "Por favor, ingrese todos los campos.";
    } else {
        // Si la validación es exitosa, crear un objeto con los datos a enviar
        const usuarioData = {
            cedula: cedula,
            nombre: nombre,
            direccion: direccion,
            correo: correo,
            contraseña: contraseña
        };

        // Realizar la solicitud POST a tu servidor Flask
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Asegúrate de enviar los datos como JSON
            },
            body: JSON.stringify(usuarioData) // Convertir los datos a formato JSON
        })
        .then(response => response.json()) // Esperar la respuesta del servidor
        .then(data => {
            if (data.message === "Usuario registrado exitosamente") {
                alert("Registro exitoso!");
                window.location.href = "/Pages/login.html";  // Redirige al login después del registro
            } else {
                document.getElementById('errorMessage').textContent = data.message; // Mostrar error si algo salió mal
            }
        })
        .catch(error => {
            console.error("Error al registrar el usuario:", error);
            document.getElementById('errorMessage').textContent = "Ocurrió un error al registrar el usuario. Intenta de nuevo.";
        });
    }
});
