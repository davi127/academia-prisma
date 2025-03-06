// Función para validar letras
function validarLetras(event){
    const t = event.target.value;
    if(!/^[a-zA-Z ]*$/.test(t)){
    Swal.fire('¡Error!', 'Solo se aceptan letras.', 'error');
    event.target.value = event.target.value.replace(t,'');
    }
   }
   // Función para validar números
   function validarNumero(event){
        const t = event.target.value;
        if(!/^[0-9]*$/.test(t)){
            Swal.fire('¡Error!', 'Solo se aceptan números.', 'error');
            event.target.value = event.target.value.replace(t,'');
        }
   }
   // Función para validar correos
   function validarCorreo(event){
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if(!re.test(event.target.value)){
            Swal.fire('¡Error!', 'Correo no válido', 'error');
            event.target.value = event.target.value.replace(t,'');
        }
   }
   // Función para validar todos los campos antes de enviar el formulario
   function validarTodo(event) {
    event.preventDefault();
    const inputs = document.querySelectorAll('input[type="text"]');
    const selects = document.querySelectorAll('select');
    for (let input of inputs) {
        if (input.value.trim() === '') {
            Swal.fire('¡Error!', 'Por favor, completa todos los campos.', 'error');
            return;
        }
    }
    for (let select of selects) {
        if (select.value === 'hidden') {
        Swal.fire('¡Error!', 'Por favor, selecciona una opción en todos los campos desplegables.', 'error');
        return;
        }
    }
    // Si llega aquí es porque todos los campos están completos
    // Tu código AJAX aquí...
   }
   window.addEventListener('DOMContentLoaded', function(){
    // Asigna los eventos a los elementos
    document.getElementById('nombreestu').addEventListener('input',validarLetras);
    document.getElementById('apellidoestu').addEventListener('input',validarLetras);
    document.getElementById('dniestu').addEventListener('input',validarNumero);
    document.getElementById('edadestu').addEventListener('input',validarNumero);
    document.getElementById('numeroestu').addEventListener('input',validarNumero);
    document.getElementById('correoestu').addEventListener('blur',validarCorreo);
    document.getElementById('nombreap').addEventListener('input',validarLetras);
    document.getElementById('apeapo').addEventListener('input', validarLetras);
    document.getElementById('dniapo').addEventListener('input',validarNumero);
    document.getElementById('telefonoapo').addEventListener('input',validarNumero);
    document.getElementById('correoapo').addEventListener('blur',validarCorreo);
    document.querySelector('form').addEventListener('submit', validarTodo);
   });

   
   $(document).ready(function () {
        $("#RegisterButton").on("click", function(event){
        event.preventDefault();

        var formData = $("#formulario").serialize();

            $.ajax({
                type: "POST",
                url: 'api/Alumno/registrarAlumno.php',
                data: formData,
                dataType: "json",
                success: function (response) {
                    let estado = response.estado;
                    let mensaje = response.mensaje;
                    if (estado === 1) {
                        Swal.fire('¡Success!', mensaje,'success');
                        $('#formulario')[0].reset();
                    } else {
                        Swal.fire('¡Error!', mensaje, 'error');
                    }
                },error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error en la solicitud AJAX: " + textStatus);
                    console.log("Detalles del error: " + errorThrown);
                    Swal.fire('¡Error!', 'No se pudo registrar el usuario', 'error');
                }
            });
        });
   });
   