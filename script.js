
/* ==========================================
   BLACK HOLE SYSTEM
   SISTEMA PRINCIPAL
========================================== */


/* =============================
   ELEMENTOS PRINCIPALES
============================= */

const boton = document.getElementById("comenzar");

const inicio = document.getElementById("inicio");
const registro = document.getElementById("registro");
const dashboard = document.getElementById("dashboard");

const formulario = document.getElementById("formulario");
const volverInicio = document.getElementById("volverInicio");

const botonMision = document.getElementById("completarMision");
const mensajeMision = document.getElementById("mensajeMision");
const contenidoMision = document.getElementById("contenidoMision");

const irRangos = document.getElementById("irRangos");
const archivoRangos = document.getElementById("archivoRangos");
const listaRangos = document.getElementById("listaRangos");


/* =============================
   SISTEMA DE RANGOS
============================= */

const rangos = [
    { nombre: "BRONCE I", xp: 0 },
    { nombre: "BRONCE II", xp: 100 },
    { nombre: "BRONCE III", xp: 250 },
    { nombre: "PLATA I", xp: 450 },
    { nombre: "PLATA II", xp: 700 },
    { nombre: "PLATA III", xp: 1000 },
    { nombre: "ORO I", xp: 1400 },
    { nombre: "ORO II", xp: 1850 },
    { nombre: "ORO III", xp: 2400 },
    { nombre: "ORO IV", xp: 3050 },
    { nombre: "PLATINO I", xp: 3850 },
    { nombre: "PLATINO II", xp: 4800 },
    { nombre: "PLATINO III", xp: 5900 },
    { nombre: "PLATINO IV", xp: 7200 },
    { nombre: "ESMERALDA I", xp: 8700 },
    { nombre: "ESMERALDA II", xp: 10500 },
    { nombre: "ESMERALDA III", xp: 12600 },
    { nombre: "ESMERALDA IV", xp: 15000 },
    { nombre: "LEYENDA I", xp: 17800 },
    { nombre: "LEYENDA II", xp: 21000 },
    { nombre: "LEYENDA III", xp: 24800 },
    { nombre: "LEYENDA IV", xp: 29000 },
    { nombre: "BLACK HOLE RANK", xp: 32000 }
];


/* =============================
   IMÁGENES DE LOS RANGOS
============================= */

const imagenesRango = {
    "BRONCE I": "01_Bronce_I.png",
    "BRONCE II": "02_Bronce_II.png",
    "BRONCE III": "03_Bronce_III.png",
    "PLATA I": "04_Plata_I.png",
    "PLATA II": "05_Plata_II.png",
    "PLATA III": "06_Plata_III.png",
    "ORO I": "07_Oro_I.png",
    "ORO II": "08_Oro_II.png",
    "ORO III": "09_Oro_III.png",
    "ORO IV": "10_Oro_IV.png",
    "PLATINO I": "11_Platino_I.png",
    "PLATINO II": "12_Platino_II.png",
    "PLATINO III": "13_Platino_III.png",
    "PLATINO IV": "14_Platino_IV.png",
    "ESMERALDA I": "15_Esmeralda_I.png",
    "ESMERALDA II": "16_Esmeralda_II.png",
    "ESMERALDA III": "17_Esmeralda_III.png",
    "ESMERALDA IV": "18_Esmeralda_IV.png",
    "LEYENDA I": "19_Leyenda_I.png",
    "LEYENDA II": "20_Leyenda_II.png",
    "LEYENDA III": "21_Leyenda_III.png",
    "LEYENDA IV": "22_Leyenda_IV.png",
    "BLACK HOLE RANK": "23_BLACK_HOLE_RANK.png"
};


/* =============================
   DATOS GUARDADOS
============================= */

let experienciaTotal =
    Number(localStorage.getItem("experienciaTotal")) || 0;

let perfilUsuario = JSON.parse(
    localStorage.getItem("perfilUsuario") || "null"
);

let numeroDesafio =
    Number(localStorage.getItem("numeroDesafio")) || 0;

let actividadesCompletadas = JSON.parse(
    localStorage.getItem("actividadesCompletadas") || "{}"
);

const desafiosGuardados =
    localStorage.getItem("desafiosCompletados");

let desafiosCompletados =
    desafiosGuardados !== null
        ? Number(desafiosGuardados)
        : numeroDesafio +
          (localStorage.getItem("desafioCompletado") === "true" ? 1 : 0);

if (!Number.isFinite(desafiosCompletados) || desafiosCompletados < 0) {
    desafiosCompletados = 0;
}

localStorage.setItem("desafiosCompletados", desafiosCompletados);

let temporizadorDesafio = null;

const duracionDesafio = 24 * 60 * 60 * 1000;
const recompensaDesafio = 40;


/* =============================
   NAVEGACIÓN
============================= */

boton.addEventListener("click", function () {

    if (perfilUsuario) {
        mostrarDashboard();
    } else {
        inicio.hidden = true;
        registro.hidden = false;
    }

});

volverInicio.addEventListener("click", function () {

    dashboard.hidden = true;
    registro.hidden = true;
    inicio.hidden = false;

});

irRangos.addEventListener("click", function () {

    archivoRangos.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


/* =============================
   CREAR PERFIL
============================= */

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const usuario = {
        nombre: document.getElementById("nombre").value.trim(),
        edad: document.getElementById("edad").value,
        peso: document.getElementById("peso").value,
        estatura: document.getElementById("estatura").value,
        objetivo: document.getElementById("objetivo").value,
        experiencia: document.getElementById("experiencia").value,
        lugar: document.getElementById("lugar").value
    };

    localStorage.setItem("perfilUsuario", JSON.stringify(usuario));

    perfilUsuario = usuario;

    mostrarDashboard();

});


