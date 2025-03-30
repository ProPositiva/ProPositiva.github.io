document.addEventListener('DOMContentLoaded', function() {
    // Set header height CSS variable
    const header = document.querySelector('.site-header');
    if (header) {
        document.documentElement.style.setProperty(
            '--header-height', 
            `${header.offsetHeight}px`
        );
    }

    // Intersection Observer for scroll animations
    const animateOnScroll = function() {
        const itemsToAnimate = document.querySelectorAll(
            '.process-item, .process-cta'
        );
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        itemsToAnimate.forEach(item => {
            observer.observe(item);
        });
    };

    // Parallax effect for heading
    const parallaxHeading = function() {
        const heading = document.querySelector('.process-heading');
        const stickyWrapper = document.querySelector('.sticky-wrapper');
        
        if (!heading || !stickyWrapper) return;

        const headingHeight = heading.offsetHeight;
        const wrapperHeight = stickyWrapper.offsetHeight;
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const wrapperOffset = stickyWrapper.offsetTop;
            
            if (scrollPosition > wrapperOffset && 
                scrollPosition < wrapperOffset + wrapperHeight) {
                const progress = (scrollPosition - wrapperOffset) / wrapperHeight;
                const translateY = progress * -50;
                const opacity = 1 - (progress * 0.5);
                
                heading.style.transform = `translateY(${translateY}px)`;
                heading.style.opacity = opacity;
            }
        });
    };

    // Initialize all effects
    animateOnScroll();
    parallaxHeading();

    // Resize observer for header height changes
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            if (entry.target === header) {
                document.documentElement.style.setProperty(
                    '--header-height', 
                    `${entry.contentRect.height}px`
                );
            }
        }
    });

    if (header) {
        resizeObserver.observe(header);
    }
});