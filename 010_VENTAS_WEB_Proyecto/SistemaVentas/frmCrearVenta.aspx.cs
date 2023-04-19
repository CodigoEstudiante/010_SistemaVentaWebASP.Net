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
    public partial class frmCrearVenta : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        

        [WebMethod]
        public static Respuesta<int> Guardar(string xml)
        {
            xml = xml.Replace("!idusuario¡", Configuracion.oUsuario.IdUsuario.ToString());
            int Respuesta = 0;
            Respuesta = CD_Venta.Instancia.RegistrarVenta(xml);
            if(Respuesta != 0)
                return new Respuesta<int>() { estado = true, valor = Respuesta.ToString() };
            else
                return new Respuesta<int>() { estado = false };
        }

        [WebMethod]
        public static Respuesta<List<ProductoTienda>> ObtenerProductoxTienda(int IdTienda)
        {
            List<ProductoTienda> oListaProductoTienda = CD_ProductoTienda.Instancia.ObtenerProductoTienda();
            oListaProductoTienda = oListaProductoTienda.Where(x => x.oTienda.IdTienda == IdTienda && x.Stock > 0).ToList();


            if (oListaProductoTienda != null)
            {
                return new Respuesta<List<ProductoTienda>>() { estado = true, objeto = oListaProductoTienda };
            }
            else
            {
                return new Respuesta<List<ProductoTienda>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<bool> ControlarStock(int idproducto,int idtienda,int cantidad,bool restar)
        {
            bool Respuesta = false;
            Respuesta = CD_ProductoTienda.Instancia.ControlarStock(idproducto,idtienda,cantidad,restar);
            return new Respuesta<bool>() { estado = Respuesta };
        }
    }
}