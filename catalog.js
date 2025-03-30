document.addEventListener('DOMContentLoaded', function() {
  // Configuration state
  const config = {
    currentStep: 'model',
    currentView: 'image',
    selectedModel: 'moderna',
    selectedOptions: {
      exterior: {
        'materiales de fachada': { name: 'ladrillo' },
        'color de techo': { name: 'rojo' }
      },
      interior: {
        'tipo de piso': { name: 'porcelanato' }
      },
      extras: {
        'outdoor features': { name: 'none' },
        'garage options': { name: '2-car' }
      }
    },
    threeJS: {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      model: null
    },
    floorplans: {
      moderna: {
        default: 'Assets/Floorplans/moderna-default.png',
        living: 'Assets/Floorplans/moderna-living.png',
        kitchen: 'Assets/Floorplans/moderna-kitchen.png',
        bedroom: 'Assets/Floorplans/moderna-bedroom.png'
      },
      clasica: {
        default: 'Assets/Floorplans/clasica-default.png',
        living: 'Assets/Floorplans/clasica-living.png',
        kitchen: 'Assets/Floorplans/clasica-kitchen.png',
        bedroom: 'Assets/Floorplans/clasica-bedroom.png'
      },
      contemporanea: {
        default: 'Assets/Floorplans/contemporanea-default.png',
        living: 'Assets/Floorplans/contemporanea-living.png',
        kitchen: 'Assets/Floorplans/contemporanea-kitchen.png',
        bedroom: 'Assets/Floorplans/contemporanea-bedroom.png'
      }
    },
    materials: {
      exterior: {
        ladrillo: { color: '#B35900', texture: 'Assets/Textures/brick.jpg' },
        piedra: { color: '#808080', texture: 'Assets/Textures/stone.jpg' },
        estuco: { color: '#F5F5DC', texture: 'Assets/Textures/stucco.jpg' }
      },
      roof: {
        rojo: { color: '#A52A2A' },
        gris: { color: '#808080' },
        negro: { color: '#000000' }
      }
    },
    modelDescriptions: {
      moderna: 'Un diseño contemporáneo con espacios abiertos y mucha luz natural.',
      clasica: 'Estilo tradicional con detalles elegantes y materiales cálidos.',
      contemporanea: 'Líneas limpias y diseño vanguardista para un estilo moderno.'
    }
  };

  // DOM Elements
  const stepPanes = document.querySelectorAll('.step-pane');
  const steps = document.querySelectorAll('.step');
  const modelOptions = document.querySelectorAll('.model-option');
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  const currentModelImage = document.getElementById('current-model');
  const modelName = document.getElementById('model-name');
  const modelDescription = document.getElementById('model-description');
  const viewOptions = document.querySelectorAll('.view-option');
  const floorplanNavs = document.querySelectorAll('.floorplan-nav');
  const floorplanImage = document.getElementById('floorplan-image');
  const appointmentForm = document.getElementById('appointment-form');
  const generatePdfButton = document.getElementById('generate-pdf');
  const loadingIndicator = document.querySelector('.loading-indicator');
  const loadingText = document.getElementById('loading-text');
  const pdfViewerContainer = document.querySelector('.pdf-viewer-container');
  const closeButton = document.getElementById('close-configurator');

  // Initialize everything
  function initConfigurator() {
    setupEventListeners();
    init3DViewer();
    switchView('image');
  }

  // Event Listeners
  function setupEventListeners() {
    // Step navigation
    steps.forEach(step => {
      step.addEventListener('click', function() {
        navigateToStep(this.dataset.step);
      });
    });

    // Model selection
    modelOptions.forEach(option => {
      option.addEventListener('click', function() {
        selectModel(this);
      });
    });

    // Option selection
    document.querySelectorAll('.option').forEach(option => {
      option.addEventListener('click', function() {
        const group = this.parentElement.previousElementSibling.textContent.toLowerCase();
        const category = this.closest('.step-pane').id.replace('-pane', '');
        selectOption(this, category, group);
      });
    });

    // Navigation buttons
    nextButton.addEventListener('click', goToNextStep);
    prevButton.addEventListener('click', goToPrevStep);

    // View options
    viewOptions.forEach(option => {
      option.addEventListener('click', function() {
        switchView(this.dataset.view);
      });
    });

    // Floorplan navigation
    floorplanNavs.forEach(nav => {
      nav.addEventListener('click', function() {
        showRoomFloorplan(this.dataset.room);
      });
    });

    // Appointment form
    appointmentForm.addEventListener('submit', bookAppointment);
    
    // PDF generation
    generatePdfButton.addEventListener('click', generatePDF);
    
    // Close button
    closeButton.addEventListener('click', closeConfigurator);
  }

  // Close configurator function
  function closeConfigurator() {
    window.location.href = 'index.html';
  }

  // 3D Viewer Initialization
  function init3DViewer() {
    const container = document.getElementById('3d-viewer');
    
    // Scene
    config.threeJS.scene = new THREE.Scene();
    config.threeJS.scene.background = new THREE.Color(0x252525);
    
    // Camera
    config.threeJS.camera = new THREE.PerspectiveCamera(
      75, 
      container.clientWidth / container.clientHeight, 
      0.1, 
      1000
    );
    config.threeJS.camera.position.z = 5;
    
    // Renderer
    config.threeJS.renderer = new THREE.WebGLRenderer({ antialias: true });
    config.threeJS.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(config.threeJS.renderer.domElement);
    
    // Controls
    config.threeJS.controls = new THREE.OrbitControls(
      config.threeJS.camera, 
      config.threeJS.renderer.domElement
    );
    config.threeJS.controls.enableDamping = true;
    config.threeJS.controls.dampingFactor = 0.25;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    config.threeJS.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    config.threeJS.scene.add(directionalLight);
    
    // Load initial model
    load3DModel(config.selectedModel);
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      config.threeJS.controls.update();
      config.threeJS.renderer.render(
        config.threeJS.scene, 
        config.threeJS.camera
      );
    }
    animate();
    
    // Handle resize
    window.addEventListener('resize', function() {
      config.threeJS.camera.aspect = container.clientWidth / container.clientHeight;
      config.threeJS.camera.updateProjectionMatrix();
      config.threeJS.renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }

  function load3DModel(modelName) {
    // Remove existing model if present
    if (config.threeJS.model) {
      config.threeJS.scene.remove(config.threeJS.model);
    }
    
    // Simplified house model
    const group = new THREE.Group();
    
    // Base (house shape)
    const geometry = new THREE.BoxGeometry(2, 1, 1.5);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x00a86b,
      roughness: 0.4,
      metalness: 0.1
    });
    const house = new THREE.Mesh(geometry, material);
    group.add(house);
    
    // Roof
    const roofGeometry = new THREE.ConeGeometry(1.2, 0.5, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xA52A2A });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 0.75;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);
    
    // Add garage based on selection
    addGarage(config.selectedOptions.extras['garage options'].name);
    
    // Add outdoor feature based on selection
    addOutdoorFeature(config.selectedOptions.extras['outdoor features'].name);
    
    config.threeJS.model = group;
    config.threeJS.scene.add(group);
    
    // Apply selected materials
    applySelectedMaterials();
  }

  function addGarage(type) {
    // This would be replaced with actual Three.js code
    console.log(`Adding ${type} garage to model`);
    // Would modify the 3D scene based on garage type
  }

  function addOutdoorFeature(feature) {
    // This would be replaced with actual Three.js code
    console.log(`Adding ${feature} to model`);
    // Would modify the 3D scene based on feature
  }

  function applySelectedMaterials() {
    if (!config.threeJS.model) return;
    
    // Apply exterior materials
    const facadeMaterial = config.selectedOptions.exterior['materiales de fachada'];
    if (facadeMaterial && config.threeJS.model.children[0]) {
      const materialInfo = config.materials.exterior[facadeMaterial.name.toLowerCase()];
      if (materialInfo) {
        config.threeJS.model.children[0].material.color.set(materialInfo.color);
      }
    }
    
    // Apply roof color
    const roofColor = config.selectedOptions.exterior['color de techo'];
    if (roofColor && config.threeJS.model.children[1]) {
      const colorInfo = config.materials.roof[roofColor.name.toLowerCase()];
      if (colorInfo) {
        config.threeJS.model.children[1].material.color.set(colorInfo.color);
      }
    }
  }

  // Navigation functions
  function navigateToStep(step) {
    config.currentStep = step;
    
    // Update UI
    steps.forEach(s => s.classList.remove('active'));
    stepPanes.forEach(pane => pane.classList.remove('active'));
    
    document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
    document.getElementById(`${step}-pane`).classList.add('active');
    
    // Update navigation buttons
    updateNavButtons();
  }

  function goToNextStep() {
    const stepsArray = Array.from(steps);
    const currentIndex = stepsArray.findIndex(step => step.dataset.step === config.currentStep);
    
    if (currentIndex < stepsArray.length - 1) {
      navigateToStep(stepsArray[currentIndex + 1].dataset.step);
    }
  }

  function goToPrevStep() {
    const stepsArray = Array.from(steps);
    const currentIndex = stepsArray.findIndex(step => step.dataset.step === config.currentStep);
    
    if (currentIndex > 0) {
      navigateToStep(stepsArray[currentIndex - 1].dataset.step);
    }
  }

  function updateNavButtons() {
    const stepsArray = Array.from(steps);
    const currentIndex = stepsArray.findIndex(step => step.dataset.step === config.currentStep);
    
    prevButton.disabled = currentIndex === 0;
    nextButton.textContent = currentIndex === stepsArray.length - 1 ? 'Finalizar' : 'Siguiente';
  }

  // Selection functions
  function selectModel(option) {
    modelOptions.forEach(opt => opt.classList.remove('active'));
    option.classList.add('active');
    
    config.selectedModel = option.dataset.model;
    
    // Update visualization
    currentModelImage.src = `Assets/Models/${option.dataset.model}-main.jpg`;
    modelName.textContent = option.querySelector('h4').textContent;
    modelDescription.textContent = config.modelDescriptions[option.dataset.model];
    
    // Update 3D model
    load3DModel(option.dataset.model);
    
    // Update floorplan
    updateFloorplan();
  }

  function selectOption(option, category, group) {
    const optionGroup = option.parentElement;
    optionGroup.querySelectorAll('.option').forEach(opt => opt.classList.remove('active'));
    option.classList.add('active');
    
    config.selectedOptions[category][group] = {
      name: option.dataset.option
    };
    
    // Update 3D materials if this is an exterior option
    if (category === 'exterior') {
      applySelectedMaterials();
    }
    
    // Update 3D model if extras changed
    if (category === 'extras') {
      load3DModel(config.selectedModel);
    }
  }

  // View switching
  function switchView(view) {
    config.currentView = view;
    
    // Update active button
    viewOptions.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.view === view);
    });
    
    // Hide all views
    document.getElementById('current-model').style.display = 'none';
    document.getElementById('3d-viewer').style.display = 'none';
    document.getElementById('floorplan-view').style.display = 'none';
    
    // Show selected view
    switch(view) {
      case '3d':
        document.getElementById('3d-viewer').style.display = 'block';
        break;
      case 'floorplan':
        document.getElementById('floorplan-view').style.display = 'flex';
        break;
      case 'image':
      default:
        document.getElementById('current-model').style.display = 'block';
    }
  }

  // Floorplan functions
  function updateFloorplan() {
    floorplanImage.src = config.floorplans[config.selectedModel].default;
  }

  function showRoomFloorplan(room) {
    floorplanImage.src = config.floorplans[config.selectedModel][room] || 
                         config.floorplans[config.selectedModel].default;
  }

  // PDF Generation
  function generatePDF() {
    showLoading(true, 'Generando documento...');
    
    // Create PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add logo
    doc.addImage('Assets/logo.png', 'PNG', 15, 10, 40, 20);
    
    // Add title
    doc.setFontSize(20);
    doc.text('Diseño de Vivienda Personalizado', 105, 20, { align: 'center' });
    
    // Add configuration details
    doc.setFontSize(14);
    doc.text('Configuración Seleccionada:', 15, 40);
    
    doc.setFontSize(12);
    let y = 50;
    doc.text(`Modelo: ${modelName.textContent}`, 20, y);
    y += 10;
    
    // Add selected options
    for (const category in config.selectedOptions) {
      for (const option in config.selectedOptions[category]) {
        const opt = config.selectedOptions[category][option];
        doc.text(`${option}: ${opt.name}`, 25, y);
        y += 7;
      }
    }
    
    // Add note
    doc.setFontSize(11);
    doc.text('* Este documento es una referencia visual de tu diseño personalizado.', 15, y + 15);
    doc.text('Para más información y cotización, agenda una cita con nuestro equipo.', 15, y + 25);
    
    // Save the PDF
    const pdfUrl = URL.createObjectURL(doc.output('blob'));
    
    // Display PDF
    pdfViewerContainer.innerHTML = `<iframe class="pdf-viewer" src="${pdfUrl}"></iframe>`;
    pdfViewerContainer.style.display = 'block';
    
    showLoading(false);
  }

  // Appointment booking
  function bookAppointment(e) {
    e.preventDefault();
    showLoading(true, 'Agendando cita...');
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value
    };
    
    // Create calendar event (ICS file)
    const event = {
      start: [parseInt(formData.date.split('-')[0]), parseInt(formData.date.split('-')[1]), parseInt(formData.date.split('-')[2]), parseInt(formData.time.split(':')[0]), parseInt(formData.time.split(':')[1])],
      duration: { hours: 1 },
      title: `Cita para diseño de vivienda - ${formData.name}`,
      description: `Cita para discutir el diseño de vivienda personalizado.\n\nModelo seleccionado: ${modelName.textContent}\n\nDetalles de contacto:\nEmail: ${formData.email}\nTeléfono: ${formData.phone}`,
      location: 'Oficinas Alianza ProPositiva',
      status: 'CONFIRMED',
      organizer: { name: 'Alianza ProPositiva', email: 'ventas@alianzapropositiva.com' },
      attendees: [
        { name: formData.name, email: formData.email, rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' }
      ]
    };
    
    // Generate ICS file
    const icsFile = new ics();
    icsFile.addEvent(event);
    
    if (icsFile.error) {
      console.error('Error generating ICS file:', icsFile.error);
      showLoading(false);
      alert('Hubo un error al programar la cita. Por favor intente nuevamente.');
      return;
    }
    
    // Simulate server-side processing
    setTimeout(() => {
      showLoading(false);
      
      // Create download link for the ICS file
      const blob = new Blob([icsFile.value], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      
      // Show confirmation
      const appointmentPane = document.getElementById('appointment-pane');
      appointmentPane.innerHTML = `
        <div class="confirmation-message">
          <h3>¡Cita agendada con éxito!</h3>
          <p>Hemos programado tu cita para el ${formData.date} a las ${formData.time}.</p>
          <p>Se ha enviado un correo de confirmación a ${formData.email} con los detalles.</p>
          <a href="${url}" download="cita-alianza-propositiva.ics" class="cta-button">Descargar Recordatorio</a>
          <button class="secondary-button" onclick="window.location.reload()">Nuevo Diseño</button>
        </div>
      `;
    }, 1500);
  }

  function showLoading(show, text = '') {
    loadingIndicator.style.display = show ? 'flex' : 'none';
    loadingText.textContent = text;
  }

  // Initialize the configurator
  initConfigurator();
});