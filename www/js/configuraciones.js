function verificarSesion() {
    const sessionActive = localStorage.getItem("SessionActive");
    if (!sessionActive || sessionActive !== "True") {
      window.location = "index.html";
    }
}
  
window.onload = function () {
    verificarSesion();

    const sessionUID = localStorage.getItem("SessionUID");
    const sessionEmail = localStorage.getItem("SessionEmail");
    obtenerUsuarios(sessionUID);
}

function obtenerUsuarios(sessionUID) {
  $.ajax({
    url: "https://project-vtsocial.firebaseio.com/usuarios.json",
    method: "GET",
    dataType: "json",
    beforeSend: function () {
      // iniciarAlerts();
    },
    success: function (response) {
        displayUsuario(response,sessionUID);
    },
    error: function (e) {
      console.log(e);
    },
  });
}

function displayUsuario(usuarios,sessionUID) {
  
    usuarios.forEach((usuario) => {
      if (usuario !== null) {
        if(usuario.uid == sessionUID){
            $('#textNombre').text(usuario.nombre+" "+usuario.ap_paterno);
            $('#txtCorreo').text(usuario.correo);
            $("#txtImagen").attr("src", usuario.imagen);
        }
      }
    });

  }
  