// Verificar si la sesión está activa
function verificarSesion() {
    const sessionActive = localStorage.getItem("SessionActive");

    // Si no existe el valor de la sesión o es diferente de "True", redirige al index
    if (!sessionActive || sessionActive !== "True") {
        window.location = "index.html"; // Redirigir a la página de inicio de sesión
    }
}

// Ejecutar la verificación cuando la página cargue
window.onload = verificarSesion;