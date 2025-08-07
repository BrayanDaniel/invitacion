// ========== CONFIGURACIÓN INICIAL ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeDynamicInvitation();
    setupEventListeners();
    setupEnvelopeEffects();
});

// ========== VARIABLES GLOBALES ==========
let currentSection = 1;
const totalSections = 6;
let effectsInitialized = false;

// ========== MANEJO DEL SOBRE Y LA INVITACIÓN ==========
function setupEnvelopeEffects() {
    const openButton = document.getElementById('openInvitation');
    const closeButton = document.getElementById('closeInvitation');
    const envelope = document.getElementById('invitationEnvelope');
    const invitation = document.getElementById('invitationMain');
    
    if (openButton && envelope && invitation) {
        openButton.addEventListener('click', function() {
            envelope.classList.add('envelope-hidden');
            
            setTimeout(() => {
                envelope.style.display = 'none';
                invitation.classList.add('invitation-visible');
                invitation.style.display = 'block';
                
                setTimeout(() => {
                    showSection(1);
                    updateProgress();
                    
                    // Inicializar efectos solo cuando se abre
                    if (!effectsInitialized) {
                        createOptimizedBackgroundEffects();
                        effectsInitialized = true;
                    }
                }, 100);
            }, 600);
        });
    }
    
    if (closeButton && envelope && invitation) {
        closeButton.addEventListener('click', function() {
            invitation.style.display = 'none';
            invitation.classList.remove('invitation-visible');
            
            envelope.style.display = 'flex';
            envelope.classList.remove('envelope-hidden');
            
            currentSection = 1;
            showSection(1);
            updateProgress();
        });
    }
}

// ========== SISTEMA DE NAVEGACIÓN DINÁMICO ==========
function initializeDynamicInvitation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => navigateSection(-1));
        nextBtn.addEventListener('click', () => navigateSection(1));
    }
    
    showSection(currentSection);
    updateProgress();
    updateNavigationButtons();
    
    // Navegación por teclado
    document.addEventListener('keydown', function(e) {
        const invitationMain = document.getElementById('invitationMain');
        if (invitationMain && invitationMain.style.display === 'block') {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                navigateSection(-1);
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                navigateSection(1);
            } else if (e.key === 'Escape') {
                const closeButton = document.getElementById('closeInvitation');
                if (closeButton) {
                    closeButton.click();
                }
            }
        }
    });
}

function navigateSection(direction) {
    const newSection = currentSection + direction;
    
    if (newSection >= 1 && newSection <= totalSections) {
        const currentSectionEl = document.getElementById(`section${currentSection}`);
        if (currentSectionEl) {
            currentSectionEl.style.opacity = '0';
            currentSectionEl.style.transform = direction > 0 ? 'translateX(-30px)' : 'translateX(30px)';
        }
        
        setTimeout(() => {
            currentSection = newSection;
            showSection(currentSection);
            updateProgress();
            updateNavigationButtons();
        }, 250);
    }
}

function showSection(sectionNum) {
    // Ocultar todas las secciones
    for (let i = 1; i <= totalSections; i++) {
        const section = document.getElementById(`section${i}`);
        if (section) {
            section.classList.remove('active');
        }
    }
    
    // Mostrar la sección actual
    const activeSection = document.getElementById(`section${sectionNum}`);
    if (activeSection) {
        activeSection.classList.add('active');
        
        // Forzar un reflow antes de animar
        void activeSection.offsetWidth;
        
        setTimeout(() => {
            activeSection.style.opacity = '1';
            activeSection.style.transform = 'translateX(0)';
        }, 50);
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentStep = document.getElementById('currentStep');
    const totalSteps = document.getElementById('totalSteps');
    
    if (progressFill) {
        const percentage = (currentSection / totalSections) * 100;
        progressFill.style.width = percentage + '%';
    }
    
    if (currentStep) {
        currentStep.textContent = currentSection;
    }
    
    if (totalSteps) {
        totalSteps.textContent = totalSections;
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentSection === 1;
        prevBtn.style.visibility = 'visible';
    }
    
    if (nextBtn) {
        if (currentSection === totalSections) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'flex';
            nextBtn.disabled = false;
        }
    }
}

// ========== EFECTOS DE FONDO ULTRA OPTIMIZADOS ==========
function createOptimizedBackgroundEffects() {
    createMinimalFloatingIcons();
    createStaticCircuitLines();
}

