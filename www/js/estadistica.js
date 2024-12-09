
function verificarSesion() {
    const sessionActive = localStorage.getItem("SessionActive");
    if (!sessionActive || sessionActive !== "True") {
      window.location = "index.html";
    }
}
  
window.onload = function () {
    verificarSesion();
};

function mostrarEstadistica(tipo) {
    if(tipo == ''){
        swal("No se ha seleccionado el tipo de estatus!", {
            buttons: {
              confirm: {
                text: "Aceptar",
                value: true,
                className: "btn btn-success",
              },
            },
          }).then((value) => {
          });
    } else {
        $.ajax({
            url: "https://project-vtsocial.firebaseio.com/articulos.json",
            method: "GET",
            dataType: "json",
            beforeSend: function () {
              // iniciarAlerts();
            },
            success: function (response) {
              console.log("Datos cargados:", response);
              displayArticulosEsta(response,tipo);
            },
            error: function (e) {
              console.log(e);
            },
          });
    }
}

function displayArticulosEsta(articulos,tipo) {
    var contenido = "";
    articulos.forEach((articulo) => {
      if (articulo !== null && articulo.estatus_venta == tipo) {
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

    $("#contentCardsArticulos").html(contenido);
}