/* =============================
   MOSTRAR PANEL PRINCIPAL
============================= */

function mostrarDashboard() {

    inicio.hidden = true;
    registro.hidden = true;
    dashboard.hidden = false;

    document.getElementById("bienvenida").textContent =
        "BIENVENIDO, " + perfilUsuario.nombre.toUpperCase();

    document.getElementById("datoPeso").textContent =
        perfilUsuario.peso + " kg";

    document.getElementById("datoEstatura").textContent =
        perfilUsuario.estatura + " cm";

    document.getElementById("datoObjetivo").textContent =
        perfilUsuario.objetivo;

    actualizarRango();
    iniciarSistemaMisiones();

}


/* =============================
   OBTENER RANGO ACTUAL
============================= */

function obtenerIndiceRango() {

    let indiceRango = 0;

    for (let i = 0; i < rangos.length; i++) {
        if (experienciaTotal >= rangos[i].xp) {
            indiceRango = i;
        }
    }

    return indiceRango;

}


/* =============================
   ACTUALIZAR RANGO E INSIGNIA
============================= */

function actualizarRango() {

    const indiceRango = obtenerIndiceRango();

    const rangoActual = rangos[indiceRango];
    const siguienteRango = rangos[indiceRango + 1];

    document.getElementById("rangoActual").textContent =
        rangoActual.nombre;

    const insignia = document.getElementById("insigniaRango");

    insignia.src = "./insignias/" + imagenesRango[rangoActual.nombre];
    insignia.alt = "Insignia del rango " + rangoActual.nombre;

    insignia.onerror = function () {
        console.error("No se pudo cargar la insignia:", insignia.src);
    };

    if (siguienteRango) {

        const xpDelRango = experienciaTotal - rangoActual.xp;
        const xpNecesaria = siguienteRango.xp - rangoActual.xp;

        const porcentaje =
            Math.min(100, (xpDelRango / xpNecesaria) * 100);

        document.getElementById("xp").textContent =
            xpDelRango + " / " + xpNecesaria + " XP";

        document.getElementById("progreso").style.width =
            porcentaje + "%";

        document.getElementById("siguienteRango").textContent =
            "SIGUIENTE RANGO: " + siguienteRango.nombre;

    } else {

        document.getElementById("xp").textContent =
            experienciaTotal + " XP";

        document.getElementById("progreso").style.width = "100%";

        document.getElementById("siguienteRango").textContent =
            "¡HAS ALCANZADO EL RANGO MÁXIMO!";

    }

    localStorage.setItem("experienciaTotal", experienciaTotal);

    actualizarArchivoRangos();

}


/* =============================
   ARCHIVO DE RANGOS
============================= */

function actualizarArchivoRangos() {

    listaRangos.replaceChildren();

    const indiceActual = obtenerIndiceRango();

    rangos.forEach(function (rango, indice) {

        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-rango";

        const insigniaRango = document.createElement("img");

        insigniaRango.src =
            "./insignias/" + imagenesRango[rango.nombre];

        insigniaRango.alt = "Insignia de " + rango.nombre;
        insigniaRango.className = "imagen-rango";

        const nombre = document.createElement("h3");
        nombre.textContent = rango.nombre;

        const experiencia = document.createElement("p");

        experiencia.textContent =
            "XP necesarios: " + rango.xp.toLocaleString("es-ES");

        tarjeta.appendChild(insigniaRango);
        tarjeta.appendChild(nombre);
        tarjeta.appendChild(experiencia);

        const estado = document.createElement("span");
        estado.className = "estado-rango";

        if (indice === indiceActual) {

            tarjeta.classList.add("actual");
            estado.textContent = "RANGO ACTUAL";

        } else if (experienciaTotal >= rango.xp) {

            tarjeta.classList.add("desbloqueado");
            estado.textContent = "DESBLOQUEADO";

        } else {

            tarjeta.classList.add("bloqueado");

            const faltante = document.createElement("p");

            faltante.textContent =
                "Te faltan: " +
                (rango.xp - experienciaTotal).toLocaleString("es-ES") +
                " XP";

            tarjeta.appendChild(faltante);

            estado.textContent = "BLOQUEADO";

        }

        tarjeta.appendChild(estado);
        listaRangos.appendChild(tarjeta);

    });

}


/* =============================
   SISTEMA DE DIFICULTAD
============================= */

function obtenerDificultad() {

    const experiencia =
        (perfilUsuario.experiencia || "").toLowerCase();

    let nivelInicial = 0;

    if (experiencia === "intermedio") nivelInicial = 1;
    if (experiencia === "avanzado") nivelInicial = 2;

    const indiceRango = obtenerIndiceRango();

    let nivelPorRango = 0;

    if (indiceRango >= 3) nivelPorRango = 1;
    if (indiceRango >= 6) nivelPorRango = 2;
    if (indiceRango >= 10) nivelPorRango = 3;
    if (indiceRango >= 14) nivelPorRango = 4;
    if (indiceRango >= 18) nivelPorRango = 5;

    const nivelPorConstancia =
        Math.floor(desafiosCompletados / 6);

    const progresoPermitido = Math.min(
        nivelPorRango,
        nivelPorConstancia
    );

    const nivelFinal = Math.min(
        5,
        nivelInicial + progresoPermitido
    );

    const niveles = [
        { nombre: "INICIAL", series: 2, repeticiones: 8, descanso: 90 },
        { nombre: "BÁSICO+", series: 2, repeticiones: 10, descanso: 90 },
        { nombre: "INTERMEDIO", series: 3, repeticiones: 10, descanso: 75 },
        { nombre: "AVANZADO", series: 3, repeticiones: 12, descanso: 75 },
        { nombre: "EXIGENTE", series: 3, repeticiones: 15, descanso: 60 },
        { nombre: "ÉLITE", series: 4, repeticiones: 12, descanso: 60 }
    ];

    return {
        ...niveles[nivelFinal],
        nivel: nivelFinal,
        inicial: nivelInicial,
        rango: nivelPorRango,
        constancia: nivelPorConstancia
    };

}


