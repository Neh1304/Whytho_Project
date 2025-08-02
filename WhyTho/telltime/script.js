// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Show main content after intro animation
    setTimeout(() => {
        document.getElementById("mainContent").style.display = "block";
        startAnimations();
    }, 4800);

    // Initialize all functionality
    initEmailForm();
    initFactCarousel();
    initScrollProgress();
    initParticles();
    initIntersectionObserver();
}

// Email Form Functionality
function initEmailForm() {
    const form = document.getElementById("emailForm");
    const emailInput = document.getElementById("emailInput");
    const responseMessage = document.getElementById("responseMessage");
    const submitBtn = form.querySelector('.submit-btn');

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        await handleFormSubmission(emailInput, responseMessage, submitBtn);
    });

    // Add input validation and styling
    emailInput.addEventListener('input', () => {
        validateEmail(emailInput);
    });

    emailInput.addEventListener('focus', () => {
        emailInput.parentElement.classList.add('focused');
    });

    emailInput.addEventListener('blur', () => {
        emailInput.parentElement.classList.remove('focused');
    });
}

async function handleFormSubmission(emailInput, responseMessage, submitBtn) {
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
        showResponseMessage(responseMessage, "Please enter a valid email address.", "error");
        return;
    }

    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        const response = await fetch("http://127.0.0.1:5000/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();

        if (response.ok) {
            showResponseMessage(responseMessage, result.message || "🎉 Awesome! Check your inbox for some delightfully useless knowledge!", "success");
            emailInput.value = "";
            
            // Add celebration animation
            celebrateSuccess();
        } else {
            showResponseMessage(responseMessage, result.message || "Oops! Something went wrong. Please try again.", "error");
        }
    } catch (error) {
        console.error("Error:", error);
        showResponseMessage(responseMessage, "Failed to connect to the server. Our digital pigeons might be on strike! 🐦", "error");
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateEmail(emailInput) {
    const email = emailInput.value.trim();
    if (email && !isValidEmail(email)) {
        emailInput.style.borderColor = '#ef4444';
    } else {
        emailInput.style.borderColor = '';
    }
}

function showResponseMessage(responseMessage, message, type) {
    responseMessage.textContent = message;
    responseMessage.className = `response-message show ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        responseMessage.classList.remove('show');
    }, 5000);
}

function celebrateSuccess() {
    // Create temporary celebration particles
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createCelebrationParticle();
        }, i * 100);
    }
}

function createCelebrationParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: linear-gradient(45deg, #00d4ff, #7c3aed);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: 50%;
        top: 50%;
        animation: celebrate 2s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

// Add celebration keyframes to document
const celebrationStyles = document.createElement('style');
celebrationStyles.textContent = `
    @keyframes celebrate {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) scale(1) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(celebrationStyles);

// Fact Carousel Functionality
function initFactCarousel() {
    const factItems = document.querySelectorAll('.fact-item');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentSlide = 0;
    let carouselInterval;

    // Auto-rotate carousel
    function startCarousel() {
        carouselInterval = setInterval(() => {
            nextSlide();
        }, 4000);
    }

    function stopCarousel() {
        clearInterval(carouselInterval);
    }

    function showSlide(index) {
        // Hide all slides
        factItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        factItems[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % factItems.length;
        showSlide(nextIndex);
    }

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopCarousel();
            setTimeout(startCarousel, 5000); // Restart after 5 seconds
        });
    });

    // Pause on hover
    const carousel = document.querySelector('.fact-carousel');
    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);

    // Start the carousel
    startCarousel();
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.transform = `scaleX(${scrollPercent}%)`;
    });
}

// Floating Particles System
function initParticles() {
    createParticle();
    setInterval(createParticle, 3000);
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    // Random colors
    const colors = ['#00d4ff', '#7c3aed', '#f59e0b', '#10b981'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Intersection Observer for Animations
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.stat-card, .main-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('pulse');
                
                // Remove pulse after animation
                setTimeout(() => {
                    entry.target.classList.remove('pulse');
                }, 2000);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Additional Animations
function startAnimations() {
    // Animate stats counters
    animateCounters();
    
    // Add mouse parallax effect
    initMouseParallax();
    
    // Add keyboard shortcuts
    initKeyboardShortcuts();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        if (isNaN(target.replace(/[^\d]/g, ''))) return;
        
        const targetNumber = parseInt(target.replace(/[^\d]/g, ''));
        if (targetNumber === 0) return;
        
        let current = 0;
        const increment = targetNumber / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                const displayNumber = Math.floor(current);
                counter.textContent = target.replace(/\d+/, displayNumber);
            }
        }, 50);
    });
}

function initMouseParallax() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        
        // Apply subtle parallax to background elements
        const movingElements = document.querySelectorAll('.fact-bubble, .clock-float');
        movingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const x = mouseX * 20 * speed;
            const y = mouseY * 20 * speed;
            element.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });
}

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Enter key focuses email input
        if (e.key === 'Enter' && e.target !== document.getElementById('emailInput')) {
            e.preventDefault();
            document.getElementById('emailInput').focus();
        }
        
        // Escape key clears input
        if (e.key === 'Escape') {
            const emailInput = document.getElementById('emailInput');
            emailInput.value = '';
            emailInput.blur();
        }
    });
}

// Random fact display (Easter egg)
const randomFacts = [
    "🦒 A giraffe's tongue is 20 inches long and blue-black in color!",
    "🐙 Octopuses have three hearts and blue blood!",
    "🍌 Bananas are berries, but strawberries aren't!",
    "🌙 The Moon is gradually moving away from Earth!",
    "🦈 Sharks have been around longer than trees!",
    "🐧 Penguins have knees!",
    "🍯 Honey never spoils. Archaeologists have found edible honey in ancient Egyptian tombs!",
    "🌟 There are more possible games of chess than atoms in the observable universe!",
    "🦋 Butterflies taste with their feet!",
    "🐨 Koalas have fingerprints that are almost identical to human fingerprints!"
];

// Easter egg: Show random fact on logo click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('header-icon') || e.target.classList.contains('intro-icon')) {
        const randomFact = randomFacts[Math.floor(Math.random() * randomFacts.length)];
        showToast(randomFact);
    }
});

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 212, 255, 0.9);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        backdrop-filter: blur(20px);
        z-index: 10000;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Slide in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Any additional scroll-based animations can go here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Console easter egg
console.log(`
🎉 Welcome to TellTime! 🎉

Found the console? You're clearly someone who appreciates the finer details!
Here's a bonus useless fact: This console message contains exactly 42 words.
(We may have lied about that number... 🤫)

Enjoy your delightfully useless facts! 🧠✨
`);

// Service worker registration (if needed for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(() => console.log('SW registered'))
        //     .catch(() => console.log('SW registration failed'));
    });
}