$(document).ready(function() {
    function hidratarInterfaz() {
        let $box = $('#contenedorPWA');
        if ($box.attr('data-hidratado') === 'true') return;

        $(document).off('click', '.btn-abrir-modal').on('click', '.btn-abrir-modal', function(e) {
            e.preventDefault();
            let target = $(this).data('target');
            $(target).fadeIn('fast');
        });

        $(document).off('click', '.btn-cerrar-modal').on('click', '.btn-cerrar-modal', function() {
            $(this).closest('.app-modal').fadeOut('fast');
        });

        $(document).off('click', '.app-modal').on('click', '.app-modal', function(e) {
            if ($(e.target).hasClass('app-modal')) {
                $(this).fadeOut('fast');
            }
        });

        $(document).off('submit', '#pwaForm').on('submit', '#pwaForm', function(e) {
            e.preventDefault();
            let nombre = $('#pwa-nombre').val().trim();
            if (nombre === '') {
                $('#error-nombre-pwa').fadeIn();
                return;
            }
            $('#error-nombre-pwa').fadeOut();
            $('#alertaExitoPwa').slideDown().delay(3000).slideUp();
            this.reset();
        });

        $box.attr('data-hidratado', 'true');

        $('#textoBtnHidratar').text('Hidratado');
        $('#btnHidratar, #btnHidratarBanner').removeClass('btn-naranja-pwa').addClass('btn-verde-pwa').prop('disabled', true);
        $('#bannerEstadoHidratacion').css('border-color', '#00ff9d');
        $('#tituloEstadoHidratado').removeClass('texto-naranja').addClass('texto-verde').html('<i class="bi bi-check-circle-fill me-1"></i>Estado: Hidratado');
        $('#descEstadoHidratado').text('data-hidratado="true" | Todos los modales y eventos vinculados');
        $('#alertaRequiereHidratar').stop(true, true).hide();
        $('#alertaHidratacionExito').slideDown().delay(3000).slideUp();
    }

    $(document).on('click', '#btnHidratar, #btnHidratarBanner', function(e) {
        e.preventDefault();
        hidratarInterfaz();
    });

    $(document).on('click', '.btn-abrir-modal', function(e) {
        let $box = $('#contenedorPWA');
        if ($box.attr('data-hidratado') !== 'true') {
            e.preventDefault();
            $('#alertaRequiereHidratar').slideDown().delay(2500).slideUp();
        }
    });
});