/* =============================
   HERRAMIENTAS PARA ENTRENAMIENTOS
============================= */

function detalleRepeticiones(dificultad, ejercicio) {

    return (
        dificultad.series +
        " series de " +
        ejercicio +
        ". Descansa " +
        dificultad.descanso +
        " segundos entre series."
    );

}

function detalleTiempo(series, segundos, descanso) {

    return (
        series +
        " series de " +
        segundos +
        " segundos. Descansa " +
        descanso +
        " segundos entre series."
    );

}

function elegirVariante(nivel, variantes) {

    return variantes[Math.min(nivel, variantes.length - 1)];

}


/* =============================
   INDICACIONES DE LOS EJERCICIOS
============================= */

function obtenerIndicaciones(actividad) {

    const nombre = actividad.nombre.toLowerCase();

    if (nombre.includes("flexiones")) {
        return {
            ejecucion: "Coloca las manos en el suelo o en la superficie elegida, un poco más separadas que los hombros. Mantén el cuerpo alineado. Dobla los codos para bajar el pecho de forma controlada y empuja para volver a subir.",
            postura: "Mantén el abdomen firme, la espalda recta y la cabeza alineada con el tronco. No dejes caer la cadera.",
            respiracion: "Inhala al bajar y exhala al empujar para subir.",
            errores: "No abras excesivamente los codos, no arquees la espalda y no bajes de golpe. Usa una variante más sencilla si pierdes la postura."
        };
    }

    if (nombre.includes("sentadillas")) {
        return {
            ejecucion: "Coloca los pies aproximadamente al ancho de los hombros. Lleva la cadera hacia atrás y flexiona las rodillas para bajar. Desciende solo hasta donde puedas mantener el control. Empuja el suelo con los pies para levantarte.",
            postura: "Mantén el pecho erguido, la espalda neutral y las rodillas orientadas en la misma dirección que los pies.",
            respiracion: "Inhala al bajar y exhala al levantarte.",
            errores: "No juntes las rodillas hacia dentro, no levantes los talones y no rebotes en la parte inferior. Si lo necesitas, utiliza una silla estable como referencia."
        };
    }

    if (nombre.includes("plancha")) {
        return {
            ejecucion: "Apoya los antebrazos y las puntas de los pies en el suelo. Si haces la variante con rodillas, apoya las rodillas en lugar de los pies. Eleva el cuerpo y mantén la posición durante el tiempo indicado.",
            postura: "Forma una línea estable entre cabeza, espalda y cadera. Aprieta suavemente el abdomen y los glúteos.",
            respiracion: "Respira de manera continua y tranquila. No aguantes el aire.",
            errores: "No dejes caer la cadera, no eleves demasiado los glúteos y no fuerces la zona lumbar. Detente si no puedes mantener la postura."
        };
    }

    if (nombre.includes("zancadas")) {
        return {
            ejecucion: "Ponte de pie y da un paso hacia atrás o hacia delante, según la variante. Flexiona ambas rodillas de forma controlada y baja hasta donde te resulte cómodo. Empuja con los pies para regresar a la posición inicial.",
            postura: "Mantén el tronco erguido y la rodilla delantera alineada con el pie. Puedes apoyarte en una pared o silla estable si necesitas equilibrio.",
            respiracion: "Inhala al bajar y exhala al regresar a la posición inicial.",
            errores: "No pierdas el equilibrio, no golpees la rodilla contra el suelo y no permitas que la rodilla delantera se desvíe hacia dentro."
        };
    }

    if (nombre.includes("puente de glúteos")) {
        return {
            ejecucion: "Acuéstate boca arriba, flexiona las rodillas y apoya los pies en el suelo. Eleva la cadera apretando los glúteos. Haz una pequeña pausa arriba y baja lentamente.",
            postura: "Mantén los pies apoyados y separados al ancho de la cadera. Evita arquear excesivamente la zona lumbar.",
            respiracion: "Exhala al elevar la cadera e inhala al bajarla.",
            errores: "No empujes con el cuello, no abras demasiado las rodillas y no eleves la cadera más allá de lo que puedas controlar."
        };
    }

    if (nombre.includes("elevaciones de talones")) {
        return {
            ejecucion: "Ponte de pie con los pies separados al ancho de la cadera. Eleva lentamente los talones hasta quedar sobre las puntas de los pies. Baja despacio hasta apoyar los talones.",
            postura: "Mantén el cuerpo recto y las rodillas ligeramente relajadas. Puedes sujetarte de una pared para mantener el equilibrio.",
            respiracion: "Respira con normalidad durante todo el movimiento.",
            errores: "No rebotes, no gires los tobillos y no hagas el movimiento demasiado rápido."
        };
    }

    if (nombre.includes("bird-dog")) {
        return {
            ejecucion: "Colócate en cuatro apoyos, con las manos debajo de los hombros y las rodillas debajo de las caderas. Extiende lentamente un brazo y la pierna contraria. Regresa al centro y cambia de lado.",
            postura: "Mantén la espalda estable y la cadera mirando hacia el suelo. Extiende solo hasta donde puedas conservar el equilibrio.",
            respiracion: "Exhala al extender las extremidades e inhala al regresar.",
            errores: "No gires la cadera, no arquees la espalda y no levantes la pierna demasiado alto."
        };
    }

    if (nombre.includes("marcha en el lugar") ||
        nombre.includes("caminata activa") ||
        nombre.includes("caminata tranquila") ||
        nombre.includes("caminata lenta")) {
        return {
            ejecucion: "Camina sin desplazarte o por un espacio despejado. Alterna los pasos y mueve los brazos de manera natural. Ajusta el ritmo a la duración indicada.",
            postura: "Mantén la espalda erguida, mira al frente y apoya los pies con suavidad.",
            respiracion: "Respira de forma natural. Debes poder hablar sin quedarte sin aire.",
            errores: "No empieces demasiado rápido, no golpees el suelo con fuerza y evita hacerlo en superficies resbaladizas."
        };
    }

    if (nombre.includes("círculos de brazos")) {
        return {
            ejecucion: "Ponte de pie y extiende los brazos hacia los lados. Haz círculos pequeños y controlados hacia delante durante el tiempo indicado. Después cambia de dirección.",
            postura: "Mantén los hombros relajados y el tronco quieto.",
            respiracion: "Respira con normalidad.",
            errores: "No hagas círculos bruscos ni fuerces los hombros hasta sentir dolor."
        };
    }

    if (nombre.includes("movilidad de cadera")) {
        return {
            ejecucion: "Ponte de pie con las manos en la cintura. Realiza movimientos suaves de cadera hacia un lado y hacia el otro, sin forzar el recorrido.",
            postura: "Mantén los pies firmes y el tronco estable.",
            respiracion: "Respira de manera tranquila y continua.",
            errores: "No hagas movimientos bruscos ni fuerces la articulación."
        };
    }

    if (nombre.includes("movilidad de tobillos")) {
        return {
            ejecucion: "Con el pie apoyado o ligeramente elevado, realiza movimientos suaves del tobillo. Puedes dibujar círculos pequeños con la punta del pie y cambiar de dirección.",
            postura: "Mantén la pierna estable y mueve principalmente el tobillo.",
            respiracion: "Respira con normalidad.",
            errores: "No fuerces el movimiento ni continúes si aparece dolor."
        };
    }

    if (nombre.includes("movilidad de rodillas")) {
        return {
            ejecucion: "Con las rodillas ligeramente flexionadas, realiza pequeñas flexiones y extensiones controladas. Mantén los pies apoyados.",
            postura: "Mantén las rodillas alineadas con los pies y evita movimientos bruscos.",
            respiracion: "Respira de manera natural.",
            errores: "No hagas giros fuertes de rodilla ni fuerces el recorrido."
        };
    }

    if (nombre.includes("movilidad de hombros")) {
        return {
            ejecucion: "De pie, eleva suavemente los hombros hacia las orejas y llévalos hacia atrás y abajo. Repite lentamente y cambia el sentido si te resulta cómodo.",
            postura: "Mantén el cuello relajado y la espalda erguida.",
            respiracion: "Respira de manera natural durante el movimiento.",
            errores: "No hagas movimientos bruscos ni levantes los hombros con tensión excesiva."
        };
    }

    if (nombre.includes("movilidad de cuello")) {
        return {
            ejecucion: "Mira al frente y gira lentamente la cabeza unos grados hacia un lado y luego hacia el otro. Después puedes inclinar suavemente una oreja hacia el hombro, sin levantar el hombro.",
            postura: "Mantén los hombros relajados y la espalda recta.",
            respiracion: "Respira lentamente y sin contener el aire.",
            errores: "No hagas círculos completos con el cuello, no tires de la cabeza con las manos y detente si sientes dolor, mareo u hormigueo."
        };
    }

    if (nombre.includes("pasos laterales")) {
        return {
            ejecucion: "Ponte de pie con las rodillas ligeramente flexionadas. Da un paso hacia un lado y acerca el otro pie sin cruzarlo. Repite hacia el lado contrario.",
            postura: "Mantén el pecho erguido, las rodillas suaves y los pies apuntando al frente.",
            respiracion: "Respira de manera constante.",
            errores: "No cruces los pies, no des pasos demasiado largos y evita movimientos bruscos."
        };
    }

    if (nombre.includes("boxeo al aire")) {
        return {
            ejecucion: "Colócate con un pie ligeramente delante del otro. Flexiona un poco las rodillas y lanza golpes suaves al aire, alternando los brazos. Recoge cada mano después de extenderla.",
            postura: "Mantén las manos cerca del rostro, los hombros relajados y el abdomen firme.",
            respiracion: "Exhala suavemente al lanzar cada golpe e inhala al recoger el brazo.",
            errores: "No bloquees los codos al extenderlos, no golpees objetos y no gires las rodillas de forma brusca."
        };
    }

    if (nombre.includes("escaladores")) {
        return {
            ejecucion: "Colócate en posición de flexión, con las manos apoyadas debajo de los hombros. Lleva una rodilla hacia el pecho y regresa. Alterna las piernas lentamente.",
            postura: "Mantén la espalda estable, el abdomen firme y la cadera sin balanceos excesivos.",
            respiracion: "Respira de forma continua mientras alternas las piernas.",
            errores: "No rebotes, no eleves demasiado la cadera y no aceleres si pierdes la postura. Puedes hacerlos apoyando las manos en una superficie elevada y estable."
        };
    }

    if (nombre.includes("rodillas")) {
        return {
            ejecucion: "Marcha en el sitio elevando una rodilla y luego la otra hasta una altura cómoda. Alterna los lados durante el tiempo indicado.",
            postura: "Mantén el tronco erguido y apoya cada pie con suavidad.",
            respiracion: "Respira de forma continua y adapta el ritmo a tu condición física.",
            errores: "No te inclines hacia atrás ni levantes las rodillas más de lo que puedas controlar."
        };
    }

    if (nombre.includes("estiramiento suave de piernas")) {
        return {
            ejecucion: "Estira una pierna de forma cómoda y lleva el cuerpo suavemente hacia ella, sin rebotes. Mantén la posición y cambia de lado.",
            postura: "Mantén la espalda lo más recta posible y las articulaciones sin bloquear.",
            respiracion: "Respira lenta y tranquilamente mientras mantienes el estiramiento.",
            errores: "No rebotes, no fuerces el alcance y no busques sentir dolor. El estiramiento debe ser suave."
        };
    }

    if (nombre.includes("estiramiento suave de brazos")) {
        return {
            ejecucion: "Extiende un brazo frente al pecho y acércalo suavemente con la otra mano. Mantén la posición y cambia de brazo.",
            postura: "Mantén los hombros relajados y evita elevarlos hacia las orejas.",
            respiracion: "Respira lentamente mientras mantienes el estiramiento.",
            errores: "No tires con fuerza del brazo ni fuerces la articulación del hombro."
        };
    }

    if (nombre.includes("estiramiento suave de brazos y pecho")) {
        return {
            ejecucion: "Lleva los brazos suavemente hacia atrás o apoya el antebrazo en una pared estable y gira el cuerpo ligeramente en dirección contraria. Cambia de lado.",
            postura: "Mantén el pecho abierto sin arquear excesivamente la espalda.",
            respiracion: "Respira lenta y tranquilamente.",
            errores: "No rebotes ni fuerces los hombros. Detente si aparece dolor."
        };
    }

    if (nombre.includes("respiración")) {
        return {
            ejecucion: "Siéntate o ponte de pie en una posición cómoda. Inhala suavemente por la nariz y deja salir el aire lentamente. Repite sin intentar llenar los pulmones a la fuerza.",
            postura: "Relaja los hombros y mantén el cuerpo cómodo.",
            respiracion: "La actividad consiste en respirar lenta y naturalmente, sin aguantar el aire.",
            errores: "No fuerces respiraciones profundas ni aceleres el ritmo. Si te mareas, vuelve a respirar normalmente."
        };
    }

    if (nombre.includes("movilidad suave de piernas")) {
        return {
            ejecucion: "Realiza movimientos cómodos de flexión y extensión de las piernas. Puedes alternar elevaciones suaves de rodillas y pequeños pasos.",
            postura: "Mantén el equilibrio y evita bloquear las rodillas.",
            respiracion: "Respira de manera tranquila y continua.",
            errores: "No hagas rebotes ni fuerces las articulaciones."
        };
    }

    return {
        ejecucion: "Realiza el movimiento lentamente y siguiendo el tiempo o las repeticiones indicadas.",
        postura: "Mantén una posición estable y evita movimientos bruscos.",
        respiracion: "Respira de manera natural y no aguantes el aire.",
        errores: "No fuerces el movimiento ni continúes si aparece dolor."
    };

}


