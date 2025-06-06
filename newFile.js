document.addEventListener('DOMContentLoaded', function () {
    function isMobile() {
        return window.innerWidth <= 768;
    }

    function adjustFormsForMobile() {
        if (isMobile()) {
            const formInputs = document.querySelectorAll('.form-input');
            formInputs.forEach(input => {
                input.style.fontSize = '16px'; // Melhor para mobile (evita zoom)
                input.style.padding = '12px 10px';
            });

            const formButtons = document.querySelectorAll('.form-button');
            formButtons.forEach(button => {
                button.style.padding = '12px 20px';
                button.style.fontSize = '16px';
            });
        }
    }

    function adjustShelterCardsForMobile() {
        const shelterCards = document.querySelectorAll('.shelter-card');
        if (isMobile()) {
            shelterCards.forEach(card => {
                card.style.padding = '15px';
                card.style.margin = '10px 0';

                const title = card.querySelector('h3');
                if (title) title.style.fontSize = '18px';

                const content = card.querySelector('p');
                if (content) content.style.fontSize = '14px';
            });
        }
    }

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        if (isMobile()) {
            navLinks.style.display = 'none';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = '#2e7d32';
            navLinks.style.padding = '20px 0';
            navLinks.style.zIndex = '1000';

            const navItems = document.querySelectorAll('.nav-links li');
            navItems.forEach(item => {
                item.style.margin = '10px 0';
                item.style.textAlign = 'center';
            });
        }

        mobileMenuBtn.addEventListener('click', function () {
            if (isMobile()) {
                if (navLinks.style.display === 'none' || !navLinks.style.display) {
                    navLinks.style.display = 'flex';
                    this.textContent = '✕';
                } else {
                    navLinks.style.display = 'none';
                    this.textContent = '☰';
                }
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function () {
                if (isMobile() && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                    mobileMenuBtn.textContent = '☰';
                }
            });
        });
    }

    function adjustModalForMobile() {
        const modals = document.querySelectorAll('.shelter-modal');
        if (isMobile() && modals.length > 0) {
            modals.forEach(modal => {
                const modalContent = modal.querySelector('div > div');
                if (modalContent) {
                    modalContent.style.width = '90%';
                    modalContent.style.padding = '20px';

                    const closeBtn = modal.querySelector('.close-modal');
                    if (closeBtn) {
                        closeBtn.style.top = '10px';
                        closeBtn.style.right = '10px';
                    }
                }
            });
        }
    }

    adjustFormsForMobile();
    adjustShelterCardsForMobile();

    window.addEventListener('resize', function () {
        adjustFormsForMobile();
        adjustShelterCardsForMobile();

        if (!isMobile() && navLinks) {
            navLinks.style.display = '';
            navLinks.style.flexDirection = '';
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.width = '';
            navLinks.style.backgroundColor = '';
            navLinks.style.padding = '';

            const navItems = document.querySelectorAll('.nav-links li');
            navItems.forEach(item => {
                item.style.margin = '';
                item.style.textAlign = '';
            });

            if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
        }
    });

    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const cpfInput = document.getElementById('cpf');
            const cpfValue = cpfInput.value.replace(/\D/g, '');
            if (cpfValue.length !== 11) {
                showError(cpfInput, 'CPF deve conter 11 dígitos');
                return;
            } else {
                clearError(cpfInput);
            }

            const nomeInput = document.getElementById('nome');
            if (nomeInput.value.trim().length < 3) {
                showError(nomeInput, 'Nome deve conter pelo menos 3 caracteres');
                return;
            } else {
                clearError(nomeInput);
            }

            const nascimentoInput = document.getElementById('nascimento');
            const nascimentoDate = new Date(nascimentoInput.value);
            const today = new Date();
            if (!nascimentoInput.value || nascimentoDate > today) {
                showError(nascimentoInput, 'Data de nascimento inválida');
                return;
            } else {
                clearError(nascimentoInput);
            }

            const telefoneInput = document.getElementById('telefone');
            const telefoneValue = telefoneInput.value.replace(/\D/g, '');
            if (telefoneValue.length < 11) {
                showError(telefoneInput, 'Telefone deve conter pelo menos 11 dígitos');
                return;
            } else {
                clearError(telefoneInput);
            }

            alert('Cadastro realizado com sucesso!');
            registerForm.reset();
        });
    }

    const incidentForm = document.querySelector('.incident-form');
    if (incidentForm) {
        incidentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const localInput = document.getElementById('local');
            if (localInput.value.trim().length < 5) {
                showError(localInput, 'Local deve conter pelo menos 5 caracteres');
                return;
            } else {
                clearError(localInput);
            }

            const natureSelected = document.querySelector('input[name="natureza"]:checked');
            if (!natureSelected) {
                const natureOptions = document.querySelector('.nature-options');
                showError(natureOptions, 'Selecione a natureza do incidente');
                return;
            } else {
                const natureOptions = document.querySelector('.nature-options');
                clearError(natureOptions);
            }

            const descricaoInput = document.getElementById('descricao');
            if (descricaoInput.value.trim().length < 10) {
                showError(descricaoInput, 'Descrição deve conter pelo menos 10 caracteres');
                return;
            } else {
                clearError(descricaoInput);
            }

            alert('Incidente reportado com sucesso! Nossa equipe entrará em contato.');
            incidentForm.reset();
        });
    }

    function showError(input, message) {
        const formField = input.parentElement;
        const errorMessage = formField.querySelector('.error-message') || document.createElement('span');
        errorMessage.className = 'error-message';
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = isMobile() ? '0.7rem' : '0.8rem';
        errorMessage.style.marginTop = '5px';
        errorMessage.style.display = 'block';
        errorMessage.textContent = message;

        if (!formField.querySelector('.error-message')) {
            formField.appendChild(errorMessage);
        }

        input.style.borderColor = 'red';
    }

    function clearError(input) {
        const formField = input.parentElement;
        const errorMessage = formField.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        input.style.borderColor = '#a5d6a7';
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offset = isMobile() ? 60 : 80; // Offset menor para mobile
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });

                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.style.display = 'none';
                    mobileMenuBtn.textContent = '☰';
                }
            }
        });
    });

    const fadeElements = document.querySelectorAll('.fade-in');

    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - (isMobile() ? 50 : 100)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    window.addEventListener('load', checkFade);
    window.addEventListener('scroll', checkFade);

    // Modal de abrigos ajustado para mobile
    const shelterCards = document.querySelectorAll('.shelter-card');
    shelterCards.forEach(card => {
        card.addEventListener('click', function () {
            const shelterTitle = this.querySelector('h3').textContent;
            const shelterContent = this.querySelector('p').innerHTML;

            const modal = document.createElement('div');
            modal.className = 'shelter-modal';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.right = '0';
            modal.style.bottom = '0';
            modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '1000';

            modal.innerHTML = `
                <div style="background: white; padding: ${isMobile() ? '20px' : '30px'}; border-radius: 10px; max-width: ${isMobile() ? '90%' : '600px'}; width: 90%; position: relative; max-height: ${isMobile() ? '80vh' : 'auto'}; overflow-y: auto;">
                    <button class="close-modal" style="position: absolute; top: ${isMobile() ? '10px' : '15px'}; right: ${isMobile() ? '10px' : '15px'}; background: none; border: none; font-size: ${isMobile() ? '20px' : '24px'}; cursor: pointer;">✕</button>
                    <h2 style="font-size: ${isMobile() ? '20px' : '24px'};">${shelterTitle}</h2>
                    <div class="shelter-details" style="margin-top: 20px; font-size: ${isMobile() ? '14px' : '16px'};">
                        ${shelterContent.replace(/<strong>/g, '<h3 style="color: #2e7d32; margin-top: 15px; font-size: ${isMobile() ? ', 16, px, ' : ', 18, px, '};">').replace(/<\/strong>/g, '</h3>')}
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden'; // Previne scroll no body

            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', function () {
                modal.remove();
                document.body.style.overflow = '';
            });

            modal.addEventListener('click', function (e) {
                if (e.target === modal) {
                    modal.remove();
                    document.body.style.overflow = '';
                }
            });
        });
    });
});
