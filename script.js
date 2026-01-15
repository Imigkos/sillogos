/**
 * Global variables and state
 */
const mobileMenu = document.getElementById('mobileMenu');
const mainNav = document.getElementById('main-nav');

/**
 * Toggle Mobile Navigation Menu
 */
function toggleMenu() {
    const isVisible = mobileMenu.style.display === 'flex';

    if (isVisible) {
        mobileMenu.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    } else {
        mobileMenu.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Disable body scroll
    }
}

/**
 * Header scroll effect: 
 * Adds shadow and shrinks padding when user scrolls down
 */
function handleHeaderScroll() {
    if (window.scrollY > 50) {
        mainNav.classList.add('header-scrolled');
    } else {
        mainNav.classList.remove('header-scrolled');
    }
}

/**
 * Intersection Observer:
 * Reveals elements (cards) as they enter the viewport
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // Once it animates in, we can stop observing it
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to all cards
    document.querySelectorAll('.card-portal').forEach(card => {
        card.classList.add('reveal-init');
        observer.observe(card);
    });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize all scripts on DOM Content Loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmoothScroll();

    window.addEventListener('scroll', handleHeaderScroll);
});

document.addEventListener('DOMContentLoaded', () => {

    const video = document.getElementById('intro-video');
    const btn = document.getElementById('audio-btn');
    const iconMuted = document.getElementById('icon-muted');
    const iconSound = document.getElementById('icon-sound');

    if (video && btn) {

        btn.addEventListener('click', () => {
            // 1. Toggle Mute
            video.muted = !video.muted;
            // 2. Toggle Icons
            if (video.muted) {
                iconMuted.classList.remove('hidden');
                iconSound.classList.add('hidden');
            } else {
                iconMuted.classList.add('hidden');
                iconSound.classList.remove('hidden');
            }
        });
    }
});