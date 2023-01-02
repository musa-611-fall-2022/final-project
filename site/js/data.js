// foursquare API data is json not geojson, conversion function
function makeGeoJSON(data) {
  let geoArray = [];
  for (const element of data.results) {
    let geoElement = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [element.geocodes.main.longitude, element.geocodes.main.latitude],
      },
      "properties":{
        "name": element.name,
        "address_info": element.location,
        "rating": element.rating,
        "price": element.price,
        "menu_link" : element.menu,
      },
    };
    geoArray.push(geoElement);
  }
  return geoArray;
}

//foursquare only lets me download 50 restaurants at a time, so I just created new locations for each neighborhood as a separate download
const urlCenterCity = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.96505871218218%2C-75.16367498832258&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlFishtown = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.97327187487038%2C-75.1338278229921&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlGradHospital = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.93792345069754%2C-75.16681852812717&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlSouthPhila = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.92599849450591%2C-75.16959739092027&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlNwPhila = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.985150205587175%2C-75.17246277071337&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlKensington = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.99380084702684%2C-75.12093340551054&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlUpperNwPhila = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=40.00668564178268%2C-75.1652116022355&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlGermantown = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=40.03685077442615%2C-75.16779929005185&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlRoxborough = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=40.03552995287582%2C-75.2221407141313&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlMtAiry = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=40.054899436428954%2C-75.1872069421086&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlNoPhila = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=40.00778679346621%2C-75.13660328639875&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlExtraNoPhila = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=40.04147344786197%2C-75.12395237161246&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlFarNePhila = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=40.05654999023252%2C-75.04373407741994&radius=3000&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlUniCity = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.954522343474004%2C-75.19857970841439&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlWestParkside = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.976007997621934%2C-75.22819434642022&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlCobbsCreek = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.95485294319508%2C-75.23811381256547&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlKingsessing = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.93887213162346%2C-75.22201265015173&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlElmwoodPark = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.92266708397425%2C-75.23221963722871&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const urlEastwick = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.90507721682639%2C-75.24022308391964&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'fsq3PT0XzmGKLOcdzjrfsMjlII+0TdyLrtcRTy3TWjBWL1I=',
  },
};

//downloading each and every location for restaurants in that neighborhood
async function downloadRestaurantsCenterCity(onSuccess, onFailure) {
  const resp = await fetch(urlCenterCity, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsFishtown(onSuccess, onFailure) {
  const resp = await fetch(urlFishtown, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsGradHospital(onSuccess, onFailure) {
  const resp = await fetch(urlGradHospital, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsSouthPhila(onSuccess, onFailure) {
  const resp = await fetch(urlSouthPhila, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsNwPhila(onSuccess, onFailure) {
  const resp = await fetch(urlNwPhila, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsKensington(onSuccess, onFailure) {
  const resp = await fetch(urlKensington, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsUpperNwPhila(onSuccess, onFailure) {
  const resp = await fetch(urlUpperNwPhila, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsGermantown(onSuccess, onFailure) {
  const resp = await fetch(urlGermantown, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsRoxborough(onSuccess, onFailure) {
  const resp = await fetch(urlRoxborough, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsMtAiry(onSuccess, onFailure) {
  const resp = await fetch(urlMtAiry, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsNoPhila(onSuccess, onFailure) {
  const resp = await fetch(urlNoPhila, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsExtraNoPhila(onSuccess, onFailure) {
  const resp = await fetch(urlExtraNoPhila, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsFarNePhila(onSuccess, onFailure) {
  const resp = await fetch(urlFarNePhila, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsUniCity(onSuccess, onFailure) {
  const resp = await fetch(urlUniCity, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsWestParkside(onSuccess, onFailure) {
  const resp = await fetch(urlWestParkside, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsCobbsCreek(onSuccess, onFailure) {
  const resp = await fetch(urlCobbsCreek, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsKingsessing(onSuccess, onFailure) {
  const resp = await fetch(urlKingsessing, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsElmwoodPark(onSuccess, onFailure) {
  const resp = await fetch(urlElmwoodPark, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurantsEastwick(onSuccess, onFailure) {
  const resp = await fetch(urlEastwick, options);
  if (resp.status === 200) {
    const data = await resp.json(); //this is still a promise
    if (onSuccess) {
      let geoArray = makeGeoJSON(data);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}


// farmers markets and picnic tables from open data philly
async function downloadFarmersMarkets(onSuccess, onFailure) {
    const resp = await fetch('data/Farmers_Markets.geojson');
    if (resp.status === 200) {
      const data = await resp.json();
      if (onSuccess) { onSuccess(data);
        } else {
          alert('Oh no, I failed to download the Farmers Markets data.');
          if (onFailure) { onFailure() }
        }
      }
  }

async function downloadPicnics(onSuccess, onFailure) {
    const resp = await fetch('data/ppr_picnic_sites.geojson');
    if (resp.status === 200) {
      const data = await resp.json();
      if (onSuccess) { onSuccess(data) }
    } else {
      alert('Oh no, I failed to download the Picnics data.');
      if (onFailure) { onFailure() }
    }
  }




export {
    downloadRestaurantsCenterCity,
    downloadRestaurantsFishtown,
    downloadRestaurantsGradHospital,
    downloadRestaurantsSouthPhila,
    downloadRestaurantsNwPhila,
    downloadRestaurantsKensington,
    downloadRestaurantsUpperNwPhila,
    downloadRestaurantsGermantown,
    downloadRestaurantsRoxborough,
    downloadRestaurantsMtAiry,
    downloadRestaurantsNoPhila,
    downloadRestaurantsExtraNoPhila,
    downloadRestaurantsFarNePhila,
    downloadRestaurantsUniCity,
    downloadRestaurantsWestParkside,
    downloadRestaurantsCobbsCreek,
    downloadRestaurantsKingsessing,
    downloadRestaurantsElmwoodPark,
    downloadRestaurantsEastwick,
    downloadFarmersMarkets,
    downloadPicnics,
  };