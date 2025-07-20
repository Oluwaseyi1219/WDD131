// Contact Form Module
// Handles form validation, submission, and user feedback

export class ContactForm {
    constructor() {
        this.form = null;
        this.submitBtn = null;
        this.successMessage = null;
        this.init();
    }

    init() {
        // DOM Interaction: Select form elements
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.successMessage = document.getElementById('formSuccess');
        
        if (this.form) {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        // Validate all fields
        const isValid = this.validateForm();
        
        // Conditional branching: Handle form submission
        if (isValid) {
            this.submitForm();
        } else {
            this.showFormErrors();
        }
    }

    validateForm() {
        const formData = new FormData(this.form);
        let isValid = true;
        
        // Object: Form validation rules
        const validationRules = {
            name: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-Z\s]+$/
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            },
            message: {
                required: true,
                minLength: 10,
                maxLength: 1000
            }
        };

        // Array method: forEach to validate each field
        Object.keys(validationRules).forEach(fieldName => {
            const value = formData.get(fieldName);
            const rules = validationRules[fieldName];
            
            if (!this.validateFieldValue(value, rules, fieldName)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateFieldValue(value, rules, fieldName) {
        // Conditional branching: Check required field
        if (rules.required && (!value || value.trim() === '')) {
            this.showFieldError(fieldName, 'This field is required');
            return false;
        }

        // Conditional branching: Check minimum length
        if (rules.minLength && value && value.length < rules.minLength) {
            this.showFieldError(fieldName, `Minimum ${rules.minLength} characters required`);
            return false;
        }

        // Conditional branching: Check maximum length
        if (rules.maxLength && value && value.length > rules.maxLength) {
            this.showFieldError(fieldName, `Maximum ${rules.maxLength} characters allowed`);
            return false;
        }

        // Conditional branching: Check pattern
        if (rules.pattern && value && !rules.pattern.test(value)) {
            this.showFieldError(fieldName, 'Invalid format');
            return false;
        }

        return true;
    }

    validateField(field) {
        const fieldName = field.name;
        const value = field.value;
        
        // Object: Field-specific validation rules
        const fieldRules = {
            name: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-Z\s]+$/
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            },
            message: {
                required: true,
                minLength: 10,
                maxLength: 1000
            }
        };

        const rules = fieldRules[fieldName];
        if (rules) {
            const isValid = this.validateFieldValue(value, rules, fieldName);
            if (isValid) {
                this.clearFieldError(field);
            }
        }
    }

    showFieldError(fieldName, message) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        const errorElement = document.getElementById(`${fieldName}Error`);
        
        if (field && errorElement) {
            field.classList.add('error');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    clearFieldError(field) {
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}Error`);
        
        if (errorElement) {
            field.classList.remove('error');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    showFormErrors() {
        // Array method: forEach to show all errors
        const errorElements = this.form.querySelectorAll('.error-message');
        errorElements.forEach(error => {
            if (error.textContent) {
                error.style.display = 'block';
            }
        });
    }

    async submitForm() {
        // Show loading state
        this.setLoadingState(true);
        
        try {
            // Simulate form submission (replace with actual API call)
            await this.simulateSubmission();
            
            // Show success message
            this.showSuccessMessage();
            
            // Reset form
            this.resetForm();
            
        } catch (error) {
            // Handle submission error
            this.showSubmissionError(error);
        } finally {
            // Hide loading state
            this.setLoadingState(false);
        }
    }

    async simulateSubmission() {
        // Simulate API call delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Conditional branching: Simulate success/failure
                const success = Math.random() > 0.1; // 90% success rate
                
                if (success) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Submission failed. Please try again.'));
                }
            }, 2000);
        });
    }

    setLoadingState(isLoading) {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        // Conditional branching: Show/hide loading state
        if (isLoading) {
            btnText.classList.add('hidden');
            btnLoading.classList.remove('hidden');
            this.submitBtn.disabled = true;
        } else {
            btnText.classList.remove('hidden');
            btnLoading.classList.add('hidden');
            this.submitBtn.disabled = false;
        }
    }

    showSuccessMessage() {
        // Hide form and show success message
        this.form.classList.add('hidden');
        this.successMessage.classList.remove('hidden');
        
        // Scroll to success message
        this.successMessage.scrollIntoView({ behavior: 'smooth' });
    }

    showSubmissionError(error) {
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.innerHTML = `
            <h3>Submission Error</h3>
            <p>${error.message}</p>
            <button class="btn btn-secondary" onclick="this.parentElement.remove()">Dismiss</button>
        `;
        
        // Insert error message before form
        this.form.parentNode.insertBefore(errorDiv, this.form);
    }

    resetForm() {
        // Reset form fields
        this.form.reset();
        
        // Clear all error messages
        const errorElements = this.form.querySelectorAll('.error-message');
        errorElements.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        
        // Remove error classes
        const errorFields = this.form.querySelectorAll('.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
    }

    // Get form data as object
    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        // Array method: forEach to convert FormData to object
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        return data;
    }

    // Validate email format
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Get form validation state
    getValidationState() {
        const formData = new FormData(this.form);
        const state = {};
        
        // Array method: forEach to check validation state
        formData.forEach((value, key) => {
            const field = this.form.querySelector(`[name="${key}"]`);
            const errorElement = document.getElementById(`${key}Error`);
            
            state[key] = {
                value: value,
                hasError: field && field.classList.contains('error'),
                errorMessage: errorElement ? errorElement.textContent : '',
                isValid: !field || !field.classList.contains('error')
            };
        });
        
        return state;
    }

    // Export form data for debugging
    exportFormData() {
        return {
            formData: this.getFormData(),
            validationState: this.getValidationState(),
            timestamp: new Date().toISOString()
        };
    }
}

// Initialize contact form
const contactForm = new ContactForm();
export default contactForm; 