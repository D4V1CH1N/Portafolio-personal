$(document).ready(function () {

    var total = 0;
    var items = 0;
    var snacks = 0;

    var temas = {
        '': 'General',
        playstation: 'PlayStation',
        xbox: 'Xbox',
        xboxone: 'Xbox One',
        xbox360: 'Xbox 360',
        switch: 'Nintendo Switch',
        switch2: 'Nintendo Switch 2',
        pc: 'PC Gamer',
        arcade: 'Arcade',
        comida: 'Snacks'
    };

    var fondoPorFiltro = {
        todos: '',
        consolas: 'playstation',
        pcs: 'pc',
        arcades: 'arcade',
        comida: 'comida'
    };

    function cambiarFondo(plataforma) {
        $('body').removeClass('bg-playstation bg-xbox bg-xboxone bg-xbox360 bg-switch bg-switch2 bg-pc bg-arcade bg-comida');

        if (plataforma !== '') {
            $('body').addClass('bg-' + plataforma);
        }

        $('#indicador-tema').html('Tema: ' + temas[plataforma]);
    }

    function actualizarCarrito() {
        $('#contador-items').text(items);
        $('#total-pagar').text(total);
        $('#contador-snacks').text(snacks);
    }

    $('#btn-menu').click(function () {
        $('#menu').toggleClass('show');
    });

    $('#btn-tema').click(function () {
        $('body').toggleClass('modo-claro');

        if ($(this).text() === 'Modo claro') {
            $(this).text('Modo oscuro');
        } else {
            $(this).text('Modo claro');
        }
    });

    $('.btn-filtro').click(function () {
        var filtro = $(this).attr('data-filtro');

        $('.btn-filtro').removeClass('activo');
        $(this).addClass('activo');

        $('.accordion-btn').removeClass('abierto');
        $('.accordion-panel').slideUp('fast');

        cambiarFondo(fondoPorFiltro[filtro]);

        $('.filtrable').stop(true, true).fadeOut('fast').promise().done(function () {
            if (filtro === 'todos') {
                $('.filtrable').fadeIn('fast');
            } else {
                $('.filtrable[data-categoria="' + filtro + '"]').fadeIn('fast');
            }
        });
    });

    $('.accordion-btn').click(function () {
        var $esteBoton = $(this);
        var $estePanel = $esteBoton.next('.accordion-panel');
        var yaAbierto = $esteBoton.hasClass('abierto');

        $('.accordion-btn').removeClass('abierto');
        $('.accordion-panel').not($estePanel).slideUp('slow');

        if (!yaAbierto) {
            $esteBoton.addClass('abierto');
            $estePanel.slideDown('slow');
            cambiarFondo($esteBoton.closest('.categoria').attr('data-plataforma'));
        } else {
            $estePanel.slideUp('slow');
            var filtroActivo = $('.btn-filtro.activo').attr('data-filtro');
            cambiarFondo(fondoPorFiltro[filtroActivo] || '');
        }
    });

    $('.btn-reservar-estacion').click(function () {
        var $boton = $(this);
        var $estacion = $boton.closest('.estacion');
        var $categoria = $boton.closest('.categoria');

        var nombre = $categoria.attr('data-nombre');
        var precio = parseInt($categoria.attr('data-precio'));
        var numero = $estacion.attr('data-numero');

        var horas = parseInt($estacion.find('.input-horas').val());

        if (isNaN(horas) || horas < 1) {
            horas = 1;
        }

        if (horas > 8) {
            horas = 8;
        }

        $estacion.find('.input-horas').val(horas);

        var $opcion = $estacion.find('.select-controles option:selected');
        var costoControles = parseInt($opcion.val());
        var etiqueta = $opcion.attr('data-etiqueta');

        var subtotal = (precio * horas) + costoControles;

        $('#lista-carrito').append(
            '<li>' + nombre + ' - Estación #' + numero + ' - ' + etiqueta + ' - ' + horas + ' h - Subtotal: ' + subtotal + ' Bs</li>'
        );

        total = total + subtotal;
        items = items + 1;
        actualizarCarrito();

        $estacion.removeClass('estado-disponible').addClass('estado-reservado reservada-carrito');
        $estacion.find('.etiqueta-estado').text('Reservado');
        $estacion.find('.select-controles, .input-horas').prop('disabled', true);
        $boton.prop('disabled', true).text('Reservada');
    });

    $('.btn-pedir-snack').click(function () {
        var $tarjeta = $(this).closest('.card');
        var nombre = $tarjeta.attr('data-nombre');
        var precio = parseInt($tarjeta.attr('data-precio'));

        $('#lista-carrito').append(
            '<li>Snack: ' + nombre + ' - ' + precio + ' Bs</li>'
        );

        total = total + precio;
        items = items + 1;
        snacks = snacks + 1;
        actualizarCarrito();
    });

    $('#btn-vaciar').click(function () {
        var $reservadas = $('.estacion.reservada-carrito');

        $reservadas.removeClass('estado-reservado reservada-carrito').addClass('estado-disponible');
        $reservadas.find('.etiqueta-estado').text('Disponible');
        $reservadas.find('.select-controles, .input-horas').prop('disabled', false);
        $reservadas.find('.btn-reservar-estacion').prop('disabled', false).text('Añadir Reserva al Carrito');

        $('#lista-carrito').html('');

        total = 0;
        items = 0;
        snacks = 0;
        actualizarCarrito();

        $('#mensaje').fadeOut('fast');
    });

    $('#btn-enviar').click(function (e) {
        e.preventDefault();

        var nombre = $('#nombre').val().trim();
        var tipo = $('#tipo-orden').val();
        var mensaje;

        if (nombre === '') {
            mensaje = '<div class="error">Error: el nombre completo no puede estar vacío.</div>';
        } else if (items === 0) {
            mensaje = '<div class="error">Error: el carrito está vacío. Añade al menos una estación o un snack.</div>';
        } else {
            var nombreSeguro = $('<div>').text(nombre).html();

            mensaje =
                '<div class="exito">' +
                'Orden enviada con éxito<br>' +
                'Cliente: ' + nombreSeguro + '<br>' +
                'Tipo de orden: ' + tipo + '<br>' +
                'Ítems: ' + items + '<br>' +
                'Total a pagar: ' + total + ' Bs' +
                '</div>';
        }

        $('#mensaje').hide().html(mensaje).fadeIn('fast');
    });

    actualizarCarrito();

});
