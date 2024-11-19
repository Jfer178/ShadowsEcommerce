document.querySelector("#loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevenir el envío del formulario por defecto

    // Obtener los valores del formulario
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    // Validar si los campos están vacíos
    if (email === "" || password === "") {
        document.querySelector("#errorMessage").textContent = "Por favor, ingrese ambos campos.";
        return;
    }

    // Enviar los datos al backend para verificar las credenciales
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            correo: email,
            contraseña: password
        })
    })
    .then(response => response.json())  // Convertir la respuesta a JSON
    .then(data => {
        if (data.success) {
            // Si las credenciales son correctas, almacenar el nombre del usuario
            sessionStorage.setItem("userName", data.nombre);

            // Redirigir a la página principal
            window.location.href = "/index.html";
        } else {
            // Si las credenciales son incorrectas, mostrar un mensaje de error
            document.querySelector("#errorMessage").textContent = "Correo o contraseña incorrectos.";
        }
    })
    .catch(error => {
        console.error("Error al hacer login:", error);
        document.querySelector("#errorMessage").textContent = "Ocurrió un error al intentar iniciar sesión.";
    });
});