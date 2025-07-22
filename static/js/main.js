
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const mascota = document.getElementById('mascota');
    const dialogoBurbuja = document.getElementById('mascota-dialogo');
    const mascotaDialogo = dialogoBurbuja.querySelector('p');
    const mascotaContainer = document.getElementById('mascota-container');
    const mainImageDisplay = document.getElementById('main-image-display');
    const mainImageSection = document.getElementById('main-image-section');

    let dialogoTimeout;
    let currentIndex = 0;

    const images = [
        'https://placehold.co/800x600/0A2D5E/FFFFFF?text=MLF+1+-+Innovacion',
        'https://placehold.co/800x600/FDB813/000000?text=MLF+2+-+Creatividad',
        'https://placehold.co/800x600/0A2D5E/FFFFFF?text=MLF+3+-+Colaboracion',
        'https://placehold.co/800x600/FDB813/000000?text=MLF+4+-+Descubrimiento',
        'https://placehold.co/800x600/0A2D5E/FFFFFF?text=MLF+5+-+Vanguardia'
    ];

    const dialogos = [
        '¡Bienvenidos al MONTESSORI LEARNING FEST! Aquí celebramos la innovación y el futuro del aprendizaje.',
        'Exploramos la creatividad en cada proyecto, fomentando nuevas ideas y soluciones.',
        'La colaboración es clave. Juntos, construimos un futuro más brillante y conectado.',
        'Cada día es una oportunidad para el descubrimiento. ¡Aprender es una aventura sin fin!',
        'Estamos a la vanguardia de la educación, preparando mentes curiosas para los desafíos del mañana.'
    ];

    const mensajesClic = [
        '¡Sigue explorando! Aprender es una aventura.',
        '¿Sabías que cada nuevo conocimiento fortalece tu cerebro?',
        '¡Excelente! La curiosidad es el primer paso para aprender.',
        '¡Me encanta que estés aquí!',
        '¡El conocimiento es poder!'
    ];

    function mostrarDialogo(texto, duracion = 4000) {
        mascotaDialogo.innerText = texto;
        dialogoBurbuja.classList.add('visible');
        mascota.classList.add('active');

        clearTimeout(dialogoTimeout);
        dialogoTimeout = setTimeout(() => {
            dialogoBurbuja.classList.remove('visible');
        }, duracion);

        setTimeout(() => {
            mascota.classList.remove('active');
        }, 500); // Duración de la animación de salto
    }

    

    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        mainImageDisplay.src = images[currentIndex];
        mostrarDialogo(dialogos[currentIndex]);
    }

    // Función para iniciar la lógica de la aplicación después del splash screen
    function iniciarApp() {
        mainContent.classList.remove('hidden-content');
        splashScreen.classList.add('hidden');
        mascotaContainer.classList.add('visible'); // Hacer visible el contenedor de la mascota

        // Iniciar con la primera imagen y diálogo
        mainImageDisplay.src = images[currentIndex];
        mostrarDialogo(dialogos[currentIndex]);

        // Event listeners para cambiar la imagen y el diálogo
        mainImageDisplay.addEventListener('click', nextSlide);
        mascota.addEventListener('click', () => {
            const mensajeAleatorio = mensajesClic[Math.floor(Math.random() * mensajesClic.length)];
            mostrarDialogo(mensajeAleatorio, 4000); // El mensaje de clic dura menos
        });
    }

    // Event listener para el splash screen
    splashScreen.addEventListener('click', iniciarApp);
});