/* =============================
   GENERAR ENTRENAMIENTOS
============================= */

function obtenerMisiones() {

    const dificultad = obtenerDificultad();

    const series = dificultad.series;
    const repeticiones = dificultad.repeticiones;
    const nivel = dificultad.nivel;
    const descanso = dificultad.descanso;

    const variantesFlexiones = [
        "Flexiones contra la pared",
        "Flexiones inclinadas sobre una superficie estable",
        "Flexiones apoyando las rodillas",
        "Flexiones tradicionales",
        "Flexiones tradicionales con bajada controlada",
        "Flexiones tradicionales con pausa de 2 segundos"
    ];

    const variantesSentadillas = [
        "Sentadillas hasta una silla",
        "Sentadillas controladas",
        "Sentadillas profundas, si tu movilidad lo permite",
        "Sentadillas con pausa de 2 segundos",
        "Sentadillas con bajada lenta",
        "Sentadillas con pausa y bajada controlada"
    ];

    const variantesPlancha = [
        "Plancha apoyando las rodillas",
        "Plancha apoyando las rodillas",
        "Plancha tradicional",
        "Plancha tradicional",
        "Plancha tradicional con mayor duración",
        "Plancha tradicional con mayor duración"
    ];

    const variantesZancadas = [
        "Zancadas cortas con apoyo",
        "Zancadas hacia atrás con apoyo",
        "Zancadas hacia atrás",
        "Zancadas alternas",
        "Zancadas alternas controladas",
        "Zancadas alternas con pausa"
    ];

    const flexiones = elegirVariante(nivel, variantesFlexiones);
    const sentadillas = elegirVariante(nivel, variantesSentadillas);
    const plancha = elegirVariante(nivel, variantesPlancha);
    const zancadas = elegirVariante(nivel, variantesZancadas);

    const tiempoPlancha = [15, 20, 25, 30, 35, 40][nivel];
    const tiempoEjercicio = [30, 35, 40, 45, 50, 60][nivel];


    /* =============================
       MISIÓN DE FUERZA
    ============================= */

    const misionFuerza = {

        titulo: "DESAFÍO DE FUERZA",

        descripcion:
            "Entrenamiento de cuerpo completo. Trabaja piernas, pecho, brazos, abdomen y glúteos.",

        actividades: [

            {
                grupo: "CALENTAMIENTO",
                nombre: "Marcha en el lugar",
                detalle: "3 minutos. Comienza suavemente y aumenta poco a poco el ritmo."
            },
            {
                grupo: "CALENTAMIENTO",
                nombre: "Círculos de brazos",
                detalle: "2 series de 15 segundos hacia delante y 15 segundos hacia atrás."
            },
            {
                grupo: "CALENTAMIENTO",
                nombre: "Movilidad de cadera y tobillos",
                detalle: "2 minutos de movimientos controlados."
            },
            {
                grupo: "CALENTAMIENTO",
                nombre: "Sentadillas suaves",
                detalle: "1 serie de 10 repeticiones sin peso."
            },

            {
                grupo: "ENTRENAMIENTO PRINCIPAL",
                nombre: sentadillas,
                detalle: detalleRepeticiones(dificultad, repeticiones + 2 + nivel)
            },
            {
                grupo: "ENTRENAMIENTO PRINCIPAL",
                nombre: flexiones,
                detalle: detalleRepeticiones(
                    dificultad,
                    Math.max(5, repeticiones - 2 + nivel)
                )
            },
            {
                grupo: "ENTRENAMIENTO PRINCIPAL",
                nombre: "Puente de glúteos",
                detalle: detalleRepeticiones(dificultad, repeticiones + 2)
            },
            {
                grupo: "ENTRENAMIENTO PRINCIPAL",
                nombre: zancadas,
                detalle: detalleRepeticiones(
                    dificultad,
                    Math.max(6, repeticiones - 2) + " por pierna"
                )
            },
            {
                grupo: "ENTRENAMIENTO PRINCIPAL",
                nombre: "Elevaciones de talones",
                detalle: detalleRepeticiones(dificultad, repeticiones + 5)
            },
            {
                grupo: "ENTRENAMIENTO PRINCIPAL",
                nombre: plancha,
                detalle: detalleTiempo(series, tiempoPlancha, descanso)
            },
            {
                grupo: "ENTRENAMIENTO PRINCIPAL",
                nombre: "Bird-dog (brazo y pierna contrarios)",
                detalle: detalleRepeticiones(dificultad, "10 repeticiones por lado")
            },

            {
                grupo: "RECUPERACIÓN",
                nombre: "Caminar suavemente",
                detalle: "3 minutos para recuperar la respiración."
            },
            {
                grupo: "RECUPERACIÓN",
                nombre: "Estiramiento suave de piernas",
                detalle: "30 segundos por lado, sin rebotes ni dolor."
            },
            {
                grupo: "RECUPERACIÓN",
                nombre: "Estiramiento suave de brazos y pecho",
                detalle: "30 segundos por lado, sin forzar."
            }

        ]

    };


    /* =============================
       MISIÓN DE RESISTENCIA
    ============================= */

    const misionResistencia = {

        titulo: "DESAFÍO DE RESISTENCIA",

        descripcion:
            "Mejora tu capacidad cardiovascular y tu resistencia muscular con ejercicios variados.",

        actividades: [

            {
                grupo: "CALENTAMIENTO",
                nombre: "Caminata activa",
                detalle: "3 minutos aumentando gradualmente el ritmo."
            },
            {
                grupo: "CALENTAMIENTO",
                nombre: "Movilidad de tobillos y rodillas",
                detalle: "1 minuto de movimientos controlados."
            },
            {
                grupo: "CALENTAMIENTO",
                nombre: "Marcha elevando las rodillas",
                detalle: "1 minuto a ritmo suave."
            },

            {
                grupo: "ENTRENAMIENTO PRINCIPAL",
                nombre: "Marcha elevando las rodillas",
                detalle: detalleTiempo(series, tiempoEjercicio, descanso)
            },
            {
                grupo: "ENTRENAMIENTO PRINCIPAL",
                nombre: "Pasos laterales",
                detalle: detalleTiempo(series, tiempoEjercicio, descanso)
            },
            {
                grupo: "ENTRENAMIENTO PRINCIPAL",
                nombre: "Elevaciones de talones",
                detalle: detalleRepeticiones(dificultad, repeticiones + 5)
            },
            {
                grupo: "ENTRENAMIENTO PRINCIPAL",
                nombre: "Sentadillas controladas",
                detalle: detalleRepeticiones(dificultad, repeticiones)
            },
            {
                grupo: "ENTRENAMIENTO PRINCIPAL",
                nombre: "Boxeo al aire",
                detalle: detalleTiempo(series, tiempoEjercicio, descanso) +
                    " Mantén los movimientos controlados."
            },
            {
                grupo: "ENTRENAMIENTO PRINCIPAL",
                nombre: "Escaladores lentos",
                detalle: detalleRepeticiones(
                    dificultad,
                    Math.max(6, repeticiones - 2) + " por pierna"
                ) + " Mantén la espalda estable."
            },
            {
                grupo: "ENTRENAMIENTO PRINCIPAL",
                nombre: "Plancha",
                detalle: detalleTiempo(series, tiempoPlancha, descanso)
            },

            {
                grupo: "RECUPERACIÓN",
                nombre: "Caminata lenta",
                detalle: "3 minutos para bajar el ritmo."
            },
            {
                grupo: "RECUPERACIÓN",
                nombre: "Respiración controlada",
                detalle: "2 minutos respirando tranquilamente."
            },
            {
                grupo: "RECUPERACIÓN",
                nombre: "Movilidad suave de piernas",
                detalle: "2 minutos sin forzar las articulaciones."
            }

        ]

    };


    /* =============================
       MISIÓN DE RECUPERACIÓN
    ============================= */

    const misionRecuperacion = {

        titulo: "DESAFÍO DE RECUPERACIÓN",

        descripcion:
            "Una sesión de actividad suave para favorecer la movilidad y permitir que el cuerpo se recupere.",

        actividades: [

            {
                grupo: "MOVILIDAD",
                nombre: "Movilidad de hombros",
                detalle: "2 minutos con movimientos suaves."
            },
            {
                grupo: "MOVILIDAD",
                nombre: "Movilidad de cuello",
                detalle: "1 minuto con movimientos pequeños y lentos. No hagas círculos completos ni fuerces."
            },
            {
                grupo: "MOVILIDAD",
                nombre: "Movilidad de cadera",
                detalle: "2 minutos de movimientos controlados."
            },
            {
                grupo: "MOVILIDAD",
                nombre: "Movilidad de tobillos",
                detalle: "1 minuto por pie."
            },
            {
                grupo: "ACTIVIDAD SUAVE",
                nombre: "Caminata tranquila",
                detalle: "5 a 10 minutos a un ritmo cómodo."
            },
            {
                grupo: "ACTIVIDAD SUAVE",
                nombre: "Marcha suave en el lugar",
                detalle: "2 minutos sin aumentar demasiado el ritmo."
            },
            {
                grupo: "RECUPERACIÓN",
                nombre: "Respiración tranquila",
                detalle: "2 minutos de respiración lenta y cómoda."
            },
            {
                grupo: "RECUPERACIÓN",
                nombre: "Estiramiento suave de piernas",
                detalle: "30 segundos por lado, sin provocar dolor."
            },
            {
                grupo: "RECUPERACIÓN",
                nombre: "Estiramiento suave de brazos",
                detalle: "30 segundos por lado, sin forzar."
            }

        ]

    };

    return [
        misionFuerza,
        misionResistencia,
        misionRecuperacion
    ];

}


