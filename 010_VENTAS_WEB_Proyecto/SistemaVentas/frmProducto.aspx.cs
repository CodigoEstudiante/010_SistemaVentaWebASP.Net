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
    public partial class frmProducto : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public static Respuesta<List<Producto>> Obtener()
        {
            List<Producto> oListaProducto = new List<Producto>();
            oListaProducto = CD_Producto.Instancia.ObtenerProducto();
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
        public static Respuesta<bool> Guardar(Producto oProducto)
        {
            bool Respuesta = false;
            Respuesta = CD_Producto.Instancia.RegistrarProducto(oProducto);
            return new Respuesta<bool>() { estado = Respuesta };
        }

        [WebMethod]
        public static Respuesta<bool> Editar(Producto oProducto)
        {
            bool Respuesta = false;
            Respuesta = CD_Producto.Instancia.ModificarProducto(oProducto);
            return new Respuesta<bool>() { estado = Respuesta };
        }

        [WebMethod]
        public static Respuesta<bool> Eliminar(int IdProducto)
        {
            bool Respuesta = false;
            Respuesta = CD_Producto.Instancia.EliminarProducto(IdProducto);
            return new Respuesta<bool>() { estado = Respuesta };

        }
    }
}