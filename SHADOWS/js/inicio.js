// Seleccionamos el contenedor del slider y el botón
const slider = document.querySelector('.photo-slider');
const nextBtn = document.querySelector('.next-btn');

// Obtenemos todas las imágenes dentro del slider
const images = document.querySelectorAll('.photo-slider img');

// Inicializamos un índice para controlar la imagen actual
let currentIndex = 0;

// Función para mover el slider hacia la siguiente imagen
nextBtn.addEventListener('click', () => {
    // Incrementamos el índice para mostrar la siguiente imagen
    currentIndex++;

    // Si llegamos al final de las imágenes, volvemos al inicio
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    // Desplazamos el slider a la posición de la siguiente imagen
    slider.style.transform = `translateX(-${currentIndex * 315}px)`; // 315px es el ancho de cada imagen + el espacio
});

window.onload = function() {
    // Verificar si hay un nombre de usuario en sessionStorage
    const userName = sessionStorage.getItem("userName");

    // Si el usuario está logueado, cambiar el texto del botón
    if (userName) {
        // Buscar el botón de "Iniciar sesión" y cambiar su texto
        const loginButton = document.querySelector(".iniciar-sesion");
        loginButton.textContent = `Hola, ${userName}`;  // Mostrar el nombre del usuario

        // Opcional: Agregar un enlace para cerrar sesión
        const logoutLink = document.createElement("a");
        logoutLink.textContent = "Cerrar sesión";
        logoutLink.href = "#";
        logoutLink.addEventListener("click", function() {
            // Eliminar el nombre del usuario de sessionStorage
            sessionStorage.removeItem("userName");

            // Redirigir a la página de inicio o login
            window.location.href = "/index.html";
        });
        
        // Agregar el enlace de "Cerrar sesión" al lado del nombre
        loginButton.appendChild(logoutLink);
    }
};