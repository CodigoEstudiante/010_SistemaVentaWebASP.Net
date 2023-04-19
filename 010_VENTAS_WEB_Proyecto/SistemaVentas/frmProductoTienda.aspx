<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmProductoTienda.aspx.cs" Inherits="SistemaVentas.frmProductoTienda" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

     <div class="row">
            <div class="col-sm-12">
                <div class="mb-3" id="accordion">
                  <div class="card">
                    <div class="card-header p-2" id="headingOne">
                        <label>Asignar Productos a Tienda</label>
                        <div class="float-right">
                            <button class="btn btn-secondary btn-sm float-right" data-toggle="collapse" data-target="#collapseOne" aria-controls="collapseOne"><i class="fa fa-bars" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>

                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                      <div class="card-body p-3">
                          <div class="row">
                            <div class="col-sm-3"><h6>Tienda</h6></div>
                            </div>
                            <div class="row">
                                <input id="txtIdTienda" type="hidden" value="0" />
                                <div class="col-sm-2">
                                  <div class="form-group mb-0">
                                    <label for="txtRuc" class="col-form-label col-form-label-sm">RUC:</label>
                                    <input type="text" class="form-control form-control-sm model" readonly id="txtRuc" name="RUC">
                                  </div>
                                </div>
                                <div class="col-sm-3">
                                  <div class="form-group mb-0">
                                    <label for="txtRazonSocial" class="col-form-label col-form-label-sm">Razón Social:</label>
                                    <input type="text" class="form-control form-control-sm model" readonly id="txtRazonSocial" name="Razon Social">
                                  </div>
                                </div>
                                <div class="col-sm-3">
                                  <div class="form-group mb-0">
                                    <label for="txtDirecion" class="col-form-label col-form-label-sm">Direccion:</label>
                                    <input type="text" class="form-control form-control-sm model" readonly id="txtDireccion" name="Direccion">
                                  </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group mb-0">
                                        <label for="btnBuscarTienda" class="col-form-label col-form-label-sm invisible">Direccion:</label>
                                        <button id="btnBuscarTienda" type="button" class="btn btn-sm btn-success btn-block">Buscar</button>
                                    </div>
                                </div>
                            </div>
                          <hr />
                          <div class="row">
                                <div class="col-sm-3"><h6>Producto</h6></div>
                            </div>
                            <div class="row">
                                <input id="txtIdProducto" type="hidden" value="0" />
                                <div class="col-sm-2">
                                  <div class="form-group mb-0">
                                    <label for="txtCodigo" class="col-form-label col-form-label-sm">Codigo:</label>
                                    <input type="text" class="form-control form-control-sm model" id="txtCodigo" name="Codigo" autocomplete="off">
                                  </div>
                                </div>
                                <div class="col-sm-3">
                                  <div class="form-group mb-0">
                                    <label for="txtNombre" class="col-form-label col-form-label-sm">Nombre:</label>
                                    <input type="text" class="form-control form-control-sm model" readonly id="txtNombre" name="Nombre">
                                  </div>
                                </div>
                                <div class="col-sm-3">
                                  <div class="form-group mb-0">
                                    <label for="txtDescripcion" class="col-form-label col-form-label-sm">Descripción:</label>
                                    <input type="text" class="form-control form-control-sm model" readonly id="txtDescripcion" name="Descripcion">
                                  </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group mb-0">
                                        <label for="btnBuscarProducto" class="col-form-label col-form-label-sm invisible">Direccion:</label>
                                        <button id="btnBuscarProducto" type="button" class="btn btn-sm btn-success btn-block">Buscar</button>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group mb-0">
                                        <label for="btnAsignar" class="col-form-label col-form-label-sm invisible">Direccion:</label>
                                        <button id="btnAsignar" type="button" class="btn btn-sm btn-primary btn-block">Asignar</button>
                                    </div>
                                </div>
                            </div>

                      </div>
                    </div>
                  </div>

                </div>


               <div class="card">
                  <div class="card-header">
                    Lista de Asignaciones
                  </div>
                  <div id="card-lista" class="card-body p-3">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="table-responsive">
                                    <table id="tbProductoTienda" class="table compact table-bordered" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th>Nombre Tienda</th>
                                                <th>RUC Tienda</th>
                                                <th>Codigo Producto</th>
                                                <th>Nombre Producto</th>
                                                <th>Stock</th>
                                                <th></th>
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

    <div class="modal fade" id="modalTienda" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tiendas</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div class="table-responsive">
                  <table id="tbTienda" class="table table-striped table-bordered nowrap compact">
                    <thead>
                      <tr>
                          <th></th>
                          <th>RUC</th>
                          <th>Razón Social</th>
                          <th>Direccion</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
              </div>
                
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modalProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Productos</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div class="table-responsive">
                  <table id="tbProducto" class="table table-striped table-bordered nowrap compact">
                    <thead>
                      <tr>
                          <th></th>
                          <th>Codigo</th>
                          <th>Nombre</th>
                          <th>Descripcion</th>
                          <th>Categoria</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
              </div>
                
          </div>
        </div>
      </div>
    </div>
    <script src="Controlador/frmProductoTienda/frmProductoTienda.js"></script>

</asp:Content>
