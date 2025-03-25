document.addEventListener('DOMContentLoaded', function() {
  // Configuration state
  const config = {
    currentStep: 'model',
    selectedModel: 'moderna',
    selectedOptions: {
      exterior: {},
      interior: {},
      extras: {}
    },
    basePrice: 250000,
    totalPrice: 250000
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

  // Initialize
  function initConfigurator() {
    setupEventListeners();
    updatePrice();
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

    // Option selection (example for exterior options)
    document.querySelectorAll('#exterior-pane .option').forEach(option => {
      option.addEventListener('click', function() {
        selectOption(this, 'exterior');
      });
    });

    // Navigation buttons
    nextButton.addEventListener('click', goToNextStep);
    prevButton.addEventListener('click', goToPrevStep);
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
    config.basePrice = parseInt(option.dataset.price);
    
    // Update visualization
    currentModelImage.src = `Assets/Models/${option.dataset.model}-main.jpg`;
    modelName.textContent = option.querySelector('h4').textContent;
    
    updatePrice();
  }

  function selectOption(option, category) {
    const optionGroup = option.parentElement;
    optionGroup.querySelectorAll('.option').forEach(opt => opt.classList.remove('active'));
    option.classList.add('active');
    
    config.selectedOptions[category][optionGroup.previousElementSibling.textContent.toLowerCase()] = {
      name: option.textContent,
      price: parseInt(option.dataset.price) || 0
    };
    
    updatePrice();
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

  // Initialize the configurator
  initConfigurator();
});