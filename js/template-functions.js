/*
 *
 * Funciones JS
 *
 */

/*------------* Variables Globales *------------*/

let tiempoEjecucion = 1500; // Tiempo establecido para ejecutar código
let tiempoAnimacion = 500; // Tiempo establecido para animación
let slowInternetThreshold = 15000; // Tiempo en milisegundos que consideras lento

/*------------* Funciones Estandar *------------*/

// Función - Obtiene parametro de url dependiendo del "id" que se solicite
function obtenerParametro(id) {
    let objParametros;
    let parametro;

    // Se obtienen los parametros de la URL
    objParametros = new URLSearchParams(document.location.search);

    // Se registra parametro en variable
    objParametros.get(id) ? parametro = objParametros.get(id) : parametro = undefined;

    return parametro;
}

// Función - Abre enlaces en ventana
function abreEnlaces() {
    let elementosRecursos;

    // Valida si existen elementos de la etiqueta "<a href>"
    if (document.querySelectorAll("#accordionContenido a").length != 0) {

        // Se obtienen los elementos del acordeón "Contenido"
        elementosRecursos = document.querySelectorAll("#accordionContenido a");

    }

    // Se recorren los elementos
    elementosRecursos.forEach(recurso => {

        // Se agrega el evento "click" a cada elemento
        recurso.addEventListener("click", (e) => {            

            // Se obtiene el atributo "href"
            var href = recurso.getAttribute("href");

            // Valida el dato obtenido
            if (href != "#" && href != "javascript:;" && !href.includes("../anexos")) {
                e.preventDefault();

                // Se abre el enlace en la ventana
                window.open(href, "", "scrollbars=yes,resizable=yes,width=800,height=600");

            }
            
        });

    });
    
}

// Función - Agrega clase "screen" en etiqueta principal para generar PDF
function agregaClaseScreen() {

    // Variables
    let idTemaSiguiente = 0;
    let totalContenido = 0;

    // Valida la ruta en la url
    if (!window.location.href.includes("a14121")) {
        var contadorClick = 0; // Contador

        // Se agrega el evento "doble click" al elemento
        document.addEventListener("dblclick", function () {

            // Valida el valor del contador
            if (contadorClick == 0) {
                
                // Se agrega clase
                document.body.classList.add("screen");
                
                // Aumenta contador
                contadorClick++;

            } else if (contadorClick == 1) {

                // Se obtienen los elementos del DOM
                const elementosTitulos = document.querySelectorAll(".item-titulo-tema");
                totalContenido = elementosTitulos.length; // Se registra el total de títulos disponibles
            
                // Se realiza una iteración
                for (let i = 0; i < totalContenido; i++) {
                    var id = i + 1;
            
                    // Valida si el id se incluye en la url
                    if (window.location.href.includes("/tema-0" + id + ".html") || window.location.href.includes("/tema-" + id + ".html")) {
                        idTemaSiguiente = id + 1; // Se registra el id del siguiente tema
                    }
            
                }

                // Valida el límite de temas
                if (idTemaSiguiente <= totalContenido) {

                    // Valida la longitud del contador y redirecciona al siguiente tema
                    if (idTemaSiguiente.toString().length == 1) {
                        window.location.href = "tema-0" + idTemaSiguiente + ".html";
                    } else if (idTemaSiguiente.toString().length == 2) {
                        window.location.href = "tema-" + idTemaSiguiente + ".html" ;
                    }

                }

            }

        });
    }

}

// Función - Muestra / Oculta la animación "Loading"
function animacionLoading(idElemento, tipoEvento){

    // Valida si existe el elemento
    if (document.getElementById(idElemento) != null) {

        // Si el valor booleano es "true", se muestra la animación; si es "false", se oculta la animación
        if (tipoEvento) {
            document.getElementById(idElemento).classList.remove("d-none");
            document.getElementById(idElemento).classList.add("d-block");
        } else {
            document.getElementById(idElemento).classList.remove("d-block");
            document.getElementById(idElemento).classList.add("d-none");
        }

    }

}

/*------------* Funciones Generales *------------*/

