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
});