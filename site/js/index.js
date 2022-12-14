/* globals showdown */

import eastasiancluster from '../data/EastAsianCluster.geojson.js';
import southasiancluster from '../data/SouthAsianCluster.geojson.js';
import southeastasiancluster from '../data/SoutheastAsianCluster.geojson.js';
import aapicluster from '../data/AAPICluster.geojson.js'
//import { loadResearchData } from './researchdata.js'   

let map = L.map('map', {scrollWheelZoom: false}).setView([0, 0], 0);
let layerGroup = L.layerGroup().addTo(map);
let lifeCollection = { features: [] };

//These are the pretty tiles
// https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg
//'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
}).addTo(map);

let currentSlideIndex = 0;

const slidesDiv = document.querySelector('.slides');

function updateMap(collection) {
  layerGroup.clearLayers();
  const geoJsonLayer = L.geoJSON(collection, { pointToLayer: (p, latlng) => L.marker(latlng) })
    .bindTooltip(l => l.feature.properties.label)
    .addTo(layerGroup);

  return geoJsonLayer;
}

function makeEraCollection(era) {
  return {
    type: 'FeatureCollection',
    features: lifeCollection.features.filter(f => f.properties.era === era),
  };
}

function syncMapToSlide(slide) {
  const collection = slide.era ? makeEraCollection(slide.era) : lifeCollection;
  const layer = updateMap(collection);

  function handleFlyEnd() {
    if (slide.showpopups) {
      layer.eachLayer(l => {
        l.bindTooltip(l.feature.properties.label, { permanent: true });
        l.openTooltip();
      });
    }
    map.removeEventListener('moveend', handleFlyEnd);
  }

  map.addEventListener('moveend', handleFlyEnd);
  if (slide.bounds) {
    map.flyToBounds(slide.bounds);
  } else if (slide.era) {
    map.flyToBounds(layer.getBounds());
  }
}

function syncMapToCurrentSlide() {
  const slide = slides[currentSlideIndex];
  syncMapToSlide(slide);
  loadResearchData(currentSlideIndex);
}

function initSlides() {
  const converter = new showdown.Converter({ smartIndentationFix: true });

  slidesDiv.innerHTML = '';
  for (const [index, slide] of slides.entries()) {
    const slideDiv = htmlToElement(`
      <div class="slide" id="slide-${index}">
        <h2>${slide.title}</h2>
        ${converter.makeHtml(slide.content)}
      </div>
    `);
    slidesDiv.appendChild(slideDiv);
  }
}

function loadLifeData() {
  fetch('data/journey.json')
    .then(resp => resp.json())
    .then(data => {
      lifeCollection = data;
      syncMapToCurrentSlide();
    });
}

function calcCurrentSlideIndex() {
  const scrollPos = window.scrollY;
  const windowHeight = window.innerHeight;
  const slideDivs = document.getElementsByClassName('slide');

  let i;
  for (i = 0; i < slideDivs.length; i++) {
    const slidePos = slideDivs[i].offsetTop;
    if (slidePos - scrollPos - windowHeight > 0) {
      break;
    }
  }

  if (i === 0) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex != i - 1) {
    currentSlideIndex = i - 1;
    syncMapToCurrentSlide();
  }
}

const clusterTypeColors = {
  "high frequency high clustering":"#00FFDB",
  "high frequency low clustering":"#00A3FF",
  "low frequency low clustering":"#5B00FF",
  "No_Relationship": "#FF00A4",
}

function loadResearchData(currentSlideIndex) {
  if(currentSlideIndex == 7) {
    layerGroup.clearLayers()
    L.geoJSON(aapicluster, {
      style: (feature) => {
        const ct = feature.properties['Cluster type']; //<-- cluster type
        const color = clusterTypeColors[ct];
        return {
          color: '#000000',
          weight: 1,
          fillColor: color, 
        };
      }
    }).bindTooltip(l => `${l.feature.properties['Category']} ${l.feature.properties['Cluster type']}`).addTo(layerGroup);
  } else if(currentSlideIndex == 8) {
    layerGroup.clearLayers()
    L.geoJSON(aapicluster, {
      style: (feature) => {
        const ct = feature.properties['Cluster type']; //<-- cluster type
        const color = clusterTypeColors[ct];
        return {
          color: '#000000',
          weight: 1,
          fillColor: color, 
        };
      }
    }).bindTooltip(l => `${l.feature.properties['Category']} ${l.feature.properties['Cluster type']}`).addTo(layerGroup);  
  } else if(currentSlideIndex == 9) {
    layerGroup.clearLayers()
    L.geoJSON(eastasiancluster, {
      style: (feature) => {
        const ct = feature.properties['Cluster type']; //<-- cluster type
        const color = clusterTypeColors[ct];
        return {
          color: '#000000',
          weight: 1,
          fillColor: color, 
        };
      }
    }).bindTooltip(l => `${l.feature.properties['Category']} ${l.feature.properties['Cluster type']}`).addTo(layerGroup);
  } else if(currentSlideIndex == 10) {
    layerGroup.clearLayers()
    L.geoJSON(southeastasiancluster, {
      style: (feature) => {
        const ct = feature.properties['Cluster type']; //<-- cluster type
        const color = clusterTypeColors[ct];
        return {
          color: '#000000',
          weight: 1,
          fillColor: color, 
        };
      }
    }).bindTooltip(l => `${l.feature.properties['Category']} ${l.feature.properties['Cluster type']}`).addTo(layerGroup);
  } else if(currentSlideIndex == 11) {
    layerGroup.clearLayers()
    L.geoJSON(southasiancluster, {
      style: (feature) => {
        const ct = feature.properties['Cluster type']; //<-- cluster type
        const color = clusterTypeColors[ct];
        return {
          color: '#000000',
          weight: 1,
          fillColor: color, 
        };
      }
    }).bindTooltip(l => `${l.feature.properties['Category']} ${l.feature.properties['Cluster type']}`).addTo(layerGroup);
  }
}

document.addEventListener('scroll', calcCurrentSlideIndex);

initSlides();
syncMapToCurrentSlide();
loadLifeData();

window.southasiacluster = southasiancluster