// ========== ICONOS FLOTANTES MÍNIMOS ==========
function createMinimalFloatingIcons() {
    const container = document.getElementById('floatingIcons');
    if (!container) return;
    
    const programmingIcons = [
        'fas fa-laptop-code', 'fas fa-database', 'fas fa-code', 
        'fas fa-terminal', 'fas fa-trophy', 'fas fa-graduation-cap'
    ];
    
    // Solo crear 4 iconos flotantes
    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            createSingleOptimizedIcon(programmingIcons, container);
        }, i * 3000);
    }
    
    // Crear un nuevo icono cada 20 segundos
    setInterval(() => {
        if (container.children.length < 6) {
            createSingleOptimizedIcon(programmingIcons, container);
        }
    }, 20000);
}

function createSingleOptimizedIcon(icons, container) {
    const icon = document.createElement('i');
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    icon.className = `floating-icon ${randomIcon}`;
    
    icon.style.position = 'absolute';
    icon.style.left = (10 + Math.random() * 80) + '%';
    icon.style.top = '100vh';
    icon.style.fontSize = (1.2 + Math.random() * 0.3) + 'em';
    icon.style.opacity = '0.15';
    icon.style.color = '#ba55d3';
    icon.style.zIndex = '1';
    icon.style.pointerEvents = 'none';
    
    container.appendChild(icon);
    
    // Animación CSS en lugar de JavaScript
    icon.style.animation = `floatAround ${40 + Math.random() * 10}s linear`;
    
    // Eliminar después de la animación
    icon.addEventListener('animationend', () => {
        if (icon.parentNode) {
            icon.parentNode.removeChild(icon);
        }
    });
}

// ========== LÍNEAS DE CIRCUITO ESTÁTICAS ==========
function createStaticCircuitLines() {
    const container = document.getElementById('circuitLines');
    if (!container) return;
    
    // Solo 2 líneas con animación CSS
    for (let i = 0; i < 2; i++) {
        const line = document.createElement('div');
        line.className = 'circuit-line';
        line.style.position = 'absolute';
        line.style.top = (25 + i * 50) + '%';
        line.style.left = '0';
        line.style.width = '100%';
        line.style.animationDelay = i * 7 + 's';
        
        container.appendChild(line);
    }
}

// ========== EFECTOS DE HOVER LIGEROS ==========
function setupHoverEffects() {
    // Solo para iconos del cluster principal
    const clusterIcons = document.querySelectorAll('.cluster-icon');
    
    clusterIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Efecto para botones de navegación
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// ========== WHATSAPP OPTIMIZADO ==========
function setupWhatsAppEffects() {
    const whatsappButton = document.querySelector('.whatsapp-mega-button');
    if (!whatsappButton) return;
    
    whatsappButton.addEventListener('click', function(e) {
        // Pequeña vibración si está disponible
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
        
        // Mostrar mensaje de confirmación
        showConfirmationMessage();
    });
}

function showConfirmationMessage() {
    // Verificar si ya existe un mensaje
    const existingMessage = document.querySelector('.confirmation-message');
    if (existingMessage) return;
    
    const message = document.createElement('div');
    message.className = 'confirmation-message';
    message.innerHTML = '<i class="fas fa-check-circle"></i> ¡Gracias por confirmar tu asistencia!';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: linear-gradient(135deg, #4caf50, #45a049);
        color: white;
        padding: 12px 25px;
        border-radius: 20px;
        z-index: 10000;
        box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
        font-size: 1em;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    // Animar entrada
    requestAnimationFrame(() => {
        message.style.opacity = '1';
        message.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    // Remover después de 3 segundos
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translateX(-50%) translateY(-20px)';
        
        setTimeout(() => {
            if (message.parentNode) {
                document.body.removeChild(message);
            }
        }, 300);
    }, 3000);
}

// ========== SETUP DE EVENT LISTENERS ==========
function setupEventListeners() {
    setupHoverEffects();
    setupWhatsAppEffects();
    setupTouchOptimizations();
    setupMemoryCleanup();
}

// ========== OPTIMIZACIONES PARA MÓVIL ==========
function setupTouchOptimizations() {
    // Prevenir zoom en doble tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Mejorar respuesta táctil
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // Optimizar scroll
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.addEventListener('touchmove', function(e) {
            e.stopPropagation();
        }, {passive: true});
    });
}

