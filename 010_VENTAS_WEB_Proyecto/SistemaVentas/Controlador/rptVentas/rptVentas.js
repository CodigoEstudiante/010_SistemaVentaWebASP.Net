
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
    $("#txtFechaInicio").val(ObtenerFecha());
    $("#txtFechaFin").val(ObtenerFecha());

    table = $('#tbReporte').DataTable({
        "scrollY": "200px",
        "scrollCollapse": true,
        "scrollX": true,
        "paging": false,
        dom: 'Bfrtip',
        buttons: [{
            extend: 'excelHtml5',
            title: 'Ventas_' + ObtenerFecha()
        },
        {
            extend: 'pdfHtml5',
            title: 'Ventas_' + ObtenerFecha()
        },
        {
            extend: 'print'
        }
        ]
    });

});

$('#btnBuscar').on('click', function () {

    CargarDatos();
})

function CargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbReporte')) {
        $('#tbReporte').DataTable().destroy();
    }

    $('#tbReporte tbody').html('');

    var request = {
        fechainicio: $("#txtFechaInicio").val(),
        fechafin: $("#txtFechaFin").val(),
        idtienda: $("#cboTienda").val() == null ? "0" : $("#cboTienda").val()
    };
    AjaxPost("../rptVentas.aspx/Obtener", JSON.stringify(request),
        function (response) {
            $(".mt-3").LoadingOverlay("hide");
            if (response.estado) {


                var filas = JSON.parse(response.objeto)
                $("#tbReporte tbody").html("");

                if (filas.length > 0) {
                    $.each(filas, function (i, row) {

                        $("<tr>").append(
                            $("<td>").text(row["Fecha Venta"]),
                            $("<td>").text(row["Numero Documento"]),
                            $("<td>").text(row["Tipo Documento"]),
                            $("<td>").text(row["Nombre Tienda"]),
                            $("<td>").text(row["Ruc Tienda"]),
                            $("<td>").text(row["Nombre Empleado"]),
                            $("<td>").text(row["Cantidad Unidades Vendidas"]),
                            $("<td>").text(row["Cantidad Productos"]),
                            $("<td>").text(row["Total Venta"])

                        ).appendTo("#tbReporte tbody");

                    })
                }

            }

            table = $('#tbReporte').DataTable({
                "scrollY": "200px",
                "scrollCollapse": true,
                "scrollX": true,
                "paging": false,
                dom: 'Bfrtip',
                buttons: [{
                    extend: 'excelHtml5',
                    title: 'Ventas_' + ObtenerFecha()
                },
                {
                    extend: 'pdfHtml5',
                    title: 'Ventas_' + ObtenerFecha()
                },
                {
                    extend: 'print'
                }
                ]
            });
        },
        function () {
            $(".mt-3").LoadingOverlay("hide");
        },
        function () {
            $(".mt-3").LoadingOverlay("show");
        })
}




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
