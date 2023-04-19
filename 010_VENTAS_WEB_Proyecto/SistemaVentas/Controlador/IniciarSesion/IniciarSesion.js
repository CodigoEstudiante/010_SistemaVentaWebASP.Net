
$('#btnIniciarSesion').click(function () {



    AjaxPost("../IniciarSesion.aspx/Iniciar", JSON.stringify({ Usuario: $("#username").val(), Clave: $("#password").val()}),
        function (response) {
            $.LoadingOverlay("hide");
            if (response.estado) {
                window.location.href = 'Inicio.aspx';
            } else {
                swal("oops!", "No se encontro el usuario", "warning")
            }
        },
        function () {
            $.LoadingOverlay("hide");
        },
        function () {
            $.LoadingOverlay("show");
        })
});
