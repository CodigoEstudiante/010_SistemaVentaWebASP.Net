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
    public partial class frmConsultarVenta : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<Venta> ObtenerDetalle(int IdVenta)
        {
            Venta oVenta = new Venta();
            oVenta = CD_Venta.Instancia.ObtenerDetalleVenta(IdVenta);
            if (oVenta != null)
                return new Respuesta<Venta>() { estado = true, objeto = oVenta };
            else
                return new Respuesta<Venta>() { estado = false, objeto = null };
        }

        [WebMethod]
        public static Respuesta<List<Venta>> ObtenerLista(string codigo,string fechainicio, string fechafin, string numerodocumento, string nombres)
        {
            List<Venta> oListaVenta = new List<Venta>();
            oListaVenta = CD_Venta.Instancia.ObtenerListaVenta(codigo,Convert.ToDateTime(fechainicio),Convert.ToDateTime(fechafin),numerodocumento,nombres);
            if (oListaVenta != null)
                return new Respuesta<List<Venta>>() { estado = true, objeto = oListaVenta };
            else
                return new Respuesta<List<Venta>>() { estado = false, objeto = null };
        }
    }
}