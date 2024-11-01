
function verificarSesion() {
  const sessionActive = localStorage.getItem("SessionActive");
  if (!sessionActive || sessionActive !== "True") {
    window.location = "index.html";
  }
}

var idPedido = 0;
window.onload = function () {
  verificarSesion();

  const params = new URLSearchParams(window.location.search);
  const id_pedido = params.get("idPedido");
  idPedido = id_pedido;
  $("#numeroPedido").text(id_pedido);
  obtenerPedidoArticulos(id_pedido);
};

function iniciarAlerts(){
  swal("Cargando...",{
    buttons: false,
    icon: 'img/loading.gif',
    timer: 3000,
  });
}

function obtenerPedidoArticulos(id_pedido) {
  $.ajax({
    url: "https://project-vtsocial.firebaseio.com/articulos.json",
    method: "GET",
    dataType: "json",
    beforeSend: function () {
      // iniciarAlerts();
    },
    success: function (response) {
      displayPedidoArticulos(response,id_pedido);
    },
    error: function (e) {
      console.log(e);
    },
  });
}

function displayPedidoArticulos(articulos,id_pedido) {
  var contenido = "";
  articulos.forEach((articulo) => {
    if (articulo !== null && articulo.id_pedido == id_pedido) {
  contenido += '<div class="col-sm-6 col-md-3">'+
                '<div class="card card-stats card-round">'+
                  '<div class="card-body">'+
                    '<div class="row align-items-center">'+
                      '<div class="col-icon">'+
                        '<div class="icon-big text-center icon-black bubble-shadow-small">'+
                          '<img src="'+articulo.imagen+'" alt="" class="img-fluid" />'+
                        '</div>'+
                      '</div>'+
                      '<div class="col col-stats ms-2 ms-sm-0">'+
                        '<div class="numbers">'+
                          '<p class="card-title">'+articulo.nombre+'</p>'+
                          '<p class="card-category">Cantidad: '+articulo.cantidad+'</p>'+
                          '<p class="card-category">Costo: $'+articulo.precio_costo+'</p>'+
                          '<p class="card-category">Venta: $'+articulo.precio_venta+'</p>'+
                          '<p class="card-category">Estatus: '+(articulo.estatus_venta === "S" ? "<p class='text-success'>Vendido</p>" : articulo.estatus_venta === "N" ? "<p class='text-danger'>No vendido</p>" : "<p class='text-warning'>Perdida</p>")+'</p>'+
                        '</div>'+
                      '</div>'+
                      '<div class="col-auto">'+
                        '<button class="btn" onclick="consultarArticulo('+articulo.id_articulo+','+2+')"><i class="fas fa-angle-right icon-big"></i></button>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>';
    }
  });
  $("#contentCardsPedido").html(contenido);
}

function consultarArticulo(idArticulo, op) {
  window.location.href = "detalle_pedido.html?idArticulo=" + idArticulo + "&op=" + op+ "&idPedido=" +idPedido;
}

function regresarPedidos() {
  window.location.href = "pedidos.html";
}
