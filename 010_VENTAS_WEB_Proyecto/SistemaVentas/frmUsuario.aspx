<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmUsuario.aspx.cs" Inherits="SistemaVentas.frmUsuario" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

        <div class="row">
            <div class="col-sm-12">
               <div class="card">
                  <div class="card-header">
                    Mantenedor Usuarios
                  </div>
                  <div class="card-body">
                        <div class="row">
                            <div class="col-sm-2">
                                <button id="btnNuevoRol" type="button" class="btn btn-sm btn-success">Nuevo</button>
                            </div>
                        </div>
                      <hr />
                        <div class="row mt-3">
                            <div class="col-sm-12">
                                <table id="tbUsuario" class="table table-striped table-bordered nowrap" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Rol</th>
                                            <th>Usuario</th>
                                            <th>Nombres</th>
                                            <th>Apellidos</th>
                                            <th>Correo</th>
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
            <h5 class="modal-title" id="exampleModalLabel">Usuario</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <input id="txtIdUsuario" class="model" name="IdUsuario" value="0" type="hidden" />
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label col-form-label-sm">Nombres</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control form-control-sm model" id="txtNombres" name="Nombres">
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label col-form-label-sm">Apellidos</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control form-control-sm model" id="txtApellidos" name="Apellidos">
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label col-form-label-sm">Correo</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control form-control-sm model" id="txtCorreo" name="Correo">
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label col-form-label-sm">Usuario</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control form-control-sm model" id="txtUsuario" name="Usuario">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label col-form-label-sm">Contraseña</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control form-control-sm model" id="txtClave" name="Clave">
                </div>
              </div>

              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label col-form-label-sm">Tienda</label>
                <div class="col-sm-10">
                    <select class="form-control form-control-sm model" id="cboTienda" name="Tienda">
                        <option value="1">Activo</option>
                        <option value="0">No Activo</option>
                    </select>
                </div>
              </div>

               <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label col-form-label-sm">Rol</label>
                <div class="col-sm-10">
                    <select class="form-control form-control-sm model" id="cboRol" name="Rol">
                    </select>
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
    <script src="Controlador/frmUsuario/frmUsuario.js"></script>
</asp:Content>
