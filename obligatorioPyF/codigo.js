/* ============================ VARIABLE GLOBAL IMPORTANTE============================ */

let sistema = null;

/* ============================ CONSTANTES PARA EVALUAR LOS ESTADOS============================ */
const ESTADO_PENDIENTE = "pendiente";
const ESTADO_ACEPTADA = "aceptada";
const ESTADO_RECHAZADA = "rechazada";

/* ============================ CLASES ============================ */

/*  CREAMOS TIPO DE CLIENTE */
class Cliente {
    constructor(idC, usuarioC, NombrePerroC, tamanioC, contraseniaC) {
        this.id = idC;
        this.usuarioClient = usuarioC;
        this.NombrePerro = NombrePerroC;
        this.tamanio = tamanioC;
        this.contrasenia = contraseniaC;
    }
}

/*  CREAMOS TIPO DE PASEADOR */
class Paseador {
    constructor(idP, nombrePaseadorP, usuarioPaseadorP, contraseniaPaseadorP, cupoMaxP) {
        this.id = idP;
        this.nombrePaseador = nombrePaseadorP;
        this.usuarioPaseador = usuarioPaseadorP;
        this.contraseniaPaseador = contraseniaPaseadorP;
        this.cupoMax = cupoMaxP;
        this.contadorPerros = 0;
    }
}


/*  CREAMOS TIPO DE CONTRATACION  ENTRE EL CLIENTE Y EL PASEADOR*/
class Contratacion {
    constructor(idContratacion, clienteContr, paseadorContr, estadoC) {
        this.id = idContratacion;
        this.cliente = clienteContr;
        this.paseador = paseadorContr;
        this.estado = estadoC;
    }
}

/*  CREAMOS EL SISTEMA IMPORTANTE */
class Sistema {
    constructor() {
        this.idClienteActual = 11;
        this.usuarios = [
            new Cliente(1, "cliente1", "Fido", "G", "Aa123"),
            new Cliente(2, "cliente2", "Luna", "C", "Bb234"),
            new Cliente(3, "cliente3", "Max", "M", "Cc345"),
            new Cliente(4, "cliente4", "Rex", "G", "Dd456"),
            new Cliente(5, "cliente5", "Tina", "C", "Ee567"),
            new Cliente(6, "cliente6", "Rocky", "M", "Ff678"),
            new Cliente(7, "cliente7", "Bella", "G", "Gg789"),
            new Cliente(8, "cliente8", "Coco", "C", "Hh890"),
            new Cliente(9, "cliente9", "Bruno", "C", "Ii901"),
            new Cliente(10, "cliente10", "Kira", "C", "Jj012"),
        ];

        this.paseadores = [
            new Paseador(1, "Paseador 1", "paseador1", "Pass123", 20),
            new Paseador(2, "Paseador 2", "paseador2", "Pass234", 16),
            new Paseador(3, "Paseador 3", "paseador3", "Pass234", 18)
        ];

        this.contrataciones = [
            new Contratacion(1, this.usuarios[0], this.paseadores[0], "aceptada"),
            new Contratacion(2, this.usuarios[3], this.paseadores[0], "aceptada"),
            new Contratacion(3, this.usuarios[1], this.paseadores[0], "pendiente"),
            new Contratacion(4, this.usuarios[4], this.paseadores[1], "aceptada"),
            new Contratacion(5, this.usuarios[2], this.paseadores[1], "pendiente"),
            new Contratacion(6, this.usuarios[5], this.paseadores[1], "pendiente"),
            new Contratacion(7, this.usuarios[7], this.paseadores[2], "aceptada"),
            new Contratacion(8, this.usuarios[9], this.paseadores[2], "pendiente"),
            new Contratacion(9, this.usuarios[8], this.paseadores[2], "aceptada"),
            new Contratacion(10, this.usuarios[6], this.paseadores[0], "pendiente"),
        ];

        /* guardaremos los siguientes pasos */
        this.idContratacion = 11;
        this.clienteLogueado = null;
        this.paseadorLogueado = null;
    }
}

/* ============================ FUNCIONES DE SECCIONES Y NAVEGACION ============================ */



/* Vamos seccion por seccion ocultando  */
function ocultarSecciones() {
    let secciones = document.querySelectorAll(".seccion");
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].style.display = "none";
    }
}

/* cambiamos de seccion  - ocultamos dependiendo lo que queremos mostrar */

