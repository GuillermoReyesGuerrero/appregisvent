
function verificarSesion() {
    const sessionActive = localStorage.getItem("SessionActive");
    if (!sessionActive || sessionActive !== "True") {
        window.location = "index.html";
    }
}

window.onload = verificarSesion;

obtenerArticulos();

function obtenerArticulos() {
  $.ajax({
    url: "https://project-vtsocial.firebaseio.com/articulos.json",
    method: "GET",
    dataType: "json",
    beforeSend: function () {
      // iniciarAlerts();
    },
    success: function (response) {
        displayTotales(response);
    },
    error: function (e) {
      console.log(e);
    },
  });
}

function displayTotales(articulos) {
    var totalArticulos = 0;
    var totalVenta = 0;
    var totalGanancia = 0;
    var totalPerdida = 0;
    var totalInversion = 0;
    var totalInversionNeta = 0;
  
    articulos.forEach((articulo) => {
      if (articulo !== null) {
        totalArticulos++;
        totalInversion += parseFloat(articulo.precio_costo);

        if(articulo.id_pedido != 1){
            totalInversionNeta += parseFloat(articulo.precio_costo);
        }
        if(articulo.estatus_envio == 'S' && articulo.estatus_venta == 'S'){
            totalVenta += parseFloat(articulo.precio_venta);
        }
        if(articulo.estatus_envio == 'N' || articulo.estatus_venta == 'P'){
            totalPerdida += parseFloat(articulo.precio_costo);
        }
      }
    });

    totalGanancia = totalVenta - totalInversionNeta;

    $('#totalArticulos').text(totalArticulos);
    $('#totalVenta').text('$ '+totalVenta.toFixed(2));
    $('#totalGanancia').text('$ '+totalGanancia.toFixed(2));
    $('#totalPerdida').text('$ '+totalPerdida.toFixed(2));
    $('#totalInversion').text('$ '+totalInversion.toFixed(2));

}
