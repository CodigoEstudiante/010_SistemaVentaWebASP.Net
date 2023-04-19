var table;

$(document).ready(function () {
    table = $('#tbReporte').DataTable({
        "scrollY": "200px",
        "scrollCollapse": true,
        "scrollX": true,
        "paging": false,
        dom: 'Bfrtip',
        buttons: [{
            extend: 'excelHtml5',
            title: 'ProductoenTienda_' + ObtenerFecha()
            },
            {
                extend: 'pdfHtml5',
                title: 'ProductoenTienda_' + ObtenerFecha()
            },
            {
                extend: 'print'
            }
        ]
    });
    ObtenerTiendas();
    
});


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



function CargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbReporte')) {
        $('#tbReporte').DataTable().destroy();
    }

    $('#tbReporte tbody').html('');

    var request = {
        codigoproducto: $("#txtCodigoProducto").val(),
        idtienda: $("#cboTienda").val() == null ? "0" : $("#cboTienda").val()
    };
    AjaxPost("../rptProductoTienda.aspx/Obtener", JSON.stringify(request),
        function (response) {
            $(".mt-3").LoadingOverlay("hide");
            if (response.estado) {

                var filas = JSON.parse(response.objeto)
                $("#tbReporte tbody").html("");

                if (filas.length > 0) {
                    $.each(filas, function (i, row) {
                        
                        $("<tr>").append(
                            $("<td>").text(row["Ruc Tienda"]),
                            $("<td>").text(row["Nombre Tienda"]),
                            $("<td>").text(row["Direccion Tienda"]),
                            $("<td>").text(row["Codigo Producto"]),
                            $("<td>").text(row["Nombre Producto"]),
                            $("<td>").text(row["Descripcion Producto"]),
                            $("<td>").text(row["Stock en tienda"]),
                            $("<td>").text(row["Precio Compra"]),
                            $("<td>").text(row["Precio Venta"])

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
                        title: 'ProductoenTienda_' + ObtenerFecha()
                    },
                    {
                        extend: 'pdfHtml5',
                        title: 'ProductoenTienda_' + ObtenerFecha()
                    },
                    {
                        extend: 'print'
                    }]
            } );
        },
        function () {
            $(".mt-3").LoadingOverlay("hide");
        },
        function () {
            $(".mt-3").LoadingOverlay("show");
        })
}

$('#btnBuscar').on('click', function () {

    CargarDatos();
})