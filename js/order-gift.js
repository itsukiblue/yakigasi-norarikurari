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
    const fadeBlocks = document.querySelectorAll('.group__img');

    fadeBlocks.forEach(block => {
        const imgs = block.querySelectorAll('.group__img--fade');
        let current = 0;

        setInterval(() => {
            imgs[current].classList.remove('active');
            current = (current + 1) % imgs.length;
            imgs[current].classList.add('active');
        }, 4000);
    });
});