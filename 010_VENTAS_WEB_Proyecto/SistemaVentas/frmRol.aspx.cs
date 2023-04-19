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
    public partial class frmRol : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public static Respuesta<List<Rol>> Obtener()
        {
            List<Rol> oListaRol = new List<Rol>();
            oListaRol = CD_Rol.Instancia.ObtenerRol();

            if (oListaRol != null)
            {
                return new Respuesta<List<Rol>>() { estado = true, objeto = oListaRol };
            }
            else
            {
                return new Respuesta<List<Rol>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(Rol oRol)
        {
            bool Respuesta = false;
            Respuesta = CD_Rol.Instancia.RegistrarRol(oRol);
            return new Respuesta<bool>() { estado = Respuesta };
            
        }

        [WebMethod]
        public static Respuesta<bool> Editar(Rol oRol)
        {
            bool Respuesta = false;
            Respuesta = CD_Rol.Instancia.ModificarRol(oRol);
            return new Respuesta<bool>() { estado = Respuesta };
            
        }

        [WebMethod]
        public static Respuesta<bool> Eliminar(int IdRol)
        {
            bool Respuesta = false;
            Respuesta = CD_Rol.Instancia.EliminarRol(IdRol);
            return new Respuesta<bool>() { estado = Respuesta };
        }

        
    }
}