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
    { titulo: "IMU", artista: "Jorge Cuellar & Ysrael Barajas" },
    { titulo: "Ojitos Lindos", artista: "Bad Bunny" },
    { titulo: "No podran separarnos", artista: "Jimmy Zambrano y Jorge Celedón" },

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

    // Si ya está visible, evita acumular corazones extra con clics repetidos:
    // simplemente vuelve a llevar la vista al mensaje.
    if (mensaje.classList.contains("visible")) {
        mensaje.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

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
    heart.style.color = Math.random() > 0.5 ? "#f08aa9" : "#9d8cff";

    // Se calcula una sola vez para que la duración de la animación CSS
    // y el momento de eliminar el nodo del DOM queden siempre sincronizados.
    const duracionSegundos = Math.random() * 6 + 7; // entre 7s y 13s
    heart.style.animationDuration = duracionSegundos + "s";

    contenedorCorazones.appendChild(heart);

    // Margen de 500ms de seguridad para asegurar que la animación ya terminó.
    setTimeout(() => heart.remove(), duracionSegundos * 1000 + 500);
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
    "2026-04-10": {
        titulo: "Un recuerdo bonito",
        texto: "Otro pedacito de nosotros, guardado para siempre en este pequeño calendario."
    },

    "2026-06-29": {
        titulo: "Te extraño",
        texto: "Por amor a Dios que hago con mi vida, ocupas la mayor parte de mis pensamientos, solamente quiero tenerte aquí, lo que diera por un momento contigo, y en estos puntos de la noche uno ya no sabe cómo controlar sus emociones y no puedo aguantar las ganas de llorar, por lo menos se que también me piensas, o eso creo, no tengo como decirte lo que me pasa, no puedo ni llamarte "amor" y eso me duele, si eres todo para mí ... mi vida, mi pequeña princesa ... Solo espero que el tiempo pase rápido, Pero también que no me dejes de amar, soy egoísta al decirte que no quiero que te enamores de alguien más Pero solo te quiero para mí, entonces me preguntó si en realidad Te amo, porque se que también te sientes mal cuando lo piensas, o solo es una obsesión, y Ami me gusta decir que te amo, te llevo siempre en mi corazón a dónde vaya, no se a quien decirle todo esto por eso lo escribo, hemos pasado por muchas cosas y ... Se me quiebra la voz al pensar en el camino que hemos recorrido, tantos cariños, momentos, alegres otros tristes, nos hemos molestado, y ahora estar así, me ayudaste a ser un mejor novio, a pensar más en lo que mis acciones te hacen sentir y como tratarte para que te sientas bien, extraño saber de ti, extraño que me cuentes tus cosas, extraño que me hagas tus dramas, extraño que me celes y estés pendiente de mi siempre, intentando hacerme sentir bien cuando estoy triste, .... Ahora mismo, deberías estar aquí para que me calmes un poco, Pero la espera valdrá la pena, recuerda tu promesa de princesa, yo sigo firme con la meta de finalmente estar juntos y cumplir todo lo que un día planeamos con tanto amor y anhelo intentaré dormir, espero verte en mis sueños y abrazarte tan fuerte que tú lo sientas ... Te amo con toda mi alma"
    },

    "2026-08-29": {
        titulo: "No hay título",
        texto: "Hoy 29 de Agosto, desperté sin luz hasta las 11:10, ayer en la noche hablaba con un amigo, le contaba todo lo que está pasando, le conté que sentía que esto es una locura, pero a veces lo siento como algo normal, dije, si mi primo pasó 2 años en España y se casó para llevarse a su mujer, si mi amiga igual que se acaba de ir se va a casar a escondidas para casarse con su novio para que él pueda ir, yo irte a ver no me suena tan loco, en fin extraño mucho hablar contigo, quisiera hablar más seguido para ver si se me quita un poco la nostalgia y la tristeza, pero no te preocupes no estoy muuuy mal, mantengo el carácter para no pasarlo tan mal, han pasado muchas cosas, siempre te llevo conmigo a donde vaya, a veces me pregunto porque ir diciembre, para que esté lista tu keratina, jaja, podría ir antes pero bueno, tú dices Diciembre, sabes, a veces pienso en que cuando me veas digas, ta to feo, shu jaja, es que el otro día encontré un filtro que decía, como te ven los demás y yooo, estaba to chueco jajajaj y dije queeeeeeee, nose jaja, viste la gorra que estaba puesto, la dejaron en el local de mi mama y me quedo, es la primera gorra que me queda creo que debo comprarme así medias anchas porque toi cabezón, te cuento que también salí bailando en las fiestas de mi pueblito, con mis tíos y mi mama, los demás no les conocía jaja, y lo de prácticas, a veces me siento excluido, porque solo hablan entre ellos y cuando intento hacer conversa, digamos responden, pero ya, si, no, o responden poco, y nose me hace sentir como que nee, pero bueno he aprendido algunas cosas, esta página la iré actualizando diariamente, o talvez cada 2 días, porque usualmente no hago cosas importantes, solo trabajar y así, puedo hacer cuántas visitas tiene este lugar pero no puedo hacer que me diga si la viste tú, así que cuando la revises sube algo, yo que se algo como, nuevo contenido o algún estado con 4 puntitos, eso es todo por hoy, te amo mucho mi princesa y que tengas un lindo día, te mando un besote y, no me olvides, ayiosh"
    },

    "2026-09-03": {
        titulo: "Un día pensativo",
        texto: "Me siento de la basura, no sé qué me pasa, y pues tiene que ver bastante contigo, pienso muchas cosas, mares de dudas, cosas que me imagino y que talvez no haya nada que ver pero aun así me hace sentir mal, ayer lloré porque venía reteniéndolo mucho tiempo, y bueno, no sé qué estará pasando contigo, me da rabia no saber de ti, ni una pizca, me da rabia no saber porque cambiaste nuestra fecha, me da rabia no saber y pensar, y dije, tendrá otro, no lo sé, y me pongo a recordar tus palabras de que no amarías a nadie más que no sea yo y luego pienso que todos nos cansamos de lo mismo y talvez buscar otra alternativa suena a una salida a todo esto, y también pienso que podrías hacer tales cosas por mi bien entre comillas pero yo solo quiero seguir, y no rendirme, tengo muchos pensamientos y no sé a quién contárselos, estar en la casa me pone triste por eso busco salir ayudarle a mi madre en el trabajo o los días que salgo a las prácticas igual me hacen sentir con la mente ocupada, pero de igual manera estás ahí porque siempre ando pensando que harás, subo cualquier tontería con tal de que sepas de que pienso en ti, y vaya, hoy solamente fui con mi madre, retiré una tarjeta de crédito que solicité, y regresé a mi casa, comí y ya, quiero verte quiero estar ahí, y falta para poder ir, pero llegará ese día, solo quisiera hablar contigo un momento, en fin, no sé, a veces dudo, así como tú talvez pienses cosas como las que me dijiste el otro día de que yo esté con alguien más jaja y yo aquí pensando qué hacer para poder conseguir más dinero a ver si me puedo quedar un día más allá."
    },

    "2026-09-08": {
        titulo: "You",
        texto: "8 de septiembre y sigo aquí, otro día en el mismo cuarto, otra noche pensando en ti, otro día pensando en cuánto faltará para besarte, otra noche que espero poder abrazarte, intento a no acostumbrarme, porque deseo cada minuto volver a saber de ti, y poder acercarme más a ti, no he escrito y no se que pase con nosotros, mi cabeza le da mucha mente a cosas que talvez ... No lo sé, espero estar en tu mente tanto como tú lo estás en la mía, está semana ha sido algo triste, y monótona ... Mejor dicho, la que paso, me puse a tomar no porque me sintiera triste, sino porque justo estaba muy cansado y me dijo mi primo ven a tomar unas dos y para no estar en mi casa dije bueno, nos quedamos solo los dos los demás se fueron y terminé hablándole de ti, le decía quiero irme allá y el me decía vamos la siguiente semana y yo le dije tienes otras cosas que hacer y me dijo no importa nos vamos jaja borracho loco, quería saber de ti, que cuando ví a tu hermana en live me metí a escribir a ver si sabía algo nuevo de ti, y me dijo que le has hecho sospechar de que tienes alguien más Pero que no confirmabas nada, me sentí mas mal, le dije, dile que la amo, que es el amor de mi vida, que me casare contigo, y le decía le dedico esta canción a ella, la que dice QUIERO SABER DE TI QUIERO SABER QUE SIENTES GANAS DE CONTINUAR QUIERO SABER SI ESTANDO LEJOS PENSASTE EN MI ... Todo loco y borracho , como la canción que un día te dedique (ya borracho), en fin te extraño, y no puedo evitar llorar de la impotencia, pensé en varias alternativas, y mi primo me decía ... Me acabe de tatuar y se había hecho a la santa muerte y me dijo si tú le pides algo con toda la devoción ella te cumple, y me metí la idea de hacerlo, Pero dije ... Tendre que obligarla a amarme ? ... Te extraño demaciado, a veces quiero que me digas que aún sigues aquí, y que lo borres para ti, que me digas que no te responda el mensaje, Pero quiero saberlo, o a veces pienso que te rendiste que crees que no sera posible que me dejen verte, PERO NO ME HAS DEJADO INTENTARLO Diosito lindo ayúdame con lo que siento dentro de mi corazón, ayúdame, ayúdame a cumplir mis anhelos, todo lo que deseo es ella."
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
    const contenedorMes = document.createElement("div");
    contenedorMes.className = "calendario-mes";

    const titulo = document.createElement("div");
    titulo.className = "calendario-mes-titulo";
    titulo.textContent = MESES[mesIndex];
    contenedorMes.appendChild(titulo);

    const filaSemana = document.createElement("div");
    filaSemana.className = "calendario-dias-semana";
    const fragmentoSemana = document.createDocumentFragment();
    DIAS_SEMANA.forEach((d) => {
        const span = document.createElement("span");
        span.textContent = d;
        fragmentoSemana.appendChild(span);
    });
    filaSemana.appendChild(fragmentoSemana);
    contenedorMes.appendChild(filaSemana);

    const grid = document.createElement("div");
    grid.className = "calendario-grid";
    const fragmentoGrid = document.createDocumentFragment();

    // Date con año/mes/día numéricos usa la hora LOCAL, no UTC:
    // así evitamos que el primer/último día del mes se corra.
    const primerDiaSemana = (new Date(año, mesIndex, 1).getDay() + 6) % 7; // 0 = lunes
    const totalDias = new Date(año, mesIndex + 1, 0).getDate();

    for (let i = 0; i < primerDiaSemana; i++) {
        const vacio = document.createElement("div");
        vacio.className = "calendario-dia vacio";
        fragmentoGrid.appendChild(vacio);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
        fragmentoGrid.appendChild(crearCeldaDia(año, mesIndex, dia));
    }

    grid.appendChild(fragmentoGrid);
    contenedorMes.appendChild(grid);
    return contenedorMes;
}

function renderizarCalendarioDiario() {
    const contenedor = document.getElementById("calendario-diario");
    if (!contenedor) return;

    contenedor.innerHTML = "";
    // Se construye todo en un DocumentFragment y se inserta una sola vez,
    // en lugar de ir agregando nodos al DOM real uno por uno.
    const fragmentoAños = document.createDocumentFragment();

    obtenerAñosDelDiario().forEach((año) => {
        const bloqueAño = document.createElement("div");
        bloqueAño.className = "calendario-año";

        const tituloAño = document.createElement("div");
        tituloAño.className = "calendario-año-titulo";
        tituloAño.innerHTML = `<span aria-hidden="true">❤</span> ${año}`;
        bloqueAño.appendChild(tituloAño);

        const gridMeses = document.createElement("div");
        gridMeses.className = "calendario-meses-grid";
        const fragmentoMeses = document.createDocumentFragment();

        for (let m = 0; m < 12; m++) {
            fragmentoMeses.appendChild(crearMes(año, m));
        }

        gridMeses.appendChild(fragmentoMeses);
        bloqueAño.appendChild(gridMeses);
        fragmentoAños.appendChild(bloqueAño);
    });

    contenedor.appendChild(fragmentoAños);
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
