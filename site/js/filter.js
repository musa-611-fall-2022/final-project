/* ==========================================================
This script has functions to add recorders to the filter elements

@author: Jie Li
@date: 12/09/2022
============================================================ */

import { filterParams } from "./main.js";

// Adds recorder to continuous filters (sliders)
// Updates `filterParams` on user input
function addContinuousFilterRecorder(varName) {
  const thisSliderKit = document.querySelector(`#${varName}-slider`);

  const fromSliderEl = thisSliderKit.getElementsByClassName("from-slider")[0];
  const toSliderEl = thisSliderKit.getElementsByClassName("to-slider")[0];
  const sliderMinValEl = thisSliderKit.getElementsByClassName("slider-min-val")[0];
  const sliderMaxValEl = thisSliderKit.getElementsByClassName("slider-max-val")[0];
  
  // Minimal gap between the min and max values
  let minGap = 1;
  
  // Control the min slider
  fromSliderEl.addEventListener("input", ( ) => {
    if(parseInt(toSliderEl.value) - parseInt(fromSliderEl.value) <= minGap) {
      fromSliderEl.value = parseInt(toSliderEl.value) - minGap;
    }
    sliderMinValEl.innerHTML = fromSliderEl.value;
    // Record if left slider is greater than min val
    if(fromSliderEl.value > fromSliderEl.min) {
      filterParams.continuousVars[varName]['isApplied'] = true;
      filterParams.continuousVars[varName]['lowerBound'] = parseInt(fromSliderEl.value);
    }
  });
  // Control the max slider
  toSliderEl.addEventListener("input", ( ) => {
    if(parseInt(toSliderEl.value) - parseInt(fromSliderEl.value) <= minGap) {
      toSliderEl.value = parseInt(fromSliderEl.value) + minGap;
    }
    sliderMaxValEl.innerHTML = toSliderEl.value;
    // Record if right slider is greater then max val
    if(toSliderEl.value < toSliderEl.max) {
      filterParams.continuousVars[varName]['isApplied'] = true;
      filterParams.continuousVars[varName]['upperBound'] = parseInt(toSliderEl.value);
    }
  });
}

// Adds el to arr if not already exists
function pushIfNotExists(arr, el) {
  if(arr.indexOf(el) === -1) {
    arr.push(el);
  }
}

// Removes el from arr
function removeElFromArr(arr, el) {
  if(arr.indexOf(el) !== -1) {
    arr.splice(arr.indexOf(el), 1);
  }
}

// Turn filter obj's `isApplied` off if no filters are available
function turnOffFilterOnEmpty(filterObj) {
  if(filterObj.selectedCategories.length === 0) {
    filterObj.isApplied = false;
  }
} 

// Adds recorder to categorical filters (factor selectors)
// Updates `filterParams` on user clicking
function addCategoricalFilterRecorder(varName) {
  // Find this kit
  const kitEl = document.querySelector(`#${varName}-selector`);
  const factorOptionsEls = kitEl.getElementsByClassName('cb-invisible');
  
  // Add recorder to each factor option
  for(const optionEl of factorOptionsEls) {
    optionEl.addEventListener('click', ( ) => {

      if(optionEl.checked === true) { // If this option is to be selected
        // Then add this option into the list, and make sure `isApplied` is true
        filterParams.categoricalVars[varName].isApplied = true;
        pushIfNotExists(filterParams.categoricalVars[varName].selectedCategories, optionEl.value);
      } else { // If this option is to be unselected
        removeElFromArr(filterParams.categoricalVars[varName].selectedCategories, optionEl.value);

        // Turn off `isApplied` if no filters apply anymore
        turnOffFilterOnEmpty(filterParams.categoricalVars[varName]);
      }
      filterParams.categoricalVars[varName].isApplied;
    })
  }
}

// Adds functionality: click on `Reset` buttons to reset sliders
function addResetToSliders() {
  const resetButtonsEls = document.querySelectorAll('.slider-reset-button');
  for(const buttonEl of resetButtonsEls) {
    buttonEl.addEventListener('click', ( ) => {
      // Get to the corresponding sliders and change their values
      const sliderEl = buttonEl.parentNode.parentNode.nextElementSibling;
      const fromSliderEl = sliderEl.getElementsByClassName('from-slider')[0];
      const toSliderEl = sliderEl.getElementsByClassName('to-slider')[0];
      fromSliderEl.value = parseInt(fromSliderEl.min);
      toSliderEl.value = parseInt(toSliderEl.max);

      // Get the the values section and change their values
      const valuesEls = buttonEl.nextElementSibling;
      const fromValueEl = valuesEls.getElementsByClassName('slider-min-val')[0];
      const toValueEl = valuesEls.getElementsByClassName('slider-max-val')[0];
      fromValueEl.innerHTML = parseInt(fromSliderEl.min);
      toValueEl.innerHTML = parseInt(toSliderEl.max);

      // Change the record
      const kitEl = sliderEl.parentNode;
      const varName = kitEl.id.substring(0, kitEl.id.length - 7);
      
      filterParams.continuousVars[varName].isApplied = false;
      filterParams.continuousVars[varName].lowerBound = parseInt(fromSliderEl.min);
      filterParams.continuousVars[varName].upperBound = parseInt(toSliderEl.max);
    })
  }
}

// Turns off all checkbox options inside of a checkbox group
function turnOffAllCbs(cbGroupEl) {
  const allCbsEls = cbGroupEl.getElementsByClassName('cb-invisible');
  for(const cbEl of allCbsEls) {
    cbEl.checked = false;
  }
}

// Adds functionality: click on `Reset` buttons to reset all factor selectors
function addResetToFactorSelectors() {
  const resetButtonsEls = document.querySelectorAll('.clear-factors-button');
  for(const buttonEl of resetButtonsEls) {
    // Get to the corresponding cb group
    const cbGroupEl = buttonEl.parentNode.nextElementSibling;
    
    buttonEl.addEventListener('click', ( ) => {

      // First turn off all the checkboxes
      turnOffAllCbs(cbGroupEl);

      // Then update `filterParams`
      const varName = cbGroupEl.parentNode.id.substring(0, cbGroupEl.parentNode.id.length - 9);
      filterParams.categoricalVars[varName].isApplied = false;
      filterParams.categoricalVars[varName].selectedCategories = [];
    });    
  }
}

export {
  addContinuousFilterRecorder,
  addCategoricalFilterRecorder,
  addResetToSliders,
  addResetToFactorSelectors,
};