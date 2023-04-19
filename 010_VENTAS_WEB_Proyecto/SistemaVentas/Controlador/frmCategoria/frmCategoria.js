
var table
$(document).ready(function () {
    cargarDatos();
});


function cargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbCategoria')) {
        $('#tbCategoria').DataTable().destroy();
    }

    $('#tbCategoria tbody').html('');

    AjaxGet("../frmCategoria.aspx/Obtener",
        function (response) {
            $(".card-body").LoadingOverlay("hide");
            if (response.estado) {

                $.each(response.objeto, function (i, row) {
                    $("<tr>").append(
                        $("<td>").text(i + 1),
                        $("<td>").text(row.Descripcion),
                        $("<td>").text(row.Activo == true ? "Activo" : "No Activo"),
                        $("<td>").append(
                            $("<button>").addClass("btn btn-sm btn-primary mr-1").text("Editar").data("categoria", row),
                            $("<button>").addClass("btn btn-sm btn-danger").text("Eliminar").data("categoria", row.IdCategoria)
                        )
                    ).appendTo("#tbCategoria tbody");

                })
            }

            table = $('#tbCategoria').DataTable({
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

$('#tbCategoria tbody').on('click', 'button[class="btn btn-sm btn-primary mr-1"]', function () {

    var model = $(this).data("categoria")
    $("#txtIdCategoria").val(model.IdCategoria);
    $("#cboEstado").val(model.Activo == true ? 1 : 0);
    $("#cboEstado").prop("disabled", false);
    $("#txtDescripcion").val(model.Descripcion);


    $('#modalrol').modal('show');
})

$('#tbCategoria tbody').on('click', 'button[class="btn btn-sm btn-danger"]', function () {

    var request = { IdCategoria: String($(this).data("categoria")) };

    swal({
        title: "Mensaje",
        text: "¿Esta seguro de eliminar la categoria?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        cancelButtonColor: '#d33',
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
    }, function () {


        AjaxPost("../frmCategoria.aspx/Eliminar", JSON.stringify(request),
            function (response) {
                if (response.estado) {
                    cargarDatos();
                    swal.close();
                } else {
                    swal("Mensaje", "No se pudo eliminar la categoria", "warning")
                }
            },
            function () {
            },
            function () {
            })
    }
    )
})


$('#btnNuevoCategoria').on('click', function () {

    $("#txtIdCategoria").val("0");
    $("#txtDescripcion").val("");
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
            oCategoria: {
                IdCategoria: parseInt($("#txtIdCategoria").val()),
                Descripcion: $("#txtDescripcion").val(),
                Activo: ($("#cboEstado").val() == "1" ? true : false)
            }
        }


        if (parseInt($("#txtIdCategoria").val()) == 0) {

            AjaxPost("../frmCategoria.aspx/Guardar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("Mensaje", "No se pudo registrar la categoria", "warning")
                    }
                },
                function () {
                    $(".modal-body").LoadingOverlay("hide");
                },
                function () {
                    $(".modal-body").LoadingOverlay("show");
                })
        } else {
            AjaxPost("../frmCategoria.aspx/Editar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("Mensaje", "No se pudo editar la categoria", "warning")
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
