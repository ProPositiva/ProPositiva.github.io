document.addEventListener('DOMContentLoaded', function() {
  // Configuration state
  const config = {
    currentStep: 'model',
    currentView: 'image',
    selectedModel: 'moderna',
    selectedOptions: {
      exterior: {
        'materiales de fachada': { name: 'ladrillo', price: 0 },
        'color de techo': { name: 'rojo', price: 0 }
      },
      interior: {
        'tipo de piso': { name: 'porcelanato', price: 0 }
      }
    },
    basePrice: 250000,
    totalPrice: 250000,
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
  const totalPrice = document.getElementById('total-price');
  const viewOptions = document.querySelectorAll('.view-option');
  const floorplanNavs = document.querySelectorAll('.floorplan-nav');
  const floorplanImage = document.getElementById('floorplan-image');
  const summaryDetails = document.querySelector('.summary-details');
  const ctaButton = document.querySelector('.cta-button');
  const loadingIndicator = document.querySelector('.loading-indicator');
  const pdfViewerContainer = document.querySelector('.pdf-viewer-container');

  // Initialize everything
  function initConfigurator() {
    setupEventListeners();
    init3DViewer();
    updatePrice();
    updateSummary();
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

    // CTA Button
    ctaButton.addEventListener('click', generatePDFQuote);
  }

  // 3D Viewer Initialization
  function init3DViewer() {
    const container = document.getElementById('3d-viewer');
    
    // Scene
    config.threeJS.scene = new THREE.Scene();
    config.threeJS.scene.background = new THREE.Color(0xf0f0f0);
    
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
    
    // Simplified house model (in a real app, you would load a proper 3D model)
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
    
    config.threeJS.model = group;
    config.threeJS.scene.add(group);
    
    // Apply selected materials
    applySelectedMaterials();
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
    
    // Update summary if we're on that step
    if (step === 'summary') {
      updateSummary();
    }
  }

  function goToNextStep() {
    const stepsArray = Array.from(steps);
    const currentIndex = stepsArray.findIndex(step => step.dataset.step === config.currentStep);
    
    if (currentIndex < stepsArray.length - 1) {
      navigateToStep(stepsArray[currentIndex + 1].dataset.step);
    } else {
      // Final step action (submit, etc.)
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
    config.basePrice = parseInt(option.dataset.price);
    
    // Update visualization
    currentModelImage.src = `Assets/Models/${option.dataset.model}-main.jpg`;
    modelName.textContent = option.querySelector('h4').textContent;
    
    // Update 3D model
    load3DModel(option.dataset.model);
    
    // Update floorplan
    updateFloorplan();
    
    updatePrice();
  }

  function selectOption(option, category, group) {
    const optionGroup = option.parentElement;
    optionGroup.querySelectorAll('.option').forEach(opt => opt.classList.remove('active'));
    option.classList.add('active');
    
    config.selectedOptions[category][group] = {
      name: option.textContent,
      price: parseInt(option.dataset.price) || 0
    };
    
    // Update 3D materials if this is an exterior option
    if (category === 'exterior') {
      applySelectedMaterials();
    }
    
    updatePrice();
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

  // Price calculation
  function updatePrice() {
    // Calculate total price
    let total = config.basePrice;
    
    // Add option prices
    for (const category in config.selectedOptions) {
      for (const option in config.selectedOptions[category]) {
        total += config.selectedOptions[category][option].price;
      }
    }
    
    config.totalPrice = total;
    totalPrice.textContent = `$${total.toLocaleString()}`;
  }

  // Summary generation
  function updateSummary() {
    let html = `
      <div class="summary-item">
        <span class="label">Modelo:</span>
        <span class="value">${modelName.textContent}</span>
      </div>
      <div class="summary-item">
        <span class="label">Precio base:</span>
        <span class="value">$${config.basePrice.toLocaleString()}</span>
      </div>
    `;
    
    // Add selected options
    for (const category in config.selectedOptions) {
      for (const option in config.selectedOptions[category]) {
        const opt = config.selectedOptions[category][option];
        if (opt.price > 0) {
          html += `
            <div class="summary-item">
              <span class="label">${option}: ${opt.name}</span>
              <span class="value">+$${opt.price.toLocaleString()}</span>
            </div>
          `;
        }
      }
    }
    
    // Add total
    html += `
      <div class="summary-item" style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 15px;">
        <span class="label" style="font-size: 1.1rem;">Total estimado:</span>
        <span class="value" style="font-size: 1.1rem; color: #ecb306;">$${config.totalPrice.toLocaleString()}</span>
      </div>
    `;
    
    summaryDetails.innerHTML = html;
  }

  // PDF Generation
  function generatePDFQuote() {
    showLoading(true);
    
    // Simulate PDF generation (in a real app, this would call a backend service)
    setTimeout(() => {
      // Create a simple PDF (using jsPDF in this example)
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // Add logo
      doc.addImage('Assets/logo.png', 'PNG', 15, 10, 40, 20);
      
      // Add title
      doc.setFontSize(20);
      doc.text('Cotización de Vivienda', 105, 20, { align: 'center' });
      
      // Add customer info section
      doc.setFontSize(12);
      doc.text('Fecha: ' + new Date().toLocaleDateString(), 15, 40);
      doc.text('Cliente: [Nombre del Cliente]', 15, 50);
      
      // Add configuration details
      doc.setFontSize(14);
      doc.text('Configuración Seleccionada:', 15, 70);
      
      doc.setFontSize(12);
      let y = 80;
      doc.text(`Modelo: ${modelName.textContent}`, 20, y);
      y += 10;
      doc.text(`Precio base: $${config.basePrice.toLocaleString()}`, 20, y);
      y += 10;
      
      // Add selected options
      for (const category in config.selectedOptions) {
        for (const option in config.selectedOptions[category]) {
          const opt = config.selectedOptions[category][option];
          if (opt.price > 0) {
            doc.text(`${option}: ${opt.name} (+$${opt.price.toLocaleString()})`, 25, y);
            y += 7;
          }
        }
      }
      
      // Add total
      doc.setFontSize(14);
      doc.text(`Total estimado: $${config.totalPrice.toLocaleString()}`, 20, y + 10);
      
      // Save the PDF
      const pdfUrl = URL.createObjectURL(doc.output('blob'));
      
      // Display PDF
      pdfViewerContainer.innerHTML = `<iframe class="pdf-viewer" src="${pdfUrl}"></iframe>`;
      pdfViewerContainer.style.display = 'block';
      
      showLoading(false);
    }, 1500);
  }

  function showLoading(show) {
    loadingIndicator.style.display = show ? 'flex' : 'none';
  }

  // Initialize the configurator
  initConfigurator();
});