function cambiarSeccion(seccion) {
    /* ocultamos todo */
    ocultarSecciones();
    let elem = document.getElementById(seccion);
    /* si existe eso en el html */
    if (elem) {
        elem.style.display = "block";
    } /* se muestra */


    if (seccion === "listaPaseadores") {
        armarPaseadores();
    } else if (seccion === "seccionSolicitudes") {
        if (sistema.paseadorLogueado !== null) {
            /* si esta logueado */
            mostrarSolicitudesPendientes(sistema.paseadorLogueado);
        }
    } else if (seccion === "verPerrosAsignados") {
        mostrarPerrosAsignados();
    }
}



/* Exclusivo para el paseador  */
function mostrarPerrosAsignados() {

    let paseador = sistema.paseadorLogueado;
    let contenedor = document.querySelector(".contenedorAsignados");
    /* si no encuentra el contenedor */
    if (!contenedor)
        return;
    /* si no encuenta  al paseador */
    if (!paseador) {
        contenedor.innerHTML = "<p>No hay paseador logueado.</p>";
        return;
    }

    let texto = "";
    let cuposOcupados = 0;

    for (let i = 0; i < sistema.contrataciones.length; i++) {
        let c = sistema.contrataciones[i];
        if (c.paseador.id === paseador.id && c.estado === ESTADO_ACEPTADA) {
            texto += "<p>Perro: " + c.cliente.NombrePerro + " - Tamaño: " + c.cliente.tamanio + "</p>";

            if (c.cliente.tamanio === "G") {
                cuposOcupados += 4;
            } else if (c.cliente.tamanio === "M") {
                cuposOcupados += 2;
            } else if (c.cliente.tamanio === "C") {
                cuposOcupados += 1;
            }
        }
    }

    if (texto === "") {
        texto = "<p>No hay perros asignados actualmente.</p>";
    }

    let porcentaje = ((cuposOcupados / paseador.cupoMax) * 100).toFixed(2);


    texto += "<p><b>Cupos ocupados:</b> " + cuposOcupados + " / " + paseador.cupoMax + "</p>";
    texto += "<p><b>Porcentaje de cupos usados:</b> " + porcentaje + "%</p>";

    contenedor.innerHTML = texto;
}


/* Mostramos botones dependiendo el tipo de usuario */

function mostrarBotones(tipo) {
    /* recorremos todos los botones */

    let todosBotones = document.querySelectorAll(".boton");
    for (let i = 0; i < todosBotones.length; i++) {

        /* ocultamos todos los botones no imporrta cual sea */
        todosBotones[i].style.display = "none";
    }
    /* mostramos solo los botones que tengan clase igual al valor de tipo */
    let botonesMostrar = document.querySelectorAll("." + tipo);
    for (let i = 0; i < botonesMostrar.length; i++) {
        botonesMostrar[i].style.display = "block";
    }


    /* solo para el paseador */
    if (tipo === "paseador") {
        let btnContratar = document.getElementById("btnlistaPaseadores");
        if (btnContratar) {
            btnContratar.style.display = "none";
        }
    }
}

/* ============================ EVENTOS DE BOTONES DE NAVBAR ============================ */

/* Inicializamos los botones de la navbar */
// Agregamos el evento click a cada botón de la navbar

function inicializarBotonesNavbar() {
    let botones = document.querySelectorAll(".boton");
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", function () {
            /* a este boton q saque del for */
            let idBoton = this.id; // ej: btnseccionIngresar
            /* eliminamos la parte debtn para quedarnos con la seccion */
            let seccionId = idBoton.replace("btn", "");
            /* vamos automaticamente al aseccion */
            cambiarSeccion(seccionId);
        });
    }
}

/* ============================ INICIO DEL SISTEMA ============================ */

/* Esta funcion se ejecuta al cargar la pagina */
// Inicializa el sistema y configura los eventos de los botones

function iniciarSistema() {
    /* importante la "base de datos" de la app= clase sistema aca la creamos */
    sistema = new Sistema();

    mostrarBotones("cliente");
    cambiarSeccion("seccionIngresar");

    inicializarBotonesNavbar();

    let btnCerrar = document.getElementById("btnCerrarSesion");
    if (btnCerrar) {
        btnCerrar.addEventListener("click", cerrarSesion);
    }

    let btnContinuar = document.getElementById("btnContinuar");
    if (btnContinuar) {
        btnContinuar.addEventListener("click", IngresoNuevoUsuario);
    }

    let btnRegistrarse = document.getElementById("btnRegistrarse");
    if (btnRegistrarse) {
        btnRegistrarse.addEventListener("click", EntrarApp);
    }
}

