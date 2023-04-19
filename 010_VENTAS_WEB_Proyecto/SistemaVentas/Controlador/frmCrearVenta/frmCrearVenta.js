$(document).ready(function () {

    $("#txtproductocantidad").val("0");
    $("#txtfechaventa").val(ObtenerFecha());

    AjaxGet("../Inicio.aspx/ObtenerDetalleUsuario",
        function (response) {
            if (response.estado) {
                //TIENDA
                $("#txtIdTienda").val(response.objeto.oTienda.IdTienda);
                $("#lbltiendanombre").text(response.objeto.oTienda.Nombre);
                $("#lbltiendaruc").text(response.objeto.oTienda.RUC);
                $("#lbltiendadireccion").text(response.objeto.oTienda.Direccion);

                //USUARIO
                $("#txtIdUsuario").val(response.objeto.IdUsuario);
                $("#lblempleadonombre").text(response.objeto.Nombres);
                $("#lblempleadoapellido").text(response.objeto.Apellidos);
                $("#lblempleadocorreo").text(response.objeto.Correo);
            }
        },
        function () {
        },
        function () {
        })

})

$.fn.inputFilter = function (inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
        if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
            this.value = "";
        }
    });
};

$("#txtproductocantidad").inputFilter(function (value) {
    return /^-?\d*$/.test(value);
});

$("#txtmontopago").inputFilter(function (value) {
    return /^-?\d*[.]?\d{0,2}$/.test(value);
});

$('#btnBuscarProducto').on('click', function () {
    $('#modalProducto').modal('show');

    if ($.fn.DataTable.isDataTable('#tbProducto')) {
        $('#tbProducto').DataTable().destroy();
    }

    $('#tbProducto tbody').html('');

    var request = { IdTienda: parseInt($("#txtIdTienda").val()) }

    AjaxPost("../frmCrearVenta.aspx/ObtenerProductoxTienda", JSON.stringify(request),
        function (response) {
            $(".modal-body").LoadingOverlay("hide");
            if (response.estado) {
                $.each(response.objeto, function (i, row) {
                        $("<tr>").append(
                            $("<td>").append(
                                $("<button>").addClass("btn btn-sm btn-primary ml-2").append(
                                    $("<i>").addClass("fa fa-check").attr({"aria-hidden":"true"})
                                ).data("producto", row)
                            ),
                            $("<td>").text(row.oProducto.Codigo),
                            $("<td>").text(row.oProducto.Nombre),
                            $("<td>").text(row.oProducto.Descripcion),
                            $("<td>").text(row.Stock)
                        ).appendTo("#tbProducto tbody");
                })
            }
            table = $('#tbProducto').DataTable();
        },
        function () {
            $(".modal-body").LoadingOverlay("hide");
        },
        function () {
            $(".modal-body").LoadingOverlay("show");
        })

})

$('#tbProducto tbody').on('click', 'button[class="btn btn-sm btn-primary ml-2"]', function () {
    var model = $(this).data("producto")
    $("#txtIdProducto").val(model.oProducto.IdProducto);
    $("#txtproductocodigo").val(model.oProducto.Codigo);
    $("#txtproductonombre").val(model.oProducto.Nombre);
    $("#txtproductodescripcion").val(model.oProducto.Descripcion);
    $("#txtproductostock").val(model.Stock);
    $("#txtproductoprecio").val(model.PrecioUnidadVenta);
    $("#txtproductocantidad").val("0");
    $('#modalProducto').modal('hide');
})

$("#txtproductocodigo").on('keypress', function (e) {


    if (e.which == 13) {

        var request = { IdTienda: parseInt($("#txtIdTienda").val()) }

        AjaxPost("../frmCrearVenta.aspx/ObtenerProductoxTienda", JSON.stringify(request),
            function (response) {
                $("#txtproductocodigo").LoadingOverlay("hide");
                var encontrado = false;
                if (response.estado) {
                    
                    $.each(response.objeto, function (i, row) {
                        if (row.oProducto.Codigo == $("#txtproductocodigo").val()) {
                            $("#txtIdProducto").val(row.oProducto.IdProducto);
                            $("#txtproductocodigo").val(row.oProducto.Codigo);
                            $("#txtproductonombre").val(row.oProducto.Nombre);
                            $("#txtproductodescripcion").val(row.oProducto.Descripcion);
                            $("#txtproductostock").val(row.Stock);
                            $("#txtproductoprecio").val(row.PrecioUnidadVenta);
                            encontrado = true;
                            return false;
                        }
                    })
                }

                if (!encontrado) {
                    $("#txtIdProducto").val("0");
                    $("#txtproductocodigo").val("");
                    $("#txtproductonombre").val("");
                    $("#txtproductodescripcion").val("");
                    $("#txtproductostock").val("");
                    $("#txtproductoprecio").val("");
                    $("#txtproductocantidad").val("0");
                }

            },
            function () {
                $("#txtproductocodigo").LoadingOverlay("hide");
            },
            function () {
                $("#txtproductocodigo").LoadingOverlay("show");
            })
       
    }
});


