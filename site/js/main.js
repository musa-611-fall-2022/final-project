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












//function makeGhostSignSitesFeature(ghostSignSites){
 //   return{
  //    'type': 'Feature',
    //  'properties': {
     //   "Category": ghostSignSites['Category'],
     //   "Site Name": ghostSignSites['Site Name'],
      //  "Submitted By": ghostSignSites['Submitted By'],
      //  "Year Submitted": ghostSignSites['Year Submitted'],
     //   "Description": ghostSignSites['Description'],
      //  "Additional Links": ghostSignSites['Additional Links'],
    //  },
    //  'geometry': {
     //   "type": "Point",
     //   "coordinates": ghostSignSites['Coordinates'].split(','),
    //  },
   // };
 // }

//function fetchGhostSignSiteList(ghostSignSitesList, map) {
//fetch('data/ghostSignSitesList.csv')
 // .then(resp => resp.text())
  //.then(data => {
  //  const sites = Papa.parse(data, { header: true });
   // for(let i = 0; i < sites.data.length; i++) {
   //   //if tigerline != empty, then run the following (to protect against empty attributes)
   //   if (sites.data[i]['Coordinates'] !== undefined && sites.data[i]['Coordinates'] !== ''){
  //    //console.log(voters.data[i]['TIGER/Line Lng/Lat']);
    //  const ghostSignSitesFeature = makeGhostSignSitesFeature(sites.data[i]);
   //   console.log(ghostSignSitesFeature);
   //   map.ghostSignSiteLayer.addData(ghostSignSitesFeature);
  //    }
  //  }
 // });
//}

//fetchGhostSignSiteList ();

