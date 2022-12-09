/* ======= Drop downs || Make all dropdowns work ======= */

const allDropdownButtonsEls = document.querySelectorAll(".dropdown-button");

for(let dropdownButtonEl of allDropdownButtonsEls) {
  // Initalize state
  dropdownButtonEl.open = false;

  dropdownButtonEl.addEventListener("click", ( ) => {

    // The dropdown content corresponding to this button
    const dropdownContentEl = dropdownButtonEl.nextElementSibling;

    if(!dropdownButtonEl.open) { // currently closed
      // Make it exist
      dropdownContentEl.style.display = "flex";
      // Transition height
      setTimeout(() => {
        dropdownContentEl.style.maxHeight = "10rem";
        dropdownContentEl.style.padding = "0.5rem";
      }, 0);
      // Update state
      dropdownButtonEl.open = true;
    } else { // currently open
      // Transition height
      dropdownContentEl.style.maxHeight = "0";
      dropdownContentEl.style.padding = "0 0.5rem";
      // Remove
      setTimeout(() => {
        dropdownContentEl.style.display = "none";
      }, 280);
      // Update state
      dropdownButtonEl.open = false;
    }
  });
}

/* ======= Checkboxes =========== */

// Unchecks all options of .cb-invisible type
// inside of a checkbox group of .cb-group class
function uncheckAllOptions(cbsEls) {
  for (const cbEl of cbsEls) {
    cbEl.checked = false;
  }
}

// Makes options mutually exclusive
// Takes checkbox groups of .cb-group class
// Adds features; does not return
function makeOptionsExclusive(cbGroupEl) {
  // Select all options
  const cbsEls = cbGroupEl.getElementsByClassName("cb-invisible");
  for(const cbEl of cbsEls) {
    cbEl.addEventListener("click", () => {
      if(cbEl.checked === true) {
        // Meaning this option is to be checked
        // Uncheck all options before checking this one
        uncheckAllOptions(cbsEls);
        cbEl.checked = true;
      } else {
        cbEl.checked = false;
      }
    });
  }
}

// Make all checkbox groups of .cb-group class
// have options of .cb-invisible class mutually exclusive
const allCbGroupsEls = document.querySelectorAll(".cb-group");
for(const cbGroupEl of allCbGroupsEls) {
  makeOptionsExclusive(cbGroupEl);
}