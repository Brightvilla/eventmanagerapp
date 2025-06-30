document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const addGuestForm = document.getElementById('add-guest-form');
    const guestNameInput = document.getElementById('guest-name');
    const guestCategorySelect = document.getElementById('guest-category');
    const guestList = document.getElementById('guest-list');
    const alertMessage = document.getElementById('alert-message');

    // --- State ---
    const MAX_GUESTS = 10;

    // --- Functions ---

    /**
     * Displays a temporary alert message to the user.
     * @param {string} message - The message to display.
     */
    const showAlert = (message) => {
        alertMessage.textContent = message;
        alertMessage.style.display = 'block';
        setTimeout(() => {
            alertMessage.style.display = 'none';
        }, 3000); // Hide after 3 seconds
    };

    /**
     * Creates and appends a new guest item to the list.
     * @param {string} name - The name of the guest.
     * @param {string} category - The category of the guest (Friend, Family, Colleague).
     */
    const addGuest = (name, category) => {
        // Create list item
        const li = document.createElement('li');
        li.className = 'guest-item';
        li.dataset.category = category;

        // Get current time for the timestamp
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        li.innerHTML = `
            <div class="guest-details">
                <span class="guest-name">${name}</span>
                <div>
                    <span class="category-tag tag-${category}">${category}</span>
                    <span class="timestamp">Added at ${timeString}</span>
                </div>
            </div>
            <div class="guest-actions">
                <button class="rsvp-btn">RSVP</button>
                <button class="edit-btn">Edit</button>
                <button class="remove-btn">Remove</button>
            </div>
        `;

        guestList.appendChild(li);
    };

    // --- Event Listeners ---

    /**
     * Handle the form submission to add a new guest.
     */
    addGuestForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page refresh

        if (guestList.children.length >= MAX_GUESTS) {
            showAlert(`Guest limit of ${MAX_GUESTS} has been reached.`);
            return;
        }

        const guestName = guestNameInput.value.trim();
        const guestCategory = guestCategorySelect.value;

        if (guestName && guestCategory) {
            addGuest(guestName, guestCategory);
            // Clear the form for the next entry
            addGuestForm.reset();
            guestNameInput.focus();
        }
    });

    /**
     * Handle clicks on the guest list for removing, editing, or RSVPing guests (Event Delegation).
     */
    guestList.addEventListener('click', (e) => {
        const target = e.target;
        const guestItem = target.closest('.guest-item'); // Find the parent <li>

        if (!guestItem) return; // Exit if the click was not inside a guest item

        // Handle Remove Button
        if (target.classList.contains('remove-btn')) {
            guestItem.remove();
        }

        // Handle RSVP Toggle
        if (target.classList.contains('rsvp-btn')) {
            guestItem.classList.toggle('attending');
            target.textContent = guestItem.classList.contains('attending') ? 'Attending ✓' : 'RSVP';
        }

        // Handle Edit Button
        if (target.classList.contains('edit-btn')) {
            const guestNameSpan = guestItem.querySelector('.guest-name');
            const currentName = guestNameSpan.textContent;
            
            const newName = prompt('Enter the new name for the guest:', currentName);
            
            if (newName && newName.trim() !== '') {
                guestNameSpan.textContent = newName.trim();
            }
        }
    });
});

