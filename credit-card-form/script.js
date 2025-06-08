document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const cardNumberInput = document.getElementById('cardNumber');
    const cardHolderInput = document.getElementById('cardHolder');
    const expiryMonthSelect = document.getElementById('expiryMonth');
    const expiryYearSelect = document.getElementById('expiryYear');
    const cvvInput = document.getElementById('cvv');
    const form = document.getElementById('creditCardForm');
    const cardContainer = document.querySelector('.card-container');
    
    // Get display elements
    const cardNumberDisplay = document.getElementById('cardNumberDisplay');
    const cardHolderDisplay = document.getElementById('cardHolderDisplay');
    const cardExpiryDisplay = document.getElementById('cardExpiryDisplay');
    const cvvDisplay = document.getElementById('cvvDisplay');
    
    // Card number formatting and display
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        
        if (formattedValue.length > 19) {
            formattedValue = formattedValue.substring(0, 19);
        }
        
        e.target.value = formattedValue;
        
        // Update card display
        if (value.length > 0) {
            let displayValue = value.padEnd(16, '•').match(/.{1,4}/g).join(' ');
            cardNumberDisplay.textContent = displayValue;
        } else {
            cardNumberDisplay.textContent = '•••• •••• •••• ••••';
        }
    });
    
    // Card holder name display
    cardHolderInput.addEventListener('input', function(e) {
        let value = e.target.value.toUpperCase();
        cardHolderDisplay.textContent = value || 'FULL NAME';
    });
    
    // Expiry date display
    function updateExpiryDisplay() {
        const month = expiryMonthSelect.value;
        const year = expiryYearSelect.value;
        
        if (month && year) {
            cardExpiryDisplay.textContent = `${month}/${year}`;
        } else if (month) {
            cardExpiryDisplay.textContent = `${month}/YY`;
        } else if (year) {
            cardExpiryDisplay.textContent = `MM/${year}`;
        } else {
            cardExpiryDisplay.textContent = 'MM/YY';
        }
    }
    
    expiryMonthSelect.addEventListener('change', updateExpiryDisplay);
    expiryYearSelect.addEventListener('change', updateExpiryDisplay);
    
    // CVV input and card flip
    cvvInput.addEventListener('focus', function() {
        cardContainer.classList.add('flipped');
    });
    
    cvvInput.addEventListener('blur', function() {
        cardContainer.classList.remove('flipped');
    });
    
    cvvInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^0-9]/gi, '');
        e.target.value = value;
        
        // Update CVV display
        if (value.length > 0) {
            cvvDisplay.textContent = value.padEnd(3, '•');
        } else {
            cvvDisplay.textContent = '•••';
        }
    });
    
    // Form validation
    function validateCardNumber(number) {
        // Remove spaces and check if it's 16 digits
        const cleanNumber = number.replace(/\s/g, '');
        return cleanNumber.length === 16 && /^\d+$/.test(cleanNumber);
    }
    
    function validateCVV(cvv) {
        return cvv.length >= 3 && cvv.length <= 4 && /^\d+$/.test(cvv);
    }
    
    function validateExpiryDate(month, year) {
        if (!month || !year) return false;
        
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
        const currentMonth = currentDate.getMonth() + 1;
        
        const expYear = parseInt(year);
        const expMonth = parseInt(month);
        
        if (expYear < currentYear) return false;
        if (expYear === currentYear && expMonth < currentMonth) return false;
        
        return true;
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const cardNumber = cardNumberInput.value;
        const cardHolder = cardHolderInput.value.trim();
        const expiryMonth = expiryMonthSelect.value;
        const expiryYear = expiryYearSelect.value;
        const cvv = cvvInput.value;
        
        // Validation
        let isValid = true;
        let errors = [];
        
        if (!cardHolder) {
            errors.push('Card holder name is required');
            isValid = false;
        }
        
        if (!validateCardNumber(cardNumber)) {
            errors.push('Please enter a valid 16-digit card number');
            isValid = false;
        }
        
        if (!validateExpiryDate(expiryMonth, expiryYear)) {
            errors.push('Please enter a valid expiry date');
            isValid = false;
        }
        
        if (!validateCVV(cvv)) {
            errors.push('Please enter a valid CVV (3-4 digits)');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            alert('Payment submitted successfully!\n\nThis is a demo form - no actual payment was processed.');
            
            // Reset form
            form.reset();
            cardNumberDisplay.textContent = '•••• •••• •••• ••••';
            cardHolderDisplay.textContent = 'FULL NAME';
            cardExpiryDisplay.textContent = 'MM/YY';
            cvvDisplay.textContent = '•••';
        } else {
            alert('Please correct the following errors:\n\n' + errors.join('\n'));
        }
    });
    
    // Add input restrictions
    cardHolderInput.addEventListener('input', function(e) {
        // Allow only letters and spaces
        e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    });
    
    // Prevent non-numeric input for card number
    cardNumberInput.addEventListener('keypress', function(e) {
        if (!/[\d\s]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Enter'].includes(e.key)) {
            e.preventDefault();
        }
    });
    
    // Prevent non-numeric input for CVV
    cvvInput.addEventListener('keypress', function(e) {
        if (!/\d/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Enter'].includes(e.key)) {
            e.preventDefault();
        }
    });
    
    // Add smooth animations
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}); 