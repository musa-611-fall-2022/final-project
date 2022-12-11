mapboxgl.accessToken = 'pk.eyJ1IjoieWVzZW5pYW8iLCJhIjoiY2tlZjAyM3p5MDNnMjJycW85bmpjenFkOCJ9.TDYe7XRNP8CnAto0kLA5zA';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [-75.116728, 39.993436], // starting position [lng, lat],
    zoom: 11.2 // starting zoom
});

const map_roof = new mapboxgl.Map({
    container: 'map-roof', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [-75.116728, 39.993436], // starting position [lng, lat],
    zoom: 11.2 // starting zoom
});

window.map = map;
window.map_roof = map_roof;

let solar1 = {};
let solar2 = {};
let solar3 = {};
let solar4 = {};
let solar5 = {};
let solar6 = {};
let solar7 = {};


// Add the control to the map.
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    language: 'en-EN'
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

document.getElementById('geocoder-roof').appendChild(geocoder.onAdd(map_roof));

// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
    })
);

map_roof.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
    })
);


map.addControl(new mapboxgl.NavigationControl());
map_roof.addControl(new mapboxgl.NavigationControl());
//
// $.ajax({
//     url: "data/Solar_Buildings1.geojson",
//     type: "GET",
//     dataType: "json",
//     async: false,
//     success: function(data) {
//         solar1 = data;
//     },
//     error: function (err) {
//         console.log(err);
//     }
// });
//
// $.ajax({
//     url: "data/Solar_Buildings2.geojson",
//     type: "GET",
//     dataType: "json",
//     async: false,
//     success: function(data) {
//         solar2 = data;
//     },
//     error: function (err) {
//         console.log(err);
//     }
// });
//
// $.ajax({
//     url: "data/Solar_Buildings3.geojson",
//     type: "GET",
//     dataType: "json",
//     async: false,
//     success: function(data) {
//         solar3 = data;
//     },
//     error: function (err) {
//         console.log(err);
//     }
// });
//
// $.ajax({
//     url: "data/Solar_Buildings4.geojson",
//     type: "GET",
//     dataType: "json",
//     async: false,
//     success: function(data) {
//         solar4 = data;
//     },
//     error: function (err) {
//         console.log(err);
//     }
// });
//
// $.ajax({
//     url: "data/Solar_Buildings5.geojson",
//     type: "GET",
//     dataType: "json",
//     async: false,
//     success: function(data) {
//         solar5 = data;
//     },
//     error: function (err) {
//         console.log(err);
//     }
// });
//
// $.ajax({
//     url: "data/Solar_Buildings6.geojson",
//     type: "GET",
//     dataType: "json",
//     async: false,
//     success: function(data) {
//         solar6 = data;
//     },
//     error: function (err) {
//         console.log(err);
//     }
// });
//
// $.ajax({
//     url: "data/Solar_Buildings7.geojson",
//     type: "GET",
//     dataType: "json",
//     async: false,
//     success: function(data) {
//         solar7 = data;
//     },
//     error: function (err) {
//         console.log(err);
//     }
// });

let neighbors = {};


$.ajax({
    url: "data/neighborhoods_results.geojson",
    type: "GET",
    dataType: "json",
    async: false,
    success: function(data) {
        neighbors = data;
    },
    error: function (err) {
        console.log(err);
    }
});

window.neighbors = neighbors;