// Función - Se agregan los títulos en las etiquetas
function agregarTitulos(idSeccion) {

    // Temporizador
    setTimeout(() => {
    
        // Se obtienen los elementos del DOM
        const contenedorModulos = document.querySelectorAll(".item-modulo");
        const titulosModulos = document.querySelectorAll(".item-titulo-modulo");
        const titulosTemas = document.querySelectorAll(".item-titulo-tema");

        // Valida el parametro "idSeccion"
        if (idSeccion == "temario") {

            /*
             * Se agregan los títulos de los módulos en "Temario"
             */

            // Se recorren todos los elementos de los módulos
            titulosModulos.forEach((itemTituloModulo, index) => {
                var idTituloModulo = index + 1; // Se registra la numeración

                // Se agrega la numeración y el título del módulo en "Tab Módulo"
                if (document.getElementById("encabezado-modulo-" + idTituloModulo) != null && document.getElementById("encabezado-modulo-" + idTituloModulo) != null) {
                    document.getElementById("encabezado-modulo-" + idTituloModulo).innerHTML = "<strong>Protocolo " + idTituloModulo + ". " + itemTituloModulo.innerHTML + "</strong>"; // Se agrega la numeración y el título
                }

            });

            /*
             * Se agregan los títulos de los temas en "Temario"
             */

            // Se recorren todos los elementos de los temas
            titulosTemas.forEach((itemTituloTema, index) => {
                var idTituloTema = index + 1; // Se registra la numeración

                // Valida si existe en el DOM el elemento con el "id"
                if (document.getElementById("titulo-tema-" + idTituloTema) != null) {
                    document.getElementById("titulo-tema-" + idTituloTema).innerHTML = itemTituloTema.innerHTML; // Se agrega el título
                }

                // Valida si existe en el DOM el elemento con el "id" para enlazar al tema
                if (document.getElementById("ruta-" + idTituloTema) != null) {
    
                    // Valida la longitud del id y se agrega la url para redireccionar
                    if (idTituloTema.toString().length == 1) {
                        document.getElementById("ruta-" + idTituloTema).href = "../explicas/tema-0" + idTituloTema + ".html";
                    } else if (idTituloTema.toString().length == 2) {
                        document.getElementById("ruta-" + idTituloTema).href = "../explicas/tema-" + idTituloTema + ".html";
                    }

                }

            });

        } else if (idSeccion == "protocolos") {

            /*
             * Se agregan los títulos de los módulos en sección "Protocolos"
             */

            // Se recorren todos los elementos de los módulos
            titulosModulos.forEach((itemTituloModulo, index) => {
                var idTituloModulo = index + 1; // Se registra la numeración

                // Valida si existe en el DOM el elemento con el "id" y se agrega la numeración y el título del módulo en "Card"
                if (document.getElementById("card-numero-modulo-" + idTituloModulo) != null && document.getElementById("card-titulo-modulo-" + idTituloModulo) != null) {
                    document.getElementById("card-numero-modulo-" + idTituloModulo).innerHTML = "Protocolo " + idTituloModulo; // Se agrega la numeración
                    document.getElementById("card-titulo-modulo-" + idTituloModulo).innerHTML = itemTituloModulo.innerHTML; // Se agrega el título
                }

                // Se agrega la numeración y el título del módulo en "Tab Módulo"
                if (document.getElementById("numero-modulo-" + idTituloModulo) != null && document.getElementById("titulo-modulo-" + idTituloModulo) != null) {
                    document.getElementById("numero-modulo-" + idTituloModulo).innerHTML = "Protocolo " + idTituloModulo; // Se agrega la numeración
                    document.getElementById("titulo-modulo-" + idTituloModulo).innerHTML = itemTituloModulo.innerHTML; // Se agrega el título
                }

            });

            /*
             * Se agregan los títulos de los temas en sección "Protocolos"
             */

            // Se recorren todos los elementos de los contenedores de módulos
            contenedorModulos.forEach((itemModulo, index) => {
                var idModulo = index + 1; // Se registra la numeración

                // Se recorren todos los elementos de los temas
                for(let i = 0; i < itemModulo.children.length; i++) {
                    idItemTema = i + 1;

                    // Valida si existe en el DOM el elemento con el "id" y se agrega el título del tema
                    if (document.getElementById("m" + idModulo + "-tema" + idItemTema) != null) {
                        document.getElementById("m" + idModulo + "-tema" + idItemTema).innerHTML = itemModulo.children[i].innerHTML; // Se agrega el título
                    }

                }

            });

        } else if (idSeccion == "tema") {

            // Valida si existe el atributo "class" en la etiqueta "body"
            if (document.body.classList.length > 0) {
                        
                // Valida si coincide el valor de la clase con la palabra clave
                if (document.body.classList[1].includes("modulo-")) {
                    var arrClaseModulo = document.body.classList[1].split("-"); // Se obtiene la clase y se separa en un arreglo
                    var numeroModulo = arrClaseModulo[1]; // Se registra el número de módulo
                } else {
                    var numeroModulo = 1; // Se registra un valor por default
                }

                // Valida si coincide el valor de la clase con la palabra clave
                if (document.body.classList[2].includes("tema-")) {
                    var arrClaseTema = document.body.classList[2].split("-"); // Se obtiene la clase y se separa en un arreglo
                    var numeroTema = arrClaseTema[1]; // Se registra el número de tema
                } else {
                    var numeroTema = 1; // Se registra un valor por default
                }

            }

            /*
             * Se agregan los títulos de los módulos en detalle del "Tema"
             */

            // Se recorren todos los elementos de los módulos
            titulosModulos.forEach((itemTituloModulo, index) => {
                var idTituloModulo = index + 1; // Se registra la numeración

                // Valida si coincide la numeración del tema
                if (numeroModulo == idTituloModulo) {

                    // Valida si existe en el DOM el elemento con el "id" y se agrega el detalle del "Protocolo" en el banner
                    if (document.getElementById("banner-numero-modulo") != null && document.getElementById("banner-titulo-modulo") != null) {
                        document.getElementById("banner-numero-modulo").innerHTML = "Protocolo " + idTituloModulo + ". "; // Se agrega la numeración
                        document.getElementById("banner-titulo-modulo").innerHTML = itemTituloModulo.innerHTML; // Se agrega el título
                    }

                    // Valida si existe en el DOM el elemento con el "id" y se agrega el detalle del "Protocolo" en la migaja del tema
                    if (document.getElementById("migaja-numero-modulo") != null && document.getElementById("migaja-titulo-modulo") != null) {
                        document.getElementById("migaja-numero-modulo").innerHTML = "Protocolo " + idTituloModulo + ". "; // Se agrega la numeración
                        document.getElementById("migaja-titulo-modulo").innerHTML = itemTituloModulo.innerHTML + " /"; // Se agrega el título
                    }

                }

            });

            /*
             * Se agregan los títulos de los temas en detalle del "Tema"
             */

            // Se recorren todos los elementos de los temas
            titulosTemas.forEach((itemTituloTema, index) => {
                var idTituloTema = index + 1; // Se registra la numeración

                // Valida si coincide la numeración del tema
                if (numeroTema == idTituloTema) {

                    // Valida si existe en el DOM el elemento con el "id" dentro del banner del tema
                    if (document.getElementById("banner-titulo-tema") != null) {
                        document.getElementById("banner-titulo-tema").innerHTML = itemTituloTema.innerHTML; // Se agrega el título
                    }
                    
                    // Valida si existe en el DOM el elemento con el "id" dentro de la migaja del tema
                    if (document.getElementById("migaja-titulo-tema") != null) {
                        document.getElementById("migaja-titulo-tema").innerHTML = itemTituloTema.innerHTML; // Se agrega el título
                    }

                }

            });

        } else {
            return;
        }

        // Oculta la animación "Loading"
        animacionLoading("loading", false);

    }, tiempoEjecucion);

}

