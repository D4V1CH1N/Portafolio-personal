$(document).ready(function() {
    function mostrarToast(msg) {
        $('#toastNotificacion').text(msg).stop(true, true).slideDown(250).delay(3000).fadeOut(400);
    }

    $(document).off('click', '#themeBtn').on('click', '#themeBtn', function() {
        $('body').toggleClass('dark-mode');
        localStorage.setItem('temaOscuroS2', $('body').hasClass('dark-mode'));
    });

    if (localStorage.getItem('temaOscuroS2') === 'true') {
        $('body').addClass('dark-mode');
    }

    $(document).off('click', '#hamburgerBtn').on('click', '#hamburgerBtn', function() {
        $('#navMenu').slideToggle(250);
    });

    $(document).off('click', '.acordeon-gatillo').on('click', '.acordeon-gatillo', function() {
        $(this).next('.acordeon-contenido').slideToggle(250);
    });

    $(document).off('mouseenter mouseleave', '.tarjeta-habilidad').on({
        mouseenter: function() { $(this).animate({ opacity: 0.75 }, 180); },
        mouseleave: function() { $(this).animate({ opacity: 1 }, 180); }
    }, '.tarjeta-habilidad');

    $(document).off('keyup', '#buscadorEnTiempoReal').on('keyup', '#buscadorEnTiempoReal', function() {
        let q = $(this).val().toLowerCase().trim();
        $('.tarjeta-filtrable').each(function() {
            $(this).toggle(q === '' || $(this).text().toLowerCase().indexOf(q) > -1);
        });
    });

    $(document).off('click', '.boton-filtro-dataset').on('click', '.boton-filtro-dataset', function() {
        let cat = this.dataset.categoria;
        $('.boton-filtro-dataset').removeClass('activo');
        $(this).addClass('activo');
        document.querySelectorAll('.item-categoria-dataset').forEach(function(el) {
            el.style.display = (cat === 'todos' || el.dataset.categoria === cat) ? 'block' : 'none';
        });
    });

    $(document).off('submit', '#form-contacto').on('submit', '#form-contacto', function(e) {
        e.preventDefault();
        let nombre = $('#input-nombre').val().trim();
        let correo = $('#correo').val().trim();
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (nombre.length < 3 || !regex.test(correo)) {
            $('#alertaBox').html('<div style="color:#ef4444;">Verifica tu nombre y correo electronico.</div>').slideDown();
            return;
        }
        $('#alertaBox').html('<div style="color:#10b981;">Propuesta validada con jQuery correctamente.</div>').slideDown();
        mostrarToast('Propuesta enviada.');
        this.reset();
    });

    $(document).off('click', '#liveContainer').on('click', '#liveContainer', function(e) {
        let $p = $(e.target).closest('[data-prod]');
        if ($p.length) {
            $('#logOutput').prepend($('<div>').text('[' + new Date().toLocaleTimeString() + '] Bubbling: ' + $p.data('prod')));
        }
        let $l = $(e.target).closest('[data-action="like"]');
        if ($l.length) {
            let n = parseInt($l.attr('data-likes') || '0', 10) + 1;
            $l.attr('data-likes', n);
            $('#logOutput').prepend($('<div>').text('[' + new Date().toLocaleTimeString() + '] Likes: ' + n));
        }
    });

    $(document).off('keyup', '#chatInput').on('keyup', '#chatInput', function(e) {
        if (e.key === 'Enter' && $(this).val().trim()) {
            $('#logOutput').prepend($('<div>').text('[' + new Date().toLocaleTimeString() + '] Chat: ' + $(this).val().trim()));
            $(this).val('');
        }
    });

    $(document).off('change', '#variantSelect').on('change', '#variantSelect', function() {
        $('#logDia2').prepend($('<div>').text('[' + new Date().toLocaleTimeString() + '] Edicion: ' + $(this).val()));
    });

    $(document).off('submit', '#orderForm').on('submit', '#orderForm', function(e) {
        e.preventDefault();
        $('#logDia2').prepend($('<div>').text('[' + new Date().toLocaleTimeString() + '] Pedido: ' + $('#userTikTok').val().trim() + ' | ' + $('#variantSelect').val()));
        this.reset();
    });

    $(document).off('input', '#hrs').on('input', '#hrs', function() {
        let h = parseFloat($(this).val()) || 0;
        $('#total').text((h * 40) + ' BOB');
    });

    let timerModal = null;
    $(document).off('click', '#btnAbrirTarifaFlash').on('click', '#btnAbrirTarifaFlash', function() {
        if (timerModal) clearInterval(timerModal);
        let seg = 30;
        $('#contadorTarifaFlash').text(seg + 's').css('color', '#00ff9d');
        $('#btnConfirmarTarifaFlash').prop('disabled', false);
        $('#modalTimer30s').fadeIn(200);
        timerModal = setInterval(function() {
            seg--;
            if (seg <= 0) {
                clearInterval(timerModal);
                $('#contadorTarifaFlash').text('Tarifa Flash Expirada').css('color', '#ef4444');
                $('#btnConfirmarTarifaFlash').prop('disabled', true);
                setTimeout(function() { $('#modalTimer30s').fadeOut(300); }, 1000);
            } else {
                $('#contadorTarifaFlash').text(seg + 's');
            }
        }, 1000);
    });

    $(document).off('click', '#btnConfirmarTarifaFlash').on('click', '#btnConfirmarTarifaFlash', function() {
        if (timerModal) clearInterval(timerModal);
        $('#modalTimer30s').fadeOut(200);
        mostrarToast('Tarifa Flash de 40 BOB/h confirmada.');
    });

    $(document).off('click', '#btnCerrarTimer30s').on('click', '#btnCerrarTimer30s', function() {
        if (timerModal) clearInterval(timerModal);
        $('#modalTimer30s').fadeOut(200);
    });

    async function resolverCover(cancion) {
        let key = 'cachePortadaTrack_' + cancion.id;
        let saved = localStorage.getItem(key);
        if (saved) {
            try { return JSON.parse(saved); } catch (err) {}
        }
        try {
            let res = await fetch('https://itunes.apple.com/search?term=' + encodeURIComponent(cancion.artista + ' ' + cancion.titulo) + '&entity=song&limit=1');
            if (res.ok) {
                let d = await res.json();
                if (d.results && d.results[0] && d.results[0].artworkUrl100) {
                    let u = d.results[0].artworkUrl100;
                    let pack = { mini: u, media: u.replace('100x100bb', '600x600bb'), original: u.replace('100x100bb', '1000x1000bb') };
                    localStorage.setItem(key, JSON.stringify(pack));
                    return pack;
                }
            }
        } catch (err) {}
        return { mini: cancion.portadaMini, media: cancion.portadaMedia, original: cancion.portadaOriginal };
    }

    async function cargarKaraokeFetch() {
        let $box = $('#contenedorCatalogoKaraoke');
        if (!$box.length) return;
        try {
            let response = await fetch('../../../data/canciones.json');
            if (!response.ok) throw new Error('Error HTTP al leer canciones.json');
            let lista = await response.json();
            $box.empty();
            lista.forEach(function(c) {
                let $card = $('<div>').addClass('fila-fetch');
                let $izq = $('<div>').css({ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 });
                let $img = $('<img>').attr({ src: c.portadaMini, alt: c.titulo, loading: 'lazy', width: 64, height: 64 }).addClass('img-lazy-zoom')
                    .data({ media: c.portadaMedia, original: c.portadaOriginal, titulo: c.titulo + ' - ' + c.artista });
                let $txt = $('<div>').css('minWidth', 0).append($('<div>').css('fontWeight', '700').text(c.titulo), $('<div>').addClass('texto-verde').text(c.artista));
                $izq.append($img, $txt);
                $card.append($izq);
                $box.append($card);
                resolverCover(c).then(function(pack) {
                    $img.attr('src', pack.mini).data({ media: pack.media, original: pack.original });
                });
            });
        } catch (err) {
            $box.html('<div style="color:#ef4444;">' + err.message + '</div>');
        }
    }
    cargarKaraokeFetch();

    $(document).off('click', '.img-lazy-zoom').on('click', '.img-lazy-zoom', function() {
        $('#visorImagenTitulo').text($(this).data('titulo'));
        $('#visorImagenMedia').attr('src', $(this).data('media'));
        $('#visorEnlaceOriginal').attr('href', $(this).data('original'));
        $('#modalVisorImagen').fadeIn(200);
    });

    $(document).off('click', '#btnCerrarVisorImagen').on('click', '#btnCerrarVisorImagen', function() {
        $('#modalVisorImagen').fadeOut(200);
    });

    function actualizarRedUI() {
        let $e = $('#estadoRed');
        $e.fadeIn('fast');
        if (navigator.onLine) {
            $e.html('<i class="bi bi-wifi"></i> En Linea').css({ background: '#dcfce7', color: '#166534', border: '1px solid #166534' });
            setTimeout(function() { $e.fadeOut('slow'); }, 2500);
        } else {
            $e.html('<i class="bi bi-wifi-off"></i> Offline (Datos Locales)').css({ background: '#ffedd5', color: '#9a3412', border: '1px solid #9a3412' });
        }
    }
    $(window).off('online.red offline.red').on('online.red offline.red', actualizarRedUI);
    actualizarRedUI();

    setTimeout(function() {
        let $hid = $('#contenedorHidratacion');
        if ($hid.length && $hid.attr('data-hidratado') !== 'true') {
            $hid.attr('data-hidratado', 'true').css({ background: '#0f172a', color: '#00ff9d', borderBottom: '2px solid #00ff9d' });
            $('#textoHidratacion').text('Hidratado');
            $('#estadoHidratacionAdmin').text('HIDRATADO (DOM Reactivo Activo)');
        }
    }, 300);

    $(document).off('submit', '#form-contacto').on('submit', '#form-contacto', function(e) {
        e.preventDefault();
        let datos = { nombre: $('#input-nombre').val(), correo: $('#correo').val(), mensaje: $('#mensaje').val(), fecha: new Date().toISOString() };
        if (!navigator.onLine) {
            let cola = JSON.parse(localStorage.getItem('colaContactosOffline')) || [];
            cola.push(datos);
            localStorage.setItem('colaContactosOffline', JSON.stringify(cola));
            localStorage.setItem('colaSincronizacionPWA', JSON.stringify(cola));
            $('#alertaBox').html('<div style="color:#f97316;">Guardado localmente - Pendiente de envio (Offline)</div>').slideDown();
            this.reset();
        } else {
            $('#alertaBox').html('<div style="color:#00ff9d;">Propuesta enviada con exito.</div>').slideDown();
            mostrarToast('Propuesta enviada al servidor.');
            this.reset();
        }
    });

    $(window).off('online.sync').on('online.sync', function() {
        let cola = JSON.parse(localStorage.getItem('colaContactosOffline')) || [];
        if (cola.length > 0) {
            let total = cola.length;
            while (cola.length > 0) { cola.shift(); }
            localStorage.removeItem('colaContactosOffline');
            localStorage.removeItem('colaSincronizacionPWA');
            $('#alertaBox').html('<div style="color:#00ff9d;">Conexion recuperada: ' + total + ' registro(s) sincronizado(s) FIFO.</div>').slideDown();
            mostrarToast('Sincronizacion FIFO completada.');
        }
    });

    function refrescarMonitorAdmin() {
        let cola = JSON.parse(localStorage.getItem('colaContactosOffline')) || [];
        $('#monitorColaOffline').text(cola.length ? '[OFFLINE QUEUE]: ' + JSON.stringify(cola) : '[SISTEMA]: 0 pendientes en colaContactosOffline.');
    }

    function aplicarRolS2(rol) {
        let r = ['cliente', 'encargado', 'administrador'].includes(rol) ? rol : 'cliente';
        localStorage.setItem('sesionActivaRol', r);
        $('#badgeRolActivo').text('Rol: ' + r.charAt(0).toUpperCase() + r.slice(1));
        $('#barraRolesRapidos .btn-rol-rapido').removeClass('activo');
        $('#barraRolesRapidos .btn-rol-rapido[data-rol="' + r + '"]').addClass('activo');
        if (r === 'encargado' || r === 'administrador') {
            $('#panelBitacoraEnVivo').fadeIn(200);
            $('.btn-quitar').show();
        } else {
            $('#panelBitacoraEnVivo').fadeOut(200);
            $('.btn-quitar').hide();
        }
        if (r === 'administrador') {
            $('#panelAdminSistema').fadeIn(200);
            refrescarMonitorAdmin();
        } else {
            $('#panelAdminSistema').fadeOut(200);
        }
    }
    aplicarRolS2(localStorage.getItem('sesionActivaRol') || 'cliente');

    $(document).off('click', '#barraRolesRapidos .btn-rol-rapido').on('click', '#barraRolesRapidos .btn-rol-rapido', function() {
        aplicarRolS2($(this).data('rol'));
    });
    $(document).off('click', '#btnAbrirLoginModal').on('click', '#btnAbrirLoginModal', function() { $('#modalLoginRoles').fadeIn(200); });
    $(document).off('click', '#btnCerrarLoginRoles').on('click', '#btnCerrarLoginRoles', function() { $('#modalLoginRoles').fadeOut(200); });

    $(document).off('submit', '#formRegistroRol').on('submit', '#formRegistroRol', function(e) {
        e.preventDefault();
        let u = $('#regUsuario').val().trim();
        let p = $('#regPassword').val().trim();
        let r = $('#regRol').val();
        let list = JSON.parse(localStorage.getItem('usuariosPortafolio')) || [];
        list = list.filter(function(item) { return item.usuario !== u; });
        list.push({ usuario: u, password: p, rol: r });
        localStorage.setItem('usuariosPortafolio', JSON.stringify(list));
        aplicarRolS2(r);
        this.reset();
        $('#modalLoginRoles').fadeOut(200);
    });

    $(document).off('submit', '#formLoginRol').on('submit', '#formLoginRol', function(e) {
        e.preventDefault();
        let u = $('#loginUsuario').val().trim();
        let list = JSON.parse(localStorage.getItem('usuariosPortafolio')) || [];
        let f = list.find(function(item) { return item.usuario === u; });
        aplicarRolS2(f ? f.rol : $('#loginRol').val());
        this.reset();
        $('#modalLoginRoles').fadeOut(200);
    });

    $(document).off('click', '#btnLimpiarMemoriaLocal').on('click', '#btnLimpiarMemoriaLocal', function() {
        localStorage.removeItem('colaContactosOffline');
        localStorage.removeItem('colaSincronizacionPWA');
        refrescarMonitorAdmin();
    });

    $(document).off('submit', '#formReserva').on('submit', '#formReserva', function(e) {
        e.preventDefault();
        let cli = $('#clienteNombre').val().trim();
        let sala = $('#salaSelect').val();
        if (!cli) return;
        let $li = $('<li>').addClass('item-reserva');
        $li.append($('<span>').text(cli + ' - ' + sala), $('<span>').addClass('texto-verde').text('Segura'));
        $('#listaReservas').prepend($li);
        this.reset();
    });

    $(document).off('click', '#btnPedir').on('click', '#btnPedir', function() {
        let tema = $('#inputCancion').val().trim();
        if (!tema) return;
        let $fila = $('<div>').addClass('fila-cancion');
        let $btn = $('<button>').attr('type', 'button').addClass('btn-tactil btn-quitar').html('<i class="bi bi-trash"></i>');
        if ((localStorage.getItem('sesionActivaRol') || 'cliente') === 'cliente') $btn.hide();
        $fila.append($('<span>').addClass('titulo-truncado').text(tema), $btn);
        $('#listaCanciones').append($fila);
        $('#inputCancion').val('');
    });

    $(document).off('click', '.btn-quitar').on('click', '.btn-quitar', function() {
        $(this).closest('.fila-cancion').remove();
    });
});