map.on('load', () => {
    map.addSource('solar-roof', {
        'type': 'raster',
        'url': 'mapbox://yeseniao.34uap4z1',
    });
    map.addLayer({
        'id': 'roof-layer',
        'type': 'raster',
        'source': 'solar-roof',
        // 'paint': {
        //     'raster-fade-duration': 0
        // }
    });


    map.addSource('neighborhood-boundary', {
        'type': 'geojson',
        'data': neighbors
    });
    map.addLayer({
        'id': 'neighborhood',
        'type': 'fill',
        'source': 'neighborhood-boundary', // reference the data source
        'layout': {},
        'generateId': true,
        'paint': {
            // 'fill-color': '#0080ff', // blue color fill
            // 'fill-opacity': 0,
            'fill-outline-color': 'rgba(0,0,0,0.1)',
            // 'fill-color': '#627BC1',
            'fill-opacity': 0.1,
            // 'fill-opacity': [
            //     'case',
            //     ['boolean', ['feature-state', 'hover'], false],
            //     1,
            //     0.5
            // ]
        }
    });
    //
    map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'neighborhood-boundary',
        'layout': {},
        'paint': {
        'line-color': '#ffffff',
        'line-width': 1
        }
    });

    // When clicked, show the neighborhood information
    // map.on('click', 'neighborhood', (e) => {
    //     new mapboxgl.Popup()
    //         .setLngLat(e.lngLat)
    //         .setHTML(e.features[0].properties.MAPNAME)
    //         .addTo(map);
    // });
    //
    // map.on('mouseenter', 'neighborhood', () => {
    //     map.getCanvas().style.cursor = 'pointer';
    // });
    //
    // map.on('mouseleave', 'neighborhood', () => {
    //     map.getCanvas().style.cursor = '';
    // });

    // When hovered, show the neighborhood information
    // let hoveredCountyId = null;
    //
    // map.on('mousemove', 'neighborhood', (e) => {
    //     map.getCanvas().style.cursor = 'pointer';
    //     if (e.features.length > 0) {
    //         if (hoveredCountyId !== null) {
    //             map.setFeatureState({
    //                 source: 'neighborhood-boundary',
    //                 id: hoveredCountyId
    //             }, {
    //                 hover: false
    //             });
    //         }
    //         console.log(e.features[0].properties.id)
    //         hoveredCountyId = e.features[0].properties.id;
    //         map.setFeatureState({
    //             source: 'neighborhood-boundary',
    //             id: hoveredCountyId
    //         }, {
    //             hover: true
    //         });
    //     }
    // });

    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    // map.on('mouseleave', 'neighborhood', () => {
    //     if (hoveredCountyId !== null) {
    //         map.setFeatureState({
    //             source: 'neighborhood-boundary',
    //             id: hoveredCountyId }, {
    //             hover: false
    //         });
    //     }
    //     hoveredCountyId = null;
    // });

    // map.addSource('solar-roof1', {
    //     'type': 'geojson',
    //     'data': solar1
    // });
    // map.addSource('solar-roof2', {
    //     'type': 'geojson',
    //     'data': solar2
    // });
    // map.addSource('solar-roof3', {
    //     'type': 'geojson',
    //     'data': solar3
    // });
    // map.addSource('solar-roof4', {
    //     'type': 'geojson',
    //     'data': solar4
    // });
    // map.addSource('solar-roof5', {
    //     'type': 'geojson',
    //     'data': solar5
    // });
    // map.addSource('solar-roof6', {
    //     'type': 'geojson',
    //     'data': solar6
    // });
    // map.addSource('solar-roof7', {
    //     'type': 'geojson',
    //     'data': solar7
    // });
    // map.addLayer({
    //     'id': 'roof1',
    //     'type': 'fill',
    //     'source': 'solar-roof1',
    //     'paint': {
    //         'fill-color': [
    //             'interpolate',
    //             ['linear'],
    //             ['get', 'Solar_Rad_'],
    //             0,
    //             '#F2F12D',
    //             5,
    //             '#EED322',
    //             75,
    //             '#E6B71E',
    //             100,
    //             '#DA9C20',
    //             250,
    //             '#CA8323',
    //             500,
    //             '#B86B25',
    //             750,
    //             '#A25626',
    //             1000,
    //             '#8B4225',
    //             2500,
    //             '#723122'
    //             ],
    //         'fill-opacity': [
    //             'case',
    //             ['boolean', ['feature-state', 'hover'], false],
    //             1,
    //             0.5
    //         ]
    //             // 'fill-opacity': 0.75
    //         // 'fill-color': '#888888',
    //         // 'fill-opacity': 0.4
    //     },
    //
    //     'filter': ['==', '$type', 'Polygon']
    // });
    //
    // map.addLayer({
    //     'id': 'roof2',
    //     'type': 'fill',
    //     'source': 'solar-roof2',
    //     'paint': {
    //         'fill-color': [
    //             'interpolate',
    //             ['linear'],
    //             ['get', 'Solar_Rad_'],
    //             0,
    //             '#F2F12D',
    //             5,
    //             '#EED322',
    //             75,
    //             '#E6B71E',
    //             100,
    //             '#DA9C20',
    //             250,
    //             '#CA8323',
    //             500,
    //             '#B86B25',
    //             750,
    //             '#A25626',
    //             1000,
    //             '#8B4225',
    //             2500,
    //             '#723122'
    //             ],
    //         'fill-opacity': [
    //             'case',
    //             ['boolean', ['feature-state', 'hover'], false],
    //             1,
    //             0.5
    //         ]
    //             // 'fill-opacity': 0.75
    //         // 'fill-color': '#888888',
    //         // 'fill-opacity': 0.4
    //     },
    //
    //     'filter': ['==', '$type', 'Polygon']
    // });

    // Create a popup, but don't add it to the map yet.
    // const popup = new mapboxgl.Popup({
    //     closeButton: false,
    //     closeOnClick: false
    // });
    //
    // map.on('mouseenter', 'roof', (e) => {
    //     // Change the cursor style as a UI indicator.
    //     map.getCanvas().style.cursor = 'pointer';
    //
    //     // Copy coordinates array.
    //     const coordinates = e.lngLat;
    //     const address = e.features[0].properties.ADDRESS;
    //
    //     // Ensure that if the map is zoomed out such that multiple
    //     // copies of the feature are visible, the popup appears
    //     // over the copy being pointed to.
    //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //     }
    //
    //     // Populate the popup and set its coordinates
    //     // based on the feature found.
    //     popup.setLngLat(coordinates).setHTML(address).addTo(map);
    // });
    //
    // map.on('mouseleave', 'roof', () => {
    //     map.getCanvas().style.cursor = '';
    //     popup.remove();
    // });
});

$("#select-neighbor").change(function(){
    var selectVal = $("#select-neighbor option:selected").val();
    let name_arr = selectVal.split('_');
    if (name_arr.length > 1) {
        selectVal = name_arr[0];
        for (let j = 1; j < name_arr.length; j++) {
            selectVal += ' ' + name_arr[j]
        }
    }
    for (let i = 0; i < neighbors['features'].length; i++) {
        if (neighbors['features'][i]['properties']['MAPNAME'] === selectVal) {
            const coordinates = neighbors.features[i].geometry.coordinates[0][0];

            // Create a 'LngLatBounds' with both corners at the first coordinate.
            const bounds = new mapboxgl.LngLatBounds(
                coordinates[0],
                coordinates[0]
            );

            // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
            for (const coord of coordinates) {
                bounds.extend(coord);
            }

            map.fitBounds(bounds, {
                padding: 20
            });
            // map.flyTo({
            //     center: [neighbors['features'][i]['properties']['Lon'], neighbors['features'][i]['properties']['Lat']],
            //     zoom: 16,
            //     essential: true // this animation is considered essential with respect to prefers-reduced-motion
            // });
            break
        }
    }
});
