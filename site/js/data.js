async function downloadRestaurants(onSuccess, onFailure) {
  const url = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.96505871218218%2C-75.15923766973874&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'fsq3PT0XzmGKLOcdzjrfsMjlII+0TdyLrtcRTy3TWjBWL1I='
    }
  };
  const resp = await fetch(url,options);
  if (resp.status === 200) {
    
    const data = await resp.json(); //this is still a promise
    console.log(data);
    console.log(typeof data);
    if (onSuccess) { 
      let geoArray = [];
      for (const element of data.results) {
        let geoElement = {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [element.geocodes.main.longitude, element.geocodes.main.latitude],
          },
          "properties":{
            "name": element.name
          },  
        }
      geoArray.push(geoElement);
      } 
      console.log(geoArray);
      onSuccess(geoArray);
    } else {
      alert('Oh no, I failed to download the Farmers Markets data.');
      if (onFailure) { onFailure() }
    }
}}

async function downloadRestaurants1(onSuccess, onFailure) {
  const url = 'https://api.foursquare.com/v3/places/search?query=restaurant&ll=39.96505871218218%2C-75.15923766973874&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cprice%2Cmenu&limit=50';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'fsq3PT0XzmGKLOcdzjrfsMjlII+0TdyLrtcRTy3TWjBWL1I='
    }
  };
  const resp = await fetch(url,options).then((response) => {
    return response.json();
  }).then(data =>
    console.log(data));
}

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
//  var outGeoJson = {}
//  outGeoJson['properties'] = jsonData
//  outGeoJson['type']= "Feature"
//  outGeoJson['geometry']= {"type": "Point", "coordinates":
//      [jsonData['lat'], jsonData['lon']]}
//  
//  console.log(outGeoJson)



export {
    downloadRestaurants,
    downloadRestaurants1,
    downloadFarmersMarkets,
    downloadParks,
    downloadPicnics,
  };

