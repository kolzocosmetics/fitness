document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Call the reveal function
        checkReveal();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Service card click effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            serviceCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            card.classList.add('active');
        });
    });
    
    // Testimonial animations
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Testimonial show more/less toggle
    const showMoreBtn = document.getElementById('show-more-testimonials');
    const hiddenTestimonials = document.querySelector('.hidden-testimonials');
    
    // Create show less button at the bottom
    const showLessContainer = document.createElement('div');
    showLessContainer.className = 'show-less-container';
    showLessContainer.innerHTML = `
        <a href="javascript:void(0);" id="show-less-testimonials" class="testimonial-button">
            <span>Show Less</span>
            <div class="button-arrow">
                <i class="fas fa-chevron-up"></i>
            </div>
        </a>
    `;
    
    if (showMoreBtn && hiddenTestimonials) {
        // Insert after hidden testimonials
        hiddenTestimonials.parentNode.insertBefore(showLessContainer, hiddenTestimonials.nextSibling);
        
        // Initialize the hidden testimonials to be hidden
        hiddenTestimonials.classList.remove('active');
        showLessContainer.style.display = 'none';
        
        // Add click event to the entire button area
        // Show more button click event
        showMoreBtn.onclick = function(e) {
            e.preventDefault();
            
            if (!hiddenTestimonials.classList.contains('active')) {
                // Show hidden testimonials with animation
                hiddenTestimonials.classList.add('active');
                showLessContainer.style.display = 'block';
                showMoreBtn.parentElement.style.display = 'none';
                
                // Add animation to newly visible testimonials
                const newCards = hiddenTestimonials.querySelectorAll('.testimonial-card');
                newCards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.2}s`;
                    card.classList.add('fade-in');
                });
                
                // Smooth scroll to first hidden testimonial (optional, adjust as needed)
                // setTimeout(() => {
                //     hiddenTestimonials.scrollIntoView({
                //         behavior: 'smooth',
                //         block: 'start'
                //     });
                // }, 100);
            }
        };
        
        // Make sure the button is clickable
        showMoreBtn.style.pointerEvents = 'auto';
        
        // Show less button click event
        const showLessBtn = document.getElementById('show-less-testimonials');
        showLessBtn.onclick = function(e) {
            e.preventDefault();
            
            hiddenTestimonials.classList.remove('active');
            showLessContainer.style.display = 'none';
            showMoreBtn.parentElement.style.display = 'block';
            
            // Smooth scroll back to testimonial 3
            const testimonialCards = document.querySelectorAll('.testimonial-card');
            if (testimonialCards.length >= 3) {
                testimonialCards[2].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Fallback to testimonials section if less than 3 testimonials
                document.querySelector('#testimonials').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        };
        
        // Make sure the button is clickable
        showLessBtn.style.pointerEvents = 'auto';
    }
    
    // Scroll reveal effect
    function checkReveal() {
        const revealElements = document.querySelectorAll('.service-card, .testimonial-card, .about-content, .about-image');
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Initial check for elements in view
    checkReveal();
    
    // Preload images for better performance
    function preloadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const newImg = new Image();
                newImg.src = src;
            }
        });
    }
    
    preloadImages();
});