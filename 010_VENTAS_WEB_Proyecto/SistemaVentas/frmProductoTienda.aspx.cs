using CapaDatos;
using CapaModelo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SistemaVentas
{
    public partial class frmProductoTienda : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public static Respuesta<List<ProductoTienda>> Obtener()
        {
            List<ProductoTienda> oListaProductoTienda = new List<ProductoTienda>();
            oListaProductoTienda = CD_ProductoTienda.Instancia.ObtenerProductoTienda();
            if (oListaProductoTienda != null)
            {
                return new Respuesta<List<ProductoTienda>>() { estado = true, objeto = oListaProductoTienda };
            }
            else
            {
                return new Respuesta<List<ProductoTienda>>() { estado = false, objeto = null };
            }
        }


        [WebMethod]
        public static Respuesta<List<Producto>> ObtenerProductoxTienda(int IdTienda)
        {
            List<Producto> oListaProducto = CD_Producto.Instancia.ObtenerProducto();
            List<ProductoTienda> oListaProductoTienda = CD_ProductoTienda.Instancia.ObtenerProductoTienda();

            oListaProducto = oListaProducto.Where(x => x.Activo == true).ToList();
            if (IdTienda != 0)
            {
                oListaProductoTienda = oListaProductoTienda.Where(x => x.oTienda.IdTienda == IdTienda).ToList();
                oListaProducto = (from producto in oListaProducto
                                  join productotienda in oListaProductoTienda on producto.IdProducto equals productotienda.oProducto.IdProducto
                                  where productotienda.oTienda.IdTienda == IdTienda
                                  select producto).ToList();
            }

            if (oListaProducto != null)
            {
                return new Respuesta<List<Producto>>() { estado = true, objeto = oListaProducto };
            }
            else
            {
                return new Respuesta<List<Producto>>() { estado = false, objeto = null };
            }
        }


        [WebMethod]
        public static Respuesta<bool> Guardar(ProductoTienda oProductoTienda)
        {
            bool Respuesta = false;
            Respuesta = CD_ProductoTienda.Instancia.RegistrarProductoTienda(oProductoTienda);
            return new Respuesta<bool>() { estado = Respuesta };
        }

        [WebMethod]
        public static Respuesta<bool> Editar(ProductoTienda oProductoTienda)
        {
            bool Respuesta = false;
            Respuesta = CD_ProductoTienda.Instancia.ModificarProductoTienda(oProductoTienda);
            return new Respuesta<bool>() { estado = Respuesta };
        }

        [WebMethod]
        public static Respuesta<bool> Eliminar(int IdProductoTienda)
        {
            bool Respuesta = false;
            Respuesta = CD_ProductoTienda.Instancia.EliminarProductoTienda(IdProductoTienda);
            return new Respuesta<bool>() { estado = Respuesta };

        }
    }
}