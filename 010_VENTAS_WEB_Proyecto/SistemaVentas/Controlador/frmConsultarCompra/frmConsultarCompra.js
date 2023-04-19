
var table;
$.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '< Ant',
    nextText: 'Sig >',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};
$.datepicker.setDefaults($.datepicker.regional['es']);


$(document).ready(function () {
    $("#txtFechaInicio").datepicker();
    $("#txtFechaFin").datepicker();
    ObtenerTiendas();
    ObtenerProveedores();
    $("#txtFechaInicio").val(ObtenerFecha());
    $("#txtFechaFin").val(ObtenerFecha());
    
    CargarDatos();
});

$('#btnBuscar').on('click', function () {

    CargarDatos();
})

function CargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbCompras')) {
        $('#tbCompras').DataTable().destroy();
    }

    $('#tbCompras tbody').html('');

    var request = {
        fechainicio : $("#txtFechaInicio").val(),
        fechafin : $("#txtFechaFin").val(),
        idproveedor: $("#cboProveedor").val() == null ? "0" : $("#cboProveedor").val(),
        idtienda: $("#cboTienda").val() == null ? "0" : $("#cboTienda").val()
    };
    AjaxPost("../frmConsultarCompra.aspx/Obtener", JSON.stringify(request),
        function (response) {
            $(".mt-3").LoadingOverlay("hide");
            if (response.estado) {

                
                $("#tbCompras tbody").html("");
                
                $.each(response.objeto, function (i, row) {
                    $("<tr>").append(
                        $("<td>").append(
                            $("<button>").addClass("btn btn-sm btn-primary").text("Ver detalle").data("compra", row)
                        ),
                        $("<td>").text(row.NumeroCompra),
                        $("<td>").text(row.oProveedor.RazonSocial),
                        $("<td>").text(row.oTienda.Nombre),
                        $("<td>").text(row.FechaCompra),
                        $("<td>").text(row.TotalCosto)
                        
                    ).appendTo("#tbCompras tbody");

                })

            } 
            table = $('#tbCompras').DataTable({
                responsive: true
            });
        },
        function () {
            $(".mt-3").LoadingOverlay("hide");
        },
        function () {
            $(".mt-3").LoadingOverlay("show");
        })
}

$('#tbCompras tbody').on('click', 'button[class="btn btn-sm btn-primary"]', function () {
    var compra = $(this).data("compra");
    var url = 'docCompra.aspx?id=' + compra.IdCompra ;
    window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');
})



function ObtenerTiendas() {
    $("#cboTienda").html("");
    AjaxGet("../frmTienda.aspx/Obtener",
        function (response) {
            $("#cboTienda").LoadingOverlay("hide");
            if (response.estado) {

                $("<option>").attr({ "value": 0 }).text("-- Seleccionar todas --").appendTo("#cboTienda");

                $.each(response.objeto, function (i, row) {
                    if (row.Activo == true)
                        $("<option>").attr({ "value": row.IdTienda }).text(row.Nombre).appendTo("#cboTienda");
                })
            }
        },
        function () {
            $("#cboTienda").LoadingOverlay("hide");
        },
        function () {
            $("#cboTienda").LoadingOverlay("show");
        })
}

function ObtenerProveedores() {
    $("#cboProveedor").html("");
    AjaxGet("../frmProveedor.aspx/Obtener",
        function (response) {
            $("#cboProveedor").LoadingOverlay("hide");
            if (response.estado) {

                $("<option>").attr({ "value": 0 }).text("-- Seleccionar todas --").appendTo("#cboProveedor");
                $.each(response.objeto, function (i, row) {
                    if (row.Activo == true)
                        $("<option>").attr({ "value": row.IdProveedor }).text(row.RazonSocial).appendTo("#cboProveedor");
                })
            }
        },
        function () {
            $("#cboProveedor").LoadingOverlay("hide");
        },
        function () {
            $("#cboProveedor").LoadingOverlay("show");
        })
}