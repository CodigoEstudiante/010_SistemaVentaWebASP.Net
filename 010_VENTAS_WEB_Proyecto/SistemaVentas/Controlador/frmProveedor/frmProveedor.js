
var table
$(document).ready(function () {
    cargarDatos();
});


function cargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbProveedor')) {
        $('#tbProveedor').DataTable().destroy();
    }

    $('#tbProveedor tbody').html('');

    AjaxGet("../frmProveedor.aspx/Obtener",
        function (response) {
            $(".card-body").LoadingOverlay("hide");
            if (response.estado) {

                $.each(response.objeto, function (i, row) {
                    $("<tr>").append(
                        $("<td>").text(i + 1),
                        $("<td>").text(row.Ruc),
                        $("<td>").text(row.RazonSocial),
                        $("<td>").text(row.Telefono),
                        $("<td>").text(row.Correo),
                        $("<td>").text(row.Direccion),
                        $("<td>").text(row.Activo == true ? "Activo" : "No Activo"),
                        $("<td>").append(
                            $("<button>").addClass("btn btn-sm btn-primary mr-1").text("Editar").data("proveedor", row),
                            $("<button>").addClass("btn btn-sm btn-danger").text("Eliminar").data("proveedor", row.IdProveedor)
                        )
                    ).appendTo("#tbProveedor tbody");

                })
            }

            table = $('#tbProveedor').DataTable({
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


$('#tbProveedor tbody').on('click', 'button[class="btn btn-sm btn-primary mr-1"]', function () {

    var model = $(this).data("proveedor")
    $("#txtIdProveedor").val(model.IdProveedor);
    $("#txtRuc").val(model.Ruc);
    $("#txtRazonSocial").val(model.RazonSocial);
    $("#txtTelefono").val(model.Telefono);
    $("#txtCorreo").val(model.Correo);
    $("#txtDireccion").val(model.Direccion);
    $("#cboEstado").val(model.Activo == true ? 1 : 0);
    $("#cboEstado").prop("disabled", false);

    $('#modalrol').modal('show');
})

$('#tbProveedor tbody').on('click', 'button[class="btn btn-sm btn-danger"]', function () {

    var request = { IdProveedor: String($(this).data("proveedor")) };

    swal({
        title: "Mensaje",
        text: "¿Esta seguro de eliminiar el proveedor?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        cancelButtonColor: '#d33',
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
    }, function () {


        AjaxPost("../frmProveedor.aspx/Eliminar", JSON.stringify(request),
            function (response) {
                if (response.estado) {
                    cargarDatos();
                    swal.close();
                } else {
                    swal("oops!", "No se pudo eliminar el proveedor", "warning")
                }
            },
            function () {
            },
            function () {
            })
    }
    )
})


$('#btnNuevoProveedor').on('click', function () {

    $("#txtIdProveedor").val("0");
    $("#txtRuc").val("");
    $("#txtRazonSocial").val("");
    $("#txtTelefono").val("");
    $("#txtCorreo").val("");
    $("#txtDireccion").val("");


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
            oProveedor: {
                IdProveedor: parseInt($("#txtIdProveedor").val()),
                Ruc: $("#txtRuc").val(),
                RazonSocial: $("#txtRazonSocial").val(),
                Telefono: $("#txtTelefono").val(),
                Correo: $("#txtCorreo").val(),
                Direccion: $("#txtDireccion").val(),
                Activo: ($("#cboEstado").val() == "1" ? true : false)
            }
        }


        if (parseInt($("#txtIdProveedor").val()) == 0) {

            AjaxPost("../frmProveedor.aspx/Guardar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("Mensaje", "No se pudo registrar el proveedor", "warning")
                    }
                },
                function () {
                    $(".modal-body").LoadingOverlay("hide");
                },
                function () {
                    $(".modal-body").LoadingOverlay("show");
                })
        } else {
            AjaxPost("../frmProveedor.aspx/Editar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("Mensaje", "No se pudo editar el proveedor", "warning")
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
