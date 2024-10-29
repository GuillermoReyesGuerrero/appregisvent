// Función para cerrar la sesión
function cerrarSesion() {
    $.confirm({
        title: 'CONFIRMACIÓN',
        content: "¿Seguro deseas cerrar la sesión?",
        type: 'secondary',
        theme: 'modern',
        typeAnimated: true,
        buttons: {
            confirm: {
                text: 'Aceptar',
                btnClass: 'btn-secondary',
                action: function() {
                    localStorage.removeItem("SessionUID");
                    localStorage.removeItem("SessionEmail");
                    localStorage.removeItem("SessionAccessToken");
                    localStorage.removeItem("SessionActive");
                
                    // Redirigir al index después de cerrar la sesión
                    window.location = "index.html";
                }
            },
            close: {
                text: 'Cancelar',
                btnClass: 'btn-red',
                action: function() {}
            }
        }
    });
}