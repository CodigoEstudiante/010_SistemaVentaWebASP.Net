<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmCategoria.aspx.cs" Inherits="SistemaVentas.frmCategoria" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
            <div class="col-sm-12">
               <div class="card">
                  <div class="card-header">
                    Mantenedor Categorias
                  </div>
                  <div class="card-body">
                        <div class="row">
                            <div class="col-sm-2">
                                <button id="btnNuevoCategoria" type="button" class="btn btn-sm btn-success">Nuevo</button>
                            </div>
                        </div>
                      <hr />
                        <div class="row mt-3">
                            <div class="col-sm-12">
                                <table id="tbCategoria" class="table table-striped table-bordered nowrap" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Descripcion</th>
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
            <h5 class="modal-title" id="exampleModalLabel">Categoria</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <input id="txtIdCategoria" class="model" name="IdRol" value="0" type="hidden" />
              <div class="form-group">
                <label for="txtDescripcion" class="col-form-label">Descripcion:</label>
                <input type="text" class="form-control form-control-sm model" id="txtDescripcion" name="Descripcion">
              </div>
              <div class="form-group">
                <label for="cboEstado" class="col-form-label">Activo:</label>
                <select class="form-control form-control-sm model" id="cboEstado" name="Activo">
                    <option value="1">Activo</option>
                    <option value="0">No Activo</option>
                </select>
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
    <script src="Controlador/frmCategoria/frmCategoria.js"></script>
    
</asp:Content>
