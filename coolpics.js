document.addEventListener('DOMContentLoaded', function() {
    // Menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.nav-links');
    
    function toggleMenu() {
        menu.classList.toggle('hide');
    }
    
    menuBtn.addEventListener('click', toggleMenu);
    
    // Window resize handling
    function handleResize() {
        if (window.innerWidth > 1000) {
            menu.classList.remove('hide');
        } else {
            menu.classList.add('hide');
        }
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Image viewer functionality
    const gallery = document.querySelector('.gallery');
    let modal = null;
    
    gallery.addEventListener('click', function(event) {
        const clickedImg = event.target.closest('img');
        
        if (!clickedImg) return;
        
        // Get image source and create full-size version path
        const src = clickedImg.getAttribute('src');
        const alt = clickedImg.getAttribute('alt');
        const fullSizeSrc = src.split('-')[0] + '-full.jpeg';
        
        // Create modal if it doesn't exist
        if (!modal) {
            modal = document.createElement('dialog');
            document.body.appendChild(modal);
            
            // Close modal when clicking outside the image
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.close();
                }
            });
        }
        
        // Set modal content
        modal.innerHTML = `
            <img src="${fullSizeSrc}" alt="${alt}">
            <button class="close-viewer">X</button>
        `;
        
        // Add close button functionality
        const closeBtn = modal.querySelector('.close-viewer');
        closeBtn.addEventListener('click', function() {
            modal.close();
        });
        
        // Show the modal
        modal.showModal();
    });
}); 