/* =============================
   CREAR GRUPO DE ACTIVIDADES
============================= */

function crearGrupoMision(nombreGrupo) {

    const contenedor = document.createElement("div");
    contenedor.className = "grupo-actividades";

    const titulo = document.createElement("h4");
    titulo.className = "grupo-mision";
    titulo.textContent = nombreGrupo;

    contenedor.appendChild(titulo);

    return contenedor;

}


/* =============================
   CREAR TARJETA DE ACTIVIDAD
============================= */

function crearActividadMision(
    actividad,
    indiceActividad,
    bloqueado
) {

    const tarjeta = document.createElement("div");
    tarjeta.className = "actividad-mision";

    const casilla = document.createElement("input");

    casilla.type = "checkbox";
    casilla.className = "casilla-mision";
    casilla.id = "actividad-" + indiceActividad;

    casilla.checked =
        actividadesCompletadas[indiceActividad] === true;

    casilla.disabled = bloqueado;

    const texto = document.createElement("div");
    texto.className = "detalle-actividad";

    const nombre = document.createElement("strong");
    nombre.textContent = actividad.nombre;

    const detalle = document.createElement("small");
    detalle.textContent = actividad.detalle;

    // BOTÓN PARA MOSTRAR LA TÉCNICA

    const botonTecnica = document.createElement("button");

    botonTecnica.type = "button";
    botonTecnica.className = "boton-tecnica";
    botonTecnica.textContent = "VER TÉCNICA";

    botonTecnica.setAttribute("aria-expanded", "false");

    // PANEL CON LAS INDICACIONES

    const panelTecnica = document.createElement("div");

    panelTecnica.className = "panel-tecnica";
    panelTecnica.hidden = true;

    const indicaciones = obtenerIndicaciones(actividad);

    const tituloEjecucion = document.createElement("strong");
    tituloEjecucion.textContent = "CÓMO HACERLO";

    const textoEjecucion = document.createElement("p");
    textoEjecucion.textContent = indicaciones.ejecucion;

    const tituloPostura = document.createElement("strong");
    tituloPostura.textContent = "POSTURA CORRECTA";

    const textoPostura = document.createElement("p");
    textoPostura.textContent = indicaciones.postura;

    const tituloRespiracion = document.createElement("strong");
    tituloRespiracion.textContent = "RESPIRACIÓN";

    const textoRespiracion = document.createElement("p");
    textoRespiracion.textContent = indicaciones.respiracion;

    const tituloErrores = document.createElement("strong");
    tituloErrores.textContent = "ERRORES QUE DEBES EVITAR";

    const textoErrores = document.createElement("p");
    textoErrores.textContent = indicaciones.errores;

    panelTecnica.append(
        tituloEjecucion,
        textoEjecucion,
        tituloPostura,
        textoPostura,
        tituloRespiracion,
        textoRespiracion,
        tituloErrores,
        textoErrores
    );

    botonTecnica.addEventListener("click", function () {

        const estaOculto = panelTecnica.hidden;

        panelTecnica.hidden = !estaOculto;

        botonTecnica.textContent =
            estaOculto ? "OCULTAR TÉCNICA" : "VER TÉCNICA";

        botonTecnica.setAttribute(
            "aria-expanded",
            String(estaOculto)
        );

    });

    texto.append(
        nombre,
        detalle,
        botonTecnica,
        panelTecnica
    );

    tarjeta.append(casilla, texto);

    casilla.addEventListener("change", function () {

        actividadesCompletadas[indiceActividad] =
            casilla.checked;

        localStorage.setItem(
            "actividadesCompletadas",
            JSON.stringify(actividadesCompletadas)
        );

        actualizarEstadoBoton();

    });

    return tarjeta;

}


