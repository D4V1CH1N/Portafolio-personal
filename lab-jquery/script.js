$(document).ready(function () {

    var totalPagar = 0;
    var totalItems = 0;
    var contadorLikes = 0;
    var intervaloModal = null;
    var segundosRestantes = 30;
    var intervaloPromo10m = null;
    var segundosPromo10m = 600;
    var promoExpirada = false;
    var promoReclamada = false;

    var clasesFondo = 'bg-playstation bg-xbox bg-xboxone bg-xbox360 bg-switch bg-pc bg-arcade bg-comida';

    var catalogoJuegosConsola = {
        ps5: [
            'EA Sports FC 27', 'Tekken 8', 'Mortal Kombat 1', 'God of War Ragnarok', 'Spider-Man 2',
            'Elden Ring', 'Resident Evil 4 Remake', 'Demons Souls', 'Gran Turismo 7', 'Final Fantasy XVI',
            'Street Fighter 6', 'Silent Hill 2', 'Black Myth Wukong', 'Astro Bot', 'Horizon Forbidden West',
            'Ghost of Tsushima', 'Cyberpunk 2077', 'Ratchet & Clank Rift Apart', 'Returnal', 'The Last of Us Part I'
        ],
        ps4: [
            'GTA V', 'Bloodborne', 'God of War (2018)', 'Uncharted 4', 'The Last of Us Part II',
            'Red Dead Redemption 2', 'FIFA 23', 'Crash Team Racing Nitro-Fueled', 'Marvels Spider-Man', 'Horizon Zero Dawn',
            'Persona 5 Royal', 'Sekiro Shadows Die Twice', 'Monster Hunter World', 'Dragon Ball FighterZ', 'Mortal Kombat 11',
            'Tekken 7', 'Shadow of the Colossus', 'Days Gone', 'Infamous Second Son', 'Nier Automata'
        ],
        ps3: [
            'PES 2013', 'Metal Gear Solid 4', 'God of War III', 'Uncharted 2', 'Uncharted 3',
            'Gran Turismo 6', 'Twisted Metal', 'Killzone 3', 'Resistance 3', 'Infamous 2',
            'LittleBigPlanet 2', 'Red Dead Redemption', 'GTA IV', 'Demons Souls', 'Heavy Rain',
            'Beyond Two Souls', 'MotorStorm Pacific Rift', 'Batman Arkham City', 'Call of Duty Black Ops II', 'Ultra Street Fighter IV'
        ],
        xboxsx: [
            'Halo Infinite', 'Forza Horizon 5', 'Forza Motorsport', 'Gears 5', 'Starfield',
            'Senuas Saga Hellblade II', 'Call of Duty Black Ops 6', 'Sea of Thieves', 'Microsoft Flight Simulator', 'Hi-Fi Rush',
            'Ori and the Will of the Wisps', 'Doom Eternal', 'Elden Ring', 'EA Sports FC 27', 'Mortal Kombat 1',
            'Lies of P', 'Palworld', 'Grounded', 'State of Decay 2', 'Psychonauts 2'
        ],
        xboxone: [
            'Halo 5 Guardians', 'Halo Master Chief Collection', 'Gears of War 4', 'Forza Horizon 4', 'Killer Instinct',
            'Sunset Overdrive', 'Quantum Break', 'Cuphead', 'Ori and the Blind Forest', 'Ryse Son of Rome',
            'Dead Rising 3', 'Titanfall 2', 'Red Dead Redemption 2', 'GTA V', 'The Witcher 3',
            'Fallout 4', 'Battlefield 1', 'Apex Legends', 'Fortnite', 'Minecraft'
        ],
        xbox360: [
            'Halo 3', 'Halo Reach', 'Gears of War', 'Gears of War 2', 'Gears of War 3',
            'Left 4 Dead 2', 'Fable II', 'Forza Motorsport 4', 'Alan Wake', 'Lost Odyssey',
            'Crackdown', 'Project Gotham Racing 4', 'Dead or Alive 4', 'Ninja Gaiden II', 'Castle Crashers',
            'Call of Duty Modern Warfare 2', 'BioShock', 'Mass Effect 2', 'Red Dead Redemption', 'Skyrim'
        ],
        switch: [
            'Mario Kart 8 Deluxe', 'Super Smash Bros Ultimate', 'Zelda Tears of the Kingdom', 'Zelda Breath of the Wild', 'Super Mario Odyssey',
            'Super Mario Bros Wonder', 'Splatoon 3', 'Animal Crossing New Horizons', 'Metroid Dread', 'Fire Emblem Engage',
            'Xenoblade Chronicles 3', 'Luigis Mansion 3', 'Super Mario Party Jamboree', 'Pokemon Scarlet', 'Kirby and the Forgotten Land',
            'Donkey Kong Tropical Freeze', 'Bayonetta 3', 'Astral Chain', 'Mario Tennis Aces', 'Mario Strikers Battle League'
        ]
    };

    var lista25Arcades = [
        'The King of Fighters 98', 'The King of Fighters 2002 Magic Plus', 'Metal Slug X', 'Metal Slug 3',
        'Street Fighter II Champion Edition', 'Street Fighter III 3rd Strike', 'Marvel vs Capcom 2', 'Tekken Tag Tournament',
        'Mortal Kombat II', 'Ultimate Mortal Kombat 3', 'Pac-Man', 'Ms. Pac-Man',
        'Galaga', 'Space Invaders', 'Sunset Riders', 'Cadillacs and Dinosaurs',
        'Teenage Mutant Ninja Turtles', 'The Simpsons Arcade', 'Captain Commando', 'Final Fight',
        'Snow Bros', 'Bubble Bobble', 'Bomberman World', 'Daytona USA', 'Dance Dance Revolution Extreme'
    ];

    function construirOpcionesJuegos(claveConsola) {
        var juegos = catalogoJuegosConsola[claveConsola] || [];
        var html = '';
        for (var i = 0; i < juegos.length; i++) {
            html += '<option value="' + juegos[i] + '">' + (i + 1) + '. ' + juegos[i] + '</option>';
        }
        return html;
    }

    function inicializarEstacionesConsolas() {
        $('.grilla-estaciones-compacta[data-generar-consola]').each(function () {
            var $grilla = $(this);
            var clave = $grilla.attr('data-generar-consola');
            var prefijo = $grilla.attr('data-prefijo');
            var precio = parseInt($grilla.attr('data-precio')) || 15;
            var opcionesJuegos = construirOpcionesJuegos(clave);
            var htmlEstaciones = '';

            for (var n = 1; n <= 10; n++) {
                var numStr = n < 10 ? '0' + n : '' + n;
                var codigo = prefijo + '-' + numStr;

                if (n === 3 || n === 8) {
                    htmlEstaciones +=
                        '<div class="estacion estado-uso" data-tipo="consola" data-codigo="' + codigo + '" data-precio="' + precio + '">' +
                        '<div class="est-top"><h4>' + codigo + '</h4><span class="badge-estado">En Uso</span></div>' +
                        '<p class="texto-ocupado">Partida activa en curso.</p>' +
                        '</div>';
                } else if (n === 6) {
                    htmlEstaciones +=
                        '<div class="estacion estado-reservado" data-tipo="consola" data-codigo="' + codigo + '" data-precio="' + precio + '">' +
                        '<div class="est-top"><h4>' + codigo + '</h4><span class="badge-estado">Reservado</span></div>' +
                        '<p class="texto-ocupado">Reservada previamente.</p>' +
                        '</div>';
                } else {
                    htmlEstaciones +=
                        '<div class="estacion estado-disponible" data-tipo="consola" data-codigo="' + codigo + '" data-precio="' + precio + '">' +
                        '<div class="est-top"><h4>' + codigo + '</h4><span class="badge-estado">Disponible</span></div>' +
                        '<div class="controles-reserva">' +
                        '<label>Juego Inicial (20):</label>' +
                        '<select class="select-juego">' + opcionesJuegos + '</select>' +
                        '<div class="fila-inline-reserva">' +
                        '<div><label>Mandos:</label>' +
                        '<select class="select-controles">' +
                        '<option value="0" data-texto="1 Control">1 Control (+0)</option>' +
                        '<option value="5" data-texto="2 Controles">2 Controles (+5)</option>' +
                        '<option value="10" data-texto="3 Controles">3 Controles (+10)</option>' +
                        '<option value="15" data-texto="4 Controles">4 Controles (+15)</option>' +
                        '</select></div>' +
                        '<div><label>Horas:</label>' +
                        '<input type="number" class="input-horas" value="1" min="1" max="8"></div>' +
                        '</div>' +
                        '<div class="subtotal-estacion">Subtotal: <span class="val-subtotal">' + precio + '</span> Bs</div>' +
                        '<button class="btn-reservar-estacion">Reservar</button>' +
                        '</div>' +
                        '</div>';
                }
            }
            $grilla.html(htmlEstaciones);
        });
    }

    function inicializarEstacionesPC() {
        var htmlPCs = '';
        for (var i = 1; i <= 20; i++) {
            var numStr = i < 10 ? '0' + i : '' + i;
            var codigo = 'PC-' + numStr;
            var gama = 'ultra';
            var nombreGama = 'Gama Ultra Esports';
            var specs = 'RTX 4080 Super | i9-14900K | 64GB | 360Hz';
            var precio = 25;

            if (i >= 8 && i <= 14) {
                gama = 'alta';
                nombreGama = 'Gama Alta Competitiva';
                specs = 'RTX 4070 12GB | Ryzen 7 7800X3D | 32GB | 240Hz';
                precio = 20;
            } else if (i >= 15) {
                gama = 'media';
                nombreGama = 'Gama Media Pro';
                specs = 'RTX 4060 Ti | i5-13600K | 16GB | 165Hz';
                precio = 15;
            }

            if (i === 4 || i === 11 || i === 18) {
                htmlPCs +=
                    '<div class="estacion estado-uso item-pc" data-gama="' + gama + '" data-tipo="pc" data-codigo="' + codigo + '" data-nombre="' + nombreGama + '" data-precio="' + precio + '">' +
                    '<div class="est-top"><h4>' + codigo + ' (' + precio + ' Bs/h)</h4><span class="badge-estado">En Uso</span></div>' +
                    '<div class="spec-mini">' + specs + '</div>' +
                    '<p class="texto-ocupado">Equipo en partida competitiva.</p>' +
                    '</div>';
            } else if (i === 7 || i === 14) {
                htmlPCs +=
                    '<div class="estacion estado-reservado item-pc" data-gama="' + gama + '" data-tipo="pc" data-codigo="' + codigo + '" data-nombre="' + nombreGama + '" data-precio="' + precio + '">' +
                    '<div class="est-top"><h4>' + codigo + ' (' + precio + ' Bs/h)</h4><span class="badge-estado">Reservado</span></div>' +
                    '<div class="spec-mini">' + specs + '</div>' +
                    '<p class="texto-ocupado">Reservada para entrenamiento.</p>' +
                    '</div>';
            } else {
                htmlPCs +=
                    '<div class="estacion estado-disponible item-pc" data-gama="' + gama + '" data-tipo="pc" data-codigo="' + codigo + '" data-nombre="' + nombreGama + '" data-precio="' + precio + '">' +
                    '<div class="est-top"><h4>' + codigo + ' (' + precio + ' Bs/h)</h4><span class="badge-estado">Disponible</span></div>' +
                    '<div class="spec-mini">' + specs + '</div>' +
                    '<div class="controles-reserva">' +
                    '<label>Tiempo de Alquiler (Horas):</label>' +
                    '<input type="number" class="input-horas" value="1" min="1" max="8">' +
                    '<div class="subtotal-estacion">Subtotal: <span class="val-subtotal">' + precio + '</span> Bs</div>' +
                    '<button class="btn-reservar-estacion">Reservar PC</button>' +
                    '</div>' +
                    '</div>';
            }
        }
        $('#grilla-20-pcs').html(htmlPCs);
    }

    function inicializarMaquinasArcade() {
        var htmlArcades = '';
        for (var i = 0; i < lista25Arcades.length; i++) {
            var num = i + 1;
            var numStr = num < 10 ? '0' + num : '' + num;
            var juego = lista25Arcades[i];
            var codigo = 'ARC-' + numStr;

            if (num === 5 || num === 12 || num === 20) {
                htmlArcades +=
                    '<div class="estacion estado-uso" data-tipo="arcade" data-codigo="' + codigo + '" data-nombre="' + juego + '" data-precio="10">' +
                    '<div class="est-top"><h4>' + numStr + '. ' + juego + '</h4><span class="badge-estado">En Uso</span></div>' +
                    '<p class="texto-ocupado">Gabinete con retas activas.</p>' +
                    '</div>';
            } else if (num === 9 || num === 17) {
                htmlArcades +=
                    '<div class="estacion estado-reservado" data-tipo="arcade" data-codigo="' + codigo + '" data-nombre="' + juego + '" data-precio="10">' +
                    '<div class="est-top"><h4>' + numStr + '. ' + juego + '</h4><span class="badge-estado">Reservado</span></div>' +
                    '<p class="texto-ocupado">Gabinete reservado.</p>' +
                    '</div>';
            } else {
                htmlArcades +=
                    '<div class="estacion estado-disponible" data-tipo="arcade" data-codigo="' + codigo + '" data-nombre="' + juego + '" data-precio="10">' +
                    '<div class="est-top"><h4>' + numStr + '. ' + juego + '</h4><span class="badge-estado">Disponible</span></div>' +
                    '<div class="controles-reserva">' +
                    '<div class="fila-inline-reserva">' +
                    '<div><label>Modalidad:</label>' +
                    '<select class="select-modo-arcade">' +
                    '<option value="10" data-unidad="Hora(s) Libre">Hora Libre (10 Bs)</option>' +
                    '<option value="2" data-unidad="Ficha(s)">Por Fichas (2 Bs)</option>' +
                    '</select></div>' +
                    '<div><label>Cant.:</label>' +
                    '<input type="number" class="input-horas" value="1" min="1" max="15"></div>' +
                    '</div>' +
                    '<div class="subtotal-estacion">Subtotal: <span class="val-subtotal">10</span> Bs</div>' +
                    '<button class="btn-reservar-estacion">Reservar Arcade</button>' +
                    '</div>' +
                    '</div>';
            }
        }
        $('#grilla-25-arcades').html(htmlArcades);
    }

    function registrarBitacora(tipo, detalle) {
        var hora = new Date().toLocaleTimeString();
        var fila = '<div class="log-item"><span class="log-hora">[' + hora + ']</span> <span class="log-tipo">[' + tipo + ']</span> ' + detalle + '</div>';
        $('#log-output').prepend(fila);
        $('#log-mini').prepend(fila);
    }

    function aplicarTemaFondo(tema, tituloIndicador) {
        $('body').removeClass(clasesFondo);
        if (tema && tema !== '') {
            $('body').addClass('bg-' + tema);
        }
        if (tituloIndicador) {
            $('#indicador-tema').html(tituloIndicador);
        }
    }

    function mostrarToast(titulo, mensaje) {
        $('#toast-titulo').text(titulo);
        $('#toast-cuerpo').text(mensaje);
        $('#toast-alert').stop(true, true).slideDown('fast').delay(3000).fadeOut('slow');
    }

    function actualizarTotalesHUD() {
        $('#hud-items').text(totalItems);
        $('#hud-total').text(totalPagar);
        $('#lobby-total-texto').text(totalPagar + ' Bs');
        $('#modal-total').text(totalPagar);
        $('#lobby-total-texto, #hud-total').stop(true, true).animate({ opacity: 0.3 }, 110).animate({ opacity: 1 }, 190);
    }

    function activarFiltroConsolaEspecifico(claveConsola, temaFondo, tituloPersonalizado) {
        var filtroElegido = claveConsola || 'todos';
        $('.btn-filtro-consola').removeClass('activo');
        $('.btn-filtro-consola[data-consola="' + filtroElegido + '"]').addClass('activo');

        $('.item-consola').hide();
        if (filtroElegido === 'todos') {
            $('.item-consola').fadeIn('fast');
            $('.item-consola .accordion-panel').show();
            $('.item-consola .accordion-btn').addClass('abierto').text('Ocultar Estaciones [-]');
        } else {
            var $objetivo = $('.item-consola[data-consola="' + filtroElegido + '"]');
            $objetivo.fadeIn('fast');
            $objetivo.find('.accordion-panel').show();
            $objetivo.find('.accordion-btn').addClass('abierto').text('Ocultar Estaciones [-]');
        }

        aplicarTemaFondo(temaFondo || 'playstation', tituloPersonalizado || 'Hangar de Consolas (Ver Todas)');
    }

    function cambiarVistaExclusiva(idVista, temaFondo, tituloTema, consolaOpcional) {
        $('.vista-hud').removeClass('vista-activa').stop(true, true).fadeOut('fast').promise().done(function () {
            $('#' + idVista).fadeIn('fast').addClass('vista-activa');
            if (idVista === 'vista-consolas') {
                activarFiltroConsolaEspecifico(consolaOpcional || 'todos', temaFondo || 'playstation', tituloTema || 'Hangar de Consolas (Ver Todas)');
            } else {
                aplicarTemaFondo(temaFondo, tituloTema);
            }
        });
        $('#btn-menu').removeClass('activo');
        $('#menu-movil').removeClass('activo show').slideUp('fast');
    }

    function iniciarRelojPromo10Minutos() {
        intervaloPromo10m = setInterval(function () {
            if (segundosPromo10m > 0) {
                segundosPromo10m = segundosPromo10m - 1;
                var min = Math.floor(segundosPromo10m / 60);
                var seg = segundosPromo10m % 60;
                var minStr = min < 10 ? '0' + min : '' + min;
                var segStr = seg < 10 ? '0' + seg : '' + seg;
                $('#timer-oferta-10m').text(minStr + ':' + segStr);

                if (segundosPromo10m <= 0 && !promoExpirada) {
                    promoExpirada = true;
                    clearInterval(intervaloPromo10m);
                    $('#tarjeta-oferta-relampago, .panel-oferta-lobby').fadeOut('fast');
                    mostrarToast('OFERTA EXPIRADA', 'El tiempo de la Oferta Relampago llego a 00:00 y fue retirada.');
                    registrarBitacora('PROMO EXPIRADA', 'Cronometro llego a 00:00: bloque de Oferta Relampago ocultado del Lobby');
                }
            }
        }, 1000);
    }

    function detenerTimerModal() {
        if (intervaloModal !== null) {
            clearInterval(intervaloModal);
            intervaloModal = null;
        }
    }

    function iniciarTimerModal() {
        detenerTimerModal();
        segundosRestantes = 30;
        $('#timer-modal').text('00:30');

        intervaloModal = setInterval(function () {
            segundosRestantes = segundosRestantes - 1;
            var segTexto = segundosRestantes < 10 ? '0' + segundosRestantes : segundosRestantes;
            $('#timer-modal').text('00:' + segTexto);

            if (segundosRestantes <= 0) {
                detenerTimerModal();
                $('#modal-confirmacion').fadeOut('fast');
                mostrarToast('TARIFA FLASH EXPIRADA', 'El tiempo de 30 segundos agoto la sesion de confirmacion.');
                registrarBitacora('TIMER EXPIRADO', 'Tarifa Flash Expirada por inactividad en modal de confirmacion');
            }
        }, 1000);
    }

    function vaciarCarritoCompleto() {
        totalPagar = 0;
        totalItems = 0;
        $('#lista-carrito').html('<li class="carrito-vacio">Sin reservas ni snacks activos.</li>');
        $('#modal-resumen-lista').html('');

        var $reservadas = $('.estacion.reservada-cliente');
        $reservadas.removeClass('estado-reservado reservada-cliente').addClass('estado-disponible');
        $reservadas.find('.badge-estado').text('Disponible');
        $reservadas.find('select, input, .btn-reservar-estacion').prop('disabled', false);
        $reservadas.find('.btn-reservar-estacion').text('Reservar');

        if (!promoExpirada) {
            promoReclamada = false;
            $('#btn-reclamar-promo').prop('disabled', false).text('Reclamar Promo (45 Bs + Pizza GRATIS)');
        }

        actualizarTotalesHUD();
    }

    inicializarEstacionesConsolas();
    inicializarEstacionesPC();
    inicializarMaquinasArcade();
    iniciarRelojPromo10Minutos();

    $('#app-hud').on('click', function (e) {
        var target = e.target;
        var boton = target.closest('button');
        if (!boton) {
            return;
        }

        if (boton.classList.contains('btn-nav-hud') || boton.classList.contains('btn-nav-movil') || boton.classList.contains('btn-acceso-lateral')) {
            var vistaDestino = boton.dataset.vista;
            var temaDestino = boton.dataset.tema || '';
            var tituloDestino = boton.dataset.titulo || 'Lobby Principal';
            var consolaDestino = boton.dataset.consola || 'todos';
            if (vistaDestino) {
                cambiarVistaExclusiva(vistaDestino, temaDestino, tituloDestino, consolaDestino);
                registrarBitacora('NAVEGACION', 'Cliente entro a la vista: ' + tituloDestino);
            }
        }
    });

    $('.btn-volver').click(function () {
        cambiarVistaExclusiva('vista-lobby', '', 'Lobby Principal');
        registrarBitacora('NAVEGACION', 'Cliente regreso al Lobby Principal');
    });

    $('#btn-tema').click(function () {
        $('body').toggleClass('modo-claro');
        var esClaro = $('body').hasClass('modo-claro');
        $(this).text(esClaro ? 'Modo Noche' : 'Modo Claro');
        registrarBitacora('TEMA HUD', 'Cambio de interfaz a ' + (esClaro ? 'Modo Claro Cyber-Silver' : 'Modo Noche Neon'));
    });

    $('#btn-menu').click(function () {
        $(this).toggleClass('activo');
        $('#menu-movil').toggleClass('activo show').stop(true, true).slideToggle('fast');
        registrarBitacora('MENU MOVIL', 'Despliegue de navegacion movil con toggleClass y slideToggle');
    });

    $('#btn-like-lobby').click(function () {
        contadorLikes = contadorLikes + 1;
        $('#contador-likes').text(contadorLikes);
        registrarBitacora('REACCION CLICK', 'Cliente envio un Like al Cibercafe (Total: ' + contadorLikes + ')');
    });

    $('#btn-like-lobby').on('dblclick', function () {
        contadorLikes = contadorLikes + 5;
        $('#contador-likes').text(contadorLikes);
        mostrarToast('SUPER LIKE GAMER', 'Doble clic detectado: +5 puntos de energia al servidor.');
        registrarBitacora('REACCION DBLCLICK', 'Super Like activado con doble clic (Total: ' + contadorLikes + ')');
    });

    $('#buscador-rapido').on('keyup', function (e) {
        var texto = $(this).val().toLowerCase().trim();
        registrarBitacora('BUSCADOR KEYUP', 'Tecla (' + e.key + ') - Filtro: "' + texto + '"');

        $('.item-sugerencia').each(function () {
            var palabras = ($(this).attr('data-keywords') || '').toLowerCase();
            var contenido = $(this).text().toLowerCase();
            if (texto === '' || palabras.indexOf(texto) !== -1 || contenido.indexOf(texto) !== -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $('.item-sugerencia').click(function () {
        var vista = $(this).attr('data-vista');
        var tema = $(this).attr('data-tema');
        var titulo = $(this).attr('data-titulo');
        var consola = $(this).attr('data-consola') || 'todos';
        cambiarVistaExclusiva(vista, tema, titulo, consola);
        registrarBitacora('RADAR ACCESO', 'Salto sincronizado hacia: ' + titulo);
    });

    $('.btn-filtro-consola').click(function () {
        var claveConsola = $(this).attr('data-consola');
        var tema = $(this).attr('data-tema');
        var textoBoton = $(this).text();
        activarFiltroConsolaEspecifico(claveConsola, tema, 'Plataforma: ' + textoBoton);
        registrarBitacora('FILTRO CONSOLA', 'Plataforma seleccionada: ' + textoBoton);
    });

    $('.btn-filtro-pc').click(function () {
        var gama = $(this).attr('data-gama');
        $('.btn-filtro-pc').removeClass('activo');
        $(this).addClass('activo');

        if (gama === 'todas') {
            $('.item-pc').fadeIn('fast');
        } else {
            $('.item-pc').hide();
            $('.item-pc[data-gama="' + gama + '"]').fadeIn('fast');
        }
        registrarBitacora('FILTRO PC', 'Filtro de gama PC activado: ' + $(this).text());
    });

    $('.btn-filtro-snack').click(function () {
        var categoria = $(this).attr('data-categoria');
        $('.btn-filtro-snack').removeClass('activo');
        $(this).addClass('activo');

        if (categoria === 'todos') {
            $('.card-snack').fadeIn('fast');
        } else {
            $('.card-snack').hide();
            $('.card-snack[data-categoria="' + categoria + '"]').fadeIn('fast');
        }
        registrarBitacora('FILTRO SNACK', 'Categoria de snacks seleccionada: ' + $(this).text());
    });

    $(document).on('click', '.accordion-btn', function () {
        var $btn = $(this);
        var $bloque = $btn.closest('.bloque-plataforma');
        var $panel = $bloque.find('.accordion-panel');
        var detalle = $btn.attr('data-detalle');

        $btn.toggleClass('abierto');
        $panel.slideToggle('fast');

        if ($btn.hasClass('abierto')) {
            $btn.text('Ocultar Estaciones [-]');
            registrarBitacora('ACORDEON', 'Mostrando estaciones de ' + detalle);
        } else {
            $btn.text('Desplegar Estaciones [+]');
            registrarBitacora('ACORDEON', 'Ocultando estaciones de ' + detalle);
        }
    });

    $(document).on('change input', '.select-controles, .input-horas, .select-juego, .select-modo-arcade', function (e) {
        var $estacion = $(this).closest('.estacion');
        var tipo = $estacion.attr('data-tipo');
        var codigoEst = $estacion.attr('data-codigo');
        var precioBase = parseInt($estacion.attr('data-precio')) || 15;

        var cantidadTiempo = parseInt($estacion.find('.input-horas').val());
        if (isNaN(cantidadTiempo) || cantidadTiempo < 1) {
            cantidadTiempo = 1;
        }
        if (cantidadTiempo > 15) {
            cantidadTiempo = 15;
        }
        $estacion.find('.input-horas').val(cantidadTiempo);

        var subtotal = 0;
        var resumenVariante = '';

        if (tipo === 'consola') {
            var extraControl = parseInt($estacion.find('.select-controles').val()) || 0;
            var textoControl = $estacion.find('.select-controles option:selected').attr('data-texto') || '1 Control';
            var juegoElegido = $estacion.find('.select-juego').val() || '';
            subtotal = (precioBase * cantidadTiempo) + extraControl;
            resumenVariante = juegoElegido + ' | ' + textoControl + ' | ' + cantidadTiempo + 'h';
        } else if (tipo === 'pc') {
            subtotal = precioBase * cantidadTiempo;
            resumenVariante = cantidadTiempo + ' Horas';
        } else if (tipo === 'arcade') {
            var tarifaModo = parseInt($estacion.find('.select-modo-arcade').val()) || 10;
            var unidadModo = $estacion.find('.select-modo-arcade option:selected').attr('data-unidad') || 'Hora(s)';
            subtotal = tarifaModo * cantidadTiempo;
            resumenVariante = cantidadTiempo + ' ' + unidadModo;
        }

        $estacion.find('.val-subtotal').text(subtotal);

        if (e.type === 'change') {
            registrarBitacora('CAMBIO VARIANTE', 'Estacion ' + codigoEst + ': ' + resumenVariante + ' (' + subtotal + ' Bs)');
        }
    });

    $('#forma-pago, #select-modalidad').on('change', function () {
        registrarBitacora('CHECKOUT OPCION', 'Seleccion actualizada: ' + $(this).val());
    });

    $(document).on('click', '.btn-reservar-estacion', function () {
        var $btn = $(this);
        var $estacion = $btn.closest('.estacion');
        var tipo = $estacion.attr('data-tipo');
        var codigoEst = $estacion.attr('data-codigo');
        var precioBase = parseInt($estacion.attr('data-precio')) || 15;
        var cantidadTiempo = parseInt($estacion.find('.input-horas').val()) || 1;
        var subtotal = 0;
        var textoItem = '';

        if (tipo === 'consola') {
            var nombreConsola = $estacion.closest('.bloque-plataforma').attr('data-nombre');
            var extraControl = parseInt($estacion.find('.select-controles').val()) || 0;
            var textoControl = $estacion.find('.select-controles option:selected').attr('data-texto') || '1 Control';
            var juegoElegido = $estacion.find('.select-juego').val();
            subtotal = (precioBase * cantidadTiempo) + extraControl;
            textoItem = '[' + codigoEst + '] ' + nombreConsola + ' - Juego: ' + juegoElegido + ' (' + textoControl + ', ' + cantidadTiempo + 'h) = ' + subtotal + ' Bs';
        } else if (tipo === 'pc') {
            var gamaNombre = $estacion.attr('data-nombre');
            subtotal = precioBase * cantidadTiempo;
            textoItem = '[' + codigoEst + '] ' + gamaNombre + ' (' + cantidadTiempo + 'h) = ' + subtotal + ' Bs';
        } else if (tipo === 'arcade') {
            var juegoArcade = $estacion.attr('data-nombre');
            var tarifaModo = parseInt($estacion.find('.select-modo-arcade').val()) || 10;
            var unidadModo = $estacion.find('.select-modo-arcade option:selected').attr('data-unidad');
            subtotal = tarifaModo * cantidadTiempo;
            textoItem = '[' + codigoEst + '] Arcade ' + juegoArcade + ' (' + cantidadTiempo + ' ' + unidadModo + ') = ' + subtotal + ' Bs';
        }

        $('.carrito-vacio').remove();
        $('#lista-carrito').append('<li>' + textoItem + '</li>');

        totalPagar = totalPagar + subtotal;
        totalItems = totalItems + 1;
        actualizarTotalesHUD();

        $estacion.removeClass('estado-disponible').addClass('estado-reservado reservada-cliente');
        $estacion.find('.badge-estado').text('Reservado');
        $estacion.find('select, input').prop('disabled', true);
        $btn.prop('disabled', true).text('Reservado');

        mostrarToast('ESTACION RESERVADA', codigoEst + ' cargada al carrito (' + subtotal + ' Bs).');
        registrarBitacora('RESERVA ESTACION', textoItem);
    });

    $('.btn-pedir-snack').click(function () {
        var $card = $(this).closest('.card-snack');
        var producto = $card.attr('data-prod');
        var precio = parseInt($card.attr('data-precio')) || 0;

        $('.carrito-vacio').remove();
        var textoSnack = 'Snack/Combo: ' + producto + ' = ' + precio + ' Bs';
        $('#lista-carrito').append('<li>' + textoSnack + '</li>');

        totalPagar = totalPagar + precio;
        totalItems = totalItems + 1;
        actualizarTotalesHUD();

        mostrarToast('PEDIDO AGREGADO', producto + ' (' + precio + ' Bs) cargado al carrito.');
        registrarBitacora('PEDIDO SNACK', 'Producto anadido: ' + producto + ' - ' + precio + ' Bs');
    });

    $('#btn-reclamar-promo').click(function () {
        if (promoExpirada || segundosPromo10m <= 0) {
            return;
        }
        var nombrePromo = $(this).attr('data-nombre');
        var precioPromo = parseInt($(this).attr('data-precio')) || 45;

        $('.carrito-vacio').remove();
        $('#lista-carrito').append('<li>' + nombrePromo + ' = ' + precioPromo + ' Bs</li>');

        totalPagar = totalPagar + precioPromo;
        totalItems = totalItems + 1;
        promoReclamada = true;
        actualizarTotalesHUD();

        $(this).prop('disabled', true).text('Promo Reclamada en Carrito');
        mostrarToast('PROMO RECLAMADA', 'PS5 (2h + 4 Controles) + Pizza Familiar 8 Porciones GRATIS agregada.');
        registrarBitacora('PROMO RELAMPAGO', 'Cliente reclamo la Promo PS5 + Pizza Familiar Gratis por ' + precioPromo + ' Bs');
    });

    $('#btn-vaciar-carrito').click(function () {
        vaciarCarritoCompleto();
        registrarBitacora('CARRITO', 'El cliente vacio todos los items del carrito');
    });

    $('#btn-limpiar-log').click(function () {
        $('#log-output').html('');
        $('#log-mini').html('');
        registrarBitacora('SISTEMA', 'Historial de bitacora reiniciado manualmente');
    });

    $('#btn-abrir-modal').click(function () {
        $('#modal-error').hide().text('');
        var contenidoActual = $('#lista-carrito').html();
        $('#modal-resumen-lista').html(contenidoActual);
        $('#modal-total').text(totalPagar);
        $('#modal-confirmacion').fadeIn('fast');
        iniciarTimerModal();
        registrarBitacora('MODAL CHECKOUT', 'Apertura de ventana modal con temporizador de 30s');
    });

    $('#btn-cerrar-modal').click(function () {
        detenerTimerModal();
        $('#modal-confirmacion').fadeOut('fast');
        registrarBitacora('MODAL CHECKOUT', 'Cierre manual de ventana modal');
    });

    $('#form-checkout').on('submit', function (e) {
        e.preventDefault();

        var nombreCliente = $('#input-nombre-cliente').val().trim();
        var modalidad = $('#select-modalidad').val();
        var formaPago = $('#forma-pago').val();

        if (nombreCliente === '') {
            $('#modal-error').text('Error: Debes ingresar el Nombre del Jugador / Cliente.').fadeIn('fast');
            registrarBitacora('ERROR VALIDACION', 'Intento de envio sin nombre de cliente');
            return;
        }

        if (totalPagar <= 0 || totalItems <= 0) {
            $('#modal-error').text('Error: El carrito esta en 0 Bs. Selecciona una estacion, promo o snack.').fadeIn('fast');
            registrarBitacora('ERROR VALIDACION', 'Intento de confirmacion con carrito en 0 Bs');
            return;
        }

        detenerTimerModal();
        $('#modal-confirmacion').fadeOut('fast');
        $('#hud-jugador').text('Jugador: ' + nombreCliente);

        if (promoReclamada || !promoExpirada) {
            promoExpirada = true;
            clearInterval(intervaloPromo10m);
            $('#tarjeta-oferta-relampago, .panel-oferta-lobby').fadeOut('fast');
        }

        registrarBitacora('TRANSACCION EXITOSA', 'Cliente: ' + nombreCliente + ' | Modalidad: ' + modalidad + ' | Pago: ' + formaPago + ' | Total: ' + totalPagar + ' Bs');
        mostrarToast('TICKET CONFIRMADO (' + totalPagar + ' BS)', 'Jugador: ' + nombreCliente + ' | Pago: ' + formaPago + ' | ' + modalidad);

        $('#lista-carrito').html('<li class="carrito-vacio">Sin reservas ni snacks activos.</li>');
        $('#modal-resumen-lista').html('');
        $('#input-nombre-cliente').val('');
        totalPagar = 0;
        totalItems = 0;
        actualizarTotalesHUD();
    });

    registrarBitacora('SISTEMA HUD', 'HUD LevelUp inicializado: 70 Consolas, 20 PCs, 25 Arcades y 140 Juegos');

});
