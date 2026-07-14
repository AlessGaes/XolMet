document.addEventListener("DOMContentLoaded", () => {

    /* ==============================
       ANIMACIÓN INICIAL DE LA PORTADA
    ============================== */

    const heroContenido = document.querySelector(".hero-contenido");
    const heroImagen = document.querySelector(".hero-imagen");

    if (heroContenido) {
        heroContenido.classList.add("hero-visible");
    }

    if (heroImagen) {
        setTimeout(() => {
            heroImagen.classList.add("hero-visible");
        }, 250);
    }


    /* ==============================
       ELEMENTOS QUE APARECEN AL BAJAR
    ============================== */

    const elementosAnimados = document.querySelectorAll(
        ".acerca-xolmet, " +
        ".categoria-item, " +
        ".productos, " +
        ".producto-item, " +
        ".contacto"
    );

    elementosAnimados.forEach((elemento) => {
        elemento.classList.add("revelar");
    });

    if ("IntersectionObserver" in window) {

        const observador = new IntersectionObserver(
            (entradas) => {

                entradas.forEach((entrada) => {

                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("visible");
                        observador.unobserve(entrada.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        elementosAnimados.forEach((elemento) => {
            observador.observe(elemento);
        });

    } else {

        elementosAnimados.forEach((elemento) => {
            elemento.classList.add("visible");
        });

    }


    /* ==============================
       SOMBRA DEL MENÚ AL HACER SCROLL
    ============================== */

    const header = document.querySelector("header");

    if (header) {

        function actualizarEncabezado() {

            if (window.scrollY > 40) {
                header.classList.add("header-scroll");
            } else {
                header.classList.remove("header-scroll");
            }

        }

        actualizarEncabezado();

        window.addEventListener("scroll", actualizarEncabezado);

    }


    /* ==============================
       EVITAR QUE LOS ENLACES VACÍOS
       MANDEN LA PÁGINA HACIA ARRIBA
    ============================== */

    const enlacesVacios = document.querySelectorAll('a[href="#"]');

    enlacesVacios.forEach((enlace) => {

        enlace.addEventListener("click", (evento) => {
            evento.preventDefault();
        });

    });


    /* ==============================
       FORMULARIO DE CONTACTO
    ============================== */

    const formulario = document.querySelector(".formulario-contacto");

    if (formulario) {

        formulario.addEventListener("submit", (evento) => {

            evento.preventDefault();

            const botonEnviar = formulario.querySelector(
                'button[type="submit"]'
            );

            if (!botonEnviar) {
                return;
            }

            botonEnviar.textContent = "Mensaje enviado";
            botonEnviar.classList.add("enviado");
            botonEnviar.disabled = true;

            setTimeout(() => {

                formulario.reset();

                botonEnviar.textContent = "Enviar";
                botonEnviar.classList.remove("enviado");
                botonEnviar.disabled = false;

            }, 2500);

        });

    }


    /* ==============================
       MODAL DINÁMICO
    ============================== */

    const botonesModal = document.querySelectorAll(".abrir-modal");

    const modal = document.getElementById("modal");
    const cerrarModal = document.querySelector(".cerrar-modal");

    const tituloModal = document.getElementById("titulo-modal");
    const imagenModal = document.getElementById("imagen-modal");
    const descripcionModal = document.getElementById("descripcion-modal");


    function abrirVentanaModal(boton) {

        tituloModal.textContent = boton.dataset.titulo;
        imagenModal.src = boton.dataset.imagen;
        imagenModal.alt = boton.dataset.titulo;
        descripcionModal.textContent = boton.dataset.descripcion;

        modal.classList.add("activo");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

    }


    function cerrarVentanaModal() {

        modal.classList.remove("activo");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }


    if (
        botonesModal.length > 0 &&
        modal &&
        cerrarModal &&
        tituloModal &&
        imagenModal &&
        descripcionModal
    ) {

        botonesModal.forEach((boton) => {

            boton.addEventListener("click", () => {
                abrirVentanaModal(boton);
            });

        });


        cerrarModal.addEventListener("click", cerrarVentanaModal);


        modal.addEventListener("click", (evento) => {

            if (evento.target === modal) {
                cerrarVentanaModal();
            }

        });


        document.addEventListener("keydown", (evento) => {

            if (
                evento.key === "Escape" &&
                modal.classList.contains("activo")
            ) {
                cerrarVentanaModal();
            }

        });

    }

});