// Función - Ajusta la posición de los contenedores "Protocolos"
function ajustaPosicionProtocolos(tipoEvento) {

    // Valida el tipo de parametro y ajusta el tiempo
    if (tipoEvento != undefined && tipoEvento == "resize") {
        tiempoEjecucion = 0;
    }

    // Temporizador
    setTimeout(() => {

        // Se obtiene el ancho de la ventana
        var windowWidth = window.innerWidth;

        // Se obtienen los elementos del DOM
        const contenedorModulos = document.querySelectorAll(".item-modulo");

        // Se recorren todos los elementos de los contenedores de módulos
        for (let i = 0; i < contenedorModulos.length; i++) {
            var idModulo = i + 1; // Se registra la numeración

            // Valida el ancho de la ventana
            if (windowWidth <= 767.98) {

                // Valida si el contenedor esta vacio y se inserta el elemento en contenedor responsivo
                if (document.getElementById("contenedor-tab-m" + idModulo + "-resp").children.length == 0) {
                    document.getElementById("contenedor-tab-m" + idModulo + "-resp").insertAdjacentElement("beforeend", document.getElementById("tab-m" + idModulo));
                }

            } else {

                // Valida si el contenedor esta vacio y se inserta el elemento en contenedor original
                if (document.getElementById("contenedor-tab-m" + idModulo).children.length == 0) {
                    document.getElementById("contenedor-tab-m" + idModulo).insertAdjacentElement("beforeend", document.getElementById("tab-m" + idModulo));
                }
            }

        }

    }, tiempoEjecucion);

}

