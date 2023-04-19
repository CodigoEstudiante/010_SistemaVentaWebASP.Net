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
    public partial class frmProveedor : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public static Respuesta<List<Proveedor>> Obtener()
        {
            List<Proveedor> oListaProveedor = new List<Proveedor>();
            oListaProveedor = CD_Proveedor.Instancia.ObtenerProveedor();
            if (oListaProveedor != null)
            {
                return new Respuesta<List<Proveedor>>() { estado = true, objeto = oListaProveedor };
            }
            else
            {
                return new Respuesta<List<Proveedor>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(Proveedor oProveedor)
        {
            bool Respuesta = false;
            Respuesta = CD_Proveedor.Instancia.RegistrarProveedor(oProveedor);
            return new Respuesta<bool>() { estado = Respuesta };
        }

        [WebMethod]
        public static Respuesta<bool> Editar(Proveedor oProveedor)
        {
            bool Respuesta = false;
            Respuesta = CD_Proveedor.Instancia.ModificarProveedor(oProveedor);
            return new Respuesta<bool>() { estado = Respuesta };
        }

        [WebMethod]
        public static Respuesta<bool> Eliminar(int IdProveedor)
        {
            bool Respuesta = false;
            Respuesta = CD_Proveedor.Instancia.EliminarProveedor(IdProveedor);
            return new Respuesta<bool>() { estado = Respuesta };

        }
    }
}