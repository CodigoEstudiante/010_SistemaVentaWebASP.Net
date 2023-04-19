
var table
$(document).ready(function () {
    cargarDatos();
    ObtenerRoles();
    ObtenerTiendas();
});


function cargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbUsuario')) {
        $('#tbUsuario').DataTable().destroy();
    }

    $('#tbUsuario tbody').html('');

    AjaxGet("../frmUsuario.aspx/Obtener",
        function (response) {
            $(".card-body").LoadingOverlay("hide");
            if (response.estado) {

                $.each(response.objeto, function (i, row) {
                    $("<tr>").append(
                        $("<td>").text(i + 1),
                        $("<td>").text(row.oRol.Descripcion),
                        $("<td>").text(row.NombreUsuario),
                        $("<td>").text(row.Nombres),
                        $("<td>").text(row.Apellidos),
                        $("<td>").text(row.Correo),
                        $("<td>").text(row.Activo == true ? "Activo" : "No Activo"),
                        $("<td>").append(
                            $("<button>").addClass("btn btn-sm btn-primary mr-1").text("Editar").data("usuario", row),
                            $("<button>").addClass("btn btn-sm btn-danger").text("Eliminar").data("usuario", row.IdUsuario)
                        )
                    ).appendTo("#tbUsuario tbody");

                })
            }

            table = $('#tbUsuario').DataTable({
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

function ObtenerRoles() {
    $("#cboRol").html("");
    AjaxGet("../frmRol.aspx/Obtener",
        function (response) {
            $(".card-body").LoadingOverlay("hide");
            if (response.estado) {
                $.each(response.objeto, function (i, row) {
                    if (row.Activo == true)
                    $("<option>").attr({ "value": row.IdRol }).text(row.Descripcion).appendTo("#cboRol");
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

function ObtenerTiendas() {
    $("#cboTienda").html("");
    AjaxGet("../frmTienda.aspx/Obtener",
        function (response) {
            $(".card-body").LoadingOverlay("hide");
            if (response.estado) {
                $.each(response.objeto, function (i, row) {
                    if (row.Activo == true)
                        $("<option>").attr({ "value": row.IdTienda }).text(row.Nombre).appendTo("#cboTienda");
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

$('#tbUsuario tbody').on('click', 'button[class="btn btn-sm btn-primary mr-1"]', function () {

    var model = $(this).data("usuario")
    $("#txtIdUsuario").val(model.IdUsuario);
    $("#txtNombres").val(model.Nombres);
    $("#txtApellidos").val(model.Apellidos);
    $("#txtCorreo").val(model.Correo);
    $("#txtUsuario").val(model.NombreUsuario);
    $("#txtClave").val(model.Clave);
    $("#cboTienda").val(model.IdTienda);
    $("#cboRol").val(model.IdRol);
    $("#cboEstado").val(model.Activo == true ? 1 : 0);
    $("#cboEstado").prop("disabled", false);
    
    $('#modalrol').modal('show');
})

$('#tbUsuario tbody').on('click', 'button[class="btn btn-sm btn-danger"]', function () {

    var request = { IdUsuario : String($(this).data("usuario")) };

    swal({
        title: "Mensaje",
        text: "¿Esta seguro de eliminar el usuario?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        cancelButtonColor: '#d33',
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
    }, function () {


        AjaxPost("../frmUsuario.aspx/Eliminar", JSON.stringify(request),
            function (response) {
                if (response.estado) {
                    cargarDatos();
                    swal.close();
                } else {
                    swal("oops!", "No se pudo eliminar el usuario", "warning")
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

    $("#txtIdUsuario").val(0);
    $("#txtNombres").val("");
    $("#txtApellidos").val("");
    $("#txtCorreo").val("");
    $("#txtUsuario").val("");
    $("#txtClave").val("");
    $("select#cboTienda").prop('selectedIndex', 0);
    $("select#cboRol").prop('selectedIndex', 0);


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
            oUsuario: {
                IdUsuario: parseInt($("#txtIdUsuario").val()),
                Nombres: $("#txtNombres").val(),
                Apellidos: $("#txtApellidos").val(),
                Correo: $("#txtCorreo").val(),
                NombreUsuario: $("#txtUsuario").val(),
                Clave: $("#txtClave").val(),
                IdTienda: $("#cboTienda").val(),
                IdRol: $("#cboRol").val(),
                Activo: ($("#cboEstado").val() == "1" ? true : false)
            }
        }

        
        if (parseInt($("#txtIdUsuario").val()) == 0) {

            AjaxPost("../frmUsuario.aspx/Guardar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("Mensaje", "No se pudo registrar el usuario", "warning")
                    }
                },
                function () {
                    $(".modal-body").LoadingOverlay("hide");
                },
                function () {
                    $(".modal-body").LoadingOverlay("show");
                })
        } else {
            AjaxPost("../frmUsuario.aspx/Editar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("Mensaje", "No se pudo editar el usuario", "warning")
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
