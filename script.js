// Global settings
        let settings = {
            particles: true,
            parallax: true,
            animations: true
        };

        // Enhanced Parallax Effect
        let mouseX = 0;
        let mouseY = 0;
        let ticking = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!ticking) {
                requestAnimationFrame(() => {
                    updateCursor(e);
                    if (settings.parallax) applyParallax(e);
                    showInteractiveZone(e);
                    ticking = false;
                });
                ticking = true;
            }
        });

        function updateCursor(e) {
            const cursor = document.querySelector('.cursor');
            const follower = document.querySelector('.cursor-follower');
            
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            
            setTimeout(() => {
                follower.style.left = e.clientX - 20 + 'px';
                follower.style.top = e.clientY - 20 + 'px';
            }, 50);
        }

        function applyParallax(e) {
            const elements = document.querySelectorAll('.parallax-element');
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            elements.forEach(element => {
                const speed = element.getAttribute('data-speed');
                const x = (e.clientX - centerX) * speed / 100;
                const y = (e.clientY - centerY) * speed / 100;
                
                element.style.transform = `translate(${x}px, ${y}px)`;
            });

            // Parallax for background shapes
            const shapes = document.querySelectorAll('.floating-shapes');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                const x = (e.clientX - centerX) * speed / 200;
                const y = (e.clientY - centerY) * speed / 200;
                
                shape.style.transform = `translate(${x}px, ${y}px) rotate(${x / 10}deg)`;
            });
        }

        function showInteractiveZone(e) {
            const zone = document.querySelector('.interactive-zone');
            zone.style.left = e.clientX - 100 + 'px';
            zone.style.top = e.clientY - 100 + 'px';
        }

        // Click effect
        document.addEventListener('click', (e) => {
            const zone = document.querySelector('.interactive-zone');
            zone.classList.add('active');
            
            setTimeout(() => {
                zone.classList.remove('active');
            }, 1000);
            
            if (settings.particles) createParticles(e.clientX, e.clientY);
        });

        // Particle system
        function createParticles(x, y) {
            for (let i = 0; i < 10; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = x + Math.random() * 20 - 10 + 'px';
                particle.style.top = y + 'px';
                particle.style.width = Math.random() * 6 + 2 + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDelay = Math.random() * 0.5 + 's';
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 8000);
            }
        }

        // Continuous particle generation
        let particleInterval = setInterval(() => {
            if (!settings.particles) return;
            
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            particle.style.width = Math.random() * 4 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = Math.random() * 3 + 5 + 's';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 8000);
        }, 500);

        // Control panel functionality
        document.getElementById('particlesToggle')?.addEventListener('change', (e) => {
            settings.particles = e.target.checked;
        });

        document.getElementById('parallaxToggle')?.addEventListener('change', (e) => {
            settings.parallax = e.target.checked;
        });

        document.getElementById('animationsToggle')?.addEventListener('change', (e) => {
            settings.animations = e.target.checked;
            const body = document.body;
            if (settings.animations) {
                body.style.animationPlayState = 'running';
            } else {
                body.style.animationPlayState = 'paused';
            }
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Smooth entry animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 1s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Feature cards hover effect
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Form validation
        document.querySelector('button[type="submit"]')?.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! This is a demo form.');
        });