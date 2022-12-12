/* ==========================================================
This script has functions to add recorders to the filter elements

@author: Jie Li
@date: 12/09/2022
============================================================ */

import { filterParams } from "./main.js";

// Adds recorder to continuous filters (sliders)
// Updates `filterParams` on user input
function addContinuousFilterRecorder(variable) {
  const thisSliderKit = document.querySelector(`#${variable}-slider`);

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
      filterParams.continuousVars[variable]['isApplied'] = true;
      filterParams.continuousVars[variable]['lowerBound'] = parseInt(fromSliderEl.value);
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
      filterParams.continuousVars[variable]['isApplied'] = true;
      filterParams.continuousVars[variable]['upperBound'] = parseInt(toSliderEl.value);
    }
  });
}

export {
  addContinuousFilterRecorder,
}

// Click on `Reset` buttons to reset sliders
function addResetToSliders() {
  const sliderResetButtonsEls = document.querySelectorAll('.filter-reset-button');
  console.log(sliderResetButtonsEls);
  for(const buttonEl of sliderResetButtonsEls) {
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

export {
  addResetToSliders,
};