/* =============================
   MOSTRAR MISIÓN
============================= */

function mostrarMision() {

    const misiones = obtenerMisiones();

    const indice = numeroDesafio % misiones.length;
    const mision = misiones[indice];

    const dificultad = obtenerDificultad();

    const completado =
        localStorage.getItem("desafioCompletado") === "true";

    const momentoFinal =
        Number(localStorage.getItem("finDesafio")) || 0;

    const bloqueado =
        completado && momentoFinal > Date.now();

    document.getElementById("tituloMision").textContent =
        mision.titulo;

    document.getElementById("descripcionMision").textContent =
        mision.descripcion +
        " DIFICULTAD ACTUAL: " +
        dificultad.nombre + ".";

    document.getElementById("recompensaMision").textContent =
        "RECOMPENSA: +" + recompensaDesafio + " XP";

    contenidoMision.replaceChildren();

    let grupoActual = "";
    let contenedorGrupo = null;

    mision.actividades.forEach(function (actividad, indiceActividad) {

        if (actividad.grupo !== grupoActual) {

            grupoActual = actividad.grupo;
            contenedorGrupo = crearGrupoMision(grupoActual);

            contenidoMision.appendChild(contenedorGrupo);

        }

        const tarjeta = crearActividadMision(
            actividad,
            indiceActividad,
            bloqueado
        );

        contenedorGrupo.appendChild(tarjeta);

    });

    if (bloqueado) {

        botonMision.disabled = true;
        botonMision.textContent = "DESAFÍO COMPLETADO";

        mensajeMision.textContent =
            "Tu próximo desafío estará disponible cuando termine el descanso.";

    } else {

        actualizarEstadoBoton();

    }

}


