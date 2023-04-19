var table;
var TiendaSelected;
var ProductoSelected;
$(document).ready(function () {
    cargarDatos();
});



function cargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbProductoTienda')) {
        $('#tbProductoTienda').DataTable().destroy();
    }

    $('#tbProductoTienda tbody').html('');

    AjaxGet("../frmProductoTienda.aspx/Obtener",
        function (response) {
            if (response.estado) {

                $.each(response.objeto, function (i, row) {
                    $("<tr>").append(
                        $("<td>").text(row.oTienda.Nombre),
                        $("<td>").text(row.oTienda.RUC),
                        $("<td>").text(row.oProducto.Codigo),
                        $("<td>").text(row.oProducto.Nombre),
                        $("<td>").text(row.Stock),
                        $("<td>").append(
                            $("<button>").addClass("btn btn-sm btn-danger").text("Eliminar").data("productotienda", row.IdProductoTienda)
                        )
                    ).appendTo("#tbProductoTienda tbody");

                })
            }

            table = $('#tbProductoTienda').DataTable({
                responsive: true
            });
        },
        function () {
        },
        function () {
        })
}

$('#tbProductoTienda tbody').on('click', 'button[class="btn btn-sm btn-danger"]', function () {

    var request = { IdProductoTienda: String($(this).data("productotienda")) };

    swal({
        title: "Mensaje",
        text: "¿Esta seguro de eliminar esta asignación?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        cancelButtonColor: '#d33',
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
    }, function () {


        AjaxPost("../frmProductoTienda.aspx/Eliminar", JSON.stringify(request),
            function (response) {
                if (response.estado) {
                    cargarDatos();
                    swal.close();
                } else {
                    swal("Mensaje", "No se puede eliminar, la asignación ya cuenta con un stock", "warning")
                }
            },
            function () {
            },
            function () {
            })
    }
    )
})




$('#btnAsignar').on('click', function () {
    var camposvacios = false;
    

    if ($("#txtIdTienda").val() == "0" || $("#txtIdProducto").val() == "0") {
        camposvacios = true;
    }

    if (!camposvacios) {

        var request = {
            oProductoTienda: {
                oProducto: { IdProducto: parseInt($("#txtIdProducto").val()) },
                oTienda: { IdTienda: parseInt($("#txtIdTienda").val()) } ,
            }
        }

        AjaxPost("../frmProductoTienda.aspx/Guardar", JSON.stringify(request),
            function (response) {
                $("#card-lista").LoadingOverlay("hide");
                if (response.estado) {

                    $("#txtIdProducto").val("0");
                    $("#txtCodigo").val("");
                    $("#txtNombre").val("");
                    $("#txtDescripcion").val("");
                    cargarDatos();


                } else {
                    swal("Mensaje", "No se pudo registrar la asignación", "warning")
                }
            },
            function () {
                $("#card-lista").LoadingOverlay("hide");
            },
            function () {
                $("#card-lista").LoadingOverlay("show");
            })

        
    } else {
        swal("Mensaje!", "Es necesario completar todos los campos", "warning")
    }


})

$("#txtCodigo").on('keypress', function (e) {
   
    if (e.which == 13) {
        AjaxGet("../frmProducto.aspx/Obtener",
            function (response) {
                $("#txtCodigo").LoadingOverlay("hide");
                if (response.estado) {
                    var encontrado = false;
                    $.each(response.objeto, function (i, row) {
                        if (row.Activo == true && row.Codigo == $("#txtCodigo").val()) {
                            $("#txtIdProducto").val(row.IdProducto);
                            $("#txtCodigo").val(row.Codigo);
                            $("#txtNombre").val(row.Nombre);
                            $("#txtDescripcion").val(row.Descripcion);
                            encontrado = true;
                        }
                    })

                    if (!encontrado) {
                        $("#txtIdProducto").val("0");
                        $("#txtNombre").val("");
                        $("#txtDescripcion").val("");
                    }

                }
            },
            function () {
                $("#txtCodigo").LoadingOverlay("hide");
            },
            function () {
                $("#txtCodigo").LoadingOverlay("show");
            })
    }
});
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

    AjaxGet("../frmProducto.aspx/Obtener",
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

$('#btnBuscarTienda').on('click', function () {

    $('#modalTienda').modal('show');
    cargarTiendas();
})

$('#btnBuscarProducto').on('click', function () {

    $('#modalProducto').modal('show');
    cargarProductos();
})

$('#tbTienda tbody').on('click', 'button[class="btn btn-sm btn-primary ml-2"]', function () {

    var model = $(this).data("tienda")
    $("#txtIdTienda").val(model.IdTienda);
    $("#txtRuc").val(model.RUC);
    $("#txtRazonSocial").val(model.Nombre);
    $("#txtDireccion").val(model.Direccion);

    $('#modalTienda').modal('hide');
})

$('#tbProducto tbody').on('click', 'button[class="btn btn-sm btn-primary ml-2"]', function () {

    var model = $(this).data("producto")
    $("#txtIdProducto").val(model.IdProducto);
    $("#txtCodigo").val(model.Codigo);
    $("#txtNombre").val(model.Nombre);
    $("#txtDescripcion").val(model.Descripcion);
    $('#modalProducto').modal('hide');
})