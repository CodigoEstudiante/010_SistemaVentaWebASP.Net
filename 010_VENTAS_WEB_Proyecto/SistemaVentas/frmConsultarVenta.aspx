<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmConsultarVenta.aspx.cs" Inherits="SistemaVentas.frmConsultarVenta" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        select{
            cursor:pointer;
        }
        .form-control-sm {
            height: calc(1.3em + .3rem + 2px) !important;
            padding: .15rem .3rem !important;
            font-size: .875rem !important;
            line-height: 1.3 !important;
            border-radius: .2rem !important;
        }
        .col-form-label-sm {
            padding-top: calc(.25rem + 1px) !important;
            padding-bottom: calc(.25rem + 1px) !important;
            font-size: .800rem !important;
            line-height: 1.5 !important;
        }

        .btn-custom, .btn-sm-custom {
            padding: .25rem .5rem;
            font-size: .875rem;
            line-height: 1.5;
            border-radius: .2rem;
        }

        .btn-group-sm > .btn, .btn-sm {
            padding: .15rem .5rem !important;
            font-size: .750rem !important;
            line-height: 1.5 !important;
            border-radius: .2rem !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
            <div class="col-sm-12">
               <div class="card">
                  <div class="card-header">
                    Consultar Compras
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
                            <div class="col-sm-2">
                              <div class="form-group mb-0">
                                <label for="txtRucProveedor" class="col-form-label col-form-label-sm">Codigo Venta:</label>
                                <input type="text" class="form-control form-control-sm model" id="txtCodigoVenta" name="FechaInicio" autocomplete="off">
                              </div>
                            </div>
                            <div class="col-sm-2">
                              <div class="form-group mb-0">
                                <label for="txtRucProveedor" class="col-form-label col-form-label-sm">Documento Cliente:</label>
                                <input type="text" class="form-control form-control-sm model" id="txtDocumentoCliente" name="FechaInicio" autocomplete="off">
                              </div>
                            </div>
                            <div class="col-sm-2">
                              <div class="form-group mb-0">
                                <label for="txtRucProveedor" class="col-form-label col-form-label-sm">Nombre Cliente:</label>
                                <input type="text" class="form-control form-control-sm model" id="txtNombreCliente" name="FechaInicio" autocomplete="off">
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
                                <table id="tbVentas" class="table table-striped table-bordered nowrap compact" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Tipo Documento</th>
                                            <th>Codigo Documento</th>
                                            <th>Fecha Creacion</th>
                                            <th>Documento Cliente</th>
                                            <th>Nombre Cliente</th>
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
    <script src="Controlador/frmConsultarVenta/frmConsultarVenta.js"></script>
</asp:Content>