// Función - Muestra el protocolo seleccionado
function seleccionarProtocolo(module){

    // Animación - Oculta todos los protocolos
    $(".card-protocolo").removeClass("active");
    $(".tab-modulo").hide(1000);

    // Animación - Muestra el protocolo seleccionado
    $("#card-" + module).addClass("active");   
    $("#tab-" + module).show(1000);

    setTimeout(() => {
        document.getElementById("tab-" + module).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        }); 
    }, 1000);
}

// Función - Muestra el detalle del tema
function seleccionarTema(idTema) {
    var arrId = idTema.split("-"); // Se separa el parametro

    // Se obtiene el título seleccionado y se agrega en el contenedor
    var titulo = document.getElementById(idTema).innerHTML;
    document.getElementById(arrId[0] + "-seleccion-titulo").innerHTML = titulo;
    document.getElementById(arrId[0] + "-seleccion-titulo").classList.add("active");

    // Animación - Muestra el detalle del tema seleccionado
    $(".tab-tema").hide(1000);
    $("#tab-" + idTema).show(1000);

}

// Función - Muestra video en iframe
function muestraVideo(idElemento, idVideo) {

    // Se agrega la ruta del video en iframe
    document.querySelector("#modal-video-" + idElemento + " iframe").setAttribute("src", "https://www.youtube.com/embed/" + idVideo);

}

// Función - Se ajustan los botones de navegación dentro de los temas
function ajusteBotonesNav() {

    // Temporizador
    setTimeout(() => {
        let temaAnterior = 1; // Número del tema anterior
        let numeroTema = 1; // Número del tema actual
        let temaSiguiente = 1; // Número del tema siguiente

        // Valida si existe el atributo "class" en la etiqueta "body"
        if (document.body.classList.length > 0) {

            // Valida si coincide el valor de la clase con la palabra clave
            if (document.body.classList[2].includes("tema-")) {
                var arrClaseTema = document.body.classList[2].split("-"); // Se obtiene la clase y se separa en un arreglo
                temaAnterior = +arrClaseTema[1] - 1; // Se resgistra el número del tema anterior
                numeroTema = +arrClaseTema[1]; // Se registra el número de tema actual
                temaSiguiente = +arrClaseTema[1] + 1; // Se resgistra el número del tema siguiente
            }

        }

        // Se ajusta el botón "Atras"
        if (document.getElementsByClassName("back-theme")[0] != undefined) {

            // Valida el tamaño de la numeración
            if (temaAnterior.toString().length == 1) {
                document.getElementsByClassName("back-theme")[0].setAttribute("href", "tema-0" + temaAnterior + ".html");
            } else if (temaAnterior.toString().length == 2) {
                document.getElementsByClassName("back-theme")[0].setAttribute("href", "tema-" + temaAnterior + ".html");
            }

        }

        // Se ajusta el botón "Inicio"
        document.getElementsByClassName("home")[0].setAttribute("href", "../bb/index.html");

        // Se ajusta el botón "PDF"
        if (document.getElementsByClassName("download-pdf")[0] != undefined) {
            // document.getElementsByClassName("download-pdf")[0].setAttribute("href", "../anexos/temas/T" + numeroTema + ".pdf");
        }

        // Se ajusta el botón "Siguiente"
        if (document.getElementsByClassName("next-theme")[0] != undefined) {

            // Valida el tamaño de la numeración
            if (temaSiguiente.toString().length == 1) {
                document.getElementsByClassName("next-theme")[0].setAttribute("href", "tema-0" + temaSiguiente + ".html");
            } else if (temaSiguiente.toString().length == 2) {
                document.getElementsByClassName("next-theme")[0].setAttribute("href", "tema-" + temaSiguiente + ".html");
            }

        }

    }, tiempoEjecucion);
    
}
