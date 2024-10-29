import { auth, signInWithEmailAndPassword } from "./firebase.js";

var ModalCarga = new bootstrap.Modal(document.getElementById("cargar"), {});

$("#loginBtn").click(function() {

    var username = $("#username").val();
    var password = $("#password").val();
	var Parametros = {"username" : username, "password" : password};

    ModalCarga.show();

    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Inicio de sesión exitoso
        var user = userCredential.user;
        console.log("Usuario ha iniciado sesión:", user);
        ModalCarga.hide();
        // alert("Inicio de sesión exitoso.");
        localStorage.setItem("SessionUID", user.uid);
        localStorage.setItem("SessionEmail", user.email);
        localStorage.setItem("SessionAccessToken", user.accessToken);
        localStorage.setItem("SessionActive", "True");

        window.location = "mainTotales.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error al iniciar sesión:", errorCode, errorMessage);
        ModalCarga.hide();
        alert("Error al iniciar sesión: " + errorMessage);
      });
    
    console.log(Parametros);
});


$("#btnPassword").click(function() {
  const passwordField = document.getElementById("password");
  const toggleIcon = document.getElementById("toggleIcon");

  // Cambia el tipo de "password" a "text" y viceversa
  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
});
