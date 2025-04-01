// Service Panels Functionality
const servicePanels = document.querySelectorAll('.panel');
const hiddenPanel = document.querySelector('.hidden-panel');
const closePanelBtn = document.querySelector('.close-panel');
const serviceDetails = document.getElementById('service-details');

// Service Content
const serviceContent = {
  consulting: `
    <div class="service-detail-content">
      <div class="process-header">
        <div>
          <div class="process-category">CONSULTORÍA</div>
          <div class="process-icon">
            <img src="Assets/Icons/consulting-icon.png" alt="Consultoría" class="icon-img">
          </div>
        </div>
        <div class="process-abbrev">CON</div>
      </div>
      <div class="detailed-description">
        <h3>CONSULTORÍA ESPECIALIZADA</h3>
        <p>Nuestro equipo de consultores ofrece soluciones arquitectónicas personalizadas para cada proyecto:</p>
        <ul>
          <li>Análisis de viabilidad técnica y económica</li>
          <li>Estudios de mercado y ubicación</li>
          <li>Optimización de espacios y flujos</li>
          <li>Asesoría en normativas y permisos</li>
          <li>Soluciones sostenibles y eficientes</li>
        </ul>
      </div>
    </div>
  `,
  management: `
    <div class="service-detail-content">
      <div class="process-header">
        <div>
          <div class="process-category">GESTIÓN DE PROYECTOS</div>
          <div class="process-icon">
            <img src="Assets/Icons/project-management-icon.png" alt="Gestión de Proyectos" class="icon-img">
          </div>
        </div>
        <div class="process-abbrev">GES</div>
      </div>
      <div class="detailed-description">
        <h3>GESTIÓN INTEGRAL DE PROYECTOS</h3>
        <p>Coordinamos todos los aspectos de su proyecto arquitectónico:</p>
        <ul>
          <li>Planificación estratégica y programación</li>
          <li>Control de presupuestos y cronogramas</li>
          <li>Selección y coordinación de contratistas</li>
          <li>Supervisión de obra y control de calidad</li>
          <li>Gestión de riesgos y soluciones</li>
        </ul>
      </div>
    </div>
  `,
  real-estate: `
    <div class="service-detail-content">
      <div class="process-header">
        <div>
          <div class="process-category">BIENES RAÍCES</div>
          <div class="process-icon">
            <img src="Assets/Icons/real-estate-icon.png" alt="Bienes Raíces" class="icon-img">
          </div>
        </div>
        <div class="process-abbrev">BIR</div>
      </div>
      <div class="detailed-description">
        <h3>SOLUCIONES INMOBILIARIAS INTEGRALES</h3>
        <p>Servicios completos para sus necesidades de bienes raíces:</p>
        <ul>
          <li>Evaluación y valoración de propiedades</li>
          <li>Asesoría legal y contractual</li>
          <li>Gestión de inversiones y desarrollos</li>
          <li>Estudios de mercado y tendencias</li>
          <li>Soluciones personalizadas</li>
        </ul>
      </div>
    </div>
  `
};

// Panel Click Handlers
servicePanels.forEach(panel => {
  panel.addEventListener('click', function() {
    const serviceType = this.getAttribute('data-service');
    serviceDetails.innerHTML = serviceContent[serviceType];
    hiddenPanel.classList.add('visible');
    document.body.style.overflow = 'hidden';
  });
});

// Close Panel Handler
closePanelBtn.addEventListener('click', function() {
  hiddenPanel.classList.remove('visible');
  document.body.style.overflow = 'auto';
});

// Scroll Trigger
window.addEventListener('scroll', function() {
  const servicesSection = document.getElementById('services');
  const scrollPosition = window.scrollY;
  const sectionPosition = servicesSection.offsetTop;
  const sectionHeight = servicesSection.offsetHeight;
  
  if (scrollPosition > sectionPosition + sectionHeight * 0.6) {
    if (!hiddenPanel.classList.contains('visible')) {
      hiddenPanel.classList.add('visible');
    }
  } else if (scrollPosition < sectionPosition + sectionHeight * 0.4) {
    hiddenPanel.classList.remove('visible');
  }
});