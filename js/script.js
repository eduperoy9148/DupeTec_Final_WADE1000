
/* ====================================
   DUPETEC - JAVASCRIPT
   Tarea Final WADE 1000
   ==================================== */

// Esperar a que cargue la página
document.addEventListener("DOMContentLoaded", function () {

    // Buscar el carrusel
    const carrusel = document.getElementById("carruselDupeTec");

    // Comprobar que existe y que Bootstrap está disponible
    if (carrusel && typeof bootstrap !== "undefined") {

        // Activar el carrusel automático
        const carruselActivo = bootstrap.Carousel.getOrCreateInstance(
            carrusel,
            {
                interval: 4000,
                pause: "hover",
                wrap: true,
                ride: "carousel"
            }
        );

        // Iniciar el movimiento automático
        carruselActivo.cycle();

    }

});


/* ====================================
   DUPETEC - INTERACCIÓN CON EL MOUSE
   ==================================== */

// Buscar todas las tarjetas de servicios
const tarjetasServicios = document.querySelectorAll(".card");

// Recorrer cada tarjeta
tarjetasServicios.forEach(function (tarjeta) {

    // Cuando el mouse entra en la tarjeta
    tarjeta.addEventListener("mouseover", function () {
        tarjeta.style.border = "2px solid #1256a0";
        tarjeta.style.backgroundColor = "#eaf4ff";
    });

    // Cuando el mouse sale de la tarjeta
    tarjeta.addEventListener("mouseout", function () {
        tarjeta.style.border = "2px solid transparent";
        tarjeta.style.backgroundColor = "";
    });

});


/* ====================================
   DUPETEC - INFORMACIÓN DE SERVICIOS
   ==================================== */

document.querySelectorAll("#servicios .card").forEach(function (tarjeta) {

    // Crear un botón para mostrar más información
    const boton = document.createElement("button");
    boton.textContent = "Más información";
    boton.className = "btn btn-outline-primary mt-3";
    boton.type = "button";

    // Crear el espacio donde aparecerá la descripción
    const informacion = document.createElement("p");
    informacion.className = "mt-3";
    informacion.style.display = "none";

    // Identificar el servicio por su título
    const titulo = tarjeta.querySelector(".card-title");
    const nombreServicio = titulo ? titulo.textContent.trim().toLowerCase() : "";

    if (nombreServicio.includes("restaurante")) {
        informacion.textContent =
            "Diseñamos páginas para restaurantes con menús digitales, horarios, fotografías y datos de contacto.";
    } else if (nombreServicio.includes("informativa")) {
        informacion.textContent =
            "Creamos páginas para profesionales y negocios que desean presentar sus servicios e información.";
    } else if (nombreServicio.includes("tienda")) {
        informacion.textContent =
            "Desarrollamos tiendas online con catálogos de productos y opciones para facilitar las compras.";
    } else {
        informacion.textContent =
            "Conoce más sobre nuestros servicios de diseño web.";
    }

    // Mostrar u ocultar la información al hacer clic
    boton.addEventListener("click", function () {
        const estaOculta = informacion.style.display === "none";

        informacion.style.display = estaOculta ? "block" : "none";
        boton.textContent = estaOculta ? "Mostrar menos" : "Más información";
    });

    // Agregar el botón y la información a la tarjeta
    const cuerpoTarjeta = tarjeta.querySelector(".card-body") || tarjeta;
    cuerpoTarjeta.appendChild(boton);
    cuerpoTarjeta.appendChild(informacion);

});


/* ====================================
   DUPETEC - VALIDACIÓN DEL FORMULARIO
   ==================================== */

const formulario = document.getElementById("formularioContacto");

