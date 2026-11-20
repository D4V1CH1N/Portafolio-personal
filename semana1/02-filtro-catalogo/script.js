// Semana 1 - Filtro de Catalogo
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
});