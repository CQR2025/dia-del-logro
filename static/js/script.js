document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded fired.');

    // --- Variables --- //
    const welcomeModalElement = document.getElementById('welcomeModal');
    const carouselElement = document.getElementById('learningFestCarousel');

    let welcomeModal = null;
    if (welcomeModalElement) {
        welcomeModal = new bootstrap.Modal(welcomeModalElement);
        console.log('Welcome modal initialized.');
    }

    let carouselInstance = null;
    if (carouselElement) {
        console.log('carouselElement:', carouselElement);
        carouselInstance = new bootstrap.Carousel(carouselElement, {
            interval: false,
            wrap: false
        });
        console.log('Carousel Instance:', carouselInstance);
    }

    const neuronitoDialog = document.getElementById('neuronito-dialog');
    const neuronitoText = document.getElementById('neuronito-text');
    const neuronitoQuestion = document.getElementById('neuronito-question');
    const restartButton = document.getElementById('restart-carousel');
    const neuronitoAvatar = document.getElementById('neuronito-avatar');
    const carouselImages = document.querySelectorAll('.carousel-image');

    let currentSlideIndex = 0;

    const messages = [
        "¡Bienvenido! Haz clic en mí o en la imagen para avanzar y descubrir cómo nuestros alumnos convierten sus ideas en proyectos increíbles.",
        "Fomentamos la colaboración y el trabajo en equipo. ¡Juntos aprendemos mejor!",
        "Cada presentación es una aventura de conocimiento guiada por la curiosidad."
    ];

    // --- Funciones --- //

    function updateNeuronitoText(slideIndex) {
        if (neuronitoText) {
            neuronitoText.textContent = messages[slideIndex];
        }
        if (neuronitoQuestion) {
            neuronitoQuestion.style.display = 'none';
        }

        if (slideIndex === messages.length - 1) {
            setTimeout(() => {
                if (neuronitoText) {
                    neuronitoText.textContent = '¿Quieres saber cómo lo logramos?';
                }
                if (neuronitoQuestion) {
                    neuronitoQuestion.style.display = 'block';
                }
            }, 1500);
        }
    }

    function advanceCarousel() {
        console.log('advanceCarousel called.');
        console.log('currentSlideIndex before advance:', currentSlideIndex, 'messages.length:', messages.length);
        if (carouselInstance && currentSlideIndex < messages.length - 1) {
            const nextSlideIndex = currentSlideIndex + 1;
            console.log('Attempting to advance to slide:', nextSlideIndex);
            try {
                carouselInstance.to(nextSlideIndex);
                console.log('carouselInstance.to() called successfully.');
            } catch (error) {
                console.error('Error calling carouselInstance.to():', error);
            }
        } else {
            console.log('Already at the last slide, cannot advance further.');
        }
    }

    // --- Event Listeners --- //

    // Retrasar la aparición del modal de bienvenida y asegurar que aria-hidden se elimine
    setTimeout(() => {
        if (welcomeModalElement && welcomeModal) {
            welcomeModalElement.removeAttribute('aria-hidden');
            console.log('aria-hidden removed from welcomeModalElement.');
            welcomeModal.show();
            console.log('Welcome modal shown after delay.');
        }
    }, 100); // Pequeño retraso de 100ms

    // Clic en el avatar de Neuronito AVANZA el slide
    if (neuronitoAvatar) {
        neuronitoAvatar.addEventListener('click', advanceCarousel);
        console.log('Neuronito avatar click listener attached.');
    }

    // Clic en la imagen del carrusel AVANZA el slide
    if (carouselImages.length > 0) {
        carouselImages.forEach(image => {
            image.addEventListener('click', advanceCarousel);
        });
        console.log('Carousel images click listeners attached.');
    }

    // Actualiza el texto cuando el carrusel cambia de slide
    if (carouselElement) {
        carouselElement.addEventListener('slid.bs.carousel', function (event) {
            currentSlideIndex = event.to;
            console.log('slid.bs.carousel event fired. New slide index:', currentSlideIndex);
            updateNeuronitoText(currentSlideIndex);
        });
    }

    // Reinicia el carrusel si se hace clic en 'No'
    if (restartButton) {
        restartButton.addEventListener('click', function () {
            if (carouselInstance) {
                carouselInstance.to(0);
            }
            if (neuronitoDialog) {
                neuronitoDialog.style.display = 'block'; // Aseguramos que el diálogo sea visible al reiniciar
            }
            console.log('Carousel reset to first slide.');
        });
    }

    // --- Inicialización --- //

    // Muestra el diálogo y establece el primer mensaje al inicio
    if (neuronitoDialog) {
        setTimeout(() => {
            neuronitoDialog.style.display = 'block';
            updateNeuronitoText(0);
            console.log('Initial Neuronito dialog and text set.');
        }, 500);
    }

});