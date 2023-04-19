using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class CD_Reportes
    {
        public static CD_Reportes _instancia = null;

        private CD_Reportes()
        {

        }

        public static CD_Reportes Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new CD_Reportes();
                }
                return _instancia;
            }
        }

        public DataTable ReporteProductoTienda(int IdTienda, string CodigoProducto)
        {
            DataTable dt = new DataTable();

            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                SqlCommand cmd = new SqlCommand("usp_rptProductoTienda", oConexion);
                cmd.Parameters.AddWithValue("@IdTienda", IdTienda);
                cmd.Parameters.AddWithValue("@Codigo", CodigoProducto);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);
                    return dt;

                }
                catch (Exception ex)
                {
                    dt = null;
                    return dt;
                }
            }
        }

        public DataTable ReporteVenta(DateTime FechaInicio, DateTime FechaFin, int IdTienda)
        {
            DataTable dt = new DataTable();

            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                SqlCommand cmd = new SqlCommand("usp_rptVenta", oConexion);
                cmd.Parameters.AddWithValue("@FechaInicio", FechaInicio);
                cmd.Parameters.AddWithValue("@FechaFin", FechaFin);
                cmd.Parameters.AddWithValue("@IdTienda", IdTienda);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);
                    return dt;

                }
                catch (Exception ex)
                {
                    dt = null;
                    return dt;
                }
            }

        }
    }
}
