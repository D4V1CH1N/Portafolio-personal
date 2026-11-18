document.addEventListener('DOMContentLoaded', function() {
    const themeBtn = document.getElementById('themeBtn');
    if (localStorage.getItem('temaOscuroS1') === 'true') {
        document.body.classList.add('dark-mode');
    }
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('temaOscuroS1', document.body.classList.contains('dark-mode'));
        });
    }

    const botonesFiltro = document.querySelectorAll('.filtro-cat');
    const tarjetas = document.querySelectorAll('.tarjeta-cat');
    const buscador = document.getElementById('buscadorCatalogo');
    let categoriaActiva = 'todos';

    function aplicarFiltro() {
        const texto = buscador ? buscador.value.toLowerCase().trim() : '';
        tarjetas.forEach(function(tarjeta) {
            const cat = tarjeta.dataset.categoria;
            const coincideCat = (categoriaActiva === 'todos' || cat === categoriaActiva);
            const coincideTexto = (texto === '' || tarjeta.textContent.toLowerCase().includes(texto));
            tarjeta.style.display = (coincideCat && coincideTexto) ? 'block' : 'none';
        });
    }

    botonesFiltro.forEach(function(btn) {
        btn.addEventListener('click', function() {
            botonesFiltro.forEach(function(b) { b.classList.remove('activo'); });
            btn.classList.add('activo');
            categoriaActiva = btn.dataset.categoria;
            aplicarFiltro();
        });
    });

    if (buscador) {
        buscador.addEventListener('keyup', aplicarFiltro);
    }

    const burguerBtn = document.getElementById('burguerBtn');
    const navMenu = document.getElementById('navMenu');
    if (burguerBtn && navMenu) {
        burguerBtn.addEventListener('click', function() {
            navMenu.classList.toggle('abierto');
        });
        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('abierto');
            });
        });
    }

    const contactForm = document.getElementById('contactForm');
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexTel = /^[67]\d{7}$/;

    function setEstado(input, errEl, ok, msg) {
        if (!input || !errEl) return;
        input.classList.remove('campo-valido', 'campo-invalido');
        input.classList.add(ok ? 'campo-valido' : 'campo-invalido');
        errEl.textContent = ok ? '' : msg;
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = document.getElementById('nombreInput');
            const correo = document.getElementById('correoInput');
            const telefono = document.getElementById('telefonoInput');
            const servicio = document.getElementById('servicioSelect');
            const mensaje = document.getElementById('mensajeInput');

            const vNombre = nombre.value.trim().length >= 3;
            const vCorreo = regexEmail.test(correo.value.trim());
            const vTel = regexTel.test(telefono.value.trim());
            const vServ = servicio.value !== '';
            const vMsg = mensaje.value.trim().length >= 10;

            setEstado(nombre, document.getElementById('errorNombre'), vNombre, 'Ingresa al menos 3 caracteres.');
            setEstado(correo, document.getElementById('errorCorreo'), vCorreo, 'Ingresa un correo valido.');
            setEstado(telefono, document.getElementById('errorTelefono'), vTel, 'Numero boliviano valido de 8 digitos (6 o 7).');
            setEstado(servicio, document.getElementById('errorServicio'), vServ, 'Selecciona un servicio.');
            setEstado(mensaje, document.getElementById('errorMensaje'), vMsg, 'Escribe al menos 10 caracteres.');

            if (vNombre && vCorreo && vTel && vServ && vMsg) {
                const alerta = document.getElementById('alertaBox');
                alerta.className = 'alerta-ok';
                alerta.style.display = 'block';
                alerta.textContent = 'Propuesta validada y enviada correctamente.';
                contactForm.reset();
            }
        });
    }

    const liveContainer = document.getElementById('liveContainer');
    const chatInput = document.getElementById('chatInput');
    const logOutput = document.getElementById('logOutput');

    function registrarLogDia1(texto) {
        if (!logOutput) return;
        const linea = document.createElement('div');
        linea.textContent = '[' + new Date().toLocaleTimeString() + '] ' + texto;
        logOutput.prepend(linea);
    }

    if (liveContainer) {
        liveContainer.addEventListener('click', function(e) {
            const prod = e.target.closest('[data-prod]');
            if (prod) {
                registrarLogDia1('Bubbling -> Click en: ' + prod.dataset.prod);
            }
            const like = e.target.closest('[data-action="like"]');
            if (like) {
                const total = parseInt(like.dataset.likes || '0', 10) + 1;
                like.dataset.likes = total;
                registrarLogDia1('Bubbling -> Like registrado (' + total + ')');
            }
        });
    }

    if (chatInput) {
        chatInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter' && chatInput.value.trim() !== '') {
                registrarLogDia1('Chat Live: ' + chatInput.value.trim());
                chatInput.value = '';
            }
        });
    }
});