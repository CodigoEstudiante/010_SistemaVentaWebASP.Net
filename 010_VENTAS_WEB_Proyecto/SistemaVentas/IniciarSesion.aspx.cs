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
    public partial class IniciarSesion : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<int> Iniciar(string Usuario, string Clave)
        {
            int IdUsuario = CD_Usuario.Instancia.LoginUsuario(Usuario, Clave);
            Configuracion.oUsuario = new Usuario() { IdUsuario = IdUsuario };

            if (IdUsuario != 0)
            {
                return new Respuesta<int>() { estado = true ,valor = IdUsuario.ToString()};
            }
            else
            {
                return new Respuesta<int>() { estado = false };
            }
        }
    }
}