/* ============================ CERRAR SESION ============================ */
function cerrarSesion() {

    /* Limpiamos */
    sistema.clienteLogueado = null;
    sistema.paseadorLogueado = null;
    /* Ocultamos todo lo de inicio  */
    ocultarSecciones();
    cambiarSeccion("seccionIniciar");
    /* Mostramos botones de cliente */
    mostrarBotones("cliente");

    let btnCerrar = document.getElementById("btnCerrarSesion");
    if (btnCerrar) {
        btnCerrar.style.display = "none";
    }
}

/* ============================ FUNCIONES DE REGISTRO Y LOGIN ============================ */

/* Buscar en una lista un objeto que tenga una propiedad con un valor específico*/
function obtenerObjeto(arrBuscar, prop, valor) {
    for (let i = 0; i < arrBuscar.length; i++) {
        let obj = arrBuscar[i];
        if (obj[prop] === valor) {
            return obj;
        }
    }
    return null;
}


/* ============================ VALDIACIONES EN CONTRASENA ============================ */
function validarContrasenia(contraseniaRegistro) {
    if (contraseniaRegistro.length < 5) {
        return "La contraseña debe tener al menos 5 caracteres";
    }
    let tieneMayuscula = false;
    let tieneMinuscula = false;
    let tieneNumero = false;

    for (let i = 0; i < contraseniaRegistro.length; i++) {
        let c = contraseniaRegistro.charCodeAt(i);
        if (c >= 65 && c <= 90) {
            tieneMayuscula = true;
        } else if (c >= 97 && c <= 122) {
            tieneMinuscula = true;
        } else if (c >= 48 && c <= 57) {
            tieneNumero = true;
        }
        if (tieneMayuscula && tieneMinuscula && tieneNumero) {
            break;
        }
    }

    if (!tieneMayuscula || !tieneMinuscula || !tieneNumero) {
        return "La contraseña debe tener mayúscula, minúscula y número";
    }
    return true;
}

/* Validar si el cliente ya existe */
function ValidarCliente(usuarioRegistro) {
    /* aca le paso el objeto  */
    let obj = obtenerObjeto(sistema.usuarios, "usuarioClient", usuarioRegistro);
    if (obj !== null) {
        alert("El usuario ya existe, por favor elija otro");
        return false;
    }
    return true;
}

/* Validar campos del formulario de registro */
function validarCampos(usuarioRegistro, contraseniaRegistro, nombrePerroRegistro, tamanioRegistro) {
    if (
        usuarioRegistro === "" ||
        contraseniaRegistro === "" ||
        nombrePerroRegistro === "" ||
        tamanioRegistro === "none"
    ) {
        alert("Por favor complete todos los campos");
        return false;
    }
    return true;

}


/* ============================ REGISTRO DE NUEVO USUARIO ============================ */
function IngresoNuevoUsuario() {
    let usuarioRegistro = document.getElementById("Username").value;
    let nombrePerroRegistro = document.getElementById("NombreDelPerro").value;
    let tamanioRegistro = document.getElementById("tamanioPerroslc").value;
    let contraseniaRegistro = document.getElementById("Contrasenia").value;
    let idNuevoCliente = sistema.idClienteActual;

    if (!validarCampos(usuarioRegistro, contraseniaRegistro, nombrePerroRegistro, tamanioRegistro)) {
        return;
    }

    /* ejemplo */

    let contraseniaOk = validarContrasenia(contraseniaRegistro);
    if (contraseniaOk !== true) {
        alert(contraseniaOk);
        return;
    }

    if (!ValidarCliente(usuarioRegistro)) {
        return;
    }

    let nuevoCliente = new Cliente(
        idNuevoCliente,
        usuarioRegistro,
        nombrePerroRegistro,
        tamanioRegistro,
        contraseniaRegistro
    );
    sistema.usuarios.push(nuevoCliente);

    alert("Cliente registrado correctamente.");

    cambiarSeccion("seccionIniciar");
    sistema.idClienteActual++;
}

