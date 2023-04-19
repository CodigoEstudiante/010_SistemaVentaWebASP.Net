
var table
$(document).ready(function () {
    ObtenerCategoria();
    cargarDatos();
    
});


function cargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbProducto')) {
        $('#tbProducto').DataTable().destroy();
    }

    $('#tbProducto tbody').html('');

    AjaxGet("../frmProducto.aspx/Obtener",
        function (response) {
            $(".card-body").LoadingOverlay("hide");
            if (response.estado) {

                $.each(response.objeto, function (i, row) {
                    $("<tr>").append(
                        $("<td>").text(i + 1),
                        $("<td>").text(row.Codigo),
                        $("<td>").text(row.Nombre),
                        $("<td>").text(row.Descripcion),
                        $("<td>").text(row.oCategoria.Descripcion),
                        $("<td>").text(row.Activo == true ? "Activo" : "No Activo"),
                        $("<td>").append(
                            $("<button>").addClass("btn btn-sm btn-primary mr-1").text("Editar").data("producto", row),
                            $("<button>").addClass("btn btn-sm btn-danger").text("Eliminar").data("producto", row.IdProducto)
                        )
                    ).appendTo("#tbProducto tbody");

                })
            }

            table = $('#tbProducto').DataTable({
                responsive: true
            });
        },
        function () {
            $(".card-body").LoadingOverlay("hide");
        },
        function () {
            $(".card-body").LoadingOverlay("show");
        })
}

function ObtenerCategoria() {
    $("#cboCategoria").html("");
    AjaxGet("../frmCategoria.aspx/Obtener",
        function (response) {
            $(".card-body").LoadingOverlay("hide");
            if (response.estado) {
                $.each(response.objeto, function (i, row) {
                    if (row.Activo == true)
                        $("<option>").attr({ "value": row.IdCategoria }).text(row.Descripcion).appendTo("#cboCategoria");
                })
            }
        },
        function () {
            $(".card-body").LoadingOverlay("hide");
        },
        function () {
            $(".card-body").LoadingOverlay("show");
        })
}


$('#tbProducto tbody').on('click', 'button[class="btn btn-sm btn-primary mr-1"]', function () {

    var model = $(this).data("producto")
    $("#txtIdProducto").val(model.IdProducto);
    $("#txtCodigo").val(model.Codigo);
    $("#txtNombre").val(model.Nombre);
    $("#txtDescripcion").val(model.Descripcion);
    $("#cboCategoria").val(model.IdCategoria);
    $("#cboEstado").val(model.Activo == true ? 1 : 0);
    $("#cboEstado").prop("disabled", false);
    $("#txtCodigo").prop("disabled", true)

    $('#modalrol').modal('show');
})

$('#tbProducto tbody').on('click', 'button[class="btn btn-sm btn-danger"]', function () {

    var request = { IdProducto: String($(this).data("producto")) };

    swal({
        title: "Mensaje",
        text: "¿Esta seguro de eliminar el producto?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        cancelButtonColor: '#d33',
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
    }, function () {


        AjaxPost("../frmProducto.aspx/Eliminar", JSON.stringify(request),
            function (response) {
                if (response.estado) {
                    cargarDatos();
                    swal.close();
                } else {
                    swal("Mensaje", "No se pudo eliminar el producto", "warning")
                }
            },
            function () {
            },
            function () {
            })
    }
    )
})


$('#btnNuevoProducto').on('click', function () {
    
    $("#txtIdProducto").val("0");
    $("#txtCodigo").val("AUTOGENERADO");
    $("#txtCodigo").prop("disabled", true)
    $("#txtNombre").val("");
    $("#txtDescripcion").val("");
    $("select#cboCategoria").prop('selectedIndex', 0);


    $("#cboEstado").val(1);
    $("#cboEstado").prop("disabled", true);

    $('#modalrol').modal('show');
})

$('#btnGuardarCambios').on('click', function () {
    var camposvacios = false;
    var fields = $(".model").serializeArray();


    $.each(fields, function (i, field) {
        if (!field.value) {
            camposvacios = true;
            return false;
        }
    });


    if (!camposvacios) {

        var request = {
            oProducto: {
                IdProducto: parseInt($("#txtIdProducto").val()),
                Nombre: $("#txtNombre").val(),
                Descripcion: $("#txtDescripcion").val(),
                IdCategoria: $("#cboCategoria").val(),
                Activo: ($("#cboEstado").val() == "1" ? true : false)
            }
        }


        if (parseInt($("#txtIdProducto").val()) == 0) {

            AjaxPost("../frmProducto.aspx/Guardar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("Mensaje", "No se pudo registrar el producto", "warning")
                    }
                },
                function () {
                    $(".modal-body").LoadingOverlay("hide");
                },
                function () {
                    $(".modal-body").LoadingOverlay("show");
                })
        } else {
            AjaxPost("../frmProducto.aspx/Editar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("Mensaje", "No se pudo editar el producto", "warning")
                    }
                },
                function () {
                    $(".modal-body").LoadingOverlay("hide");
                },
                function () {
                    $(".modal-body").LoadingOverlay("show");
                })
        }
    } else {
        swal("Mensaje!", "Es necesario completar todos los campos", "warning")
    }


})
