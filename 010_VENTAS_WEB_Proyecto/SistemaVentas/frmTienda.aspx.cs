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
    public partial class frmTienda : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public static Respuesta<List<Tienda>> Obtener()
        {
            List<Tienda> oListaTienda = new List<Tienda>();
            oListaTienda = CD_Tienda.Instancia.ObtenerTiendas();

            if (oListaTienda != null)
            {
                return new Respuesta<List<Tienda>>() { estado = true, objeto = oListaTienda };
            }
            else
            {
                return new Respuesta<List<Tienda>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(Tienda oTienda)
        {
            bool Respuesta = false;
            Respuesta = CD_Tienda.Instancia.RegistrarTienda(oTienda);
            return new Respuesta<bool>() { estado = Respuesta };
           
        }

        [WebMethod]
        public static Respuesta<bool> Editar(Tienda oTienda)
        {
            bool Respuesta = false;
            Respuesta = CD_Tienda.Instancia.ModificarTienda(oTienda);
            return new Respuesta<bool>() { estado = Respuesta };
          
        }

        [WebMethod]
        public static Respuesta<bool> Eliminar(int IdTienda)
        {
            bool Respuesta = false;
            Respuesta = CD_Tienda.Instancia.EliminarTienda(IdTienda);
            return new Respuesta<bool>() { estado = Respuesta };
            
        }
    }
}