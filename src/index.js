//selecting and setting up elements
const form = document.getElementById("guest-form"),
      guestInput = document.getElementById("guest-name"),
      guestCategory = document.getElementById("guest-category"),
      guestList = document.getElementById("guest-list");
//creating the guest storage
let guests =  [];

//Adding a submit Event listener
form.addEventListener("submit", (event) => {
    event.preventDefault();

    //Capturing input and validay
    let name = guestInput.value.trim(),
        category = guestCategory.value;
    //Enforcing the limit of the guest
    if (!name) return alert("Enter a name!");
    if (guests.length >= 10) {
        alert("Guest list full! Maximum of 10 guests.");
        return;
    }
    //Adding guest to the array
    guests.push({ name, category, rsvp: false });
    localStorage.setItem("guestList", JSON.stringify(guests));

    //Clearing the input field
    guestInput.value = "";

    //Re-rendering the guest list
    renderGuestList();
});

//Displaying guest in the (UI)
function renderGuestList() { //This function updatesthe list of guests
    guestList.innerHTML = ""; // Clear previous rows before rendering//Adding guest to the array.
    // You can add code here to render the guests if needed
}