$('#btnAgregar').on('click', function () {

    $("#txtproductocantidad").val($("#txtproductocantidad").val() == "" ? "0" : $("#txtproductocantidad").val());

    var existe_codigo = false;
    if (
        parseInt($("#txtIdProducto").val()) == 0 ||
        parseFloat($("#txtproductocantidad").val()) == 0
    ) {
        swal("Mensaje", "Debe completar todos los campos del producto", "warning")
        return;
    }

    $('#tbVenta > tbody  > tr').each(function (index, tr) {
        var fila = tr;
        var idproducto = $(fila).find("td.producto").data("idproducto");

        if (idproducto == $("#txtIdProducto").val()) {
            existe_codigo = true;
            return false;
        }

    });

    if (!existe_codigo) {

        controlarStock(parseInt($("#txtIdProducto").val()), parseInt($("#txtIdTienda").val()), parseInt($("#txtproductocantidad").val()),true);

        var importetotal = parseFloat($("#txtproductoprecio").val()) * parseFloat($("#txtproductocantidad").val());
        $("<tr>").append(
            $("<td>").append(
                $("<button>").addClass("btn btn-danger btn-sm").text("Eliminar").data("idproducto", parseInt($("#txtIdProducto").val())).data("cantidadproducto", parseInt($("#txtproductocantidad").val()))
            ),
            $("<td>").addClass("productocantidad").text($("#txtproductocantidad").val()),
            $("<td>").addClass("producto").data("idproducto", $("#txtIdProducto").val()).text($("#txtproductonombre").val()),
            $("<td>").text($("#txtproductodescripcion").val()),
            $("<td>").addClass("productoprecio").text($("#txtproductoprecio").val()),
            $("<td>").addClass("importetotal").text(importetotal)
        ).appendTo("#tbVenta tbody");

        $("#txtIdProducto").val("0");
        $("#txtproductocodigo").val("");
        $("#txtproductonombre").val("");
        $("#txtproductodescripcion").val("");
        $("#txtproductostock").val("");
        $("#txtproductoprecio").val("");
        $("#txtproductocantidad").val("0");

        $("#txtproductocodigo").focus();

        calcularPrecios();
    } else {
        swal("Mensaje", "El producto ya existe en la venta", "warning")
    }
})

$('#tbVenta tbody').on('click', 'button[class="btn btn-danger btn-sm"]', function () {
    var idproducto = $(this).data("idproducto");
    var cantidadproducto = $(this).data("cantidadproducto");

    controlarStock(idproducto, parseInt($("#txtIdTienda").val()), cantidadproducto, false);
    $(this).parents("tr").remove();

    calcularPrecios();
})

