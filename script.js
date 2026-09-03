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
   DATOS: DIARIO / CALENDARIO DE RECUERDOS
   Para añadir un recuerdo nuevo, solo agrega otro bloque aquí.
   Formato de fecha: "YYYY-MM-DD"
=============================== */
const diario = {
    "2026-02-14": {
        titulo: "Nuestro San Valentín",
        texto: "Aunque no pudimos estar juntos este día, lo llevé contigo en el corazón. Reemplaza este texto por lo que de verdad pasó ese día ❤️"
    },
    "2026-03-21": {
        titulo: "Un día especial",
        texto: "Aquí puedes escribir lo que pasó ese día: una charla, una risa, algo que te hizo pensar en ella."
    },
    "2026-04-10": {
        titulo: "Un recuerdo bonito",
        texto: "Otro pedacito de nosotros, guardado para siempre en este pequeño calendario."
    }
};

const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function obtenerAñosDelDiario() {
    const años = new Set();
    Object.keys(diario).forEach((fecha) => años.add(Number(fecha.slice(0, 4))));
    return Array.from(años).sort((a, b) => a - b);
}

function crearCeldaDia(año, mesIndex, dia) {
    const celda = document.createElement("button");
    celda.type = "button";
    celda.className = "calendario-dia";
    celda.textContent = dia;

    // Se arma la clave como texto puro (sin pasar por Date) para evitar
    // que un desfase de zona horaria UTC cambie el día.
    const clave = `${año}-${String(mesIndex + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    const recuerdo = diario[clave];

    if (recuerdo) {
        celda.classList.add("con-recuerdo");
        celda.dataset.fecha = clave;
        celda.title = recuerdo.titulo;
    } else {
        celda.classList.add("sin-recuerdo");
        celda.tabIndex = -1;
        celda.setAttribute("aria-disabled", "true");
        celda.title = "Aún no hay recuerdos de este día ❤️";
    }

    return celda;
}

function crearMes(año, mesIndex) {
    const mes = document.createElement("div");
    mes.className = "calendario-mes";

    const titulo = document.createElement("div");
    titulo.className = "calendario-mes-titulo";
    titulo.textContent = MESES[mesIndex];
    mes.appendChild(titulo);

    const filaSemana = document.createElement("div");
    filaSemana.className = "calendario-dias-semana";
    DIAS_SEMANA.forEach((d) => {
        const span = document.createElement("span");
        span.textContent = d;
        filaSemana.appendChild(span);
    });
    mes.appendChild(filaSemana);

    const grid = document.createElement("div");
    grid.className = "calendario-grid";

    // Date con año/mes/día numéricos usa la hora LOCAL, no UTC:
    // así evitamos que el primer/último día del mes se corra.
    const primerDiaSemana = (new Date(año, mesIndex, 1).getDay() + 6) % 7; // 0 = lunes
    const totalDias = new Date(año, mesIndex + 1, 0).getDate();

    for (let i = 0; i < primerDiaSemana; i++) {
        const vacio = document.createElement("div");
        vacio.className = "calendario-dia vacio";
        grid.appendChild(vacio);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
        grid.appendChild(crearCeldaDia(año, mesIndex, dia));
    }

    mes.appendChild(grid);
    return mes;
}

function renderizarCalendarioDiario() {
    const contenedor = document.getElementById("calendario-diario");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    obtenerAñosDelDiario().forEach((año) => {
        const bloqueAño = document.createElement("div");
        bloqueAño.className = "calendario-año";

        const tituloAño = document.createElement("div");
        tituloAño.className = "calendario-año-titulo";
        tituloAño.innerHTML = `<span aria-hidden="true">❤</span> ${año}`;
        bloqueAño.appendChild(tituloAño);

        const gridMeses = document.createElement("div");
        gridMeses.className = "calendario-meses-grid";

        for (let m = 0; m < 12; m++) {
            gridMeses.appendChild(crearMes(año, m));
        }

        bloqueAño.appendChild(gridMeses);
        contenedor.appendChild(bloqueAño);
    });
}

/* ===============================
   MODAL DE RECUERDOS
=============================== */
const modalRecuerdo = document.getElementById("modal-recuerdo");

function abrirModalRecuerdo(clave) {
    const recuerdo = diario[clave];
    if (!recuerdo || !modalRecuerdo) return;

    const [año, mes, dia] = clave.split("-").map(Number);
    const fechaTexto = new Date(año, mes - 1, dia).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    document.getElementById("modal-recuerdo-fecha-texto").textContent = fechaTexto;
    document.getElementById("modal-recuerdo-titulo-texto").textContent = recuerdo.titulo;
    document.getElementById("modal-recuerdo-texto").textContent = recuerdo.texto;

    modalRecuerdo.classList.add("activo");
    modalRecuerdo.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-abierto");
}

function cerrarModalRecuerdo() {
    if (!modalRecuerdo) return;
    modalRecuerdo.classList.remove("activo");
    modalRecuerdo.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-abierto");
}

document.getElementById("calendario-diario")?.addEventListener("click", (evento) => {
    const celda = evento.target.closest(".calendario-dia.con-recuerdo");
    if (celda?.dataset.fecha) abrirModalRecuerdo(celda.dataset.fecha);
});

modalRecuerdo?.addEventListener("click", (evento) => {
    if (evento.target.closest("[data-cerrar-modal]")) cerrarModalRecuerdo();
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modalRecuerdo?.classList.contains("activo")) {
        cerrarModalRecuerdo();
    }
});

/* ===============================
   INICIO
=============================== */
document.addEventListener("DOMContentLoaded", () => {
    renderizarCanciones();
    renderizarCalendarioDiario();

    const navbar = document.getElementById("navbar");
    navbar.style.display = "none";

    const nombreInicial = location.hash.replace("#", "");
    if (nombreInicial && document.getElementById(nombreInicial)) {
        abrirPagina(nombreInicial, { actualizarHash: false });
    }

    setTimeout(() => crearCorazones(4), 1000);
    iniciarCorazonesAutomaticos();
});
