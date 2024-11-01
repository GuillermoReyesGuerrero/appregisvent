
function verificarSesion() {
    const sessionActive = localStorage.getItem("SessionActive");
    if (!sessionActive || sessionActive !== "True") {
        window.location = "index.html";
    }
}

var idPedido = 0;
var idArticulo = 0;
window.onload = function() {
    verificarSesion();
    
    const params = new URLSearchParams(window.location.search);
    const id_articulo = params.get('idArticulo');
    const op = params.get('op');
    const id_pedido = params.get('idPedido');
    idPedido = id_pedido;
    idArticulo = id_articulo;
    $('#numeroArticulo').text(id_articulo);
    obtenerArticulo(id_articulo,op);
};

function iniciarAlerts(){
    swal("Cargando...",{
      buttons: false,
      icon: 'img/loading.gif',
      timer: 3000,
    });
}


function obtenerArticulo(id_articulo,op) { 
    $.ajax({
        url: "https://project-vtsocial.firebaseio.com/articulos/"+id_articulo+".json",
        method: "GET",
        cache: false,
        beforeSend: function () {
            // iniciarAlerts();
        },
        success: function(response) {
            $('#imagenArticulo').attr('src', response.imagen);
            $('#idArticuloArt').val(response.id_articulo);
            $('#idPedidoArt').val(response.id_pedido);
            $('#nombreArt').val(response.nombre);
            $('#descripcionArt').val(response.descripcion);
            $('#cantidadArt').val(response.cantidad);
            $('#preCostoArt').val(response.precio_costo);
            $('#preVentaArt').val(response.precio_venta);
            $('#estaEnviadoArt').val(response.estatus_envio);
            $('#estaVentaArt').val(response.estatus_venta);
        },
        error: function(e) {
            console.log(e);
        }
    });
}

function regresarVerpedido(){
    window.location.href = 'pedido.html?idPedido='+idPedido;
}