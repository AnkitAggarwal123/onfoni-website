document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen.toString());
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    const waitlistForm = document.querySelector('.waitlist-form');
    if (waitlistForm) {
        const emailInput = waitlistForm.querySelector('input[type="email"]');
        const submitBtn = waitlistForm.querySelector('button[type="submit"]');
        const successMessage = document.querySelector('.subscribe-success');
        const errorMessage = document.querySelector('.subscribe-error');
        const defaultBtnText = submitBtn ? submitBtn.textContent : '';
        waitlistForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (emailInput && !emailInput.checkValidity()) {
                emailInput.reportValidity();
                return;
            }

            const emailValue = emailInput ? emailInput.value.trim() : '';
            const endpoint = 'https://script.google.com/macros/s/AKfycbwV9IsZDYo54V9L6rwYQGfNXGgjeKCKp0b2tQryN2n_vjfmO2P9G_HJ23KhEZHuLEMW/exec';

            if (submitBtn) {
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;
            }
            if (successMessage) {
                successMessage.classList.remove('visible');
            }
            if (errorMessage) {
                errorMessage.classList.remove('visible');
            }

            const payload = JSON.stringify({
                email: emailValue,
                source: 'website_subscribe'
            });

            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: payload
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                if (submitBtn) {
                    submitBtn.textContent = 'Subscribed ✓';
                    submitBtn.classList.add('btn-success');
                }
                if (successMessage) {
                    successMessage.classList.add('visible');
                }
                if (emailInput) {
                    emailInput.value = '';
                }
            }).catch(() => {
                if (errorMessage) {
                    errorMessage.classList.add('visible');
                }
                if (successMessage) {
                    successMessage.classList.remove('visible');
                }
                if (submitBtn) {
                    submitBtn.textContent = defaultBtnText;
                    submitBtn.classList.remove('btn-success');
                    submitBtn.disabled = false;
                }
            }).finally(() => {
                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.textContent = defaultBtnText;
                        submitBtn.classList.remove('btn-success');
                        submitBtn.disabled = false;
                    }
                    if (successMessage) {
                        successMessage.classList.remove('visible');
                    }
                }, 2800);
            });

        });
    }
});
