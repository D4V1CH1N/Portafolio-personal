document.addEventListener('DOMContentLoaded', function() {
    const btnTheme = document.getElementById('btnTheme');
    if (localStorage.getItem('temaOscuroS1') === 'true') {
        document.body.classList.add('dark-mode');
    }
    if (btnTheme) {
        btnTheme.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('temaOscuroS1', document.body.classList.contains('dark-mode'));
        });
    }
});