/* =============================
   VERIFICAR ACTIVIDADES
============================= */

function actualizarEstadoBoton() {

    const misiones = obtenerMisiones();

    const mision =
        misiones[numeroDesafio % misiones.length];

    const todasCompletadas =
        mision.actividades.every(function (actividad, indice) {
            return actividadesCompletadas[indice] === true;
        });

    const momentoFinal =
        Number(localStorage.getItem("finDesafio")) || 0;

    const bloqueado =
        localStorage.getItem("desafioCompletado") === "true" &&
        momentoFinal > Date.now();

    botonMision.disabled =
        !todasCompletadas || bloqueado;

    if (bloqueado) {

        botonMision.textContent = "DESAFÍO COMPLETADO";
        return;

    }

    if (todasCompletadas) {

        botonMision.textContent = "COMPLETAR ENTRENAMIENTO";

        mensajeMision.textContent =
            "¡Todas las actividades están marcadas!";

    } else {

        botonMision.textContent = "VERIFICAR MISIÓN";

        const cantidadCompletada =
            mision.actividades.filter(function (actividad, indice) {
                return actividadesCompletadas[indice] === true;
            }).length;

        mensajeMision.textContent =
            "ACTIVIDADES COMPLETADAS: " +
            cantidadCompletada + " / " +
            mision.actividades.length;

    }

}