/* ============================ INICIO DE SESION ============================ */
/*  Esta funcion se encarga de iniciar sesion en la aplicacion MEDIANTE EL BTN CONTINUAR */
function EntrarApp() {
    let usuarioEntrar = document.getElementById("Usuario").value;
    let contraseniaEntrar = document.getElementById("ContraseniaGral").value;
    let tipoUsuario = document.getElementById("slctipoDeUsuario").value;
    let encontrado = false;

    if (tipoUsuario === "none") {
        alert("Seleccione un tipo de usuario");
        return;
    }


    if (tipoUsuario === "C") {
        for (let i = 0; i < sistema.usuarios.length; i++) {
            let cliente = sistema.usuarios[i];
            if (cliente.usuarioClient === usuarioEntrar && cliente.contrasenia === contraseniaEntrar) {
                alert("Ingreso exitoso, bienvenido: " + cliente.NombrePerro);
                encontrado = true;
                sistema.clienteLogueado = cliente;
                cambiarSeccion("listaPaseadores");
                mostrarBotones("cliente");
                let btnCerrar = document.getElementById("btnCerrarSesion");
                if (btnCerrar) btnCerrar.style.display = "block";
                break;
            }
        }

        if (!encontrado) {
            alert("Usuario o contraseña incorrecta");
        }
    } else if (tipoUsuario === "P") {
        for (let i = 0; i < sistema.paseadores.length; i++) {
            let paseador = sistema.paseadores[i];
            if (paseador.usuarioPaseador === usuarioEntrar && paseador.contraseniaPaseador === contraseniaEntrar) {
                alert("Ingreso de Paseador Exitoso, Bienvenido: " + paseador.nombrePaseador);
                encontrado = true;
                sistema.paseadorLogueado = paseador;
                mostrarBotones("paseador");
                cambiarSeccion("seccionSolicitudes");
                let btnCerrar = document.getElementById("btnCerrarSesion");
                if (btnCerrar) btnCerrar.style.display = "block";
                break;
            }
        }
        if (!encontrado) {
            alert("Usuario o contraseña incorrectos");
        }
    }
}

/* ============================ FUNCIONES PASEADOR Y SOLICITUDES ============================ */
/*  arma la seccion de paseadores disponibles */
function armarPaseadores() {
    let cartasPaseadores = "";
    cartasPaseadores +=
        '<article>' +
        '<img src="paseador.jpeg" alt="Lucas" />' +
        '<h2>Lucas Rodriguez</h2>' +
        '<p id="Paseo">Me especializo en pasear perros pequeños. Soy muy paciente y atento, y siempre busco que se sientan seguros y tranquilos durante el paseo. Me adapto a su ritmo, hago pausas cuando lo necesitan y les doy el tiempo necesario para explorar y olfatear. Disfruto mucho conectar con cada perrito y hacer que cada salida sea una experiencia positiva.</p>' +
        '<input type="button" value="Seleccionar" class="btnSeleccionarPaseador" data-id="1"/>' +
        '</article>' +
        '<article>' +
        '<img src="paseador2.avif" alt="Matias" />' +
        '<h2>Matias fernandez</h2>' +
        '<p id="Paseo">Trabajo con perros medianos. Me gusta que cada paseo sea activo y entretenido, adaptado al nivel de energía de cada perro. Uso refuerzos positivos para fomentar una buena conducta y letío las rutas para mantener su atención. Me encanta verlos disfrutar del paseo, liberar energía y volver contentos a casa.</p>' +
        '<input type="button" value="Seleccionar" class="btnSeleccionarPaseador" data-id="2" />' +
        '</article>' +
        '<article>' +
        '<img src="paseador3.jpg" alt="Sebastian" />' +
        '<h2>Sebastian ferreira</h2>' +
        '<p id="Paseo">Me dedico a pasear perros grandes. Estoy preparado física y mentalmente para manejar perros con mucha fuerza, y tengo conocimientos en comportamiento canino. Durante los paseos trabajo en la obediencia básica, el ejercicio y la descarga de energía, siempre con respeto y conexión. Disfruto ver cómo se relajan y se sienten bien después de una buena caminata.</p>' +
        '<input type="button" value="Seleccionar" class="btnSeleccionarPaseador" data-id="3"/>' +
        '</article>';

    let contenedor = document.querySelector(".Grilla1");
    if (contenedor) {
        contenedor.innerHTML = cartasPaseadores;
    }

    let botones = document.querySelectorAll(".btnSeleccionarPaseador");
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", agregarBotones);
    }
}

/* ============================ AGREGAR BOTONES DE CONTRATACION ============================ */
/*  Esta funcion se encarga de agregar los botones de contratacion en la seccion de paseadores */

