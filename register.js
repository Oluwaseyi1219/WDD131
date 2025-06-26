// Track the number of participants
let participantCount = 1;

// Function to create participant HTML template
function participantTemplate(count) {
    return `
        <section class="participant${count}">
            <div class="form-group">
                <label for="name${count}">Name:</label>
                <input type="text" id="name${count}" name="name${count}" required>
            </div>
            <div class="form-group">
                <label for="age${count}">Age:</label>
                <input type="number" id="age${count}" name="age${count}" min="5" max="18" required>
            </div>
            <div class="form-group">
                <label for="fee${count}">Fee:</label>
                <input type="number" id="fee${count}" name="fee${count}" min="0" step="0.01" required>
            </div>
        </section>
    `;
}

// Function to calculate total fees
function totalFees() {
    let feeElements = document.querySelectorAll("[id^=fee]");
    feeElements = [...feeElements];
    return feeElements.reduce((total, element) => {
        return total + (parseFloat(element.value) || 0);
    }, 0);
}

// Function to create success message template
function successTemplate(info) {
    return `
        <h2>Registration Successful!</h2>
        <p>Thank you ${info.name} for registering. You have registered ${info.participants} participant(s) and owe $${info.total.toFixed(2)} in Fees.</p>
    `;
}

// Add event listener for the Add Participant button
document.getElementById('add-participant').addEventListener('click', () => {
    participantCount++;
    const newParticipant = participantTemplate(participantCount);
    const addButton = document.getElementById('add-participant');
    addButton.insertAdjacentHTML('beforebegin', newParticipant);
});

// Add event listener for form submission
document.getElementById('registration-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const adultName = document.getElementById('adult-name').value;
    const total = totalFees();
    
    const summary = document.getElementById('summary');
    const form = document.getElementById('registration-form');
    
    summary.innerHTML = successTemplate({
        name: adultName,
        participants: participantCount,
        total: total
    });
    
    form.style.display = 'none';
    summary.classList.remove('hide');
}); 