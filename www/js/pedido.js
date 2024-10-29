// Verificar si la sesión está activa
function verificarSesion() {
  const sessionActive = localStorage.getItem("SessionActive");

  // Si no existe el valor de la sesión o es diferente de "True", redirige al index
  if (!sessionActive || sessionActive !== "True") {
    window.location = "index.html"; // Redirigir a la página de inicio de sesión
  }
}

window.onload = function () {
  verificarSesion();

  const params = new URLSearchParams(window.location.search);
  const id_pedido = params.get("idPedido");
  //console.log('ID del pedido:', id_pedido);
  // Puedes usar el id_mispedidos para cargar los detalles del pedido desde tu base de datos, etc.
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
      iniciarAlerts();
    },
    success: function (response) {
      console.log("Datos cargados:", response);
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
        console.log(articulo.id_pedido);
  contenido += '<div class="col-sm-6 col-md-3">'+
                '<div class="card card-stats card-round">'+
                  '<div class="card-body">'+
                    '<div class="row align-items-center">'+
                      '<div class="col-icon">'+
                        '<div class="icon-big text-center icon-black bubble-shadow-small">'+
                          '<img src="'+articulo.imagen+'" alt="" class="img-fluid" />'+
                        '</div>'+
                      '</div>'+
                      '<div class="col col-stats ms-4 ms-sm-0">'+
                        '<div class="numbers">'+
                          '<p class="card-title">'+articulo.nombre+'</p>'+
                          '<p class="card-category">Cantidad: '+articulo.cantidad+'</p>'+
                          '<p class="card-category">Costo: '+articulo.precio_costo+'</p>'+
                          '<p class="card-category">Venta: '+articulo.precio_venta+'</p>'+
                          '<p class="card-category">Estatus: '+(articulo.estatus_venta === "S" ? "Vendido" : articulo.estatus_venta === "N" ? "No vendido" : "Perdida")+'</p>'+
                        '</div>'+
                      '</div>'+
                      '<div class="col-auto">'+
                        '<button class="btn" onclick="obtenerPedido('+articulo.id_articulo+')"><i class="fas fa-angle-right icon-big"></i></button>'+
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
  // console.log(idArticulo+' '+op);
  window.location.href =
    "detalle_pedido.html?idArticulo=" + idArticulo + "&op=" + op;
}

function eliminarArticulo(idArticulo) {
  $.confirm({
    title: "CONFIRMACIÓN",
    content: "¿Seguro deseas eliminar el articulo " + idArticulo + " ?",
    type: "secondary",
    theme: "modern",
    typeAnimated: true,
    buttons: {
      confirm: {
        text: "Aceptar",
        btnClass: "btn-secondary",
        action: function () {
          $.ajax({
            url:
              "https://secure-beach-31133-25c031d46ad1.herokuapp.com/api/articulo/" +
              idArticulo,
            method: "DELETE",
            cache: false,
            dataType: "json",
            beforeSend: function () {
              myModal.show();
            },
            success: function (response) {
              myModal.hide();
              //console.log(response);
              if (response.status) {
                $.confirm({
                  title: "EXITO",
                  content: response.msg,
                  type: "green",
                  theme: "modern",
                  typeAnimated: true,
                  buttons: {
                    confirm: {
                      text: "Aceptar",
                      btnClass: "btn-success",
                      action: function () {
                        window.location.reload();
                      },
                    },
                  },
                });
              } else {
                $.confirm({
                  title: "ERROR",
                  content: response.message,
                  type: "red",
                  theme: "modern",
                  typeAnimated: true,
                  buttons: {
                    close: {
                      text: "Cerrar",
                      btnClass: "btn-red",
                      action: function () {},
                    },
                  },
                });
              }
            },
            error: function (e) {
              console.log(e);
            },
          });
        },
      },
      close: {
        text: "Cancelar",
        btnClass: "btn-red",
        action: function () {},
      },
    },
  });
}

function regresarPedidos() {
  window.location.href = "pedidos.html";
}
