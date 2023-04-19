var table
$(document).ready(function () {
    cargarRoles();
});

function cargarRoles() {

    $('#tbpermiso tbody').html('');

    AjaxGet("../frmRol.aspx/Obtener",
        function (response) {
            $(".card-body").LoadingOverlay("hide");

            $("<option>").attr({"value":"0"}).text("-- SELECCIONE ROL --").appendTo("#cboRol")
            if (response.estado) {

                $.each(response.objeto, function (i, row) {
                    if(row.Activo == true)
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


$('#btnBuscar').on('click', function () {


    if ($.fn.DataTable.isDataTable('#tbpermiso')) {
        $('#tbpermiso').DataTable().destroy();
    }
    $('#tbpermiso tbody').html("");

    var request = { IdRol: $("#cboRol").val() };

    AjaxPost("../frmRolPermiso.aspx/Obtener",JSON.stringify(request),
        function (response) {
            $(".card-body").LoadingOverlay("hide");
            if (response.estado) {
                
                $.each(response.objeto, function (i, row) {

                    var chkclass = row.Activo == true ? "activo" : "";

                    $("<tr>").append(
                        $("<td>").text(i + 1),
                        $("<td>").append(
                            $("<input>").attr({ "type": "checkbox" }).data("IdPermiso", row.IdPermisos).prop('checked', row.Activo)
                            ),
                        $("<td>").text(row.Menu),
                        $("<td>").text(row.SubMenu)
                    ).appendTo("#tbpermiso tbody");

                })

            }


        },
        function () {
            $(".card-body").LoadingOverlay("hide");
        },
        function () {
            $(".card-body").LoadingOverlay("show");
        })
})


$('#btnGuardarCambios').on('click', function () {
  
    var $xml = "<DETALLE>"
    var permiso = "";
    $('input[type="checkbox"]').each(function () {
        var idpermiso = $(this).data("IdPermiso").toString();
        var activo = $(this).prop("checked") == true ? "1" : "0";
        

        permiso = permiso + "<PERMISO><IdPermisos>" + idpermiso + "</IdPermisos><Activo>" + activo + "</Activo></PERMISO>";
            
    });
    $xml = $xml + permiso;
    $xml = $xml +"</DETALLE>"

    var request = { xml: $xml };
    AjaxPost("../frmRolPermiso.aspx/Guardar", JSON.stringify(request),
        function (response) {
            $(".card-body").LoadingOverlay("hide");
            if (response.estado) {
                swal("Mensaje", "Se guardaron los permisos", "success")
            } else {
                swal("Mensaje", "No se pudo registrar los permisos", "warning")
            }
        },
        function () {
            $(".card-body").LoadingOverlay("hide");
        },
        function () {
            $(".card-body").LoadingOverlay("show");
        })
   
})


$(document).on("change", "input.chk-permiso", function () {
  
});