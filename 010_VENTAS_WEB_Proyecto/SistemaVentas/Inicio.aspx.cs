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
    public partial class Inicio : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        
        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public static Respuesta<Usuario> ObtenerDetalleUsuario()
        {
            if(Configuracion.oUsuario != null)
            {
                int IdUsuario = Configuracion.oUsuario.IdUsuario;
                Usuario oUsuario = new Usuario();
                oUsuario = CD_Usuario.Instancia.ObtenerDetalleUsuario(IdUsuario);

                Configuracion.oUsuario = oUsuario;

                if (oUsuario != null)
                {
                    return new Respuesta<Usuario>() { estado = true, objeto = oUsuario };
                }
                else
                {
                    return new Respuesta<Usuario>() { estado = false, objeto = null };
                }
            }
            else
            {
                return new Respuesta<Usuario>() { estado = false, objeto = null };
            }

            
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public static Respuesta<bool> CerrarSesion()
        {
            Configuracion.oUsuario = null;
            
            return new Respuesta<bool>() { estado = true};
            
        }
    }
}