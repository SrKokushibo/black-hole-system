
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

// ARCHIVO DE RANGOS
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

localStorage.setItem(
    "desafiosCompletados",
    desafiosCompletados
);


let temporizadorDesafio = null;

const duracionDesafio = 24 * 60 * 60 * 1000;
const recompensaDesafio = 40;


/* =============================
   NAVEGACIÓN
============================= */

// INICIAR SISTEMA

boton.addEventListener("click", function () {

    if (perfilUsuario) {
        mostrarDashboard();
    } else {
        inicio.hidden = true;
        registro.hidden = false;
    }

});


// VOLVER A LA PANTALLA DE INICIO

volverInicio.addEventListener("click", function () {

    dashboard.hidden = true;
    registro.hidden = true;
    inicio.hidden = false;

});


// ABRIR ARCHIVO DE RANGOS

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

    localStorage.setItem(
        "perfilUsuario",
        JSON.stringify(usuario)
    );

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

    insignia.src =
        "./insignias/" + imagenesRango[rangoActual.nombre];

    insignia.alt =
        "Insignia del rango " + rangoActual.nombre;

    insignia.onerror = function () {

        console.error(
            "No se pudo cargar la insignia:",
            insignia.src
        );

    };


    if (siguienteRango) {

        const xpDelRango =
            experienciaTotal - rangoActual.xp;

        const xpNecesaria =
            siguienteRango.xp - rangoActual.xp;

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

        document.getElementById("progreso").style.width =
            "100%";

        document.getElementById("siguienteRango").textContent =
            "¡HAS ALCANZADO EL RANGO MÁXIMO!";

    }

    localStorage.setItem(
        "experienciaTotal",
        experienciaTotal
    );

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


        // IMAGEN DEL RANGO

        const insigniaRango = document.createElement("img");

        insigniaRango.src =
            "./insignias/" + imagenesRango[rango.nombre];

        insigniaRango.alt =
            "Insignia de " + rango.nombre;

        insigniaRango.className = "imagen-rango";


        // NOMBRE DEL RANGO

        const nombre = document.createElement("h3");

        nombre.textContent = rango.nombre;


        // EXPERIENCIA NECESARIA

        const experiencia = document.createElement("p");

        experiencia.textContent =
            "XP necesarios: " +
            rango.xp.toLocaleString("es-ES");


        tarjeta.appendChild(insigniaRango);
        tarjeta.appendChild(nombre);
        tarjeta.appendChild(experiencia);


        // ESTADO DEL RANGO

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

    if (experiencia === "intermedio") {
        nivelInicial = 1;
    }

    if (experiencia === "avanzado") {
        nivelInicial = 2;
    }


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

        {
            nombre: "INICIAL",
            series: 2,
            repeticiones: 8
        },

        {
            nombre: "BÁSICO+",
            series: 2,
            repeticiones: 10
        },

        {
            nombre: "INTERMEDIO",
            series: 3,
            repeticiones: 10
        },

        {
            nombre: "AVANZADO",
            series: 3,
            repeticiones: 12
        },

        {
            nombre: "EXIGENTE",
            series: 3,
            repeticiones: 15
        },

        {
            nombre: "ÉLITE",
            series: 4,
            repeticiones: 12
        }

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
   GENERAR ENTRENAMIENTOS
============================= */

