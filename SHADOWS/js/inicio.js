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