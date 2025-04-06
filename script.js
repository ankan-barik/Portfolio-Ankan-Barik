// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
          // Add close button functionality
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', function() {
            document.getElementById('mobile-menu').classList.remove('active');
            document.getElementById('mobile-menu-button').classList.remove('active');
            document.body.style.overflow = '';
        });
    }
        
        
    }
    // Smooth scrolling for navigation links (existing code)
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Image Glow Effect (existing code)
    const glowContainers = document.querySelectorAll('.cursor-glow, .image-container');

    glowContainers.forEach(container => {
        // Mouse move event
        container.addEventListener('mousemove', function (e) {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create or update glow effect
            let glowElement = container.querySelector('.glow-effect');
            if (!glowElement) {
                glowElement = document.createElement('div');
                glowElement.classList.add('glow-effect');
                container.appendChild(glowElement);
            }

            glowElement.style.position = 'absolute';
            glowElement.style.top = '0';
            glowElement.style.left = '0';
            glowElement.style.width = '100%';
            glowElement.style.height = '100%';
            glowElement.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 165, 0, 0.3), transparent 50%)`;
            glowElement.style.pointerEvents = 'none';
            glowElement.style.zIndex = '1';
            glowElement.style.borderRadius = 'inherit';
        });

        // Mouse leave event to remove glow
        container.addEventListener('mouseleave', function () {
            const glowElement = container.querySelector('.glow-effect');
            if (glowElement) {
                glowElement.remove();
            }
        });
    });

    // Colors array for hover effects
    const colors = [
        '#FF5733', // Bright Red
        '#33FF57', // Bright Green
        '#3357FF', // Bright Blue
        '#FF33A8', // Pink
        '#33FFF5', // Cyan
        '#F5FF33'  // Yellow
    ];
    
    // Skills color change on hover
    const skillCards = document.querySelectorAll('.service-card');
    
    skillCards.forEach(card => {
        // Store original background color
        const originalColor = getComputedStyle(card).backgroundColor;
        
        // Random color for each skill card
        card.addEventListener('mouseenter', function() {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.transition = 'background-color 0.5s ease';
            this.style.backgroundColor = randomColor;
            
            // Change text color to black for better contrast with bright backgrounds
            this.style.color = '#000000';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = originalColor;
            this.style.color = 'white'; // Reset to original text color
        });
    });
    
    // Project cards color change on hover (same effect as skills)
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Store original background color
        const originalColor = getComputedStyle(card).backgroundColor;
        
        // Random color for each project card
        card.addEventListener('mouseenter', function() {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.transition = 'background-color 0.5s ease';
            this.style.backgroundColor = randomColor;
            
            // Change text color to black for better contrast with bright backgrounds
            this.style.color = '#000000';
            
            // Change button color to match the original background for contrast
            const button = this.querySelector('a');
            if (button) {
                button.style.backgroundColor = originalColor;
                button.style.color = 'white';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = originalColor;
            this.style.color = 'white'; // Reset to original text color
            
            // Reset button color
            const button = this.querySelector('a');
            if (button) {
                button.style.backgroundColor = 'black';
                button.style.color = 'white';
            }
        });
    });
});

// Contact form submission and reset
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                const formData = new FormData(this);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Reset the form on successful submission
                    this.reset();
                    
                    // Clear browser's form data cache
                    window.history.replaceState(null, '', window.location.href);
                    
                    alert('Thank you! Your message has been sent successfully.');
                } else {
                    alert('Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Something went wrong. Please try again.');
            } finally {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});