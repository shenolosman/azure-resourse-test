document.addEventListener('DOMContentLoaded', () => {
    // Load header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            initializeSidebar();
        });

    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });

    const slider = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');

    let currentSlide = 0;
    let slideInterval;

    function initializeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const toggleSidebar = document.getElementById('toggleSidebar');

        // Sidebar toggle for mobile
        toggleSidebar.addEventListener('click', () => {
            sidebar.classList.toggle('expanded');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!sidebar.contains(event.target) && sidebar.classList.contains('expanded')) {
                sidebar.classList.remove('expanded');
            }
        });
    }

    // Slider functionality
    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    if (slider && prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            stopSlideshow();
            prevSlide();
            startSlideshow();
        });

        nextButton.addEventListener('click', () => {
            stopSlideshow();
            nextSlide();
            startSlideshow();
        });

        showSlide(currentSlide);
        startSlideshow();
    }
});
