// Volcanic Portfolio Website - JavaScript
class VolcanicPortfolio {
    constructor() {
        this.particles = [];
        this.skillsAnimated = false;
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createParticleSystem();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupContactForm();
        this.setupNavigationHighlight();
        this.setupMobileMenu();
    }

    setupEventListeners() {
        window.addEventListener('load', () => {
            this.animateSkillBars();
        });

        window.addEventListener('scroll', () => {
            this.updateParticles();
            this.updateNavigationHighlight();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    // Particle System for Lava Effects
    createParticleSystem() {
        const container = document.getElementById('particles-container');
        
        // Create initial particles
        for (let i = 0; i < 50; i++) {
            this.createParticle(container);
        }

        // Continuously spawn new particles
        setInterval(() => {
            if (this.particles.length < 100) {
                this.createParticle(container);
            }
        }, 300);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = Math.random() > 0.7 ? 'particle ember' : 'particle ash';
        
        // Random size
        const size = Math.random() * 8 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random starting position
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        // Random animation duration
        const duration = Math.random() * 10 + 8;
        particle.style.animationDuration = duration + 's';
        
        // Random horizontal drift
        const drift = (Math.random() - 0.5) * 100;
        particle.style.setProperty('--drift', drift + 'px');
        
        container.appendChild(particle);
        this.particles.push(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particles = this.particles.filter(p => p !== particle);
            }
        }, duration * 1000);
    }

    updateParticles() {
        const scrollSpeed = window.pageYOffset;
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const yOffset = scrollSpeed * speed * 0.1;
            particle.style.transform = `translateY(-${yOffset}px)`;
        });
    }

    // Intersection Observer for Animations
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Specific animations for different sections
                    if (entry.target.classList.contains('skills') && !this.skillsAnimated) {
                        this.animateSkillBars();
                        this.skillsAnimated = true;
                    }
                    
                    if (entry.target.classList.contains('timeline-item')) {
                        this.animateTimelineItem(entry.target);
                    }
                }
            });
        }, this.observerOptions);

        // Observe sections and timeline items
        document.querySelectorAll('section, .timeline-item, .project-card').forEach(el => {
            observer.observe(el);
        });
    }

    // Skill Bar Animations
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
                
                // Add shimmer effect
                bar.classList.add('animate-skill-bars');
            }, index * 200);
        });
    }

    // Timeline Animation
    animateTimelineItem(item) {
        const badge = item.querySelector('.certification-badge');
        if (badge) {
            setTimeout(() => {
                badge.style.animation = 'badgePulse 2s infinite, bounceIn 0.6s ease-out';
            }, 300);
        }
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offset = 80; // Account for fixed navbar
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Navigation Highlight
    setupNavigationHighlight() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.pageYOffset + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    updateNavigationHighlight() {
        // This method is called on scroll for additional nav updates if needed
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 107, 53, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Mobile Menu
    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Contact Form
    setupContactForm() {
        const form = document.getElementById('contactForm');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
        
        // Enhanced form validation and effects
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            input.addEventListener('input', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        let isValid = true;
        
        // Remove previous error styling
        field.classList.remove('error');
        
        // Validation logic
        if (fieldType === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        } else if (field.hasAttribute('required')) {
            isValid = value.length > 0;
        }
        
        // Apply styling based on validation
        if (!isValid && value.length > 0) {
            field.classList.add('error');
        }
        
        return isValid;
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea');
        let allValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                allValid = false;
            }
        });
        
        if (!allValid) {
            this.showNotification('Please fix the errors in the form.', 'error');
            return;
        }
        
        // Simulate form submission (in real app, send to server)
        this.showNotification('Message sent successfully! 🔥', 'success');
        form.reset();
        
        // Reset form styling
        inputs.forEach(input => {
            input.parentElement.classList.remove('focused');
        });
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            background: type === 'success' 
                ? 'linear-gradient(45deg, #28a745, #20c997)' 
                : 'linear-gradient(45deg, #dc3545, #fd7e14)'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Enhanced 3D Effects
    setup3DEffects() {
        // Enhanced volcano animation
        const volcano = document.querySelector('.volcano');
        const crater = document.querySelector('.crater');
        
        if (volcano && crater) {
            let mouseX = 0;
            let mouseY = 0;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                mouseY = (e.clientY / window.innerHeight) * 2 - 1;
                
                const rotateX = mouseY * 10;
                const rotateY = mouseX * 10;
                
                volcano.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        }
        
        // Project card 3D effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    // Parallax Effects
    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Dynamic Background Effects
    createDynamicBackground() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-2';
        canvas.style.pointerEvents = 'none';
        
        document.body.appendChild(canvas);
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function drawBackground() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Create subtle animated gradient
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width
            );
            
            const time = Date.now() * 0.001;
            const opacity1 = 0.05 + Math.sin(time) * 0.02;
            const opacity2 = 0.03 + Math.cos(time * 0.7) * 0.015;
            
            gradient.addColorStop(0, `rgba(255, 107, 53, ${opacity1})`);
            gradient.addColorStop(0.5, `rgba(255, 71, 87, ${opacity2})`);
            gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            requestAnimationFrame(drawBackground);
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        drawBackground();
    }

    // Performance optimizations
    handleResize() {
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.particles = []; // Clear particles on resize
            this.createParticleSystem(); // Recreate particle system
        }, 250);
    }

    // Advanced animations for different sections
    animateSection(sectionClass) {
        const section = document.querySelector(`.${sectionClass}`);
        if (!section) return;
        
        const elements = section.querySelectorAll('[data-animate]');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * 100);
        });
    }

    // Typing effect for hero section
    setupTypingEffect() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (!subtitle) return;
        
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000); // Start after hero animation
    }

    // Initialize all advanced features
    initAdvancedFeatures() {
        this.setup3DEffects();
        this.setupParallaxEffects();
        this.createDynamicBackground();
        this.setupTypingEffect();
    }
}

// Enhanced CSS for error states and animations
const additionalStyles = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: var(--accent-red);
        box-shadow: 0 0 0 3px rgba(255, 71, 87, 0.2);
    }
    
    .nav-link.active {
        color: var(--accent-orange);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    @keyframes bounceIn {
        0% {
            transform: scale(0.3);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .form-group.focused input,
    .form-group.focused textarea {
        border-color: var(--accent-orange);
    }
    
    .particle {
        will-change: transform;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .particle {
            display: none;
        }
    }
`;

// Add additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new VolcanicPortfolio();
    
    // Initialize advanced features after a short delay for better performance
    setTimeout(() => {
        portfolio.initAdvancedFeatures();
    }, 1000);
});

// Service Worker for better performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment the following lines if you want to implement a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}

// Additional utility functions
const Utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Random number generator
    random: (min, max) => Math.random() * (max - min) + min,
    
    // Linear interpolation
    lerp: (start, end, factor) => start + (end - start) * factor
};

// Export for potential use in other modules
window.VolcanicPortfolio = VolcanicPortfolio;
window.PortfolioUtils = Utils;
