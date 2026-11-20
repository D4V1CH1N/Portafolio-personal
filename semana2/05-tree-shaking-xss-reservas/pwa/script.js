// Semana 2 - Tree Shaking y Reservas Anti-XSS - Bloqueo Prompt Instalacion
window.addEventListener('beforeinstallprompt', function(e) { e.preventDefault(); });
$(document).ready(function() {
    function mostrarToast(msg) {
        $('#toastNotificacion').text(msg).stop(true, true).slideDown(250).delay(3000).fadeOut(400);
    }

    if (localStorage.getItem('temaOscuroS2') === 'true') {
        $('body').addClass('dark-mode');
    }
    $('#themeBtn i').attr('class', $('body').hasClass('dark-mode') ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill');

    $(document).off('click', '#themeBtn').on('click', '#themeBtn', function() {
        $('body').toggleClass('dark-mode');
        let oscuro = $('body').hasClass('dark-mode');
        localStorage.setItem('temaOscuroS2', oscuro);
        $('#themeBtn i').attr('class', oscuro ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill');
    });

    $(document).off('click', '#hamburgerBtn').on('click', '#hamburgerBtn', function() {
        $('#navMenu').slideToggle(250);
    });

    $(document).off('click', '.acordeon-gatillo').on('click', '.acordeon-gatillo', function() {
        $(this).next('.acordeon-contenido').slideToggle('fast');
    });

    $(document).off('change', '#capa1').on('change', '#capa1', function() {
        let v = $(this).val();
        $('#capa2').html('<option value="">-- Capa 2 --</option>');
        $('#capa3').html('<option value="">-- Capa 3 --</option>').prop('disabled', true);
        if (v === 'academico') {
            $('#capa2').append('<option value="web2">Diseno Web II</option><option value="bd">Base de Datos</option>').prop('disabled', false);
        } else if (v === 'desarrollo') {
            $('#capa2').append('<option value="pwa">Arquitectura PWA</option><option value="net">C# .NET</option>').prop('disabled', false);
        } else {
            $('#capa2').prop('disabled', true);
        }
    });

    $(document).off('change', '#capa2').on('change', '#capa2', function() {
        let v = $(this).val();
        $('#capa3').html('<option value="">-- Capa 3 --</option>');
        if (v) {
            $('#capa3').append('<option value="dom">DOM y Eventos</option><option value="sync">Offline Sync</option>').prop('disabled', false);
        } else {
            $('#capa3').prop('disabled', true);
        }
    });

    $(document).off('change', '#capa3').on('change', '#capa3', function() {
        if ($(this).val()) {
            $('#resultadoFiltro').text('Cascada: ' + $('#capa1 option:selected').text() + ' > ' + $('#capa2 option:selected').text() + ' > ' + $(this).find('option:selected').text());
        }
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
    $(document).off('click', '#btnModal, #btnAbrirTarifaFlash').on('click', '#btnModal, #btnAbrirTarifaFlash', function() {
        if (timerModal) clearInterval(timerModal);
        let seg = 30;
        $('#contadorTarifaFlash').text(seg + 's').css('color', '#00ff9d');
        $('#btnConfirmarTarifaFlash').prop('disabled', false);
        $('#modalTimer30s').fadeIn(200);
        timerModal = setInterval(function() {
            seg--;
            if (seg <= 0) {
                clearInterval(timerModal);
                $('#contadorTarifaFlash').text('Sesion Expirada').css('color', '#ef4444');
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

    const PORTADAS_OFICIALES_S2 = {
        "https://open.spotify.com/playlist/356cdaFfhSWpUFP8rfVAzo": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c7ac486332c2811ead9583f3",
        "https://open.spotify.com/playlist/3XqlDXRNLKB4KJSbyhDjNZ": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84fb35cef5e78d714c4988b8a2",
        "https://open.spotify.com/playlist/4Rum8fiElouqBKP3PP1SIh": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da848abd40536ac267f4ae08b27f",
        "https://open.spotify.com/playlist/3oDK4P5TgunBb8GRPcfd9G": "https://mosaic.scdn.co/300/ab67616d00001e025149c948fde506624246a684ab67616d00001e02566acaba72c5509e3887c4b0ab67616d00001e027c2b1dc1639152beaeadf00dab67616d00001e0290b88187a9831d91f2438927",
        "https://open.spotify.com/playlist/4VrpjOoamcYdvaLVgekjn7": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84f1d63d798916673bb3fae4d6",
        "https://open.spotify.com/playlist/7fvjGUXWoZsmTZ68VGrkD3": "https://mosaic.scdn.co/300/ab67616d00001e02323a7e13e8db7c6ba5e09c58ab67616d00001e02567a5eb8a519900fb57c5591ab67616d00001e0285d6ba9f273b00251a381f2cab67616d00001e029a0e68fc6761a742bf9b8659"
    };
    try {
        const cacheGuardadoS2 = localStorage.getItem('boveda_portadas_spotify_v2');
        if (cacheGuardadoS2) Object.assign(PORTADAS_OFICIALES_S2, JSON.parse(cacheGuardadoS2));
    } catch (errCacheS2) {}

    async function resolverCover(cancion) {
        if (cancion.spotifyUrl) {
            let urlLimpia = cancion.spotifyUrl.split('?')[0];
            if (PORTADAS_OFICIALES_S2[urlLimpia]) {
                let realUrl = PORTADAS_OFICIALES_S2[urlLimpia];
                return { mini: realUrl, media: realUrl, original: realUrl };
            }
            try {
                let resOembed = await fetch('https://open.spotify.com/oembed?url=' + encodeURIComponent(urlLimpia));
                if (resOembed.ok) {
                    let datosOembed = await resOembed.json();
                    if (datosOembed && datosOembed.thumbnail_url) {
                        PORTADAS_OFICIALES_S2[urlLimpia] = datosOembed.thumbnail_url;
                        try { localStorage.setItem('boveda_portadas_spotify_v2', JSON.stringify(PORTADAS_OFICIALES_S2)); } catch (errSave) {}
                        return { mini: datosOembed.thumbnail_url, media: datosOembed.thumbnail_url, original: datosOembed.thumbnail_url };
                    }
                }
            } catch (errOembed) {}
            return {
                mini: cancion.portada || cancion.portadaMini,
                media: cancion.portadaMedia || cancion.portadaMini,
                original: cancion.portadaOriginal || cancion.portadaMedia || cancion.portadaMini
            };
        }
        if (cancion.portadaMini && cancion.portadaMini.indexOf('emerald/') !== -1) {
            return {
                mini: cancion.portada || cancion.portadaMini,
                media: cancion.portadaMedia || cancion.portadaMini,
                original: cancion.portadaOriginal || cancion.portadaMedia || cancion.portadaMini
            };
        }
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
                    let pack = { mini: u.replace('100x100bb', '60x60bb'), media: u.replace('100x100bb', '600x600bb'), original: u.replace('100x100bb', '1000x1000bb') };
                    localStorage.setItem(key, JSON.stringify(pack));
                    return pack;
                }
            }
        } catch (err) {}
        return { mini: cancion.portadaMini, media: cancion.portadaMedia, original: cancion.portadaOriginal };
    }

    const PLAYLISTS_RESPALDO_S2 = [
        { id: 1, titulo: "SISAS", artista: "Playlist Spotify | Rap / Trap", genero: "Rap / Trap", pokemonId: 289, spotifyUrl: "https://open.spotify.com/playlist/2b4rtI2NJ76d5x1GrrJuY1", portada: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/289.png", portadaMini: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/289.png", portadaMedia: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/289.png", portadaOriginal: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/289.png" },
        { id: 2, titulo: "Sangre y Codigo", artista: "Playlist Spotify | Gaming PS4", genero: "Gaming PS4", pokemonId: 257, spotifyUrl: "https://open.spotify.com/playlist/356cdaFfhSWpUFP8rfVAzo", portada: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c7ac486332c2811ead9583f3", portadaMini: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c7ac486332c2811ead9583f3", portadaMedia: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c7ac486332c2811ead9583f3", portadaOriginal: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c7ac486332c2811ead9583f3" },
        { id: 3, titulo: "GLitCH-h0P", artista: "Playlist Spotify | Gaming PS4", genero: "Gaming PS4", pokemonId: 380, spotifyUrl: "https://open.spotify.com/playlist/3XqlDXRNLKB4KJSbyhDjNZ", portada: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84fb35cef5e78d714c4988b8a2", portadaMini: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84fb35cef5e78d714c4988b8a2", portadaMedia: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84fb35cef5e78d714c4988b8a2", portadaOriginal: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84fb35cef5e78d714c4988b8a2" },
        { id: 4, titulo: "Nin-Cor3", artista: "Playlist Spotify | Gaming PS4", genero: "Gaming PS4", pokemonId: 248, spotifyUrl: "https://open.spotify.com/playlist/6KIR70JxdBrabHuglEE1dy", portada: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/248.png", portadaMini: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/248.png", portadaMedia: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/248.png", portadaOriginal: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/248.png" },
        { id: 5, titulo: "R4v# mfk", artista: "Playlist Spotify | Gaming PS4", genero: "Gaming PS4", pokemonId: 3, spotifyUrl: "https://open.spotify.com/playlist/2x1TN7eeu1Rf37NInsajjS", portada: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/3.png", portadaMini: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/3.png", portadaMedia: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/3.png", portadaOriginal: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/3.png" },
        { id: 6, titulo: "HYP3", artista: "Playlist Spotify | Gaming PS4", genero: "Gaming PS4", pokemonId: 319, spotifyUrl: "https://open.spotify.com/playlist/157CR5vgVYfaCo8eoWekl6", portada: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/319.png", portadaMini: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/319.png", portadaMedia: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/319.png", portadaOriginal: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/319.png" },
        { id: 7, titulo: "El asesino", artista: "Playlist Spotify | Rap / Trap", genero: "Rap / Trap", pokemonId: 212, spotifyUrl: "https://open.spotify.com/playlist/4Rum8fiElouqBKP3PP1SIh", portada: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da848abd40536ac267f4ae08b27f", portadaMini: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da848abd40536ac267f4ae08b27f", portadaMedia: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da848abd40536ac267f4ae08b27f", portadaOriginal: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da848abd40536ac267f4ae08b27f" },
        { id: 8, titulo: "Emergencia", artista: "Playlist Spotify | Rock / Alt", genero: "Rock / Alt", pokemonId: 254, spotifyUrl: "https://open.spotify.com/playlist/3oDK4P5TgunBb8GRPcfd9G", portada: "https://mosaic.scdn.co/300/ab67616d00001e025149c948fde506624246a684ab67616d00001e02566acaba72c5509e3887c4b0ab67616d00001e027c2b1dc1639152beaeadf00dab67616d00001e0290b88187a9831d91f2438927", portadaMini: "https://mosaic.scdn.co/300/ab67616d00001e025149c948fde506624246a684ab67616d00001e02566acaba72c5509e3887c4b0ab67616d00001e027c2b1dc1639152beaeadf00dab67616d00001e0290b88187a9831d91f2438927", portadaMedia: "https://mosaic.scdn.co/300/ab67616d00001e025149c948fde506624246a684ab67616d00001e02566acaba72c5509e3887c4b0ab67616d00001e027c2b1dc1639152beaeadf00dab67616d00001e0290b88187a9831d91f2438927", portadaOriginal: "https://mosaic.scdn.co/300/ab67616d00001e025149c948fde506624246a684ab67616d00001e02566acaba72c5509e3887c4b0ab67616d00001e027c2b1dc1639152beaeadf00dab67616d00001e0290b88187a9831d91f2438927" },
        { id: 9, titulo: "Rap del Credo", artista: "Playlist Spotify | Rap / Trap", genero: "Rap / Trap", pokemonId: 260, spotifyUrl: "https://open.spotify.com/playlist/4VrpjOoamcYdvaLVgekjn7", portada: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84f1d63d798916673bb3fae4d6", portadaMini: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84f1d63d798916673bb3fae4d6", portadaMedia: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84f1d63d798916673bb3fae4d6", portadaOriginal: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84f1d63d798916673bb3fae4d6" },
        { id: 10, titulo: "Favorite Songs", artista: "Playlist Spotify | Chill / Lo-Fi", genero: "Chill / Lo-Fi", pokemonId: 306, spotifyUrl: "https://open.spotify.com/playlist/7fvjGUXWoZsmTZ68VGrkD3", portada: "https://mosaic.scdn.co/300/ab67616d00001e02323a7e13e8db7c6ba5e09c58ab67616d00001e02567a5eb8a519900fb57c5591ab67616d00001e0285d6ba9f273b00251a381f2cab67616d00001e029a0e68fc6761a742bf9b8659", portadaMini: "https://mosaic.scdn.co/300/ab67616d00001e02323a7e13e8db7c6ba5e09c58ab67616d00001e02567a5eb8a519900fb57c5591ab67616d00001e0285d6ba9f273b00251a381f2cab67616d00001e029a0e68fc6761a742bf9b8659", portadaMedia: "https://mosaic.scdn.co/300/ab67616d00001e02323a7e13e8db7c6ba5e09c58ab67616d00001e02567a5eb8a519900fb57c5591ab67616d00001e0285d6ba9f273b00251a381f2cab67616d00001e029a0e68fc6761a742bf9b8659", portadaOriginal: "https://mosaic.scdn.co/300/ab67616d00001e02323a7e13e8db7c6ba5e09c58ab67616d00001e02567a5eb8a519900fb57c5591ab67616d00001e0285d6ba9f273b00251a381f2cab67616d00001e029a0e68fc6761a742bf9b8659" },
        { id: 11, titulo: "BestAlbums.", artista: "Playlist Spotify | Rock / Alt", genero: "Rock / Alt", pokemonId: 383, spotifyUrl: "https://open.spotify.com/playlist/3EcShvyD30njVVhPVGM8Bt", portada: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/383.png", portadaMini: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/383.png", portadaMedia: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/383.png", portadaOriginal: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/383.png" },
        { id: 12, titulo: "HyP3R90P", artista: "Playlist Spotify | Varios / Raros", genero: "Varios / Raros", pokemonId: 230, spotifyUrl: "https://open.spotify.com/playlist/1JS4ls3C28V2Cff2CNTNBL", portada: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/230.png", portadaMini: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/230.png", portadaMedia: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/230.png", portadaOriginal: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/230.png" },
        { id: 13, titulo: "Clique |-/", artista: "Playlist Spotify | Rock / Alt", genero: "Rock / Alt", pokemonId: 244, spotifyUrl: "https://open.spotify.com/playlist/6icMn94oor2J8oEHiAPMpz", portada: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/244.png", portadaMini: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/244.png", portadaMedia: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/244.png", portadaOriginal: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/244.png" },
        { id: 14, titulo: "Programming..", artista: "Playlist Spotify | Chill / Lo-Fi", genero: "Chill / Lo-Fi", pokemonId: 310, spotifyUrl: "https://open.spotify.com/playlist/1c6YukmmlJYKTcmYGAvbvl", portada: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/310.png", portadaMini: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/310.png", portadaMedia: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/310.png", portadaOriginal: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/310.png" },
        { id: 15, titulo: "Late Night Chill", artista: "Playlist Spotify | Chill / Lo-Fi", genero: "Chill / Lo-Fi", pokemonId: 336, spotifyUrl: "https://open.spotify.com/playlist/6WXL3TpPeMDK8xOVslWl0z", portada: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/336.png", portadaMini: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/336.png", portadaMedia: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/336.png", portadaOriginal: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/336.png" },
        { id: 16, titulo: "Argentrap", artista: "Playlist Spotify | Rap / Trap", genero: "Rap / Trap", pokemonId: 356, spotifyUrl: "https://open.spotify.com/playlist/5DsmS5Y6xRRLtzfvp4mVpF", portada: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/356.png", portadaMini: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/356.png", portadaMedia: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/356.png", portadaOriginal: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/356.png" }
    ];

    function renderizarPlaylistsFetchS2(lista, $box) {
        $box.empty();
        lista.forEach(function(c) {
            let $card = $('<article>').addClass('fila-fetch tarjeta-pista').attr('data-id', c.id);
            let $izq = $('<div>').css({ display: 'flex', alignItems: 'center', gap: '10px', flex: '1', minWidth: 0 });
            let $img = $('<img>').attr({ src: c.portada || c.portadaMini, alt: c.titulo, loading: 'lazy', decoding: 'async', width: 64, height: 64 }).addClass('img-lazy-zoom img-expandible img-ampliable')
                .data({ media: c.portadaMedia, original: c.portadaOriginal, titulo: c.titulo + ' (' + c.genero + ')' });
            let $txt = $('<div>').css('minWidth', 0).append($('<div>').css('fontWeight', '700').text(c.titulo), $('<div>').addClass('texto-verde').text(c.artista));
            $izq.append($img, $txt);
            let $btnAdd = $('<button>').attr('type', 'button').addClass('btn-outline btn-agregar-cola').data('cancion', c.titulo + ' [' + c.genero + ']').html('<i class="bi bi-plus-lg"></i> Lista');
            $card.append($izq, $btnAdd);
            $box.append($card);
            resolverCover(c).then(function(pack) {
                $img.attr('src', pack.mini).data({ media: pack.media, original: pack.original });
            });
        });
    }

    async function cargarKaraokeFetch() {
        let $box = $('#contenedorCatalogoKaraoke');
        if (!$box.length) return;
        try {
            let response = await fetch('../../../data/canciones.json');
            if (!response.ok) throw new Error('Error HTTP al leer canciones.json');
            let lista = await response.json();
            renderizarPlaylistsFetchS2(lista, $box);
        } catch (err) {
            renderizarPlaylistsFetchS2(PLAYLISTS_RESPALDO_S2, $box);
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

    function aplicarRolS2(rol, nombre) {
        let r = ['visitante', 'cliente', 'encargado', 'administrador'].includes(rol) ? rol : 'visitante';
        if (r === 'visitante') {
            sessionStorage.removeItem('sesionRolActiva');
            sessionStorage.removeItem('sesionUsuarioNombre');
            $('#zonaCuentaActivaS2').hide();
            $('#zonaFormsAuthS2').show();
            $('#badgeRolActivo').text('Visitante');
        } else {
            sessionStorage.setItem('sesionRolActiva', r);
            if (nombre) sessionStorage.setItem('sesionUsuarioNombre', nombre);
            let etiqueta = r.charAt(0).toUpperCase() + r.slice(1);
            $('#badgeRolActivo').text(etiqueta);
            $('#textoCuentaActivaS2').text((sessionStorage.getItem('sesionUsuarioNombre') || etiqueta) + ' (' + etiqueta + ')');
            $('#zonaFormsAuthS2').hide();
            $('#zonaCuentaActivaS2').show();
        }
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
    aplicarRolS2(sessionStorage.getItem('sesionRolActiva') || 'visitante', sessionStorage.getItem('sesionUsuarioNombre') || '');

    $(document).off('click', '#modalLoginRoles .auth-tab-btn').on('click', '#modalLoginRoles .auth-tab-btn', function() {
        let tab = $(this).data('auth-tab');
        $('#modalLoginRoles .auth-tab-btn').removeClass('activo');
        $(this).addClass('activo');
        if (tab === 'registro') {
            $('#formLoginRol').hide();
            $('#formRegistroRol').fadeIn(150);
        } else {
            $('#formRegistroRol').hide();
            $('#formLoginRol').fadeIn(150);
        }
    });

    $(document).off('click', '.btn-demo-s2').on('click', '.btn-demo-s2', function() {
        let correo = $(this).data('correo');
        let passMapa = { cliente: 'cliente123', encargado: 'staff123', administrador: 'admin123' };
        let rol = $(this).data('rol');
        $('#loginUsuario').val(correo);
        $('#loginPasswordS2').val(passMapa[rol] || 'cliente123');
    });

    $(document).off('click', '#btnCerrarSesionS2').on('click', '#btnCerrarSesionS2', function() {
        aplicarRolS2('visitante', '');
    });
    $(document).off('click', '#btnAbrirLoginModal').on('click', '#btnAbrirLoginModal', function() { $('#modalLoginRoles').fadeIn(200); });
    $(document).off('click', '#btnCerrarLoginRoles').on('click', '#btnCerrarLoginRoles', function() { $('#modalLoginRoles').fadeOut(200); });

    $(document).off('submit', '#formRegistroRol').on('submit', '#formRegistroRol', function(e) {
        e.preventDefault();
        let u = $('#regUsuario').val().trim();
        let correo = ($('#regCorreoS2').val() || '').trim().toLowerCase();
        let p = $('#regPassword').val().trim();
        let r = 'cliente';
        let list = JSON.parse(localStorage.getItem('usuariosPortafolio')) || [];
        list.push({ usuario: u, correo: correo, password: p, rol: r });
        localStorage.setItem('usuariosPortafolio', JSON.stringify(list));
        aplicarRolS2(r, u);
        this.reset();
        $('#modalLoginRoles').fadeOut(200);
    });

    $(document).off('submit', '#formLoginRol').on('submit', '#formLoginRol', function(e) {
        e.preventDefault();
        let u = ($('#loginUsuario').val() || '').trim().toLowerCase();
        let list = JSON.parse(localStorage.getItem('usuariosPortafolio')) || [];
        let baseDemo = { 'cliente@upds.edu.bo': 'cliente', 'encargado@educan.bo': 'encargado', 'david@chato.dev': 'administrador' };
        let f = list.find(function(item) { return (item.correo || '').toLowerCase() === u || (item.usuario || '').toLowerCase() === u; });
        let rol = f ? f.rol : (baseDemo[u] || 'cliente');
        aplicarRolS2(rol, f ? f.usuario : u);
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
        if ((sessionStorage.getItem('sesionRolActiva') || 'cliente') === 'cliente') $btn.hide();
        $fila.append($('<span>').addClass('titulo-truncado').text(tema), $btn);
        $('#listaCanciones').append($fila);
        $('#inputCancion').val('');
    });

    $(document).off('click', '.btn-agregar-cola').on('click', '.btn-agregar-cola', function() {
        let tema = ($(this).data('cancion') || '').toString().trim();
        if (!tema) return;
        let $fila = $('<div>').addClass('fila-cancion');
        let $btn = $('<button>').attr('type', 'button').addClass('btn-tactil btn-quitar').html('<i class="bi bi-trash"></i>');
        if ((sessionStorage.getItem('sesionRolActiva') || 'cliente') === 'cliente') $btn.hide();
        $fila.append($('<span>').addClass('titulo-truncado').text(tema), $btn);
        $('#listaCanciones').append($fila);
        mostrarToast('Playlist agregada a tu lista: ' + tema);
    });

    $(document).off('click', '.btn-quitar').on('click', '.btn-quitar', function() {
        $(this).closest('.fila-cancion').remove();
    });

    function renderizarDetalleSeguro(htmlDesdeServidor) {
        const limpio = typeof DOMPurify !== 'undefined' ? DOMPurify.sanitize(htmlDesdeServidor) : htmlDesdeServidor;
        $('#detalleProyecto').html(limpio);
    }

    $('#hamburgerBtn').off('click').on('click', function() {
        $('#navMenu').stop(true, true).slideToggle(300);
    });

    $(document).off('click', '.tarjeta-ods__boton--destacado').on('click', '.tarjeta-ods__boton--destacado', function() {
        renderizarDetalleSeguro($(this).data('detalle') || '');
    });

    // Semana 2 - Lightbox Seguro con Lazy Loading y Escape
    $('img').each(function() {
        if (!$(this).closest('#lightboxImagenVisor, #modalVisorImagen').length) {
            $(this).addClass('img-ampliable');
            if (!$(this).attr('loading')) $(this).attr('loading', 'lazy');
        }
    });

    $(document).off('click.lightboxV8', 'img').on('click.lightboxV8', 'img', function() {
        if ($(this).closest('#lightboxImagenVisor, #modalVisorImagen').length) return;
        let titulo = $(this).data('titulo') || $(this).attr('alt') || 'Vista Previa';
        let src = $(this).attr('data-original') || $(this).attr('data-media') || $(this).data('original') || $(this).data('media') || $(this).attr('src') || this.currentSrc || '';
        let tituloEl = document.getElementById('lightboxImagenTitulo');
        let fotoEl = document.getElementById('lightboxImagenFoto');
        if (tituloEl && fotoEl) {
            tituloEl.textContent = titulo;
            fotoEl.src = src;
            fotoEl.alt = titulo;
            $('#lightboxImagenVisor').addClass('activo');
        }
    });

    $(document).off('click.cerrarLightboxV8', '#btnCerrarLightbox, #lightboxImagenVisor').on('click.cerrarLightboxV8', '#btnCerrarLightbox, #lightboxImagenVisor', function(e) {
        if (e.target.id === 'btnCerrarLightbox' || e.target.id === 'lightboxImagenVisor' || $(e.target).closest('#btnCerrarLightbox').length) {
            $('#lightboxImagenVisor').removeClass('activo');
        }
    });

    $(document).off('keydown.lightboxEscV8').on('keydown.lightboxEscV8', function(e) {
        if (e.key === 'Escape') {
            $('#lightboxImagenVisor').removeClass('activo');
            $('#modalVisorImagen').fadeOut(150);
        }
    });
});