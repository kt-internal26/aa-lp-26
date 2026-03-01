document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initTestimonialSlider();
    initPortfolioFilter();
    initScrollReveal();
    initContactForm();
    initHeroCarousel();
    initWorkflowAnimation();
});

function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;
    
    const track = slider.querySelector('.testimonial-track');
    const slides = slider.querySelectorAll('.testimonial-slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const dotsContainer = slider.querySelector('.testimonial-dots');
    
    let currentIndex = 0;
    
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) {
            dot.classList.add('active');
            slide.classList.add('active');
        }
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.testimonial-dot');
    
    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        currentIndex = index;
        
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    setInterval(nextSlide, 5000);
}

function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('[data-category]');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            portfolioItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    const categories = item.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

function initScrollReveal() {
    // Enhanced scroll animations using Intersection Observer for better performance
    const scrollObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing after animation to improve performance
                // scrollObserver.unobserve(entry.target);
            }
        });
    }, scrollObserverOptions);

    // Helper function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom >= 0
        );
    }

    // Reveal animations for various elements
    const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .choose-item, .workflow-step');
    revealElements.forEach((element, index) => {
        element.classList.add('scroll-reveal');
        // Add stagger delay to grid items
        if (element.classList.contains('service-card') || 
            element.classList.contains('portfolio-item') || 
            element.classList.contains('testimonial-card')) {
            const delayClass = `stagger-delay-${(index % 6) + 1}`;
            element.classList.add(delayClass);
        }
        
        // Immediately activate elements already in viewport
        if (isInViewport(element)) {
            element.classList.add('active');
        }
        
        scrollObserver.observe(element);
    });

    // Slide animations for split layouts
    const slideLeftElements = document.querySelectorAll('.split-image, .about-image');
    slideLeftElements.forEach(element => {
        element.classList.add('scroll-slide-left');
        if (isInViewport(element)) {
            element.classList.add('active');
        }
        scrollObserver.observe(element);
    });

    const slideRightElements = document.querySelectorAll('.split-content');
    slideRightElements.forEach(element => {
        element.classList.add('scroll-slide-right');
        if (isInViewport(element)) {
            element.classList.add('active');
        }
        scrollObserver.observe(element);
    });

    // Fade animations for headers
    const fadeElements = document.querySelectorAll('.section-header, .architect-header');
    fadeElements.forEach(element => {
        element.classList.add('scroll-fade');
        if (isInViewport(element)) {
            element.classList.add('active');
        }
        scrollObserver.observe(element);
    });

    // Scale animation for CTA sections
    const scaleElements = document.querySelectorAll('.cta-content, .final-cta');
    scaleElements.forEach(element => {
        element.classList.add('scroll-scale');
        if (isInViewport(element)) {
            element.classList.add('active');
        }
        scrollObserver.observe(element);
    });

    // Backward compatibility with old reveal class
    const oldRevealElements = document.querySelectorAll('.project-card, .feature-item, .team-member, .process-step, .value-card, .pricing-card, .faq-item');
    oldRevealElements.forEach(element => {
        element.classList.add('reveal');
        scrollObserver.observe(element);
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        console.log('Form submitted:', data);
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                contactForm.reset();
                
                alert('Thank you for your message! We will get back to you within 24 hours.');
            }, 2000);
        }, 1500);
    });
    
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('error');
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
}

function initHeroCarousel() {
    const carousel = document.querySelector('.hero-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.indicator');
    let currentSlide = 0;
    let isTransitioning = false;
    const slideInterval = 5000; // 5 seconds per slide
    let autoplayTimer;
    
    function goToSlide(index) {
        if (isTransitioning) return;
        if (index === currentSlide) return;
        
        isTransitioning = true;
        
        // Remove active class from current slide and indicator
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        // Update current slide
        currentSlide = index;
        
        // Add active class to new slide and indicator
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        // Reset transition lock after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 1200);
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }
    
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(nextSlide, slideInterval);
    }
    
    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
        }
    }
    
    // Add click handlers to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopAutoplay();
            startAutoplay(); // Restart autoplay after manual interaction
        });
    });
    
    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    
    // Start autoplay
    startAutoplay();
}

function initWorkflowAnimation() {
    const workflowSteps = document.querySelectorAll('.workflow-step');
    if (!workflowSteps.length) return;
    
    let currentStep = 0;
    const stepInterval = 2500; // 2.5 seconds per step
    let animationTimer;
    let isPaused = false;
    
    function activateStep(index) {
        // Add active class to current step and keep all previous steps active
        if (index < workflowSteps.length) {
            workflowSteps[index].classList.add('auto-active');
        }
    }
    
    function resetAllSteps() {
        // Remove active class from all steps
        workflowSteps.forEach(step => step.classList.remove('auto-active'));
    }
    
    function nextStep() {
        if (isPaused) return;
        
        // If we're at the last step, reset all and start over
        if (currentStep >= workflowSteps.length) {
            resetAllSteps();
            currentStep = 0;
        }
        
        activateStep(currentStep);
        currentStep++;
    }
    
    function startAnimation() {
        stopAnimation();
        // Reset and activate first step immediately
        resetAllSteps();
        activateStep(0);
        currentStep = 1;
        // Then continue cycling
        animationTimer = setInterval(nextStep, stepInterval);
    }
    
    function stopAnimation() {
        if (animationTimer) {
            clearInterval(animationTimer);
        }
    }
    
    // Pause animation when user hovers over any workflow step
    workflowSteps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        
        step.addEventListener('mouseleave', () => {
            isPaused = false;
        });
    });
    
    // Start the animation
    startAnimation();
}

// Smooth parallax effect for hero section
function initParallaxEffect() {
    const heroCarousel = document.querySelector('.hero-carousel');
    if (!heroCarousel) return;

    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        if (scrolled < window.innerHeight) {
            heroCarousel.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Add smooth entrance animation to sections
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });
    
    sections.forEach(section => sectionObserver.observe(section));
}

// Initialize parallax and section animations
document.addEventListener('DOMContentLoaded', function() {
    initParallaxEffect();
    initSectionAnimations();
});