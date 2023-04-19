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
    public partial class frmRegistrarCompra : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<bool> Guardar(string xml)
        {
            xml = xml.Replace("!idusuario¡", Configuracion.oUsuario.IdUsuario.ToString());
            bool Respuesta = false;
            Respuesta = CD_Compra.Instancia.RegistrarCompra(xml);
            return new Respuesta<bool>() { estado = Respuesta };
        }
    }
}