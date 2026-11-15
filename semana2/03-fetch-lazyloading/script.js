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
            let response = await fetch('../../data/canciones.json');
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
});