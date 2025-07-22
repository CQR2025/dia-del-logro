document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    let currentIndex = 0;
    const totalImages = images.length;

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
    }

    setInterval(nextSlide, 3000); // Cambia de imagen cada 3 segundos
});