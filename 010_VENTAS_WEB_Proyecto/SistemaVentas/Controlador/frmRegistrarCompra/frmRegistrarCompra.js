$("#txtCodigoProducto").on('keypress', function (e) {

    
    if (e.which == 13) {

        if (parseInt($("#txtIdTienda").val()) == 0) {
            swal("Mensaje", "Debe seleccionar una tienda primero", "warning")
            return;
        }

        var request = { IdTienda: parseInt($("#txtIdTienda").val()) }

        AjaxPost("../frmProductoTienda.aspx/ObtenerProductoxTienda",JSON.stringify(request),
            function (response) {
                $("#txtCodigoProducto").LoadingOverlay("hide");
                if (response.estado) {
                    var encontrado = false;
                    $.each(response.objeto, function (i, row) {
                        if (row.Activo == true && row.Codigo == $("#txtCodigoProducto").val()) {
                           
                            $("#txtIdProducto").val(row.IdProducto);
                            $("#txtCodigoProducto").val(row.Codigo);
                            $("#txtNombreProducto").val(row.Nombre);
                            encontrado = true;
                            return false;
                        }
                    })

                    if (!encontrado) {
                        $("#txtIdProducto").val("0");
                        $("#txtNombreProducto").val("");
                    }

                }
            },
            function () {
                $("#txtCodigoProducto").LoadingOverlay("hide");
            },
            function () {
                $("#txtCodigoProducto").LoadingOverlay("show");
            })
    }
});


function cargarProveedor() {

    if ($.fn.DataTable.isDataTable('#tbProveedor')) {
        $('#tbProveedor').DataTable().destroy();
    }

    $('#tbProveedor tbody').html('');

    AjaxGet("../frmProveedor.aspx/Obtener",
        function (response) {
            $(".modal-body").LoadingOverlay("hide");
            if (response.estado) {
                $.each(response.objeto, function (i, row) {

                    if (row.Activo == true) {
                        $("<tr>").append(
                            $("<td>").append(
                                $("<button>").addClass("btn btn-sm btn-primary ml-2").text("Seleccionar").data("proveedor", row)
                            ),
                            $("<td>").text(row.Ruc),
                            $("<td>").text(row.RazonSocial),
                            $("<td>").text(row.Direccion),

                        ).appendTo("#tbProveedor tbody");
                    }
                })
            }

            $('#tbProveedor').DataTable();
        },
        function () {
            $(".modal-body").LoadingOverlay("hide");
        },
        function () {
            $(".modal-body").LoadingOverlay("show");
        })
}

function cargarTiendas() {

    if ($.fn.DataTable.isDataTable('#tbTienda')) {
        $('#tbTienda').DataTable().destroy();
    }

    $('#tbTienda tbody').html('');

    AjaxGet("../frmTienda.aspx/Obtener",
        function (response) {
            $(".modal-body").LoadingOverlay("hide");
            if (response.estado) {
                $.each(response.objeto, function (i, row) {

                    if (row.Activo == true) {
                        $("<tr>").append(
                            $("<td>").append(
                                $("<button>").addClass("btn btn-sm btn-primary ml-2").text("Seleccionar").data("tienda", row)
                            ),
                            $("<td>").text(row.RUC),
                            $("<td>").text(row.Nombre),
                            $("<td>").text(row.Direccion),

                        ).appendTo("#tbTienda tbody");
                    }
                })
            }

            $('#tbTienda').DataTable();
        },
        function () {
            $(".modal-body").LoadingOverlay("hide");
        },
        function () {
            $(".modal-body").LoadingOverlay("show");
        })
}