/* =============================
   COMPLETAR MISIÓN
============================= */

botonMision.addEventListener("click", function () {

    if (
        localStorage.getItem("desafioCompletado") === "true"
    ) {
        return;
    }

    const misiones = obtenerMisiones();

    const mision =
        misiones[numeroDesafio % misiones.length];

    const todasCompletadas =
        mision.actividades.every(function (actividad, indice) {
            return actividadesCompletadas[indice] === true;
        });

    if (!todasCompletadas) {

        mensajeMision.textContent =
            "Aún quedan actividades pendientes.";

        return;

    }

    experienciaTotal += recompensaDesafio;
    desafiosCompletados++;

    localStorage.setItem("experienciaTotal", experienciaTotal);
    localStorage.setItem("desafiosCompletados", desafiosCompletados);

    localStorage.setItem("desafioCompletado", "true");

    const momentoFinal = Date.now() + duracionDesafio;

    localStorage.setItem("finDesafio", momentoFinal);

    actualizarRango();
    mostrarMision();
    iniciarTemporizador();

});


/* =============================
   TEMPORIZADOR DE 24 HORAS
============================= */

function iniciarTemporizador() {

    if (temporizadorDesafio) {
        clearInterval(temporizadorDesafio);
    }

    actualizarCuentaRegresiva();

    temporizadorDesafio = setInterval(
        actualizarCuentaRegresiva,
        1000
    );

}


/* =============================
   ACTUALIZAR CUENTA REGRESIVA
============================= */

function actualizarCuentaRegresiva() {

    const momentoFinal =
        Number(localStorage.getItem("finDesafio")) || 0;

    const tiempoRestante =
        momentoFinal - Date.now();

    if (tiempoRestante <= 0) {

        if (temporizadorDesafio) {
            clearInterval(temporizadorDesafio);
            temporizadorDesafio = null;
        }

        pasarAlSiguienteDesafio();
        return;

    }

    const horas = Math.floor(
        tiempoRestante / (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (tiempoRestante % (1000 * 60 * 60)) / (1000 * 60)
    );

    const segundos = Math.floor(
        (tiempoRestante % (1000 * 60)) / 1000
    );

    mensajeMision.textContent =
        "PRÓXIMO DESAFÍO EN: " +
        String(horas).padStart(2, "0") + ":" +
        String(minutos).padStart(2, "0") + ":" +
        String(segundos).padStart(2, "0");

}


/* =============================
   DESBLOQUEAR SIGUIENTE MISIÓN
============================= */

function pasarAlSiguienteDesafio() {

    numeroDesafio++;

    localStorage.setItem("numeroDesafio", numeroDesafio);

    localStorage.removeItem("finDesafio");

    localStorage.setItem("desafioCompletado", "false");

    actividadesCompletadas = {};

    localStorage.setItem(
        "actividadesCompletadas",
        JSON.stringify(actividadesCompletadas)
    );

    mostrarMision();

    mensajeMision.textContent =
        "¡NUEVO DESAFÍO DESBLOQUEADO!";

}


/* =============================
   INICIAR SISTEMA DE MISIONES
============================= */

function iniciarSistemaMisiones() {

    if (temporizadorDesafio) {
        clearInterval(temporizadorDesafio);
        temporizadorDesafio = null;
    }

    const completado =
        localStorage.getItem("desafioCompletado") === "true";

    const momentoFinal =
        Number(localStorage.getItem("finDesafio")) || 0;

    if (completado && momentoFinal <= Date.now()) {

        pasarAlSiguienteDesafio();

    } else {

        mostrarMision();

        if (completado) {
            iniciarTemporizador();
        }

    }

}


/* =============================
   ESTADO INICIAL DEL SISTEMA
============================= */

if (perfilUsuario) {

    mostrarDashboard();

} else {

    inicio.hidden = false;
    registro.hidden = true;
    dashboard.hidden = true;

}
