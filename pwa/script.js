$(document).ready(function() {
    function hidratarInterfaz() {
        let $box = $('#contenedorPWA');
        if ($box.attr('data-hidratado') === 'true') return;

        $(document).off('click', '.btn-abrir-modal').on('click', '.btn-abrir-modal', function(e) {
            e.preventDefault();
            let target = $(this).data('target');
            $(target).fadeIn('fast');
        });

        $(document).off('click', '.btn-cerrar-modal').on('click', '.btn-cerrar-modal', function(e) {
            e.preventDefault();
            $(this).closest('.app-modal').fadeOut('fast');
        });

        $(document).off('click', '.app-modal').on('click', '.app-modal', function(e) {
            if ($(e.target).hasClass('app-modal')) {
                $(this).fadeOut('fast');
            }
        });

        $(document).off('click', '.btn-filtro-pwa').on('click', '.btn-filtro-pwa', function(e) {
            e.preventDefault();
            let cat = $(this).data('categoria');
            if (cat === 'todos') {
                $('.item-musica-pwa').show();
            } else {
                $('.item-musica-pwa').hide();
                $('.item-musica-pwa[data-categoria="' + cat + '"]').show();
            }
            $('.btn-filtro-pwa').removeClass('badge-pill-naranja');
            $(this).addClass('badge-pill-naranja');
        });

        $(document).off('submit', '#pwaForm, #form-contacto').on('submit', '#pwaForm, #form-contacto', function(e) {
            e.preventDefault();
            let nombre = ($('#input-nombre').val() || $('#pwa-nombre').val() || '').trim();
            if (nombre === '') {
                $('#error-nombre').fadeIn();
                return;
            }
            $('#error-nombre').fadeOut();
            $('#alerta-exito').slideDown().delay(3000).slideUp();
            this.reset();
        });

        $box.attr('data-hidratado', 'true');
    }

    setTimeout(hidratarInterfaz, 300);
});
