document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // fade-in
    // ===========================
    const fadeTargets = document.querySelectorAll('.fadein-up');
    const fadeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    fadeObserver.unobserve(entry.target);
                }
            });
        },
        {
            rootMargin: '-25% 0px',
        });
    fadeTargets.forEach(target => {
        fadeObserver.observe(target);
    });

    // ======================
    // nav
    // ======================
    const nav = document.querySelector('.nav');
    const menuBtn = document.querySelector('.menu__btn');
    const closeBtn = document.querySelector('.close__btn');
    const navLinks = nav.querySelectorAll('.nav__item a');
    const formBtn = document.querySelector('.form__btn--nav');
    // open
    menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nav.classList.add('active');
    });
    // close
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nav.classList.remove('active');
    });
    // link → close
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
    // formBtn → close
    formBtn.addEventListener('click', () => {
        nav.classList.remove('active');
    });

    // ======================
    // header　pc
    // ======================
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    window.addEventListener('load', () => {
        header.classList.add('visible');
    });
    function onScroll() {
        const currentScrollY = window.scrollY;
        // pc
        if (window.innerWidth >= 769) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // down
                header.classList.add('hide');
            } else {
                // up
                header.classList.remove('hide');
            }
        } else {
            // sp
            header.classList.remove('hide');
        }
        lastScrollY = currentScrollY;
    }
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);

    // ======================
    // carousel
    // ======================
    const container = document.querySelector('.carousel');
    const content = container.querySelector('.carousel__inner');
    let x = 0;
    const speed = 0.5;
    const width = content.scrollWidth / 2;
    function loop() {
        x -= speed;
        if (Math.abs(x) >= width) {
            x = 0;
        }
        content.style.transform = `translateX(${x}px)`;
        requestAnimationFrame(loop);
    }
    loop();
});
