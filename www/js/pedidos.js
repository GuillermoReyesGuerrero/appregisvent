
function verificarSesion() {
  const sessionActive = localStorage.getItem("SessionActive");
  if (!sessionActive || sessionActive !== "True") {
    window.location = "index.html";
  }
}

window.onload = function () {
  verificarSesion();
}

function iniciarAlerts(){
  swal("Cargando...",{
    buttons: false,
    icon: 'img/loading.gif',
    timer: 3000,
  });
}

obtenerPedidos();

function obtenerPedidos() {
  $.ajax({
    url: "https://project-vtsocial.firebaseio.com/pedidos.json",
    method: "GET",
    dataType: "json",
    beforeSend: function () {
      // iniciarAlerts();
    },
    success: function (response) {
      displayPedidos(response);
    },
    error: function (e) {
      console.log(e);
    },
  });
}

function displayPedidos(pedidos) {
  var contenido = "";

  pedidos.forEach((pedido) => {
    if (pedido !== null) {
      contenido += '<div class="col-sm-6 col-md-3">'+
                  '<div class="card card-stats card-round">'+
                    '<div class="card-body">'+
                      '<div class="row align-items-center">'+
                        '<div class="col-icon">'+
                          '<div class="icon-big text-center icon-black bubble-shadow-small">'+
                            '<i class="fas fa-shopping-cart"></i>'+
                          '</div>'+
                        '</div>'+
                        '<div class="col col-stats ms-4 ms-sm-0">'+
                          '<div class="numbers">'+
                            '<p class="card-title">'+pedido.descripcion+'</p>'+
                            '<p class="card-category">Fecha: '+pedido.fecha_registro+'</p>'+
                            '<p class="card-category">Activo: '+(pedido.activo === "S" ? "Sí" : "No")+'</p>'+
                          '</div>'+
                        '</div>'+
                        '<div class="col-auto">'+
                          '<button class="btn" onclick="obtenerPedido('+pedido.id_pedido+')"><i class="fas fa-angle-right icon-big"></i></button>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>';
    }
  });

  $('#contentCardsPedidos').html(contenido);
}

function obtenerPedido(id_pedido) {
  window.location.href = "pedido.html?idPedido=" + id_pedido;
}


