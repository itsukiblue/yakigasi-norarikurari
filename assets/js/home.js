document.addEventListener('DOMContentLoaded', () => {
    // ===========================
    // loading
    // ===========================
    window.addEventListener('load', () => {
        const loading = document.querySelector('.loading');

        setTimeout(() => {
            loading.classList.add('hidden');

            startBackground();
            startMainAnimations();
            startFadeIn();
            initSwipers();
            initFAQ();
            initScrollCarousel();
            initNavigation();
            initHeader();

        }, 2400);
    });

    // ===========================
    // back ground
    // ===========================
    function startBackground() {
        document.querySelectorAll('.bg__item')
            .forEach(item => item.classList.add('active'));
    }

    // =================================
    // main illust
    // =================================
    function startMainAnimations() {
        const bgItems = document.querySelectorAll('.bg__slide');
        const hero = document.querySelector('.hero__fade');
        bgItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 120);
        });
        setTimeout(() => {
            hero.classList.add('show');
        }, bgItems.length * 120 + 400);
    }

    // ===========================
    // fade-in
    // ===========================
    function startFadeIn() {
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
    }

    // =================================
    // swiper
    // =================================
    function initSwipers() {
        const swipers = document.querySelectorAll('.products__swiper');
        const GAP = 25;

        swipers.forEach(swiper => {
            const list = swiper.querySelector('.products__list');
            const originalItems = swiper.querySelectorAll('.products__item');
            const prevBtn = swiper.querySelector('.arrow__prev');
            const nextBtn = swiper.querySelector('.arrow__next');
            const pagination = swiper.querySelector('.pagination');

            let allItems = originalItems;
            let currentIndex = 1;

            function isPC() {
                return window.innerWidth >= 769;
            }

            function initSwiper() {
                list.querySelectorAll('.products__item.clone').forEach(el => el.remove());

                if (!isPC()) {
                    const firstClone = originalItems[0].cloneNode(true);
                    const lastClone = originalItems[originalItems.length - 1].cloneNode(true);

                    firstClone.classList.add('clone');
                    lastClone.classList.add('clone');

                    list.appendChild(firstClone);
                    list.insertBefore(lastClone, list.firstChild);

                    allItems = swiper.querySelectorAll('.products__item');
                    currentIndex = 1;

                    // pagination
                    if (pagination) {
                        pagination.innerHTML = '';
                        originalItems.forEach((_, index) => {
                            const dot = document.createElement('button');
                            if (index === 0) dot.classList.add('active');
                            dot.addEventListener('click', () => {
                                currentIndex = index + 1;
                                updateSlider();
                                updateDots(index);
                            });
                            pagination.appendChild(dot);
                        });
                    }

                    prevBtn && (prevBtn.style.display = 'flex');
                    nextBtn && (nextBtn.style.display = 'flex');
                    pagination && (pagination.style.display = 'flex');

                    updateSlider(false);
                    updateDots(0);

                } else {
                    list.style.transform = 'none';
                    list.style.transition = 'none';

                    prevBtn && (prevBtn.style.display = 'none');
                    nextBtn && (nextBtn.style.display = 'none');
                    pagination && (pagination.style.display = 'none');

                    allItems = originalItems;
                }
            }

            function updateSlider(transition = true) {
                if (isPC()) return;

                const swiperWidth = swiper.offsetWidth;
                const itemWidth = allItems[0].offsetWidth;
                const totalWidth = itemWidth + GAP;

                const translateX =
                    currentIndex * totalWidth - swiperWidth / 2 + itemWidth / 2;

                list.style.transition = transition ? '' : 'none';
                list.style.transform = `translateX(${-translateX}px)`;
            }

            function nextSlide() {
                if (isPC()) return;

                currentIndex++;
                updateSlider();

                if (currentIndex === allItems.length - 1) {
                    setTimeout(() => {
                        currentIndex = 1;
                        updateSlider(false);
                    }, 300);
                }

                updateDots((currentIndex - 1) % originalItems.length);
            }

            function prevSlide() {
                if (isPC()) return;

                currentIndex--;
                updateSlider();

                if (currentIndex === 0) {
                    setTimeout(() => {
                        currentIndex = allItems.length - 2;
                        updateSlider(false);
                    }, 300);
                }

                updateDots((currentIndex - 1 + originalItems.length) % originalItems.length);
            }

            function updateDots(index) {
                if (!pagination) return;
                pagination.querySelectorAll('button').forEach(dot => dot.classList.remove('active'));
                pagination.querySelectorAll('button')[index]?.classList.add('active');
            }

            nextBtn && nextBtn.addEventListener('click', nextSlide);
            prevBtn && prevBtn.addEventListener('click', prevSlide);

            initSwiper();
            window.addEventListener('resize', initSwiper);
        });
    }

    // ======================
    // FAQ
    // ======================
    function initFAQ() {
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
    }

    // ======================
    // carousel
    // ======================
    function initScrollCarousel() {
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
    }

    // ======================
    // nav
    // ======================
    function initNavigation() {
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
    }

    // ======================
    // header　pc
    // ======================
    function initHeader() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;
        header.classList.add('visible');

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
    }

});
