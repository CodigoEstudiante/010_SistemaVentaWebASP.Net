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
    public partial class frmConsultarCompra : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        
        [WebMethod]
        public static Respuesta<List<Compra>> Obtener(string fechainicio,string fechafin,int idproveedor,int idtienda)
        {
            List<Compra> oListaCompra = new List<Compra>();
            oListaCompra = CD_Compra.Instancia.ObtenerListaCompra(Convert.ToDateTime(fechainicio),Convert.ToDateTime(fechafin),idproveedor,idtienda);
            if(oListaCompra != null)
                return new Respuesta<List<Compra>>() { estado = true, objeto = oListaCompra };
            else
                return new Respuesta<List<Compra>>() { estado = false, objeto = null };
        }

        [WebMethod]
        public static Respuesta<Compra> ObtenerDetalle(int IdCompra)
        {
            Compra oCompra = new Compra();
            oCompra = CD_Compra.Instancia.ObtenerDetalleCompra(IdCompra);
            if (oCompra != null)
                return new Respuesta<Compra>() { estado = true, objeto = oCompra };
            else
                return new Respuesta<Compra>() { estado = false, objeto = null };
        }
    }
}