document.getElementById('carrito-acciones-comprar').addEventListener('click', function() {
    // Obtener los productos del carrito
    let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

    // Obtener los datos del usuario (esto puede ser dinámico)
    const nombreUsuario = "Juan Pérez";
    const direccionUsuario = "Calle Falsa 123, Ciudad, País";
    const fechaHora = new Date().toLocaleString(); // Fecha y hora actuales

    // Calcular el total de la compra
    let total = 0;
    let detalles = '';
    productosEnCarrito.forEach(producto => {
        detalles += `<p>${producto.titulo} - ${producto.cantidad} x $${producto.precio}</p>`;
        total += producto.precio * producto.cantidad;
    });

    // Mostrar los detalles de la factura
    document.getElementById('factura-detalles').innerHTML = detalles;
    document.getElementById('factura-total').textContent = total;

    // Mostrar la información del usuario
    document.getElementById('factura-nombre').textContent = nombreUsuario;
    document.getElementById('factura-direccion').textContent = direccionUsuario;
    document.getElementById('factura-fecha-hora').textContent = fechaHora;

    // Mostrar la factura
    document.getElementById('factura').style.display = 'flex';

    // Vaciar el carrito después de la compra
    localStorage.setItem("productos-en-carrito", JSON.stringify([]));
});

// Cerrar la factura
document.getElementById('cerrar-factura').addEventListener('click', function() {
    document.getElementById('factura').style.display = 'none';
});

// Volver a la página de productos
document.getElementById('volver-a-comprar').addEventListener('click', function() {
    window.location.href = '/Pages/productos.html';
});