$('#btnTerminarGuardarVenta').on('click', function () {

    //VALIDACIONES DE CLIENTE
    if ($("#txtclientedocumento").val().trim() == "" || $("#txtclientenombres").val().trim() == "") {
        swal("Mensaje", "Complete los datos del cliente", "warning");
        return;
    }
    //VALIDACIONES DE PRODUCTOS
    if ($('#tbVenta tbody tr').length == 0) {
        swal("Mensaje", "Debe registrar minimo un producto en la venta", "warning");
        return;
    }

    //VALIDACIONES DE MONTO PAGO
    if ($("#txtmontopago").val().trim() == "") {
        swal("Mensaje", "Ingrese el monto de pago", "warning");
        return;
    }

    var $totalproductos = 0;
    var $totalimportes = 0;

    var DETALLE = "";
    var VENTA = "";
    var DETALLE_CLIENTE = "";
    var DETALLE_VENTA = "";
    var DATOS_VENTA = "";
    
    calcularCambio();

    $('#tbVenta > tbody  > tr').each(function (index, tr) {
        var fila = tr;
        var productocantidad = parseInt($(fila).find("td.productocantidad").text());
        var idproducto = $(fila).find("td.producto").data("idproducto");
        var productoprecio = parseFloat($(fila).find("td.productoprecio").text());
        var importetotal = parseFloat($(fila).find("td.importetotal").text());

        $totalproductos = $totalproductos + productocantidad;
        $totalimportes = $totalimportes + importetotal;

        DATOS_VENTA = DATOS_VENTA + "<DATOS>"+
            "<IdVenta> 0</IdVenta >" +
            "<IdProducto>" + idproducto + "</IdProducto>" +
            "<Cantidad>" + productocantidad + "</Cantidad>" +
            "<PrecioUnidad>" + productoprecio + "</PrecioUnidad>" +
            "<ImporteTotal>" + importetotal + "</ImporteTotal>" +
        "</DATOS>"
    });


    VENTA = "<VENTA>" +
        "<IdTienda>" + $("#txtIdTienda").val() + "</IdTienda>" +
        "<IdUsuario>" + $("#txtIdUsuario").val() + "</IdUsuario>" +
        "<IdCliente>0</IdCliente>" +
        "<TipoDocumento>" + $("#cboventatipodocumento").val() + "</TipoDocumento>" +
        "<CantidadProducto>" + $('#tbVenta tbody tr').length + "</CantidadProducto>" +
        "<CantidadTotal>" + $totalproductos + "</CantidadTotal>" +
        "<TotalCosto>" + $totalimportes + "</TotalCosto>" +
        "<ImporteRecibido>" + $("#txtmontopago").val() + "</ImporteRecibido>" +
        "<ImporteCambio>" + $("#txtcambio").val() + "</ImporteCambio>" +
        "</VENTA >";

    DETALLE_CLIENTE = "<DETALLE_CLIENTE><DATOS>" +
        "<TipoDocumento>" + $("#cboclientetipodocumento").val() +"</TipoDocumento>" +
        "<NumeroDocumento>" + $("#txtclientedocumento").val() +"</NumeroDocumento>" +
        "<Nombre>" + $("#txtclientenombres").val() +"</Nombre>" +
        "<Direccion>" + $("#txtclientedireccion").val() +"</Direccion>" +
        "<Telefono>" + $("#txtclientetelefono").val() +"</Telefono>" +
        "</DATOS></DETALLE_CLIENTE>";

    DETALLE_VENTA = "<DETALLE_VENTA>" + DATOS_VENTA + "</DETALLE_VENTA>";

    DETALLE = "<DETALLE>" + VENTA + DETALLE_CLIENTE + DETALLE_VENTA + "</DETALLE>"


    var request = { xml: DETALLE };
    AjaxPost("../frmCrearVenta.aspx/Guardar", JSON.stringify(request),
        function (response) {
            $(".card-venta").LoadingOverlay("hide");
            if (response.estado) {
                //DOCUMENTO
                $("#cboventatipodocumento").val("Boleta");

                //CLIENTE
                $("#cboclientetipodocumento").val("DNI");
                $("#txtclientedocumento").val("");
                $("#txtclientenombres").val("");
                $("#txtclientedireccion").val("");
                $("#txtclientetelefono").val("");


                //PRODUCTO
                $("#txtIdProducto").val("0");
                $("#txtproductocodigo").val("");
                $("#txtproductonombre").val("");
                $("#txtproductodescripcion").val("");
                $("#txtproductostock").val("");
                $("#txtproductoprecio").val("");
                $("#txtproductocantidad").val("0");

                //PRECIOS
                $("#txtsubtotal").val("0");
                $("#txtigv").val("0");
                $("#txttotal").val("0");
                $("#txtmontopago").val("");
                $("#txtcambio").val("");


                $("#tbVenta tbody").html("");

                var url = 'docVenta.aspx?id=' + response.valor;
                window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');
                
            } else {
                swal("Mensaje", "No se pudo registrar la venta", "warning")
            }
        },
        function () {
            $(".card-venta").LoadingOverlay("hide");
        },
        function () {
            $(".card-venta").LoadingOverlay("show");
        })

})

function calcularCambio() {
    var montopago = $("#txtmontopago").val().trim() == "" ? 0 : parseFloat($("#txtmontopago").val().trim());
    var totalcosto = parseFloat($("#txttotal").val().trim());
    var cambio = 0;
    cambio = (montopago <= totalcosto ? totalcosto : montopago) - totalcosto;

    $("#txtcambio").val(cambio.toFixed(2));
}

$('#btncalcular').on('click', function () {
    calcularCambio();
})


function calcularPrecios() {
    var subtotal = 0;
    var igv = 0;
    var sumatotal = 0;
    $('#tbVenta > tbody  > tr').each(function (index, tr) {
        var fila = tr;
        var importetotal = parseFloat($(fila).find("td.importetotal").text());
        sumatotal = sumatotal + importetotal;
    });
    igv = sumatotal * 0.18;
    subtotal = sumatotal - igv;


    $("#txtsubtotal").val(subtotal.toFixed(2));
    $("#txtigv").val(igv.toFixed(2));
    $("#txttotal").val(sumatotal.toFixed(2));
}




function controlarStock($idproducto,$idtienda,$cantidad,$restar) {
    var request = {
        idproducto: $idproducto,
        idtienda: $idtienda,
        cantidad: $cantidad,
        restar: $restar
    }

    AjaxPost("../frmCrearVenta.aspx/ControlarStock", JSON.stringify(request) ,
        function (response) {
            if (response.estado) {
            }
        },
        function () {
        },
        function () {
        })
}


window.onbeforeunload = function () {
    if ($('#tbVenta tbody tr').length > 0) {

        $('#tbVenta > tbody  > tr').each(function (index, tr) {
            var fila = tr;
            var productocantidad = parseInt($(fila).find("td.productocantidad").text());
            var idproducto = $(fila).find("td.producto").data("idproducto");

            controlarStock(parseInt(idproducto), parseInt($("#txtIdTienda").val()), parseInt(productocantidad), false);
        });
    }
};
