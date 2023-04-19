﻿<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmTienda.aspx.cs" Inherits="SistemaVentas.frmTienda" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
        <div class="row">
            <div class="col-sm-12">
               <div class="card">
                  <div class="card-header">
                    Mantenedor Tiendas
                  </div>
                  <div class="card-body">
                        <div class="row">
                            <div class="col-sm-2">
                                <button id="btnNuevoTienda" type="button" class="btn btn-sm btn-success">Nuevo</button>
                            </div>
                        </div>
                      <hr />
                        <div class="row mt-3">
                            <div class="col-sm-12">
                                <table id="tbTienda" class="table table-striped table-bordered nowrap" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>RUC</th>
                                            <th>Direccion</th>
                                            <th>Telefono</th>
                                            <th>Estado</th>
                                            <th></th>
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

    <!-- Modal -->
    <div class="modal fade" id="modalrol" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Tienda</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <input id="txtIdTienda" class="model" name="IdUsuario" value="0" type="hidden" />
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label col-form-label-sm">Nombre</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control form-control-sm model" id="txtNombre" name="RUC">
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label col-form-label-sm">Ruc</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control form-control-sm model" id="txtRuc" name="Razón Social">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label col-form-label-sm">Direccion</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control form-control-sm model" id="txtDireccion" name="Direccion">
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label col-form-label-sm">Telefono</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control form-control-sm model" id="txtTelefono" name="Telefono">
                </div>
              </div>

              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label col-form-label-sm">Activo</label>
                <div class="col-sm-10">
                    <select class="form-control form-control-sm model" id="cboEstado" name="Activo">
                        <option value="1">Activo</option>
                        <option value="0">No Activo</option>
                    </select>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
            <button id="btnGuardarCambios" type="button" class="btn btn-sm btn-primary">Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
    <script src="Controlador/frmTienda/frmTienda.js"></script>
</asp:Content>
