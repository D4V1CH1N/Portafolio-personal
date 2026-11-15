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
});