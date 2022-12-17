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
        dropdownContentEl.style.maxHeight = "30rem";
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

/* ======= Make checkbox options exclusive =========== */

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
        // Make it not able to uncheck
        cbEl.checked = true;
      }
    });
  }
}

// Make all checkbox groups of .cb-group class
// have options of .cb-invisible class mutually exclusive
const allCbGroupsEls = document.querySelectorAll(".cb-group-exclusive");
for(const cbGroupEl of allCbGroupsEls) {
  makeOptionsExclusive(cbGroupEl);
}

/* ======= Panel tabs || Switching between panels on small screens =========== */

const displayPanelsElsArr = [
  document.querySelector('#toggle-display-panel'),
  document.querySelector('#map-legend-panel'),
];
const filterPanelsElsArr = [
  document.querySelector('#filter-panel'),
  document.querySelector('#confirm-button'),
];
const dashboardPanelsElsArr = [
  document.querySelector('#dashboard-panel'),
]
const allPanelsElsArr = displayPanelsElsArr.concat(filterPanelsElsArr).concat(dashboardPanelsElsArr);

const panelTabsEls = document.querySelectorAll('.panel-tab');

for(const tabEl of panelTabsEls) {
  let targetElsArr = [];

  tabEl.addEventListener('click', ( ) => {
    // Identify the panels each tab corresponds to
    targetElsArr = tabEl.id === 'panel-tab-display' ? displayPanelsElsArr :
                   tabEl.id === 'panel-tab-filters' ? filterPanelsElsArr :
                                                      dashboardPanelsElsArr;
    if(tabEl.classList.contains('panel-tab-selected')) {
      // If already selected: unselect
      targetElsArr.forEach(el => { el.style.display = 'none' });

      // Update state
      tabEl.classList.remove('panel-tab-selected');
    } else {
      // If currently not selected:
      // First hide all
      allPanelsElsArr.forEach(el => { el.style.display = 'none' });
      panelTabsEls.forEach(el => { el.classList.remove('panel-tab-selected'); })

      // Show this
      targetElsArr.forEach(el => { el.style.display = 'flex' });

      // Update state
      tabEl.classList.add('panel-tab-selected');
    }
  })
}

// Listen for windows resize
visualViewport.addEventListener('resize', ( ) => {
  // If greater than 1200 width
  if(document.documentElement.clientWidth >= 1200) {
    allPanelsElsArr.forEach(el => { el.style.display = 'flex' });
  } else { // If resized to smaller
    allPanelsElsArr.forEach(el => { el.style.display = 'none '});
    displayPanelsElsArr.forEach(el => { el.style.display = 'flex' });
    
    panelTabsEls.forEach(el => {
      if(el.id === 'panel-tab-display') {
        if(!el.classList.contains('panel-tab-selected')) {
          el.classList.add('panel-tab-selected');
        }
        return;
      }
      el.classList.remove('panel-tab-selected'); 
      return;
    })
  }
})