if (formulario) {

    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const servicio = document.getElementById("servicio");
    const mensaje = document.getElementById("mensaje");
    const resultado = document.getElementById("resultadoFormulario");

    function validarCampo(campo) {
        let error = "";
        let mensajeError = "";

        if (campo.id === "nombre") {
            error = "errorNombre";

 
const nombreCompleto = campo.value.trim();
const partesNombre = nombreCompleto.split(/\s+/).filter(Boolean);

// Verificar que escriba nombre y al menos un apellido
if (
    partesNombre.length < 2 ||
    partesNombre.some(function(parte) {
        return parte.length < 2 || !/^[\p{L}'-]+$/u.test(parte);
    })
) {
    mensajeError = "Escribe tu nombre y al menos un apellido. Ejemplo: Juan Pérez.";
}

        }

        if (campo.id === "correo") {
            error = "errorCorreo";

            const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!formatoCorreo.test(campo.value.trim())) {
                mensajeError = "Escribe un correo electrónico válido.";
            }
        }

        if (campo.id === "servicio") {
            error = "errorServicio";

            if (campo.value === "") {
                mensajeError = "Selecciona un tipo de página web.";
            }
        }

        if (campo.id === "mensaje") {
            error = "errorMensaje";

            if (campo.value.trim().length < 10) {
                mensajeError = "Describe tu proyecto con al menos 10 caracteres.";
            }
        }

        document.getElementById(error).textContent = mensajeError;

        campo.classList.toggle("is-invalid", mensajeError !== "");
        campo.classList.toggle("is-valid", mensajeError === "");

        return mensajeError === "";
    }

    // Validar mientras el usuario escribe
    [nombre, correo, mensaje].forEach(function (campo) {
        campo.addEventListener("input", function () {
            validarCampo(campo);
        });
    });

    // Validar cuando selecciona un servicio
    servicio.addEventListener("change", function () {
        validarCampo(servicio);
    });

    // Verificar todos los campos al enviar
    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const resultados = [nombre, correo, servicio, mensaje]
            .map(function (campo) {
                return validarCampo(campo);
            });

        if (resultados.every(Boolean)) {
            resultado.textContent =
                "Formulario validado correctamente. Esta es una demostración; no se ha enviado ninguna solicitud.";
            resultado.className = "mt-3 text-success";
        } else {
            resultado.textContent =
                "Revisa los campos marcados antes de continuar.";
            resultado.className = "mt-3 text-danger";
        }
    });
}


/* ====================================
   DUPETEC - FORMULARIO DE RESERVACIONES
   ==================================== */

const formularioReserva = document.getElementById("formularioReservacion");

if (formularioReserva) {

    formularioReserva.addEventListener("submit", function (evento) {

        // Evitar que la página se recargue
        evento.preventDefault();

        // Obtener los datos
        const nombre = document.getElementById("nombreReserva").value.trim();
        const telefono = document.getElementById("telefonoReserva").value.trim();
        const fecha = document.getElementById("fechaReserva").value;
        const hora = document.getElementById("horaReserva").value;
        const personas = document.getElementById("personasReserva").value;

        const resultado = document.getElementById("resultadoReserva");


        // Verificar nombre y al menos un apellido
        const partesNombre = nombre.split(/\s+/).filter(Boolean);

        if (
            partesNombre.length < 2 ||
            partesNombre.some(function (parte) {
                return parte.length < 2 || !/^[\p{L}'-]+$/u.test(parte);
            })
        ) {
            resultado.textContent =
                "Debes escribir tu nombre y al menos un apellido. Ejemplo: Juan Pérez.";

            resultado.className = "mt-3 text-center text-danger";
            return;
        }


// Validar número de teléfono
const telefonoLimpio = telefono.replace(/\D/g, "");

if (telefonoLimpio.length !== 10) {
    resultado.textContent =
        "Escribe un número de teléfono válido de 10 dígitos. Ejemplo: 787-555-1234.";

    resultado.className = "mt-3 text-center text-danger";
    return;
}

        // Verificar que los campos estén completos
       
if (nombre === "" || telefono === "" || fecha === "" ||
    hora === "" || personas === "") {


            resultado.textContent = "Por favor, completa todos los campos.";
            resultado.className = "mt-3 text-center text-danger";
            return;
        }

        // Mostrar confirmación de demostración
        resultado.textContent =
            "Solicitud de ejemplo validada para " + nombre +
            ", el día " + fecha +
            " a las " + hora +
           ", para " + personas +
" persona(s). Teléfono de contacto: " + telefono +
". Esta es una demostración; no se ha enviado ninguna reservación ni notificación real.";

        resultado.className = "mt-3 text-center text-success";

    });

}


