import { dbRealTime, update, ref } from "./firebase.js";

$("#btnEditarArticulo").click(function() {
    var nombre = $('#nombreArt').val();
    var descripcion = $('#descripcionArt').val();
    var cantidad = $('#cantidadArt').val();
    var precioCosto = $('#preCostoArt').val();
    var precioVenta = $('#preVentaArt').val();
    var estatusEnvio = $('#estaEnviadoArt').val();
    var estatusVenta = $('#estaVentaArt').val();
    var idArticulo = $('#idArticuloArt').val();
    var idPedido = $('#idPedidoArt').val();

    update(ref(dbRealTime, "articulos/"+idArticulo), {
        cantidad: cantidad,
        descripcion: descripcion,
        estatus_envio: estatusEnvio,
        estatus_venta: estatusVenta,
        nombre: nombre,
        precio_costo: precioCosto,
        precio_venta: precioVenta 
      })
        .then(() => {
            swal("Registro actualizado exitosamente!", {
                buttons: {
                  confirm: {
                    text: "Aceptar",
                    value: true,
                    className: "btn btn-success",
                  },
                },
              }).then((value) => {
                if (value) {
                   window.location.href = 'pedido.html?idPedido='+idPedido;
                }
              });
        })
        .catch((error) => {
            console.error("Error al actualizar el registro:", error);
        });
});
