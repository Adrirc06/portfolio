document.addEventListener('DOMContentLoaded', function () {
    const myOffcanvas = document.getElementById('menuResponsive');
    const bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
    const navLinks = myOffcanvas.querySelectorAll('.offcanvas-body .nav-link');
    
    let pendingHash = null;

    // 1. Capturamos el clic en el enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Si el enlace es un ancla interna
            if (href.startsWith('#')) {
                e.preventDefault(); // Evitamos el salto inmediato
                pendingHash = href; // Guardamos el destino
                
                // Cerramos el menú
                const instance = bootstrap.Offcanvas.getInstance(myOffcanvas);
                instance.hide();
            }
        });
    });

    // 2. Cuando el menú termine de cerrarse REALMENTE, nos desplazamos
    myOffcanvas.addEventListener('hidden.bs.offcanvas', function () {
        if (pendingHash) {
            const targetElement = document.querySelector(pendingHash);
            if (targetElement) {
                // Calculamos la posición y hacemos scroll manual
                const topOffset = targetElement.offsetTop;
                window.scrollTo({
                    top: topOffset,
                    behavior: 'smooth'
                });
            }
            pendingHash = null; // Limpiamos para el siguiente clic
        }
    });
});