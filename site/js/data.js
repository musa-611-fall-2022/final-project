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
};

const url_centerCity = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.96505871218218%2C-75.16367498832258&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_fishtown = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.97327187487038%2C-75.1338278229921&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_gradHospital = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.93792345069754%2C-75.16681852812717&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_southPhila = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.92599849450591%2C-75.16959739092027&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_NWPhila = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.985150205587175%2C-75.17246277071337&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_kensington = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.99380084702684%2C-75.12093340551054&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_upperNWPhila = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=40.00668564178268%2C-75.1652116022355&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_germantown = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=40.03685077442615%2C-75.16779929005185&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_roxborough = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=40.03552995287582%2C-75.2221407141313&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_mtAiry = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=40.054899436428954%2C-75.1872069421086&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_NPhila = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=40.00778679346621%2C-75.13660328639875&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_extraNPhila = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=40.04147344786197%2C-75.12395237161246&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_farNEPhila = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=40.05654999023252%2C-75.04373407741994&radius=3000&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_uniCity = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.954522343474004%2C-75.19857970841439&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_WParkside = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.976007997621934%2C-75.22819434642022&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_cobbsCreek = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.95485294319508%2C-75.23811381256547&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_kingsessing = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.93887213162346%2C-75.22201265015173&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_elmwoodPark = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.92266708397425%2C-75.23221963722871&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const url_eastwick = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.90507721682639%2C-75.24022308391964&radius=1600&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'fsq3PT0XzmGKLOcdzjrfsMjlII+0TdyLrtcRTy3TWjBWL1I='
  }
};

async function downloadRestaurants_centerCity(onSuccess, onFailure) {
  const resp = await fetch(url_centerCity, options);
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

async function downloadRestaurants_fishtown(onSuccess, onFailure) {
  const resp = await fetch(url_fishtown, options);
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

async function downloadRestaurants_gradHospital(onSuccess, onFailure) {
  const resp = await fetch(url_gradHospital, options);
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

async function downloadRestaurants_southPhila(onSuccess, onFailure) {
  const resp = await fetch(url_southPhila, options);
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

async function downloadRestaurants_NWPhila(onSuccess, onFailure) {
  const resp = await fetch(url_NWPhila, options);
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

async function downloadRestaurants_kensington(onSuccess, onFailure) {
  const resp = await fetch(url_kensington, options);
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

async function downloadRestaurants_upperNWPhila(onSuccess, onFailure) {
  const resp = await fetch(url_upperNWPhila, options);
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

async function downloadRestaurants_germantown(onSuccess, onFailure) {
  const resp = await fetch(url_germantown, options);
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

async function downloadRestaurants_roxborough(onSuccess, onFailure) {
  const resp = await fetch(url_roxborough, options);
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

async function downloadRestaurants_mtAiry(onSuccess, onFailure) {
  const resp = await fetch(url_mtAiry, options);
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

async function downloadRestaurants_NPhila(onSuccess, onFailure) {
  const resp = await fetch(url_NPhila, options);
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

async function downloadRestaurants_extraNPhila(onSuccess, onFailure) {
  const resp = await fetch(url_extraNPhila, options);
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

async function downloadRestaurants_farNEPhila(onSuccess, onFailure) {
  const resp = await fetch(url_farNEPhila, options);
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

async function downloadRestaurants_uniCity(onSuccess, onFailure) {
  const resp = await fetch(url_uniCity, options);
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

async function downloadRestaurants_WParkside(onSuccess, onFailure) {
  const resp = await fetch(url_WParkside, options);
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

async function downloadRestaurants_cobbsCreek(onSuccess, onFailure) {
  const resp = await fetch(url_cobbsCreek, options);
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

async function downloadRestaurants_kingsessing(onSuccess, onFailure) {
  const resp = await fetch(url_kingsessing, options);
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

async function downloadRestaurants_elmwoodPark(onSuccess, onFailure) {
  const resp = await fetch(url_elmwoodPark, options);
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

async function downloadRestaurants_eastwick(onSuccess, onFailure) {
  const resp = await fetch(url_eastwick, options);
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


async function downloadFarmersMarkets(onSuccess, onFailure) {
    const resp = await fetch('data/Farmers_Markets.geojson');
    if (resp.status === 200) {
      const data = await resp.json();
      if (onSuccess) { onSuccess(data)
        } else {
          alert('Oh no, I failed to download the Farmers Markets data.');
          if (onFailure) { onFailure() }
        }
      }
  }

async function downloadParks(onSuccess, onFailure) {
    const resp = await fetch('data/PPR_Districts_2018.geojson');
    if (resp.status === 200) {
      const data = await resp.json();
      if (onSuccess) { onSuccess(data) }
    } else {
      alert('Oh no, I failed to download the Parks data.');
      if (onFailure) { onFailure() }
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
    downloadRestaurants_centerCity,
    downloadRestaurants_fishtown,
    downloadRestaurants_gradHospital,
    downloadRestaurants_southPhila,
    downloadRestaurants_NWPhila,
    downloadRestaurants_kensington,
    downloadRestaurants_upperNWPhila,
    downloadRestaurants_germantown,
    downloadRestaurants_roxborough,
    downloadRestaurants_mtAiry,
    downloadRestaurants_NPhila,
    downloadRestaurants_extraNPhila,
    downloadRestaurants_farNEPhila,
    downloadRestaurants_uniCity,
    downloadRestaurants_WParkside,
    downloadRestaurants_cobbsCreek,
    downloadRestaurants_kingsessing,
    downloadRestaurants_elmwoodPark,
    downloadRestaurants_eastwick,
    downloadFarmersMarkets,
    downloadParks,
    downloadPicnics,
  };

//only 199 restaurants are displayed on the map, not sure why...