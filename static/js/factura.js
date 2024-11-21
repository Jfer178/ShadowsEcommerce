document.getElementById('carrito-acciones-comprar').addEventListener('click', function() {
    // Obtener los productos del carrito desde el localStorage
    let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

    // Obtener los datos del usuario llamando a la ruta Flask /usuario_info
    fetch('/usuario_info')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const nombreUsuario = data.nombre;
                const direccionUsuario = data.direccion;
                const fechaHora = new Date().toLocaleDateString(); // Solo fecha, sin hora

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

                // Enviar la información de la transacción al backend para guardarla
                const transaccionData = {
                    monto: total,
                    direccion_envio: direccionUsuario,
                    id_cliente: data.id_cliente,  // El id del usuario
                    fecha: new Date().toISOString(),  // Enviar la fecha como ISO 8601
                    productos: productosEnCarrito.map(producto => ({
                        id_producto: producto.id,  // ID del producto
                        titulo: producto.titulo,   // Titulo del producto
                        nombre: producto.titulo,  // Nombre (suponiendo que es el mismo que el título)
                        cantidad: producto.cantidad,  // Cantidad comprada
                        precio: producto.precio,  // Precio unitario
                        bruto: producto.precio * producto.cantidad,  // El precio bruto
                        neto: producto.precio * producto.cantidad * 0.9,  // Precio neto (con descuento)
                        imp: producto.precio * producto.cantidad * 0.1  // Impuesto (10%)
                    }))
                };

                // Realizar el POST para guardar la transacción en la base de datos
                fetch('/guardar_transaccion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(transaccionData),
                })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        console.log('Transacción guardada correctamente');
                        // Vaciar el carrito después de la compra
                        localStorage.setItem("productos-en-carrito", JSON.stringify([]));
                    } else {
                        console.log('Error al guardar la transacción:', result.mensaje);
                    }
                })
                .catch(error => {
                    console.error('Error al enviar la transacción:', error);
                });

            } else {
                alert('No se pudo obtener la información del usuario.');
            }
        })
        .catch(error => console.error('Error:', error));
});

// Cerrar la factura
document.getElementById('cerrar-factura').addEventListener('click', function() {
    document.getElementById('factura').style.display = 'none';
});

// Volver a la página de productos
document.getElementById('volver-a-comprar').addEventListener('click', function() {
    window.location.href = '/productos';
});
