
var table
$(document).ready(function () {
    cargarDatos();
});


function cargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbrol')) {
        $('#tbrol').DataTable().destroy();
    }

    $('#tbrol tbody').html('');

    AjaxGet("../frmRol.aspx/Obtener",
        function (response) {
            $(".card-body").LoadingOverlay("hide");
            if (response.estado) {

                $.each(response.objeto, function (i, row) {
                    $("<tr>").append(
                        $("<td>").text(i + 1),
                        $("<td>").text(row.Descripcion),
                        $("<td>").text(row.Activo == true ? "Activo" : "No Activo"),
                        $("<td>").append(
                            $("<button>").addClass("btn btn-sm btn-primary mr-1").text("Editar").data("rol", row),
                            $("<button>").addClass("btn btn-sm btn-danger").text("Eliminar").data("rol", row.IdRol)
                        )
                    ).appendTo("#tbrol tbody");

                })
            }

            table = $('#tbrol').DataTable({
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

$('#tbrol tbody').on('click', 'button[class="btn btn-sm btn-primary mr-1"]', function () {

    var model = $(this).data("rol")
    $("#txtIdRol").val(model.IdRol);
    $("#cboEstado").val(model.Activo == true ? 1 : 0);
    $("#cboEstado").prop("disabled", false);
    $("#txtDescripcion").val(model.Descripcion);


    $('#modalrol').modal('show');
})

$('#tbrol tbody').on('click', 'button[class="btn btn-sm btn-danger"]', function () {

    var request = { IdRol: String($(this).data("rol")) };

    swal({
        title: "Mensaje",
        text: "¿Esta seguro de eliminar el rol?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        cancelButtonColor: '#d33',
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
    }, function () {
        

        AjaxPost("../frmRol.aspx/Eliminar", JSON.stringify(request),
            function (response) {
                if (response.estado) {
                    cargarDatos();
                    swal.close();
                } else {
                    swal("oops!", "No se pudo eliminar el rol", "warning")
                }
            },
            function () {
            },
            function () {
            })
        }
    )
})


$('#btnNuevoRol').on('click', function () {

    $("#txtIdRol").val(0);
    $("#cboEstado").val(1);
    $("#txtDescripcion").val("");
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
            oRol: {
                IdRol: parseInt($("#txtIdRol").val()),
                Descripcion: $("#txtDescripcion").val(),
                Activo: ($("#cboEstado").val() == "1" ? true : false)
            }
        }


        if (parseInt($("#txtIdRol").val()) == 0) {

            AjaxPost("../frmRol.aspx/Guardar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("oops!", "No se pudo registrar el rol", "warning")
                    }
                },
                function () {
                    $(".modal-body").LoadingOverlay("hide");
                },
                function () {
                    $(".modal-body").LoadingOverlay("show");
                })
        } else {
            AjaxPost("../frmRol.aspx/Editar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("oops!", "No se pudo editar el rol", "warning")
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
        swal("Mensaje", "Es necesario completar todos los campos", "warning")
    }
    

})
