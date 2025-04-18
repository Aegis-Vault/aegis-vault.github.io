// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to your server
            // For now, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
            }
        });
    });

    // NEW CODE BELOW THIS LINE - DO NOT MODIFY EXISTING CODE ABOVE

    // 1. ENHANCED CONTACT FORM WITH FORMSPREE
    // Replace the existing form submission code with this enhanced version
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(contactForm);
            
            try {
                // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree endpoint
                // Example: https://formspree.io/f/xrgdkpae
                const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    showFormMessage('success', 'Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                } else {
                    // Show error message
                    showFormMessage('error', 'Oops! There was a problem sending your message. Please try again.');
                }
            } catch (error) {
                // Show error message if fetch fails
                showFormMessage('error', 'Something went wrong. Please check your connection and try again.');
            }
            
            // Restore button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
    }
    
    // Function to show form messages
    function showFormMessage(type, message) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('form-message', `form-message-${type}`);
        messageElement.textContent = message;
        
        // Add message to form
        contactForm.appendChild(messageElement);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }

    // 2. SECURITY DASHBOARD COUNTER ANIMATION
    setupCounterAnimations();

    // Counter animation for dashboard
    function animateCounters() {
        const counters = document.querySelectorAll('.dashboard-number');
        const speed = 200; // The lower the faster
        
        counters.forEach(counter => {
            const targetValue = counter.innerText;
            const isValueWithUnit = targetValue.startsWith('$') || targetValue.includes('M');
            
            let prefix = '';
            let suffix = '';
            let numericValue = targetValue;
            
            // Handle values with prefixes/suffixes (like $4.2M)
            if (isValueWithUnit) {
                if (targetValue.startsWith('$')) {
                    prefix = '$';
                    numericValue = targetValue.substring(1);
                }
                
                if (targetValue.includes('M')) {
                    suffix = 'M';
                    numericValue = numericValue.replace('M', '');
                }
            }
            
            const target = parseFloat(numericValue);
            counter.innerText = '0';
            
            const updateCounter = () => {
                // Handle decimal numbers
                const isDecimal = target % 1 !== 0;
                const increment = isDecimal ? target / (speed / 10) : Math.ceil(target / speed);
                const currentValue = parseFloat(counter.innerText.replace(prefix, '').replace(suffix, ''));
                
                if (currentValue < target) {
                    // For decimals, we need to format the display correctly
                    if (isDecimal) {
                        counter.innerText = prefix + Math.min(currentValue + increment, target).toFixed(1) + suffix;
                    } else {
                        counter.innerText = prefix + Math.min(Math.ceil(currentValue + increment), target) + suffix;
                    }
                    
                    setTimeout(updateCounter, 1);
                } else {
                    counter.innerText = prefix + target + suffix;
                }
            };
            
            updateCounter();
        });
    }

    // Intersection Observer to trigger animation when dashboard is visible
    function setupCounterAnimations() {
        const dashboard = document.querySelector('.security-dashboard');
        
        if (dashboard) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(dashboard);
        }
    }

    // 3. NEWSLETTER FORM HANDLING
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            const formData = new FormData(newsletterForm);
            
            try {
                // Use the same Formspree endpoint or create a new one specifically for the newsletter
                const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    newsletterForm.innerHTML = '<p class="success-message">Thank you for subscribing! You\'ll receive security updates soon.</p>';
                } else {
                    // Show error and reset
                    alert('There was a problem with your subscription. Please try again.');
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                alert('Something went wrong. Please check your connection and try again.');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // 4. "COMING SOON" BUTTON INTERACTION
    const soonButtons = document.querySelectorAll('.soon-btn');

    soonButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Optional: Scroll to newsletter section
            const newsletterSection = document.querySelector('.newsletter-signup');
            if (newsletterSection) {
                newsletterSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // If no newsletter section, show contact form
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // 5. FREE SCAN FORM HANDLING
    document.getElementById('scanForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const form = e.target;

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="loader"></div> Processing...';

        // Send form data
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = '#thanks';
                    form.reset();
                } else {
                    alert('Error submitting the form. Please try again.');
                }
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Run Free Scan';
            });
    });

    // Check for #thanks in URL and show thank you section
    document.addEventListener('DOMContentLoaded', function() {
        if (window.location.hash === '#thanks') {
            document.querySelectorAll('section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById('thanks').style.display = 'block';
            window.scrollTo(0, 0);
        }
    });

    if (window.location.hash === '#thanks') {
        const thanksSection = document.getElementById('thanks');
        if (thanksSection) {
            thanksSection.style.display = 'block';
        }
    }
});
