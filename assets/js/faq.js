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
    // FAQ
    // ======================
    document.querySelectorAll('.faq__content details').forEach(details => {
        const summary = details.querySelector('summary');
        const content = details.querySelector('.faq__answer');
        summary.addEventListener('click', e => {
            e.preventDefault();
            if (details.open) {
                // close
                const animation = content.animate(
                    [
                        { height: `${content.scrollHeight}px`, opacity: 1 },
                        { height: '0px', opacity: 0 }
                    ],
                    { duration: 400, fill: 'forwards' }
                );
                animation.onfinish = () => {
                    details.open = false;
                    content.style.height = '';
                };
            } else {
                // open
                details.open = true;
                content.animate(
                    [
                        { height: '0px', opacity: 0 },
                        { height: `${content.scrollHeight}px`, opacity: 1 }
                    ],
                    { duration: 400, fill: 'forwards' }
                ).onfinish = () => {
                    content.style.height = 'auto';
                };
            }
        });
    });
});