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

    function loadTestimonials() {
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonialList.innerHTML = '';
        testimonials.forEach((testimonial, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                ${testimonial.image ? `<img src="${testimonial.image}" alt="Testimonial Image">` : ''}
                <div class="name">${testimonial.name}</div>
                <div class="message">${testimonial.message}</div>
                <button onclick="editTestimonial(${index})">Edit</button>
                <button onclick="deleteTestimonial(${index})">Delete</button>
            `;
            testimonialList.appendChild(card);
        });
    }

    function saveTestimonials(testimonials) {
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        const imageInput = document.getElementById('image-upload');
        const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null;
        
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonials.push({ name, message, image });
        saveTestimonials(testimonials);
        loadTestimonials();
        form.reset();
        document.getElementById('image-preview').innerHTML = ''; // Clear image preview
    });

    document.getElementById('image-upload').addEventListener('change', (event) => {
        const file = event.target.files[0];
        const preview = document.getElementById('image-preview');
        preview.innerHTML = '';
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = document.createElement('img');
                img.src = reader.result;
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });

    window.editTestimonial = (index) => {
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        editIndex = index;
        const testimonial = testimonials[index];
        editNameInput.value = testimonial.name;
        editMessageInput.value = testimonial.message;
        if (testimonial.image) {
            const editPreview = document.getElementById('edit-image-preview');
            editPreview.innerHTML = `<img src="${testimonial.image}" alt="Testimonial Image">`;
        } else {
            document.getElementById('edit-image-preview').innerHTML = '';
        }
        editModal.style.display = 'block';
    };

    updateButton.addEventListener('click', () => {
        const name = editNameInput.value;
        const message = editMessageInput.value;
        const imageInput = document.getElementById('edit-image-upload');
        const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null;

        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonials[editIndex] = { name, message, image };
        saveTestimonials(testimonials);
        loadTestimonials();
        editModal.style.display = 'none';
    });

    cancelEditButton.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    window.deleteTestimonial = (index) => {
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonials.splice(index, 1);
        saveTestimonials(testimonials);
        loadTestimonials();
    };

    function toggleDarkMode() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        themeToggle.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }

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
