
var table
$(document).ready(function () {
    cargarDatos();
});


function cargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbTienda')) {
        $('#tbTienda').DataTable().destroy();
    }

    $('#tbTienda tbody').html('');

    AjaxGet("../frmTienda.aspx/Obtener",
        function (response) {
            $(".card-body").LoadingOverlay("hide");
            if (response.estado) {
                $.each(response.objeto, function (i, row) {
                    $("<tr>").append(
                        $("<td>").text(i + 1),
                        $("<td>").text(row.Nombre),
                        $("<td>").text(row.RUC),
                        $("<td>").text(row.Direccion),
                        $("<td>").text(row.Telefono),
                        $("<td>").text(row.Activo == true ? "Activo" : "No Activo"),
                        $("<td>").append(
                            $("<button>").addClass("btn btn-sm btn-primary mr-1").text("Editar").data("tienda", row),
                            $("<button>").addClass("btn btn-sm btn-danger").text("Eliminar").data("tienda", row.IdTienda)
                        )
                    ).appendTo("#tbTienda tbody");
                })
            }

            table = $('#tbTienda').DataTable({
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


$('#tbTienda tbody').on('click', 'button[class="btn btn-sm btn-primary mr-1"]', function () {

    var model = $(this).data("tienda")
    $("#txtIdTienda").val(model.IdTienda);
    $("#txtNombre").val(model.Nombre);
    $("#txtRuc").val(model.RUC);
    $("#txtDireccion").val(model.Direccion);
    $("#txtTelefono").val(model.Telefono);
    $("#cboEstado").val(model.Activo == true ? 1 : 0);
    $("#cboEstado").prop("disabled", false);

    $('#modalrol').modal('show');
})

$('#tbTienda tbody').on('click', 'button[class="btn btn-sm btn-danger"]', function () {

    var request = { IdTienda: String($(this).data("tienda")) };

    swal({
        title: "Mensaje",
        text: "¿Esta seguro de eliminiar la tienda?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        cancelButtonColor: '#d33',
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
    }, function () {


        AjaxPost("../frmTienda.aspx/Eliminar", JSON.stringify(request),
            function (response) {
                if (response.estado) {
                    cargarDatos();
                    swal.close();
                } else {
                    swal("oops!", "No se pudo eliminar la tienda", "warning")
                }
            },
            function () {
            },
            function () {
            })
    }
    )
})


$('#btnNuevoTienda').on('click', function () {

    $("#txtIdTienda").val("0");
    $("#txtNombre").val("");
    $("#txtRuc").val("");
    $("#txtDireccion").val("");
    $("#txtTelefono").val("");

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
            oTienda: {
                IdTienda: parseInt($("#txtIdTienda").val()),
                Nombre: $("#txtNombre").val(),
                RUC: $("#txtRuc").val(),
                Direccion: $("#txtDireccion").val(),
                Telefono: $("#txtTelefono").val(),
                Activo: ($("#cboEstado").val() == "1" ? true : false)
            }
        }


        if (parseInt($("#txtIdTienda").val()) == 0) {

            AjaxPost("../frmTienda.aspx/Guardar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("Mensaje", "No se pudo registrar la tienda", "warning")
                    }
                },
                function () {
                    $(".modal-body").LoadingOverlay("hide");
                },
                function () {
                    $(".modal-body").LoadingOverlay("show");
                })
        } else {
            AjaxPost("../frmTienda.aspx/Editar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("Mensaje", "No se pudo editar la tienda", "warning")
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
