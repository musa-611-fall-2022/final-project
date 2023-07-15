import  sites  from '../data/sites.js';
import { initializeSiteMap, showSitesOnMap } from './map.js';
console.log(sites);

let siteMap = initializeSiteMap();
showSitesOnMap(sites, siteMap);

let submittorNameInput = document.querySelector('#submittor-name-input');
let challengeFilter = document.querySelectorAll('.challenge-checkbox');
let neighborhoodFilter = document.querySelectorAll('.neighborhood-checkbox');

submittorNameInput.addEventListener('input', () => {
  const text = submittorNameInput.value;
  const sitesFilteredBySubmittor=sites.filter( function(site) {
    const submittor = site["foundby"];
    const hasText = submittor.includes(text);
    return hasText;
  });
  showSitesOnMap(sitesFilteredBySubmittor, siteMap);
});

function getCheckedSites() {
  let filteredSites = sites;

  for (const checkbox of challengeFilter) {
  if (checkbox.checked) {
    filteredSites = filteredSites.filter(function(site) {
      const challenge = checkbox.value;
      const hasChallenge = site['challenge'].includes(challenge);
      return hasChallenge;
    });
  }
}

for (const checkbox of neighborhoodFilter) {
  if (checkbox.checked) {
    filteredSites = filteredSites.filter(function(site) {
      const neighborhood = checkbox.value;
      const hasNeighborhood = site['neighborhood'].includes(neighborhood);
      return hasNeighborhood;
    });
  }
}

return filteredSites;
}

for (const cb of challengeFilter) {
  cb.addEventListener('change', () => {
    const filteredSites = getCheckedSites();
    showSitesOnMap(filteredSites, siteMap);
  });
}

for (const cb of neighborhoodFilter) {
  cb.addEventListener('change', () => {
    const filteredSites = getCheckedSites();
    showSitesOnMap(filteredSites, siteMap);
  });
}

window.sites = sites;
window.siteMap = siteMap;
window.submittorNameInput = submittorNameInput;
