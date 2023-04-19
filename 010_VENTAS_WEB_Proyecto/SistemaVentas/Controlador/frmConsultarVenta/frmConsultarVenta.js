
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
    $("#txtFechaInicio").val(ObtenerFecha());
    $("#txtFechaFin").val(ObtenerFecha());

    CargarDatos();
});

$('#btnBuscar').on('click', function () {

    CargarDatos();
})

function CargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbVentas')) {
        $('#tbVentas').DataTable().destroy();
    }

    $('#tbVentas tbody').html('');

    var request = {
        codigo: $("#txtCodigoVenta").val(),
        fechainicio: $("#txtFechaInicio").val(),
        fechafin: $("#txtFechaFin").val(),
        numerodocumento: $("#txtDocumentoCliente").val(),
        nombres: $("#txtNombreCliente").val()
    };

    AjaxPost("../frmConsultarVenta.aspx/ObtenerLista", JSON.stringify(request),
        function (response) {
            $(".mt-3").LoadingOverlay("hide");
            if (response.estado) {
                $("#tbVentas tbody").html("");
                
                $.each(response.objeto, function (i, row) {
                    $("<tr>").append(
                        $("<td>").append(
                            $("<button>").addClass("btn btn-sm btn-primary").text("Ver detalle").data("venta", row)
                        ),
                        $("<td>").text(row.TipoDocumento),
                        $("<td>").text(row.Codigo),
                        $("<td>").text(row.FechaRegistro),
                        $("<td>").text(row.oCliente.NumeroDocumento),
                        $("<td>").text(row.oCliente.Nombre),
                        $("<td>").text(row.TotalCosto)
                    ).appendTo("#tbVentas tbody");

                })
            }
            table = $('#tbVentas').DataTable({
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

$('#tbVentas tbody').on('click', 'button[class="btn btn-sm btn-primary"]', function () {
    var venta = $(this).data("venta");
    var url = 'docVenta.aspx?id=' + venta.IdVenta;
    window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');
})


