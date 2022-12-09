/* Drop downs */

const allDropdownButtonsEls = document.querySelectorAll(".dropdown-button");

for(let dropdownButtonEl of allDropdownButtonsEls) {
  // Initalize state
  dropdownButtonEl.open = false;

  dropdownButtonEl.addEventListener("click", ( ) => {
    const dropdownContentEl = dropdownButtonEl.nextElementSibling;

    if(!dropdownButtonEl.open) { // currently closed
      dropdownContentEl.style.display = "flex";
      setTimeout(() => {
        dropdownContentEl.style.maxHeight = "10rem";
        dropdownContentEl.style.padding = "0.5rem";
      }, 0);
      dropdownButtonEl.open = true;
    } else {
      dropdownContentEl.style.maxHeight = "0";
      dropdownContentEl.style.padding = "0 0.5rem";
      setTimeout(() => {
        dropdownContentEl.style.display = "none";
      }, 280);
      dropdownButtonEl.open = false;
    }
  });
}