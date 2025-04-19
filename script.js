// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                e.preventDefault();
                
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    burger.classList.remove('toggle');
                }
            }
        });
    });

    // Active Navigation Link on Scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 200)) {
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
    updateActiveNavLink();

    // Dashboard Counter Animation
    function initCounters() {
        const counters = document.querySelectorAll('.dashboard-number');
        
        counters.forEach(counter => {
            const target = counter.getAttribute('data-count');
            const isDecimal = target.includes('.');
            
            counter.innerText = '0';
            
            let count = 0;
            const speed = 2000; // Animation duration in milliseconds
            const increment = target / (speed / 16); // 60fps
            
            function updateCount() {
                if (count < target) {
                    count += increment;
                    
                    if (isDecimal) {
                        counter.innerText = Math.min(count, target).toFixed(1);
                    } else {
                        counter.innerText = Math.floor(Math.min(count, target));
                    }
                    
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            }
            
            // Only start counter animation when the element is in viewport
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCount();
                    observer.disconnect();
                }
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    initCounters();

    // Form Submission Handling
    const scanForm = document.getElementById('scanForm');
    
    if (scanForm) {
        scanForm.addEventListener('submit', (e) => {
            const submitBtn = scanForm.querySelector('button[type="submit"]');
            const buttonText = submitBtn.querySelector('.button-text');
            const spinner = submitBtn.querySelector('.fa-spinner');
            
            // Show loading state
            if (buttonText) buttonText.textContent = 'Processing...';
            if (spinner) spinner.style.display = 'inline-block';
            
            // Let the form submit normally to FormSubmit handler
            // The form has a redirect to thank-you.html
        });
    }

    // Coming Soon Button Behavior
    document.querySelectorAll('.soon-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Initialize any elements that require popovers or tooltips
    document.querySelectorAll('[data-toggle="tooltip"]').forEach(el => {
        el.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('title');
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
            tooltip.style.opacity = '1';
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            }, { once: true });
        });
    });
    
    // If the URL has #thanks, show a success message
    if (window.location.hash === '#thanks') {
        const successMessage = document.createElement('div');
        successMessage.className = 'floating-success-message';
        successMessage.innerHTML = `
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <div class="success-text">
                <h3>Form Submitted!</h3>
                <p>We'll get back to you within 24 hours.</p>
            </div>
            <button class="close-btn"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.classList.add('show');
        }, 100);
        
        successMessage.querySelector('.close-btn').addEventListener('click', () => {
            successMessage.classList.remove('show');
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        });
        
        setTimeout(() => {
            successMessage.classList.remove('show');
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }, 5000);
        
        window.history.replaceState(null, '', window.location.pathname);
    }
});