<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmRolPermiso.aspx.cs" Inherits="SistemaVentas.frmRolPermiso" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        #tbpermiso tbody {display: block; max-height: 300px;overflow: auto;}
        #tbpermiso thead, #tbpermiso tbody tr { display: table; width: 100%; table-layout: fixed; }
        #tbpermiso tbody{width:100%; }
        #tbpermiso thead{width:99%; }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
            <div class="col-sm-12">
               <div class="card">
                  <div class="card-header">
                    <div class="row">
                        <div class="col-sm-10">
                          <label>Mantenedor de Permisos</label>
                        </div>
                        <div class="col-sm-2 float-right">
                          <button id="btnGuardarCambios" class="btn btn-sm btn-success">Guardar Cambios</button>
                         </div>
                      </div>
                      </div>
                  <div class="card-body">
                        <div class="row">
                            <div  class="col-sm-2">
                                <label>Seleccion Rol:</label>
                            </div>
                            <div class="col-sm-3">
                                <select class="form-control form-control-sm model" id="cboRol" name="Activo">
                                </select>
                            </div>
                            <div class="col-sm-2">
                                <button id="btnBuscar" type="button" class="btn btn-sm btn-primary btn-block">Buscar</button>
                            </div>
                        </div>
                      <hr />
                        <div class="row mt-3">
                            <div class="col-sm-12">
                                <div class="table-responsive">
                                    <table id="tbpermiso" class="table table-bordered" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Activar</th>
                                                <th>Menu</th>
                                                <th>Sub Menu</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                
                            </div>
                        </div>
                  </div>
                  <div class="card-footer">
                  </div>
                </div>
            </div>
    </div>

    <script src="Controlador/frmRolPermiso/frmRolPermiso.js"></script>
</asp:Content>