function cargarProductos() {

    

    if ($.fn.DataTable.isDataTable('#tbProducto')) {
        $('#tbProducto').DataTable().destroy();
    }

    $('#tbProducto tbody').html('');

    var request = { IdTienda: parseInt($("#txtIdTienda").val())}

    AjaxPost("../frmProductoTienda.aspx/ObtenerProductoxTienda", JSON.stringify(request),
        function (response) {
            $(".modal-body").LoadingOverlay("hide");
            if (response.estado) {
                $.each(response.objeto, function (i, row) {
                    if (row.Activo == true) {
                        $("<tr>").append(
                            $("<td>").append(
                                $("<button>").addClass("btn btn-sm btn-primary ml-2").text("Seleccionar").data("producto", row)
                            ),
                            $("<td>").text(row.Codigo),
                            $("<td>").text(row.Nombre),
                            $("<td>").text(row.Descripcion),
                            $("<td>").text(row.oCategoria.Descripcion)
                        ).appendTo("#tbProducto tbody");
                    }
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
}


$('#btnBuscarProveedor').on('click', function () {

    $('#modalProveedor').modal('show');
    cargarProveedor();
})

$('#tbProveedor tbody').on('click', 'button[class="btn btn-sm btn-primary ml-2"]', function () {

    var model = $(this).data("proveedor")
    $("#txtIdProveedor").val(model.IdProveedor);
    $("#txtRucProveedor").val(model.Ruc);
    $("#txtRazonSocialProveedor").val(model.RazonSocial);

    $('#modalProveedor').modal('hide');
})

$('#btnBuscarTienda').on('click', function () {

    $('#modalTienda').modal('show');
    cargarTiendas();
})

$('#tbTienda tbody').on('click', 'button[class="btn btn-sm btn-primary ml-2"]', function () {

    var model = $(this).data("tienda")
    $("#txtIdTienda").val(model.IdTienda);
    $("#txtRucTienda").val(model.RUC);
    $("#txtNombreTienda").val(model.Nombre);

    $('#modalTienda').modal('hide');
})

$('#btnBuscarProducto').on('click', function () {

    if (parseInt($("#txtIdTienda").val()) == 0) {
        swal("Mensaje", "Debe seleccionar una tienda primero", "warning")
        return;
    }
    $('#modalProducto').modal('show');
    cargarProductos();
})

$('#tbProducto tbody').on('click', 'button[class="btn btn-sm btn-primary ml-2"]', function () {

    var model = $(this).data("producto")
    $("#txtIdProducto").val(model.IdProducto);
    $("#txtCodigoProducto").val(model.Codigo);
    $("#txtNombreProducto").val(model.Nombre);
    $('#modalProducto').modal('hide');
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

$("#txtPrecioCompraProducto").inputFilter(function (value) {
    return /^-?\d*[.]?\d{0,2}$/.test(value);
});

$("#txtPrecioVentaProducto").inputFilter(function (value) {
    return /^-?\d*[.]?\d{0,2}$/.test(value);
});

$("#txtCantidadProducto").inputFilter(function (value) {
    return /^-?\d*$/.test(value);
});

$('#btnAgregarCompra').on('click', function () {

    var existe_codigo = false;
    if (
        parseInt($("#txtIdProveedor").val()) == 0 ||
        parseInt($("#txtIdTienda").val()) == 0 ||
        parseInt($("#txtIdProducto").val()) == 0 ||
        parseFloat($("#txtCantidadProducto").val()) == 0 ||
        parseFloat($("#txtPrecioCompraProducto").val()) == 0 ||
        parseFloat($("#txtPrecioVentaProducto").val()) == 0
    ) {
        swal("Mensaje", "Debe completar todos los campos", "warning")
        return;
    }

    $('#tbCompra > tbody  > tr').each(function (index, tr) {
        var fila = tr;
        var codigoproducto = $(fila).find("td.codigoproducto").text();

        if (codigoproducto == $("#txtCodigoProducto").val()) {
            existe_codigo = true;
            return false;
        }

    });
    
    if (!existe_codigo) {
        $("<tr>").append(
            $("<td>").append(
                $("<button>").addClass("btn btn-danger btn-sm").text("Eliminar")
            ),
            $("<td>").append($("#txtRucProveedor").val()),
            $("<td>").append($("#txtRucTienda").val()),
            $("<td>").addClass("codigoproducto").data("idproducto", $("#txtIdProducto").val()).append($("#txtCodigoProducto").val()),
            $("<td>").addClass("cantidad").append($("#txtCantidadProducto").val()),
            $("<td>").addClass("preciocompra").append($("#txtPrecioCompraProducto").val()),
            $("<td>").addClass("precioventa").append($("#txtPrecioVentaProducto").val()),
        ).appendTo("#tbCompra tbody");

        $("#txtIdProducto").val("0");
        $("#txtCodigoProducto").val("");
        $("#txtNombreProducto").val("");
        $("#txtCantidadProducto").val("0");
        $("#txtPrecioCompraProducto").val("0");
        $("#txtPrecioVentaProducto").val("0");

    } else {
        swal("Mensaje", "El producto ya existe en la compra", "warning")
    }
})

$('#tbCompra tbody').on('click', 'button[class="btn btn-danger btn-sm"]', function () {
    $(this).parents("tr").remove();
})


$('#btnTerminarGuardarCompra').on('click', function () {


    var $xml = "";
    var compra = "";
    var detallecompra = ""
    var detalle = "";
    var totalcostocompra = 0;

    $xml = "<DETALLE>";
    compra = "<COMPRA>" +
        "<IdUsuario>!idusuario¡</IdUsuario>" +
        "<IdProveedor>" + $("#txtIdProveedor").val() + "</IdProveedor>" +
        "<IdTienda>" + $("#txtIdTienda").val() + "</IdTienda>" +
        "<TotalCosto>!totalcosto¡</TotalCosto>" +
        "</COMPRA>";
    detallecompra = "<DETALLE_COMPRA>"

    $('#tbCompra > tbody  > tr').each(function (index, tr) {
        
        var fila = tr;
        var idproducto = parseFloat($(fila).find("td.codigoproducto").data("idproducto"));
        var cantidad = parseFloat($(fila).find("td.cantidad").text());
        var preciocompra = parseFloat($(fila).find("td.preciocompra").text());
        var precioventa = parseFloat($(fila).find("td.precioventa").text());
        var totalcosto = parseFloat(cantidad) * parseFloat(preciocompra);

        detalle = detalle + "<DETALLE>" +
            "<IdCompra>0</IdCompra>" +
            "<IdProducto>" + idproducto + "</IdProducto>" +
            "<Cantidad>" + cantidad + "</Cantidad>" +
            "<PrecioUnidadCompra>" + preciocompra + "</PrecioUnidadCompra>" +
            "<PrecioUnidadVenta>" + precioventa + "</PrecioUnidadVenta>" +
            "<TotalCosto>" + totalcosto.toString() + "</TotalCosto>" +
            "</DETALLE>";
        totalcostocompra = totalcostocompra + totalcosto;

    });

    compra = compra.replace("!totalcosto¡", totalcostocompra.toString());
    $xml = $xml + compra + detallecompra + detalle + "</DETALLE_COMPRA></DETALLE>";

    var request = { xml: $xml };
    AjaxPost("../frmRegistrarCompra.aspx/Guardar", JSON.stringify(request),
        function (response) {
            $(".card-compra").LoadingOverlay("hide");
            if (response.estado) {
                //PROVEEDOR
                $("#txtIdProveedor").val("0");
                $("#txtRucProveedor").val("");
                $("#txtRazonSocialProveedor").val("");

                //TIENDA
                $("#txtIdTienda").val("0");
                $("#txtRucTienda").val("");
                $("#txtNombreTienda").val("");

                //PRODUCTO
                $("#txtIdProducto").val("0");
                $("#txtCodigoProducto").val("");
                $("#txtNombreProducto").val("");
                $("#txtCantidadProducto").val("0");
                $("#txtPrecioCompraProducto").val("0");
                $("#txtPrecioVentaProducto").val("0");

                $("#tbCompra tbody").html("");

                swal("Mensaje", "Se registro la compra", "success")
            } else {
                swal("Mensaje", "No se pudo registrar la compra", "warning")
            }
        },
        function () {
            $(".card-compra").LoadingOverlay("hide");
        },
        function () {
            $(".card-compra").LoadingOverlay("show");
        })

})
