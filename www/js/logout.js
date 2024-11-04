// Función para cerrar la sesión
function cerrarSesion() {

    swal({
        title: "CONFIRMACIÓN",
        text: "¿Seguro deseas cerrar la sesión?",
        type: "warning",
        buttons: {
          confirm: {
            text: "Si",
            className: "btn btn-success",
          },
          cancel: {
            visible: true,
            text: "No",
            className: "btn btn-danger",
          },
        },
      }).then((value) => {
        if (value) {
            localStorage.removeItem("SessionUID");
            localStorage.removeItem("SessionEmail");
            localStorage.removeItem("SessionAccessToken");
            localStorage.removeItem("SessionActive");
        
            // Redirigir al index después de cerrar la sesión
            window.location = "index.html";
        } else {
          swal.close();
        }
      });
}