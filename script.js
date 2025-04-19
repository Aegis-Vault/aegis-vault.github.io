// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

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
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    burger.classList.remove('toggle');
                }
            }
        });
    });

    // Enhanced Navigation Active State
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }
    updateActiveNav();

    // Animated Counters
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 25);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });

    // Testimonial Carousel
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    
    setInterval(() => {
        testimonials[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }, 5000);

    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            testimonials[currentTestimonial].classList.remove('active');
            dots[currentTestimonial].classList.remove('active');
            currentTestimonial = index;
            testimonials[currentTestimonial].classList.add('active');
            dots[currentTestimonial].classList.add('active');
        });
    });

    // Initialize Animations
    AOS.init({
        duration: 1000,
        once: true
    });

    // Security Dashboard Counter Animation
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
                const isDecimal = target % 1 !== 0;
                const increment = isDecimal ? target / (speed / 10) : Math.ceil(target / speed);
                const currentValue = parseFloat(counter.innerText.replace(prefix, '').replace(suffix, ''));
                
                if (currentValue < target) {
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

    // "COMING SOON" BUTTON INTERACTION
    const soonButtons = document.querySelectorAll('.soon-btn');

    soonButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // FREE SCAN FORM HANDLING
    const scanForm = document.getElementById('scanForm');
    if (scanForm) {
        scanForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const spinner = submitBtn.querySelector('.fa-spinner');
            const buttonText = submitBtn.querySelector('.button-text');
            
            // Show loading state
            buttonText.textContent = 'Submitting...';
            spinner.style.display = 'inline-block';
            
            // Let FormSubmit handle the submission
        });

        scanForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            document.body.appendChild(progressBar);

            // Simulate progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                progressBar.style.width = `${progress}%`;
                if (progress >= 100) {
                    clearInterval(interval);
                    progressBar.remove();
                }
            }, 300);
        });
    }

    // Check for #thanks in URL and show thank you section
    if (window.location.hash === '#thanks') {
        const thanksSection = document.getElementById('thanks');
        if (thanksSection) {
            thanksSection.style.display = 'block';
            window.scrollTo({ top: thanksSection.offsetTop, behavior: 'smooth' });
        }
    }

    // CHAT FUNCTIONALITY
    const chatToggle = document.getElementById('chat-toggle');
    const chatClose = document.getElementById('chat-close');
    const chatContainer = document.getElementById('chat');
    const chatBox = document.getElementById('chatBox');
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    
    let socket;
    
    // Initialize the chat socket connection
    function initSocket() {
        if (socket && socket.connected) return; // Already connected
        
        try {
            // Connect to your backend server
            socket = io('https://aegis-backend-qal6.onrender.com', {
                transports: ['websocket'],
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionAttempts: 5
            });
            
            // Connection status messages
            socket.on('connect', () => {
                addMessage('Connected to AegisVault support. How can we help with your smart contract security needs?', 'server');
                document.getElementById('connection-status').classList.add('connected');
                document.getElementById('connection-status').textContent = 'Connected';
            });
            
            socket.on('connect_error', () => {
                addMessage('Connection error. Please try again later.', 'system');
                console.error('Socket connection error');
            });
            
            socket.on('disconnect', () => {
                addMessage('Disconnected from chat. Attempting to reconnect...', 'system');
                console.log('Socket disconnected');
                document.getElementById('connection-status').classList.remove('connected');
                document.getElementById('connection-status').textContent = 'Disconnected';
            });
            
            // Receive messages
            socket.on('chat_message', (msg) => {
                addMessage(msg, 'server');
            });

            // Typing indicator
            socket.on('typing', () => {
                addMessage('AegisVault is typing...', 'system');
            });
            
            // Fallback server demo response (in case the server doesn't respond)
            setTimeout(() => {
                if (chatBox.children.length <= 1) {
                    addMessage('Hello! I\'m your AegisVault security assistant. How can I help you with smart contract security today?', 'server');
                }
            }, 3000);

            // Auto-message after 3 seconds
            setTimeout(() => {
                if (!hasUserMessage) {
                    addMessage("Hey 👋 Need a quick security assessment? I can review basic contract risks for free.", 'server');
                }
            }, 3000);
            
        } catch (err) {
            console.error('Chat initialization error:', err);
            addMessage('Chat service is currently unavailable. Please email us directly.', 'system');
        }
    }
    
    // Toggle chat visibility
    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            chatContainer.classList.add('active');
            // If first time opening chat, initialize the connection
            if (!socket || !socket.connected) {
                initSocket();
            }
            
            // Focus the input field for immediate typing
            messageInput.focus();
        });
    }
    
    // Close chat button functionality
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatContainer.classList.remove('active');
        });
    }
    
    // Send message on form submit
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const message = messageInput.value.trim();
            if (!message) return;
            
            // Display user message
            addMessage(message, 'user');
            
            // Send to server if connected
            if (socket && socket.connected) {
                socket.emit('chat_message', message);
                
                // Demo server response for testing
                setTimeout(() => {
                    // Simulate server response if no response received within 2 seconds
                    const responses = [
                        "Thanks for your message. Our team will review your question and get back to you shortly.",
                        "I understand you're asking about smart contract security. Could you provide more details about your specific concerns?",
                        "We typically check for reentrancy, access control, and oracle manipulation vulnerabilities in our audits. Would you like to learn more about our process?",
                        "Our audit process usually takes 1-2 weeks depending on contract complexity. When is your project planning to launch?"
                    ];
                    
                    // Only send a demo response if we haven't received a real one
                    const hasServerResponse = Array.from(chatBox.children).slice(-1)[0]?.classList.contains('server');
                    if (!hasServerResponse) {
                        addMessage(responses[Math.floor(Math.random() * responses.length)], 'server');
                    }
                }, 2000);
            } else {
                // Not connected - show error and try to reconnect
                addMessage("Connection issue. Trying to reconnect...", 'system');
                initSocket();
            }
            
            // Clear input field
            messageInput.value = '';
        });
    }
    
    // Function to add message to the chat
    function addMessage(content, type) {
        const message = document.createElement('div');
        message.classList.add('message', type);
        message.textContent = content;
        
        // Add message to chat
        chatBox.appendChild(message);
        
        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Preserve Chat Functionality
    function initializeChat() {
        // Keep existing chat implementation
    }
    initializeChat();

    // Real-Time Stats Updating
    async function fetchLiveStats() {
        try {
            const response = await fetch('https://api.aegisvault.com/stats');
            const data = await response.json();

            document.getElementById('contractsCount').textContent = data.contracts;
            document.getElementById('issuesCount').textContent = data.issues;
            document.getElementById('criticalCount').textContent = data.critical;
            document.getElementById('protectedValue').textContent = `$${data.protected}M`;

            // Add particle animation on update
            createValueParticles(data.protected);
        } catch (error) {
            console.error('Failed to fetch live stats:', error);
        }
    }

    function createValueParticles(value) {
        // Placeholder for particle.js or similar animation library
        console.log(`Creating particles for value: $${value}M`);
    }

    // Initialize stats fetching
    fetchLiveStats();

    // Email Validation
    const emailInput = document.querySelector('input[name="email"]');
    emailInput.addEventListener('input', () => {
        if (!emailInput.value.includes('@')) {
            emailInput.setCustomValidity('Please enter a valid email address.');
        } else {
            emailInput.setCustomValidity('');
        }
    });

    // Vulnerability Chart
    const ctx = document.getElementById('vulnerabilityChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Critical', 'High', 'Medium', 'Low'],
            datasets: [{
                data: [23, 45, 67, 12],
                backgroundColor: ['#ff4d4d', '#ffcc00', '#66ccff', '#99ff99']
            }]
        }
    });

    // Dark Mode Toggle
    const toggle = document.getElementById('darkModeToggle');
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});