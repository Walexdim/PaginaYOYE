// ===============================
// CAMBIAR DE PESTAÑA
// ===============================

function abrirPagina(nombre) {

    // Ocultar todas las páginas
    const paginas = document.querySelectorAll(".pagina");

    paginas.forEach(pagina => {
        pagina.classList.remove("activa");
    });


    // Ocultar inicio
    const inicio = document.getElementById("inicio");

    if (nombre === "inicio") {

        inicio.style.display = "flex";

        document.getElementById("navbar").style.display = "none";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;
    }


    inicio.style.display = "none";

    document.getElementById("navbar").style.display = "flex";


    // Mostrar página seleccionada
    const pagina = document.getElementById(nombre);

    if (pagina) {

        pagina.classList.add("activa");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
}


// ===============================
// SORPRESA
// ===============================

function mostrarSorpresa() {

    const mensaje = document.getElementById("mensaje-secreto");

    mensaje.style.display = "block";

    crearCorazones(15);

}


// ===============================
// CORAZONES
// ===============================

function crearCorazon() {

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (Math.random() * 20 + 12) + "px";

    heart.style.animationDuration =
        (Math.random() * 5 + 5) + "s";

    document.body.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 10000);
}


// Crear corazones continuamente

setInterval(crearCorazon, 900);


// Crear varios corazones

function crearCorazones(cantidad) {

    for (let i = 0; i < cantidad; i++) {

        setTimeout(() => {

            crearCorazon();

        }, i * 100);

    }
}


// ===============================
// INICIO
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("navbar").style.display = "none";

});
