document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("guest-form");
  const input = document.getElementById("guest-name");
  const categorySelect = document.getElementById("guest-category");
  const list = document.getElementById("guest-list");
  const MAX_GUESTS = 10;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = input.value.trim();
    const category = categorySelect.value;

    if (!name || !category) return;

    if (list.children.length >= MAX_GUESTS) {
      alert("Guest list limit reached (10 guests)");
      return;
    }

    const li = document.createElement("li");

    const categoryClass = category.toLowerCase(); // e.g. "friend"

    li.innerHTML = `
      <span class="guest-name">${name}</span>
      <span class="category-tag ${categoryClass}">${category}</span>
      <button class="rsvp-btn">Attending</button>
      <button class="delete-btn">Remove</button>
    `;

    li.querySelector(".rsvp-btn").addEventListener("click", (e) => {
      const btn = e.target;
      btn.textContent =
        btn.textContent === "Attending" ? "Not Attending" : "Attending";
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();
    });

    list.appendChild(li);
    input.value = "";
    categorySelect.selectedIndex = 0;
  });
});