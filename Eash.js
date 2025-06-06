document.addEventListener('DOMContentLoaded', function() {

    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
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
        incidentForm.addEventListener('submit', function(e) {
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
        errorMessage.style.fontSize = '0.8rem';
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

    // Menu mobile
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                

                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
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
            
            if (elementTop < windowHeight - 100) {
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


    const shelterCards = document.querySelectorAll('.shelter-card');
    shelterCards.forEach(card => {
        card.addEventListener('click', function() {
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
                <div style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; width: 90%; position: relative;">
                    <button class="close-modal" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer;">✕</button>
                    <h2>${shelterTitle}</h2>
                    <div class="shelter-details" style="margin-top: 20px;">
                        ${shelterContent.replace(/<strong>/g, '<h3 style="color: #2e7d32; margin-top: 15px;">').replace(/<\/strong>/g, '</h3>')}
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', function() {
                modal.remove();
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
});