// ========== LIMPIEZA DE MEMORIA ==========
function setupMemoryCleanup() {
    // Limpiar iconos flotantes periódicamente
    setInterval(() => {
        const floatingContainer = document.getElementById('floatingIcons');
        if (floatingContainer && floatingContainer.children.length > 6) {
            // Remover iconos más antiguos
            while (floatingContainer.children.length > 4) {
                floatingContainer.removeChild(floatingContainer.firstChild);
            }
        }
        
        // Limpiar líneas de circuito si hay demasiadas
        const circuitContainer = document.getElementById('circuitLines');
        if (circuitContainer && circuitContainer.children.length > 3) {
            while (circuitContainer.children.length > 2) {
                circuitContainer.removeChild(circuitContainer.firstChild);
            }
        }
    }, 30000); // Cada 30 segundos
}

// ========== UTILIDADES ==========
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

// ========== OPTIMIZACIÓN DE SCROLL ==========
let scrolling = false;
function optimizeScroll() {
    if (!scrolling) {
        window.requestAnimationFrame(() => {
            // Pausar animaciones durante el scroll
            document.body.style.pointerEvents = 'none';
            scrolling = false;
            
            setTimeout(() => {
                document.body.style.pointerEvents = 'auto';
            }, 100);
        });
        scrolling = true;
    }
}

// Aplicar optimización de scroll con debounce
window.addEventListener('scroll', debounce(optimizeScroll, 100), {passive: true});

// ========== MANEJO DE ERRORES ==========
window.addEventListener('error', function(e) {
    console.warn('Error capturado:', e.message);
    return true;
});

// ========== DETECCIÓN DE RENDIMIENTO ==========
function checkPerformance() {
    // Si el dispositivo es lento, reducir efectos
    if (window.performance && window.performance.memory) {
        const memoryUsage = window.performance.memory.usedJSHeapSize / window.performance.memory.jsHeapSizeLimit;
        
        if (memoryUsage > 0.8) {
            // Reducir efectos si hay poco memoria
            reduceEffects();
        }
    }
    
    // Detectar dispositivos móviles y reducir efectos
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        reduceEffects();
    }
}

function reduceEffects() {
    // Eliminar todos los iconos flotantes
    const floatingContainer = document.getElementById('floatingIcons');
    if (floatingContainer) {
        floatingContainer.innerHTML = '';
    }
    
    // Eliminar líneas de circuito
    const circuitContainer = document.getElementById('circuitLines');
    if (circuitContainer) {
        circuitContainer.innerHTML = '';
    }
    
    // Reducir duración de animaciones
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.3s !important;
            transition-duration: 0.2s !important;
        }
        .floating-icon, .circuit-line {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
}

// ========== INICIALIZACIÓN CON DETECCIÓN DE RENDIMIENTO ==========
window.addEventListener('load', function() {
    setTimeout(checkPerformance, 1000);
});

// ========== COMPATIBILIDAD ==========
if (!Element.prototype.animate) {
    Element.prototype.animate = function() {
        return { onfinish: null };
    };
}

// ========== FUNCIÓN DE SWIPE PARA MÓVIL ==========
function setupSwipeGestures() {
    const card = document.querySelector('.invitation-card');
    if (!card) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    card.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    card.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe izquierda - siguiente
                navigateSection(1);
            } else {
                // Swipe derecha - anterior
                navigateSection(-1);
            }
        }
    }
}

// Inicializar gestos de swipe
document.addEventListener('DOMContentLoaded', setupSwipeGestures);

// ========== PRECARGA DE RECURSOS ==========
function preloadResources() {
    // Precargar FontAwesome icons más usados
    const iconsToPreload = [
        'fa-graduation-cap', 'fa-trophy', 'fa-star',
        'fa-laptop-code', 'fa-database', 'fa-code',
        'fa-terminal', 'fa-heart', 'fa-check-circle'
    ];
    
    // Crear elementos ocultos para forzar la carga
    const preloadDiv = document.createElement('div');
    preloadDiv.style.position = 'absolute';
    preloadDiv.style.left = '-9999px';
    preloadDiv.style.visibility = 'hidden';
    
    iconsToPreload.forEach(icon => {
        const i = document.createElement('i');
        i.className = `fas ${icon}`;
        preloadDiv.appendChild(i);
    });
    
    document.body.appendChild(preloadDiv);
    
    // Eliminar después de cargar
    setTimeout(() => {
        if (preloadDiv.parentNode) {
            document.body.removeChild(preloadDiv);
        }
    }, 1000);
}

// Precargar recursos al inicio
window.addEventListener('load', preloadResources);

// ========== FIN DEL SCRIPT ==========