function obtenerMisiones() {

    const dificultad = obtenerDificultad();

    const series = dificultad.series;
    const repeticiones = dificultad.repeticiones;

    const tiempoMarcha =
        Math.min(60, 30 + dificultad.nivel * 5);

    const tiempoLateral =
        Math.min(75, 45 + dificultad.nivel * 5);


    const misionFuerza = {

        titulo: "DESAFÍO DE FUERZA",

        descripcion:
            "Entrenamiento general de fuerza utilizando tu propio peso corporal.",

        actividades: [

            {
                grupo: "CALENTAMIENTO",
                nombre: "Marcha en el lugar",
                detalle: "2 minutos a ritmo suave."
            },

            {
                grupo: "CALENTAMIENTO",
                nombre: "Movilidad de brazos y caderas",
                detalle: "1 minuto de movimientos suaves."
            },

            {
                grupo: "ENTRENAMIENTO",
                nombre: "Sentadillas",
                detalle:
                    `${series} series de ${repeticiones} repeticiones. Descansa 60-90 segundos entre series.`
            },

            {
                grupo: "ENTRENAMIENTO",
                nombre: "Flexiones contra la pared",
                detalle:
                    `${series} series de ${repeticiones} repeticiones. Descansa 60 segundos entre series.`
            },

            {
                grupo: "ENTRENAMIENTO",
                nombre: "Puente de glúteos",
                detalle:
                    `${series} series de ${repeticiones} repeticiones. Descansa 60 segundos entre series.`
            },

            {
                grupo: "RECUPERACIÓN",
                nombre: "Caminar suavemente",
                detalle: "3 minutos para recuperar la respiración."
            },

            {
                grupo: "RECUPERACIÓN",
                nombre: "Estiramientos suaves",
                detalle: "2 minutos sin forzar las articulaciones."
            }

        ]

    };


    const misionResistencia = {

        titulo: "DESAFÍO DE RESISTENCIA",

        descripcion:
            "Mejora tu resistencia con movimientos de bajo impacto.",

        actividades: [

            {
                grupo: "CALENTAMIENTO",
                nombre: "Marcha suave",
                detalle: "3 minutos."
            },

            {
                grupo: "CALENTAMIENTO",
                nombre: "Movilidad de tobillos y rodillas",
                detalle: "1 minuto de movimientos controlados."
            },

            {
                grupo: "ENTRENAMIENTO",
                nombre: "Marcha elevando las rodillas",
                detalle:
                    `${series} series de ${tiempoMarcha} segundos. Descansa 60 segundos entre series.`
            },

            {
                grupo: "ENTRENAMIENTO",
                nombre: "Pasos laterales",
                detalle:
                    `${series} series de ${tiempoLateral} segundos. Descansa 60 segundos entre series.`
            },

            {
                grupo: "ENTRENAMIENTO",
                nombre: "Elevaciones de talones",
                detalle:
                    `${series} series de ${repeticiones} repeticiones. Descansa 60 segundos entre series.`
            },

            {
                grupo: "RECUPERACIÓN",
                nombre: "Caminar lentamente",
                detalle: "3 minutos."
            },

            {
                grupo: "RECUPERACIÓN",
                nombre: "Respiración y movilidad suave",
                detalle: "2 minutos."
            }

        ]

    };


    const misionRecuperacion = {

        titulo: "DESAFÍO DE RECUPERACIÓN",

        descripcion:
            "Una jornada de actividad suave para favorecer la recuperación.",

        actividades: [

            {
                grupo: "MOVILIDAD",
                nombre: "Movilidad de hombros",
                detalle: "2 minutos con movimientos suaves."
            },

            {
                grupo: "MOVILIDAD",
                nombre: "Movilidad de cadera",
                detalle: "2 minutos sin forzar."
            },

            {
                grupo: "ACTIVIDAD SUAVE",
                nombre: "Caminata tranquila",
                detalle: "5-10 minutos a un ritmo cómodo."
            },

            {
                grupo: "RECUPERACIÓN",
                nombre: "Respiración tranquila",
                detalle: "2 minutos."
            },

            {
                grupo: "RECUPERACIÓN",
                nombre: "Estiramientos suaves",
                detalle: "2 minutos, sin provocar dolor."
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

    const tarjeta = document.createElement("label");

    tarjeta.className = "actividad-mision";


    const casilla = document.createElement("input");

    casilla.type = "checkbox";
    casilla.className = "casilla-mision";

    casilla.checked =
        actividadesCompletadas[indiceActividad] === true;

    casilla.disabled = bloqueado;


    const texto = document.createElement("span");

    texto.className = "detalle-actividad";

    const nombre = document.createElement("strong");

    nombre.textContent = actividad.nombre;

    const detalle = document.createElement("small");

    detalle.textContent = actividad.detalle;


    texto.appendChild(nombre);
    texto.appendChild(detalle);

    tarjeta.appendChild(casilla);
    tarjeta.appendChild(texto);


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

    const indice =
        numeroDesafio % misiones.length;

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

            contenedorGrupo =
                crearGrupoMision(grupoActual);

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

        botonMision.textContent =
            "DESAFÍO COMPLETADO";

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


    const bloqueado =
        localStorage.getItem("desafioCompletado") === "true";


    botonMision.disabled =
        !todasCompletadas || bloqueado;


    if (bloqueado) {

        botonMision.textContent =
            "DESAFÍO COMPLETADO";

        return;

    }


    if (todasCompletadas) {

        botonMision.textContent =
            "COMPLETAR ENTRENAMIENTO";

        mensajeMision.textContent =
            "¡Todas las actividades están marcadas!";

    } else {

        botonMision.textContent =
            "VERIFICAR MISIÓN";

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


    localStorage.setItem(
        "experienciaTotal",
        experienciaTotal
    );

    localStorage.setItem(
        "desafiosCompletados",
        desafiosCompletados
    );


    localStorage.setItem(
        "desafioCompletado",
        "true"
    );


    const momentoFinal =
        Date.now() + duracionDesafio;

    localStorage.setItem(
        "finDesafio",
        momentoFinal
    );


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

    localStorage.setItem(
        "numeroDesafio",
        numeroDesafio
    );

    localStorage.removeItem("finDesafio");

    localStorage.setItem(
        "desafioCompletado",
        "false"
    );


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
