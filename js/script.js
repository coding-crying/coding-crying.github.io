/**
 * The Midnight Archive - Interaction Engine
 * Handles custom cursor, image previews, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initImagePreview();
    initHeaderScroll();
    initContactForm();
    initMobileMenu(); // Kept for structure, though CSS handles most
});

/**
 * Contact Form Handler (Frontend Simulation)
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;

            // Simulate network request
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Sent!';
                status.style.display = 'block';
                status.textContent = 'Message sent! Thanks for reaching out.';
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    status.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }
}

/**
 * Custom Cursor Logic
 * Creates a lagging follower effect for smooth feel.
 */
function initCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    
    // Only activate on desktop
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            dot.style.left = `${posX}px`;
            dot.style.top = `${posY}px`;

            // Outline follows with lag (via CSS transition or animation frame)
            // For performance, we use simple CSS transitions defined in style.css
            outline.style.left = `${posX}px`;
            outline.style.top = `${posY}px`;
        });

        // Hover effects for interactive elements
        const interactables = document.querySelectorAll('a, button, .bento-card, .stream-item');
        
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }
}

/**
 * Floating Image Preview (Project Stream)
 * Shows image near cursor when hovering project list items.
 */
function initImagePreview() {
    const streamItems = document.querySelectorAll('.stream-item');
    const previewBox = document.querySelector('.hover-reveal');

    if (!streamItems.length || !previewBox) return;

    streamItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const imgUrl = item.getAttribute('data-image');
            if (imgUrl) {
                previewBox.style.backgroundImage = `url(${imgUrl})`;
                previewBox.classList.add('active');
                
                // Check if the image is the specific flower one
                if (imgUrl.includes('flwr-head')) {
                    previewBox.classList.add('mini-preview');
                } else {
                    previewBox.classList.remove('mini-preview');
                }
            }
        });

        item.addEventListener('mousemove', (e) => {
            // Offset image from cursor to not block text
            const x = e.clientX + 50;
            const y = e.clientY - 100;
            
            previewBox.style.left = `${x}px`;
            previewBox.style.top = `${y}px`;
        });

        item.addEventListener('mouseleave', () => {
            previewBox.classList.remove('active');
            previewBox.classList.remove('mini-preview'); // Clean up
        });
    });
}

/**
 * Header Glass Effect
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile Menu Placeholder
 * (Expandable in future)
 */
function initMobileMenu() {
    // Logic for mobile menu toggle if needed
}
