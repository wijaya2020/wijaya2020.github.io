document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('testimonial-form');
    const testimonialList = document.getElementById('testimonial-list');
    const editModal = document.getElementById('edit-modal');
    const editNameInput = document.getElementById('edit-name');
    const editMessageInput = document.getElementById('edit-message');
    const updateButton = document.getElementById('update-testimonial');
    const cancelEditButton = document.getElementById('cancel-edit');
    const themeToggle = document.getElementById('theme-toggle');

    let editIndex = -1;

    // Load testimonials from localStorage
    function loadTestimonials() {
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonialList.innerHTML = '';
        testimonials.forEach((testimonial, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${testimonial.name}</strong>
                <p>${testimonial.message}</p>
                <button onclick="editTestimonial(${index})">Edit</button>
                <button onclick="deleteTestimonial(${index})">Delete</button>
            `;
            testimonialList.appendChild(li);
        });
    }

    // Save testimonials to localStorage
    function saveTestimonials(testimonials) {
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
    }

    // Add testimonial
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonials.push({ name, message });
        saveTestimonials(testimonials);
        loadTestimonials();
        form.reset();
    });

    // Edit testimonial
    window.editTestimonial = (index) => {
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        editIndex = index;
        const testimonial = testimonials[index];
        editNameInput.value = testimonial.name;
        editMessageInput.value = testimonial.message;
        editModal.style.display = 'block';
    };

    updateButton.addEventListener('click', () => {
        const name = editNameInput.value;
        const message = editMessageInput.value;

        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonials[editIndex] = { name, message };
        saveTestimonials(testimonials);
        loadTestimonials();
        editModal.style.display = 'none';
    });

    cancelEditButton.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Delete testimonial
    window.deleteTestimonial = (index) => {
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonials.splice(index, 1);
        saveTestimonials(testimonials);
        loadTestimonials();
    };

    // Toggle dark mode
    function toggleDarkMode() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        themeToggle.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }

    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = 'Switch to Light Mode';
    } else {
        themeToggle.textContent = 'Switch to Dark Mode';
    }

    themeToggle.addEventListener('click', toggleDarkMode);

    loadTestimonials();
});
