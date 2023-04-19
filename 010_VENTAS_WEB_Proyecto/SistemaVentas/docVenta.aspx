<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="docVenta.aspx.cs" Inherits="SistemaVentas.docVenta" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>

    <div style="font-size: 11px; text-align: right;">
            <center>
                <button type="button" id="Imprimir" onclick="javascript:imprSelec('seleccion')">IMPRIMIR</button>
            </center>
            <br>
   </div>
    <div id="seleccion">
        <center>
            <div>
                <table style="width: 650px; border:2px solid #000;padding: 10px;" border="0">
                    <tbody>
                        <tr>
                            <td colspan="4">
                                <img height="100" src="https://blog.hootsuite.com/wp-content/uploads/2017/06/facebook-cover-photos-whitespace-620x236.png">
                            </td>
                            <td colspan="2" rowspan="3" align="center" style="vertical-align: top;">
                                <table border="1" style="width: 100%; height: 100px; font-weight: bold; ">
                                    <tr><td align="center">R.U.C. <span id="ructienda"></span></td></tr>
                                    <tr bgcolor="#D9D9D9"><td align="center"><span id="tipodocumento"></span></td></tr>
                                    <tr><td align="center">NRO - <span id="codigodocumento"></span> </td></tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" align="center">Atendido por: <span id="nombreempleado"></span></td>
                        </tr>
                        <tr>
                            <td colspan="4" align="center"><span id="direcciontienda"></span></td>
                        </tr>
                        <tr style="height: 20px;"><td colspan="6"><br /></td></tr>
                        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                       <tr>
                           <td colspan="6">
                               <table style=" width: 100%;" border="0">
                                   <tr>
                                       <td colspan="1" style="width:50px !important">Cliente:</td>
                                       <td colspan="5" style="border-bottom:1px solid #000"><span id="nombrescliente"></span></td>
                                   </tr>
                                   <tr>
                                       <td colspan="1" style="width:50px !important">Direccion:</td>
                                       <td colspan="5" style="border-bottom:1px solid #000"><span id="direccioncliente"></span></td>
                                   </tr>
                                   <tr>
                                       <td style="width:50px">Nro.Documento:</td>
                                       <td style="border-bottom:1px solid #000"><span id="documentocliente"></span></td>
                                       <td style="width:50px"> Telefono:</td>
                                       <td style="border-bottom:1px solid #000"><span id="telefonocliente"></span></td>
                                       <td style="width:50px"> Fecha:</td>
                                       <td style="border-bottom:1px solid #000"><span id="fecharegistro"></span></td>
                                   </tr>
                               </table>
                           </td>
                       </tr>



                        <tr style="height: 10px;"></tr>
                        <tr>
                            <td colspan="6">
                                <table id="tbVentas" border="1" style="width: 100%;">
                                    <thead>
                                        <tr bgcolor="#D9D9D9">
                                            <th style="width: 15%;">Cantidad</th>
                                            <th style="width: 45%;">Descripcion</th>
                                            <th style="width: 20%;">P.Unit</th>
                                            <th style="width: 20%;">Importe</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr style="height: 10px;"><td colspan="6"><br /><br /></td></tr>
                        <tr>
                            <td colspan="4">
                                <table width='250' border='1'>
                                    <tr style='border:1px solid black;'>
                                        <td bgcolor='#D9D9D9'>Pago con S/.</td>
                                        <td><span id="importerecibido"></span></td>
                                        <td bgcolor='#D9D9D9'>Cambio S/.</td>
                                        <td><span id="importecambio"></span></td>
                                    </tr>
                                </table>
                            </td>
                            <td colspan="2" align="right">
                                <table style="font-weight: bold; width: 150px;">
                                    <tr>
                                        <td>Total S/.</td>
                                        <td bgcolor="#D9D9D9" style="border:1px solid black;"><span id="totalcosto"></span></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </center>
    </div>

    <script src="Assets/Plugins/jquery/jquery.3.5.1.min.js"></script>
   <script src="Controlador/Utilidades.js"></script>
   <script src="Assets/Plugins/loadingoverlay/loadingoverlay.js"></script>

   <script type="text/javascript" language="javascript">

       $(document).ready(function () {

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const IdVenta = urlParams.get('id')
            
           CargarDatos(IdVenta);
       });

       function CargarDatos($IdVenta) {
           
            $('#tbCompras tbody').html('');

            var request = {
                IdVenta: $IdVenta
           };

            AjaxPost("../frmConsultarVenta.aspx/ObtenerDetalle", JSON.stringify(request),
                function (response) {
                    $("#seleccion").LoadingOverlay("hide");
                    if (response.estado) {
                        $("#ructienda").text(response.objeto.oTienda.RUC);
                        $("#tipodocumento").text(response.objeto.TipoDocumento);
                        $("#codigodocumento").text(response.objeto.Codigo);


                        $("#nombreempleado").text(response.objeto.oUsuario.Nombres + " " +response.objeto.oUsuario.Apellidos);
                        $("#direcciontienda").text(response.objeto.oTienda.Direccion);


                        $("#nombrescliente").text(response.objeto.oCliente.Nombre);
                        $("#direccioncliente").text(response.objeto.oCliente.Direccion);
                        $("#documentocliente").text(response.objeto.oCliente.NumeroDocumento);
                        $("#telefonocliente").text(response.objeto.oCliente.Telefono);


                        $("#fecharegistro").text(response.objeto.FechaRegistro);

                        
                        $("#tbVentas tbody").html("");
                
                        $.each(response.objeto.oListaDetalleVenta, function (i, row) {
                            $("<tr>").append(
                                $("<td>").text(row.Cantidad),
                                $("<td>").text(row.NombreProducto),
                                $("<td>").text(row.PrecioUnidad),
                                $("<td>").text(row.ImporteTotal)
                        
                            ).appendTo("#tbVentas tbody");

                        })

                        $("#importerecibido").text(response.objeto.ImporteRecibido);
                        $("#importecambio").text(response.objeto.ImporteCambio);//TotalCosto
                        $("#totalcosto").text(response.objeto.TotalCosto);//TotalCosto
                        

                    } 
                },
                function () {
                    $("#seleccion").LoadingOverlay("hide");
                },
                function () {
                    $("#seleccion").LoadingOverlay("show");
                })
       }

        function imprSelec(nombre) {
            var printContents = document.getElementById(nombre).innerHTML;
            var originalContents = document.body.innerHTML;

            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        }
        function hide() {
            document.getElementById('Imprimir').style.visibility = "hidden";
        }
    </script>
</body>
</html>
