using CapaDatos;
using CapaModelo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SistemaVentas
{
    public partial class frmRolPermiso : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<Permisos>> Obtener(int IdRol)
        {
            List<Permisos> oListaPermisos = new List<Permisos>();
            oListaPermisos = CD_Permisos.Instancia.ObtenerPermisos(IdRol);

            if (oListaPermisos != null)
            {
                return new Respuesta<List<Permisos>>() { estado = true ,objeto = oListaPermisos};
            }
            else
            {
                return new Respuesta<List<Permisos>>() { estado = false };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(string xml)
        {
            bool Respuesta = false;
            Respuesta = CD_Permisos.Instancia.ActualizarPermisos(xml);
            return new Respuesta<bool>() { estado = Respuesta };
        }
    }
}