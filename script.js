/* ===============================
   DATOS: CANCIONES
   Para añadir o quitar una canción, solo edita esta lista.
=============================== */
const canciones = [
    { titulo: "Amor", artista: "Emmanuel Cortes" },
    { titulo: "Rude", artista: "MAGIC!" },
    { titulo: "Cosas que no te dije", artista: "Saico" },
    { titulo: "MAI", artista: "Milo J" },
    { titulo: "Lo que siento", artista: "Cuco" },
    { titulo: "Amor de Lejos", artista: "Wicho Kun" },
    { titulo: "Nuestro Juramento", artista: "Julio Jaramillo" },
    { titulo: "Suiza", artista: "Calle 24" },
    { titulo: "Visita", artista: "Enjambre" },
    { titulo: "Soñé", artista: "Zoé" },
    { titulo: "Magia", artista: "Ed Maverick" },
    { titulo: "Hundred Miles", artista: "Yall & Gabriela Richardson" },
    { titulo: "Promise", artista: "Romeo Santos & Rusher" },
];

/* ===============================
   RENDERIZAR CANCIONES
=============================== */
function renderizarCanciones() {
    const contenedor = document.querySelector(".lista-canciones");
    if (!contenedor) return;

    contenedor.innerHTML = canciones
        .map((cancion, i) => {
            const numero = String(i + 1).padStart(2, "0");
            const busqueda = encodeURIComponent(`${cancion.titulo} ${cancion.artista}`);

            return `
                <div class="cancion">
                    <div class="numero-cancion">${numero}</div>
                    <div class="icono-musica" aria-hidden="true">♫</div>
                    <div class="info-cancion">
                        <h3>${cancion.titulo}</h3>
                        <p>${cancion.artista}</p>
                        <div class="botones-musica">
                            <a href="https://open.spotify.com/search/${busqueda}" target="_blank" rel="noopener noreferrer" class="spotify">Spotify</a>
                            <a href="https://www.youtube.com/results?search_query=${busqueda}" target="_blank" rel="noopener noreferrer" class="youtube">YouTube</a>
                        </div>
                    </div>
                </div>
            `;
        })
        .join("");
}

/* ===============================
   NAVEGACIÓN ENTRE PÁGINAS
=============================== */
const PAGINA_INICIAL = "inicio";

function abrirPagina(nombre, { actualizarHash = true } = {}) {
    const paginas = document.querySelectorAll(".pagina");
    const inicio = document.getElementById("inicio");
    const navbar = document.getElementById("navbar");

    paginas.forEach((pagina) => pagina.classList.remove("activa"));

    if (nombre === PAGINA_INICIAL || !document.getElementById(nombre)) {
        inicio.style.display = "flex";
        navbar.style.display = "none";
        window.scrollTo({ top: 0, behavior: "smooth" });

        if (actualizarHash) history.replaceState(null, "", location.pathname);
        marcarBotonActivo(PAGINA_INICIAL);
        return;
    }

    inicio.style.display = "none";
    navbar.style.display = "flex";

    document.getElementById(nombre).classList.add("activa");
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (actualizarHash) history.replaceState(null, "", `#${nombre}`);
    marcarBotonActivo(nombre);
}

function marcarBotonActivo(nombre) {
    document.querySelectorAll("#navbar button").forEach((boton) => {
        const esActivo = boton.dataset.page === nombre;
        boton.classList.toggle("activo", esActivo);
        if (esActivo) {
            boton.setAttribute("aria-current", "page");
        } else {
            boton.removeAttribute("aria-current");
        }
    });
}

/* Delegación de eventos: un solo listener para todos los botones con data-page */
document.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-page]");
    if (boton) abrirPagina(boton.dataset.page);
});

/* Soporta el botón "atrás" del navegador / gesto en móvil */
window.addEventListener("hashchange", () => {
    const nombre = location.hash.replace("#", "") || PAGINA_INICIAL;
    abrirPagina(nombre, { actualizarHash: false });
});

/* ===============================
   SORPRESA
=============================== */
function mostrarSorpresa() {
    const mensaje = document.getElementById("mensaje-secreto");
    if (!mensaje) return;

    mensaje.classList.add("visible");
    crearCorazones(20);

    setTimeout(() => {
        mensaje.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
}

document.getElementById("boton-sorpresa")?.addEventListener("click", mostrarSorpresa);

/* ===============================
   CORAZONES FLOTANTES
=============================== */
const contenedorCorazones = document.querySelector(".hearts");
const simbolosCorazon = ["♡", "♥", "❤"];

function crearCorazon() {
    if (!contenedorCorazones) return;

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = simbolosCorazon[Math.floor(Math.random() * simbolosCorazon.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 15 + 10 + "px";
    heart.style.animationDuration = Math.random() * 6 + 7 + "s";
    heart.style.color = Math.random() > 0.5 ? "#f08aa9" : "#9d8cff";

    contenedorCorazones.appendChild(heart);

    setTimeout(() => heart.remove(), 14000);
}

function crearCorazones(cantidad) {
    for (let i = 0; i < cantidad; i++) {
        setTimeout(crearCorazon, i * 120);
    }
}

/* Corazones automáticos: se pausan si la pestaña no está visible, para ahorrar batería */
let intervaloCorazones = null;

function iniciarCorazonesAutomaticos() {
    if (intervaloCorazones) return;
    intervaloCorazones = setInterval(crearCorazon, 1800);
}

function detenerCorazonesAutomaticos() {
    clearInterval(intervaloCorazones);
    intervaloCorazones = null;
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        detenerCorazonesAutomaticos();
    } else {
        iniciarCorazonesAutomaticos();
    }
});

/* ===============================
   INICIO
=============================== */
document.addEventListener("DOMContentLoaded", () => {
    renderizarCanciones();

    const navbar = document.getElementById("navbar");
    navbar.style.display = "none";

    const nombreInicial = location.hash.replace("#", "");
    if (nombreInicial && document.getElementById(nombreInicial)) {
        abrirPagina(nombreInicial, { actualizarHash: false });
    }

    setTimeout(() => crearCorazones(4), 1000);
    iniciarCorazonesAutomaticos();
});