function agregarBotones() {
    let idSeleccionado = parseInt(this.getAttribute("data-id"));
    /* saco el data id q le puse a cada boton  */
    /* obtengo el objeto oesa obtengo el paseador */
    let paseadorSeleccionado = obtenerObjeto(sistema.paseadores, "id", idSeleccionado);

    if (paseadorSeleccionado !== null) {
        if (sistema.clienteLogueado === null) {
            alert("Debe iniciar sesión como cliente para contratar.");
            return;
        }
        alert("Paseador seleccionado: " + paseadorSeleccionado.nombrePaseador);
        agregarContratacion(paseadorSeleccionado);
    } else {
        alert("Paseador no encontrado.");
    }
}

/* ============================ AGREGAR CONTRATACION ============================ */
/* Esta funcion se encarga de agregar una nueva contratacion al sistema */
function agregarContratacion(paseador) {

    let tienePendiente = false;
    for (let i = 0; i < sistema.contrataciones.length; i++) {
        let c = sistema.contrataciones[i];
        if (c.cliente.id === sistema.clienteLogueado.id && c.estado === ESTADO_PENDIENTE) {
            tienePendiente = true;
            break;
        }
    }
    if (tienePendiente) {
        alert("Ya tiene una contratación pendiente.");
        return;
    }

    // Verificar incompatibilidad de tamaño y cupos usados
    let cantidadDeCupos = 0;
    let hayChico = false;
    let hayGrande = false;

    for (let i = 0; i < sistema.contrataciones.length; i++) {
        let c = sistema.contrataciones[i];
        if (c.paseador.id === paseador.id && c.estado === ESTADO_ACEPTADA) {
            if (c.cliente.tamanio === "G") {
                cantidadDeCupos += 4;
                hayGrande = true;
            } else if (c.cliente.tamanio === "M") {
                cantidadDeCupos += 2;
            } else if (c.cliente.tamanio === "C") {
                cantidadDeCupos += 1;
                hayChico = true;
            }
        }
    }

    if ((sistema.clienteLogueado.tamanio === "G" && hayChico) || (sistema.clienteLogueado.tamanio === "C" && hayGrande)) {
        alert("Incompatibilidad de tamaños con los perros ya asignados.");
        return;
    }

    let cupoNuevo = 0;
    if (sistema.clienteLogueado.tamanio === "G") cupoNuevo = 4;
    else if (sistema.clienteLogueado.tamanio === "M") cupoNuevo = 2;
    else if (sistema.clienteLogueado.tamanio === "C") cupoNuevo = 1;
    /* ============================ CUPOSSS ============================ */
    if (cantidadDeCupos + cupoNuevo > paseador.cupoMax) {
        alert("No hay cupo suficiente en la camioneta.");
        return;
    }
    // Crear nueva contratación
    let nueva = new Contratacion(
        sistema.idContratacion,
        sistema.clienteLogueado,
        paseador,
        ESTADO_PENDIENTE);

    sistema.contrataciones.push(nueva);
    sistema.idContratacion++;

    alert("Contratación generada correctamente en estado pendiente.");

    // Actualizar lista de solicitudes si paseador logueado y está en esa sección
    if (sistema.paseadorLogueado !== null && paseador.id === sistema.paseadorLogueado.id) {
        let seccionSolicitudes = document.getElementById("seccionSolicitudes");
        if (seccionSolicitudes && seccionSolicitudes.style.display === "block") {
            mostrarSolicitudesPendientes(paseador);
        }
    }
}


/* ============================ MOSTRAR SOLICITUDES PENDIENTES ============================ */
/* Esta funcion se encarga de mostrar las solicitudes pendientes del paseador logueado */

function mostrarSolicitudesPendientes(paseador) {
    let contenedor = document.querySelector(".contenedorSolicitudes");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    for (let i = 0; i < sistema.contrataciones.length; i++) {
        let contratacion = sistema.contrataciones[i];
        if (contratacion.paseador.id === paseador.id && contratacion.estado === ESTADO_PENDIENTE) {
            contenedor.innerHTML +=
                '<article class="solicitud">' +
                '<h3>Cliente: ' + contratacion.cliente.usuarioClient + '</h3>' +
                '<p>Perro: ' + contratacion.cliente.NombrePerro + '</p>' +
                '<p>Tamaño: ' + contratacion.cliente.tamanio + '</p>' +
                '<input type="button" value="Aceptar Solicitud" id="btnSoli" data-id="' + contratacion.id + '" class="btnPedidoDesdeBoton"/>' +
                '</article>';
        }
    }

    let botonesPedidos = document.querySelectorAll(".btnPedidoDesdeBoton");
    for (let i = 0; i < botonesPedidos.length; i++) {
        botonesPedidos[i].addEventListener("click", aceptarPedidoDesdeBoton);
    }
}
/* ============================ ACEPTAR PEDIDO DESDE BOTON ============================ */

