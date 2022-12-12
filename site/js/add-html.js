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
  displayName
) {
  const el = htmlToElement(`
    <label>
      <input type="checkbox" class="cb-invisible" value="${displayVar}">
      <div class="cb-option"><button>${displayName}</button></div>
    </label>
  `)

  // Store some additional information
  el.firstChild.nextElementSibling.displayType = displayType;
  el.firstChild.nextElementSibling.displayFactor = displayFactor;
  parentEl.append(el);
}

/* ================
Add the filter sliders
================= */

// Adds dual-range slider kit to parentEl titled `title`, with id of `id`, and with min` and `max` values
// Note: the `id`s should have the name as such: variable name (corresponding to psql db) + `-slider`
function addSliderFilterEl(parentEl, title, id, min, max) {
  const el = htmlToElement(`
    <div class="slider-kit" id="${id}">
      <div class="slider-kit-top">
        <div class="slider-kit-title">${title}</div>
        <div class="slider-top-right">
          <button class="filter-reset-button slider-reset-button">Reset</button>
          <div class="slider-values">
            <span class="slider-min-val">${min} </span>
            <span> &#8212; </span>
            <span class="slider-max-val"> ${max}</span>
          </div>
        </div>
      </div>
      <div class="dual-range-slider">
        <div class="slider-track"></div>
        <input class="to-slider" type="range" value = "${max}" min="${min}" max="${max}">
        <input class="from-slider" type="range" value = "${min}" min="${min}" max="${max}">
      </div>
    </div>
  `);
  parentEl.append(el);
}

export {
  addDisplayVarsEl,
  addSliderFilterEl,
};
