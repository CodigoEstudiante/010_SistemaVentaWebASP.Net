<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="rptVentas.aspx.cs" Inherits="SistemaVentas.rptVentas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .buttons-excel{
            color: #fff !important;
            background-color: #28a745 !important;
            border-color: #28a745 !important;
        }

        .buttons-pdf{
            color: #fff !important;
            background-color: #dc3545 !important;
            border-color: #dc3545 !important;
        }

        .buttons-print {
            color: #fff !important;
            background-color: #17a2b8 !important;
            border-color: #17a2b8 !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
            <div class="col-sm-12">
               <div class="card">
                  <div class="card-header">
                    Reporte de ventas
                  </div>
                  <div class="card-body p-2">
                        <div class="row">
                            <div class="col-sm-2">
                              <div class="form-group mb-0">
                                <label for="txtRucProveedor" class="col-form-label col-form-label-sm">Fecha Inicio:</label>
                                <input type="text" class="form-control form-control-sm model" id="txtFechaInicio" name="FechaInicio" autocomplete="off">
                              </div>
                            </div>
                            <div class="col-sm-2">
                              <div class="form-group mb-0">
                                <label for="txtRucProveedor" class="col-form-label col-form-label-sm">Fecha Fin:</label>
                                <input type="text" class="form-control form-control-sm model" id="txtFechaFin" name="FechaFin" autocomplete="off">
                              </div>
                            </div>
                            <div class="col-sm-3">
                              <div class="form-group mb-0">
                                <label for="txtRucProveedor" class="col-form-label col-form-label-sm">Tienda:</label>
                                <select class="form-control form-control-sm model" id="cboTienda" name="Tienda">
                                </select>
                              </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="form-group mb-0">
                                    <label for="btnBuscar" class="col-form-label col-form-label-sm invisible">Direccion:</label>
                                    <button id="btnBuscar" type="button" class="btn btn-sm btn-primary btn-block">Buscar</button>
                                </div>
                            </div>
                        </div>
                      <hr />
                        <div class="row mt-3">
                            <div class="col-sm-12">
                                <table id="tbReporte" class="table table-striped table-bordered nowrap compact" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>Fecha Venta</th>
                                            <th>Numero Documento</th>
                                            <th>Tipo Documento</th>
                                            <th>Nombre Tienda</th>
                                            <th>Ruc Tienda</th>
                                            <th>Nombre Empleado</th>
                                            <th>Cantidad Unidades Vendidas</th>
                                            <th>Cantidad Productos</th>
                                            <th>Total Venta</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                  </div>
                  <div class="card-footer">
                  </div>
                </div>
            </div>
    </div>
    <script src="Controlador/rptVentas/rptVentas.js"></script>
</asp:Content>