function aceptarPedidoDesdeBoton() {
    let idContratacion = parseInt(this.getAttribute("data-id"));
    let contratacion = obtenerObjeto(sistema.contrataciones, "id", idContratacion);
    if (contratacion === null) {
        alert("No se encontró la contratación.");
        return;
    }
    let paseador = contratacion.paseador;
    aceptarPedido(paseador, contratacion);
    /* saco automaticametne las rechazadas y meustro sol olas pendietnes  */
    mostrarSolicitudesPendientes(paseador);
}
/* ============================ ACEPTAR PEDIDO ============================ */
/* Esta funcion se encarga de aceptar un pedido de contratacion */
function aceptarPedido(paseador, contratacion) {
    // Verificar si ya hay perros de tamaño incompatible
    let hayChico = false;
    let hayGrande = false;
    let cupoOcupado = 0;

    for (let i = 0; i < sistema.contrataciones.length; i++) {
        let c = sistema.contrataciones[i];
        if (c.paseador.id === paseador.id && c.estado === ESTADO_ACEPTADA) {
            if (c.cliente.tamanio === "G") {
                hayGrande = true;
                cupoOcupado += 4;
            } else if (c.cliente.tamanio === "M") {
                cupoOcupado += 2;
            } else if (c.cliente.tamanio === "C") {
                hayChico = true;
                cupoOcupado += 1;
            }
        }
    }

    // Verificar incompatibilidad de tamaños con la nueva contratación
    if ((contratacion.cliente.tamanio === "G" && hayChico) ||
        (contratacion.cliente.tamanio === "C" && hayGrande)) {
        alert("Incompatibilidad de tamaños: no se pueden mezclar perros grandes y chicos.");
        return;
    }

    // Calcular cupo del nuevo perro
    let cupoNuevo = 0;
    if (contratacion.cliente.tamanio === "G") {
        cupoNuevo = 4;
    } else if (contratacion.cliente.tamanio === "M") {
        cupoNuevo = 2;
    } else if (contratacion.cliente.tamanio === "C") {
        cupoNuevo = 1;
    }

    // Verificar si hay cupo suficiente
    if (cupoOcupado + cupoNuevo > paseador.cupoMax) {
        alert("No hay cupo suficiente.");
        return;
    }



    // Aceptar la contratación actual
    if (contratacion.estado === ESTADO_PENDIENTE) {
        contratacion.estado = ESTADO_ACEPTADA;
        paseador.contadorPerros++;
        alert("Solicitud aceptada correctamente.");
    }

    // Rechazar otras solicitudes pendientes incompatibles o que superan cupo
    for (let i = 0; i < sistema.contrataciones.length; i++) {
        let otra = sistema.contrataciones[i];

        if (
            otra.paseador.id === paseador.id &&
            otra.estado === ESTADO_PENDIENTE &&
            otra.id !== contratacion.id
        ) {
            let cupoOtra = 0;
            if (otra.cliente.tamanio === "G") {
                cupoOtra = 4;
            } else if (otra.cliente.tamanio === "M") {
                cupoOtra = 2;
            } else if (otra.cliente.tamanio === "C") {
                cupoOtra = 1;
            }

            let hayIncompatibilidad = false;
            if (
                (contratacion.cliente.tamanio === "G" && otra.cliente.tamanio === "C") ||
                (contratacion.cliente.tamanio === "C" && otra.cliente.tamanio === "G")
            ) {
                hayIncompatibilidad = true;
            }

            let superaCupo = cupoOcupado + cupoNuevo + cupoOtra > paseador.cupoMax;

            if (hayIncompatibilidad || superaCupo) {
                otra.estado = ESTADO_RECHAZADA;
            }
        }
    }
}
/* ============================ CARTEL DE  BIENVENIDA ============================ */

document.getElementById('cerrarBtn').addEventListener('click', function () {
    const bienvenida = document.getElementById('bienvenida');
    bienvenida.style.opacity = '0';
    setTimeout(function () {
        bienvenida.style.display = 'none';
    }, 500);
});


/* ============================ INICIO ============================ */
iniciarSistema();