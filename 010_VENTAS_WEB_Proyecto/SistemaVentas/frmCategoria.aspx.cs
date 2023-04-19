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
    public partial class frmCategoria : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public static Respuesta<List<Categoria>> Obtener()
        {
            List<Categoria> oListaCategoria = new List<Categoria>();
            oListaCategoria = CD_Categoria.Instancia.ObtenerCategoria();

            if (oListaCategoria != null)
            {
                return new Respuesta<List<Categoria>>() { estado = true, objeto = oListaCategoria };
            }
            else
            {
                return new Respuesta<List<Categoria>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(Categoria oCategoria)
        {
            bool Respuesta = false;
            Respuesta = CD_Categoria.Instancia.RegistrarCategoria(oCategoria);
            return new Respuesta<bool>() { estado = Respuesta };

        }

        [WebMethod]
        public static Respuesta<bool> Editar(Categoria oCategoria)
        {
            bool Respuesta = false;
            Respuesta = CD_Categoria.Instancia.ModificarCategoria(oCategoria);
            return new Respuesta<bool>() { estado = Respuesta };

        }

        [WebMethod]
        public static Respuesta<bool> Eliminar(int IdCategoria)
        {
            bool Respuesta = false;
            Respuesta = CD_Categoria.Instancia.EliminarCategoria(IdCategoria);
            return new Respuesta<bool>() { estado = Respuesta };
        }
    }
}