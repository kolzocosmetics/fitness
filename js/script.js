// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky Navigation
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '15px 0';
        navbar.style.backgroundColor = 'rgba(17, 17, 17, 0.98)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.backgroundColor = 'rgba(17, 17, 17, 0.95)';
    }
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Service Card Click Effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        // Remove active class from all cards
        document.querySelectorAll('.service-card').forEach(c => {
            c.classList.remove('active');
        });
        
        // Add active class to clicked card
        this.classList.add('active');
    });
});

// Testimonial Animation
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Animation on scroll (simple reveal effect)
const revealElements = document.querySelectorAll('.service-card, .testimonial-card, .about-content, .about-image');

function checkReveal() {
    const triggerBottom = window.innerHeight * 0.8;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('revealed');
        }
    });
}

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', function() {
    // Preload images for smoother experience
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const newImg = new Image();
            newImg.src = src;
        }
    });
    
    // Check for elements in view on load and scroll
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on initial load
});