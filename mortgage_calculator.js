// mortgage_calculator.js
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.addEventListener('click', calculateMortgage);
    
    // Set default values
    document.getElementById('loan-amount').value = '300000';
    document.getElementById('interest-rate').value = '3.5';
    document.getElementById('loan-term').value = '30';
    document.getElementById('down-payment').value = '60000';
    
    // Calculate on page load
    calculateMortgage();
});

function calculateMortgage() {
    // Get input values
    const loanAmount = parseFloat(document.getElementById('loan-amount').value) || 0;
    const interestRate = parseFloat(document.getElementById('interest-rate').value) || 0;
    const loanTerm = parseFloat(document.getElementById('loan-term').value) || 0;
    const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
    
    // Calculate principal (loan amount minus down payment)
    const principal = loanAmount - downPayment;
    
    if (principal <= 0 || interestRate <= 0 || loanTerm <= 0) {
        alert('Please enter valid values for all fields');
        return;
    }
    
    // Convert annual rate to monthly and percentage to decimal
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;
    
    // Calculate monthly payment using the formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    const monthlyPayment = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    // Calculate total cost and total interest
    const totalCost = monthlyPayment * numberOfPayments;
    const totalInterest = totalCost - principal;
    
    // Update the UI
    document.getElementById('monthly-payment').textContent = formatCurrency(monthlyPayment);
    document.getElementById('total-interest').textContent = formatCurrency(totalInterest);
    document.getElementById('total-cost').textContent = formatCurrency(totalCost);
    
    // Update payment breakdown chart
    updatePaymentBreakdown(principal, totalInterest);
    
    // Generate amortization schedule
    generateAmortizationSchedule(principal, monthlyRate, numberOfPayments, monthlyPayment);
}

function updatePaymentBreakdown(principal, totalInterest) {
    const total = principal + totalInterest;
    const principalPercent = (principal / total) * 100;
    const interestPercent = (totalInterest / total) * 100;
    
    document.getElementById('principal-breakdown').style.width = `${principalPercent}%`;
    document.getElementById('interest-breakdown').style.width = `${interestPercent}%`;
}

function generateAmortizationSchedule(principal, monthlyRate, numberOfPayments, monthlyPayment) {
    const tableBody = document.querySelector('#amortization-table tbody');
    tableBody.innerHTML = '';
    
    let balance = principal;
    let totalInterestPaid = 0;
    
    // Show first 12 months and last 12 months for brevity
    const monthsToShow = 12;
    
    for (let month = 1; month <= numberOfPayments; month++) {
        // Calculate interest and principal for this payment
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        
        // Update the balance
        balance -= principalPayment;
        
        // Ensure balance doesn't go below zero due to rounding
        if (balance < 0) balance = 0;
        
        totalInterestPaid += interestPayment;
        
        // Only show certain months to keep the table manageable
        if (month <= monthsToShow || month > numberOfPayments - monthsToShow || month % 12 === 0) {
            const row = document.createElement('tr');
            
            // Add "..." separator when skipping months
            if (month === monthsToShow + 1 && numberOfPayments > monthsToShow * 2) {
                const separator = document.createElement('tr');
                separator.innerHTML = `<td colspan="5" style="text-align: center;">...</td>`;
                tableBody.appendChild(separator);
            }
            
            row.innerHTML = `
                <td>${month}</td>
                <td>${formatCurrency(monthlyPayment)}</td>
                <td>${formatCurrency(principalPayment)}</td>
                <td>${formatCurrency(interestPayment)}</td>
                <td>${formatCurrency(balance)}</td>
            `;
            
            tableBody.appendChild(row);
        }
    }
}

function formatCurrency(amount) {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Second logo fade on scroll
document.addEventListener('DOMContentLoaded', function() {
  const secondLogo = document.querySelector('.second-logo');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      secondLogo.classList.add('scrolled');
    } else {
      secondLogo.classList.remove('scrolled');
    }
  });
});

// Improved Dock Menu Functionality
const dockWrapper = document.querySelector('.dock-wrapper');
let dockHideTimeout;

// Make the entire left edge trigger area interactive
dockWrapper.style.pointerEvents = 'auto';

dockWrapper.addEventListener('mouseenter', () => {
  clearTimeout(dockHideTimeout);
  dockWrapper.classList.add('dock-visible');
});

dockWrapper.addEventListener('mouseleave', () => {
  dockHideTimeout = setTimeout(() => {
    dockWrapper.classList.remove('dock-visible');
  }, 300);
});

// Handle dock item clicks
document.querySelectorAll('.dock-item').forEach(item => {
  item.addEventListener('click', (e) => {
    if (item.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(item.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile Touch Support
if ('ontouchstart' in window) {
  const dock = document.querySelector('.dock-wrapper');
  
  dock.addEventListener('touchstart', (e) => {
    e.currentTarget.classList.add('dock-visible');
  });

  document.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.dock-wrapper')) {
      document.querySelector('.dock-wrapper').classList.remove('dock-visible');
    }
  }, { passive: true });
}