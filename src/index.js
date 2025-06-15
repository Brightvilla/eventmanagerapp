// Select DOM elements
const guestForm = document.getElementById('guest-form');
const guestNameInput = document.getElementById('guest-name');
const guestCategorySelect = document.getElementById('guest-category');
const guestList = document.getElementById('guest-list');

const MAX_GUESTS = 10;

// Store guests in an array with objects: {id, name, category, attending, addedAt}
let guests = [];

// Utility to generate unique IDs
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Format date/time nicely
function formatDate(date) {
  return date.toLocaleString();
}

// Render guest list
function renderGuests() {
  guestList.innerHTML = '';

  guests.forEach((guest) => {
    const li = document.createElement('li');
    li.className = `guest-item ${guest.category.toLowerCase()}`;
    li.dataset.id = guest.id;

    // Guest info container
    const infoDiv = document.createElement('div');
    infoDiv.className = 'guest-info';

    // Name or editable input
    if (guest.isEditing) {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'edit-input';
      input.value = guest.name;
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          saveEdit(guest.id, input.value.trim());
        } else if (e.key === 'Escape') {
          cancelEdit(guest.id);
        }
      });
      input.addEventListener('blur', () => {
        saveEdit(guest.id, input.value.trim());
      });
      infoDiv.appendChild(input);
      input.focus();
    } else {
      const nameSpan = document.createElement('span');
      nameSpan.className = 'guest-name';
      nameSpan.textContent = guest.name;
      infoDiv.appendChild(nameSpan);
    }

    // Meta info: category and added time
    const metaSpan = document.createElement('span');
    metaSpan.className = 'guest-meta';
    metaSpan.textContent = `${guest.category} • Added: ${formatDate(guest.addedAt)}`;
    infoDiv.appendChild(metaSpan);

    li.appendChild(infoDiv);

    // Status toggle button
    const statusBtn = document.createElement('button');
    statusBtn.className = 'status ' + (guest.attending ? 'attending' : 'not-attending');
    statusBtn.textContent = guest.attending ? 'Attending' : 'Not Attending';
    statusBtn.title = 'Toggle RSVP status';
    statusBtn.addEventListener('click', () => toggleRSVP(guest.id));
    li.appendChild(statusBtn);

    // Actions container
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'guest-actions';

    // Edit button
    if (!guest.isEditing) {
      const editBtn = document.createElement('button');
      editBtn.innerHTML = '✏️';
      editBtn.title = 'Edit guest name';
      editBtn.addEventListener('click', () => startEdit(guest.id));
      actionsDiv.appendChild(editBtn);
    }

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '🗑️';
    removeBtn.title = 'Remove guest';
    removeBtn.addEventListener('click', () => removeGuest(guest.id));
    actionsDiv.appendChild(removeBtn);

    li.appendChild(actionsDiv);

    guestList.appendChild(li);
  });
}

// Add guest
function addGuest(name, category) {
  if (guests.length >= MAX_GUESTS) {
    alert(`Guest list limit reached (${MAX_GUESTS} guests). Cannot add more.`);
    return;
  }
  const newGuest = {
    id: generateId(),
    name,
    category,
    attending: false,
    addedAt: new Date(),
    isEditing: false,
  };
  guests.push(newGuest);
  renderGuests();
}

// Remove guest by id
function removeGuest(id) {
  guests = guests.filter((guest) => guest.id !== id);
  renderGuests();
}

// Toggle RSVP status
function toggleRSVP(id) {
  const guest = guests.find((g) => g.id === id);
  if (guest) {
    guest.attending = !guest.attending;
    renderGuests();
  }
}

// Start editing a guest's name
function startEdit(id) {
  guests = guests.map((guest) => {
    if (guest.id === id) {
      return { ...guest, isEditing: true };
    }
    return guest;
  });
  renderGuests();
}

// Save edited name
function saveEdit(id, newName) {
  if (!newName) {
    alert('Name cannot be empty.');
    return;
  }
  guests = guests.map((guest) => {
    if (guest.id === id) {
      return { ...guest, name: newName, isEditing: false };
    }
    return guest;
  });
  renderGuests();
}

// Cancel editing
function cancelEdit(id) {
  guests = guests.map((guest) => {
    if (guest.id === id) {
      return { ...guest, isEditing: false };
    }
    return guest;
  });
  renderGuests();
}

// Handle form submit
guestForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = guestNameInput.value.trim();
  const category = guestCategorySelect.value;
  if (name === '') {
    alert('Please enter a guest name.');
    return;
  }
  addGuest(name, category);
  guestNameInput.value = '';
  guestNameInput.focus();
});

// Initial render
renderGuests();
