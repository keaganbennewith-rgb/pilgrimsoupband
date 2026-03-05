/**
 * PILGRIM SOUP - MAIN JS
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('open');
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        const links = navLinks.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('open');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Navbar Background on Scroll
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 4. Copy Bio to Clipboard
    const copyBioBtn = document.getElementById('copy-bio-btn');
    if (copyBioBtn) {
        copyBioBtn.addEventListener('click', () => {
            const bioText = `Pilgrim Soup is a Durban based rap-rock band blending hip-hop grooves, alternative rock energy and festival ready hooks.\n\nOriginally formed in 2011, the band has evolved through multiple eras before landing on its current sound — a fusion of rap, bass-driven grooves and explosive alternative rock.\n\nDrawing influence from artists like Rage Against the Machine, Gorillaz, Mac Miller and Linkin Park, Pilgrim Soup delivers a live show built for festival stages.\n\nThe project mixes hip-hop attitude with the raw power of a live band, creating a sound that moves easily between rap, funk and alternative rock.`;

            navigator.clipboard.writeText(bioText).then(() => {
                const originalText = copyBioBtn.innerHTML;
                copyBioBtn.innerHTML = `<div class="media-icon">✅</div><h3>Copied!</h3><span>Ready to paste</span>`;

                setTimeout(() => {
                    copyBioBtn.innerHTML = originalText;
                }, 2500);
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        });
    }

    // 5. Setup Intersection Observer for scroll animations (Optional polish)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Here we could add a class to trigger CSS animations
                // example: entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to sections
    document.querySelectorAll('.section').forEach(section => {
        animateOnScroll.observe(section);
    });
});
