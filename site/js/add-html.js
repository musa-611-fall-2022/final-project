import { htmlToElement } from "./html-to-element.js";

/* ================
Add list of variables for display
================= */

// Adds checkbox option of variable for display to parent el
function addDisplayVarsEl(
  parentEl,
  displayType,
  displayVar,
  displayFactor,
  displayName,
) {
  const el = htmlToElement(`
    <label>
      <input type="checkbox" class="cb-invisible" value="${displayVar}">
      <div class="cb-option"><button>${displayName}</button></div>
    </label>
  `);

  // Store some additional information
  el.firstChild.nextElementSibling.displayType = displayType;
  el.firstChild.nextElementSibling.displayFactor = displayFactor;
  parentEl.append(el);
}

/* ================
Add the filter sliders
================= */

import { continuousVarsDict, categoricalVarsDict } from './main.js';

// Adds individual dual-range slider kit to parentEl, regarding variable named `varName`
function addSliderFilterEl(parentEl, varName) {
  const varDict = continuousVarsDict[varName];
  const el = htmlToElement(`
    <div class="selector-kit" id="${varName}-slider">
      <div class="selector-kit-top">
        <div class="selector-kit-title">${varDict.displayName}</div>
        <div class="selector-top-right">
          <button class="filter-reset-button slider-reset-button">Reset</button>
          <div class="slider-values">
            <span class="slider-min-val">${varDict.min} </span>
            <span> &#8212; </span>
            <span class="slider-max-val"> ${varDict.max}</span>
          </div>
        </div>
      </div>
      <div class="dual-range-slider">
        <div class="slider-track"></div>
        <input class="to-slider" type="range" value = "${varDict.max}" min="${varDict.min}" max="${varDict.max}">
        <input class="from-slider" type="range" value = "${varDict.min}" min="${varDict.min}" max="${varDict.max}">
      </div>
    </div>
  `);
  parentEl.append(el);
}

/* ================
Add the filter selectors on categorical variables
================= */

// Makes individual checkbox option containing on factor
// checkboxGroupEl is the parent el
// factorKey: the corresponding factor used for SQL
// returns element
function makeFilterOptionEl(factorKey, displayFactor) {
  const el = htmlToElement(`
    <label>
      <input type="checkbox" class="cb-invisible" value="${factorKey}">
      <div class="cb-option">
        <button class="center-content">${displayFactor}</button>
      </div>
    </label>
  `);
  return el;
}

// Makes HTML element of checkbox groups
// returns element

function makeFilterCbGroupEl(varName) {
  const varDict = categoricalVarsDict[varName];
  const el = htmlToElement(`
    <div class="selector-kit factor-selector-kit" id="${varName}-selector">
      <div class="selector-kit-top">
        <div class="selector-kit-title">${varDict.displayName}</div>
        <button class="filter-reset-button clear-factors-button">Reset</button>
      </div>
      <div class="cb-group cb-group-wrap"></div>
    </div>
  `);
  return el;
}

// Adds individual checkbox group as filters with categorical variables
function addFilterCbGroupEl(parentEl, varName) {
  const varDict = categoricalVarsDict[varName];
  const containerEl = makeFilterCbGroupEl(varName);

  // Find the checkbox group
  const cbGroupEl = containerEl.getElementsByClassName('cb-group-wrap')[0];

  // Now append all the option buttons
  const factorDict = varDict.factors;
  for(const factorKey of Object.keys(factorDict)) {
    const optionEl = makeFilterOptionEl(factorKey, factorDict[factorKey]);
    cbGroupEl.append(optionEl);
  }
  parentEl.append(containerEl);
}

// Adds individual checkbox group home/work variables
function addHomeWorkCbGroupEl(parentEl) {
  const containerEl = makeFilterCbGroupEl('home_work');
  parentEl.append(containerEl);

}

export {
  addDisplayVarsEl,
  addSliderFilterEl,
  addFilterCbGroupEl,
  addHomeWorkCbGroupEl,
};
