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

let solar = {};
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

const geocoder_roof = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    language: 'en-EN',
    flyTo: {
        zoom: 18, // If you want your result not to go further than a specific zoom
        curve:1
    }
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

document.getElementById('geocoder-roof').appendChild(geocoder_roof.onAdd(map_roof));
window.geocoder_roof = geocoder_roof;
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

$.ajax({
    url: "data/Solar_Buildings1.geojson",
    type: "GET",
    dataType: "json",
    async: false,
    success: function(data) {
        solar = data;
    },
    error: function (err) {
        console.log(err);
    }
});

$.ajax({
    url: "data/Solar_Buildings1.geojson",
    type: "GET",
    dataType: "json",
    async: false,
    success: function(data) {
        solar1 = data;
    },
    error: function (err) {
        console.log(err);
    }
});



$.ajax({
    url: "data/Solar_Buildings2.geojson",
    type: "GET",
    dataType: "json",
    async: false,
    success: function(data) {
        solar2 = data;
        for (let i = 0; i < data['features'].length; i++) {
            solar['features'].push(data['features'][i])
        }
    },
    error: function (err) {
        console.log(err);
    }
});

// console.log(solar)
$.ajax({
    url: "data/Solar_Buildings3.geojson",
    type: "GET",
    dataType: "json",
    async: false,
    success: function(data) {
        solar3 = data;
        for (let i = 0; i < data['features'].length; i++) {
            solar['features'].push(data['features'][i])
        }
    },
    error: function (err) {
        console.log(err);
    }
});

$.ajax({
    url: "data/Solar_Buildings4.geojson",
    type: "GET",
    dataType: "json",
    async: false,
    success: function(data) {
        solar4 = data;
        for (let i = 0; i < data['features'].length; i++) {
            solar['features'].push(data['features'][i])
        }
    },
    error: function (err) {
        console.log(err);
    }
});

$.ajax({
    url: "data/Solar_Buildings5.geojson",
    type: "GET",
    dataType: "json",
    async: false,
    success: function(data) {
        solar5 = data;
        for (let i = 0; i < data['features'].length; i++) {
            solar['features'].push(data['features'][i])
        }
    },
    error: function (err) {
        console.log(err);
    }
});

$.ajax({
    url: "data/Solar_Buildings6.geojson",
    type: "GET",
    dataType: "json",
    async: false,
    success: function(data) {
        solar6 = data;
        for (let i = 0; i < data['features'].length; i++) {
            solar['features'].push(data['features'][i])
        }
    },
    error: function (err) {
        console.log(err);
    }
});

$.ajax({
    url: "data/Solar_Buildings7.geojson",
    type: "GET",
    dataType: "json",
    async: false,
    success: function(data) {
        solar7 = data;
        for (let i = 0; i < data['features'].length; i++) {
            solar['features'].push(data['features'][i])
        }
    },
    error: function (err) {
        console.log(err);
    }
});

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
window.solar = solar;



map.on('load', () => {
    map.addSource('solar-roof', {
        'type': 'raster',
        'url': 'mapbox://yeseniao.34uap4z1',
    });
    map.addLayer({
        'id': 'roof-layer',
        'type': 'raster',
        'source': 'solar-roof',
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
        }
    });
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
    map.on('click', 'neighborhood', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.MAPNAME)
            .addTo(map);
    });

    map.on('mouseenter', 'neighborhood', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'neighborhood', () => {
        map.getCanvas().style.cursor = '';
    });

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
});

map_roof.on('load', () => {
    map_roof.addSource('solar-roof', {
        'type': 'raster',
        'url': 'mapbox://yeseniao.34uap4z1',
    });
    map_roof.addSource('solar-roof1', {
        'type': 'geojson',
        'data': solar1
    });
    map_roof.addSource('solar-roof2', {
        'type': 'geojson',
        'data': solar2
    });
    map_roof.addSource('solar-roof3', {
        'type': 'geojson',
        'data': solar3
    });
    map_roof.addSource('solar-roof4', {
        'type': 'geojson',
        'data': solar4
    });
    map_roof.addSource('solar-roof5', {
        'type': 'geojson',
        'data': solar5
    });
    map_roof.addSource('solar-roof6', {
        'type': 'geojson',
        'data': solar6
    });
    map_roof.addSource('solar-roof7', {
        'type': 'geojson',
        'data': solar7
    });

    map_roof.addLayer({
        'id': 'roof-layer',
        'type': 'raster',
        'source': 'solar-roof',
    });
    map_roof.addLayer({
        'id': 'roof1',
        'type': 'fill',
        'source': 'solar-roof1',
        'paint': {
            'fill-color': '#eee',
            'fill-opacity': 0
        },
        'filter': ['==', '$type', 'Polygon']
    });
    map_roof.addLayer({
        'id': 'roof_line1',
        'type': 'line',
        'source': 'solar-roof1',
        'paint': {
            'line-color': '#ffffff',
            'line-width': 1
        },
    });
    map_roof.addLayer({
        'id': 'roof2',
        'type': 'fill',
        'source': 'solar-roof2',
        'paint': {
            'fill-color': '#eee',
            'fill-opacity': 0
        },
        'filter': ['==', '$type', 'Polygon']
    });
    map_roof.addLayer({
        'id': 'roof2_line',
        'type': 'line',
        'source': 'solar-roof2',
        'paint': {
            'line-color': '#ffffff',
            'line-width': 1
        },
    });
    map_roof.addLayer({
        'id': 'roof3',
        'type': 'fill',
        'source': 'solar-roof3',
        'paint': {
            'fill-color': '#eee',
            'fill-opacity': 0
        },
        'filter': ['==', '$type', 'Polygon']
    });
    map_roof.addLayer({
        'id': 'roof3_line',
        'type': 'line',
        'source': 'solar-roof3',
        'paint': {
            'line-color': '#ffffff',
            'line-width': 1
        },
    });
    map_roof.addLayer({
        'id': 'roof4',
        'type': 'fill',
        'source': 'solar-roof4',
        'paint': {
            'fill-color': '#eee',
            'fill-opacity': 0
        },
        'filter': ['==', '$type', 'Polygon']
    });
    map_roof.addLayer({
        'id': 'roof4_line',
        'type': 'line',
        'source': 'solar-roof4',
        'paint': {
            'line-color': '#ffffff',
            'line-width': 1
        },
    });
    map_roof.addLayer({
        'id': 'roof5',
        'type': 'fill',
        'source': 'solar-roof5',
        'paint': {
            'fill-color': '#eee',
            'fill-opacity': 0
        },
        'filter': ['==', '$type', 'Polygon']
    });
    map_roof.addLayer({
        'id': 'roof5_line',
        'type': 'line',
        'source': 'solar-roof5',
        'paint': {
            'line-color': '#ffffff',
            'line-width': 1
        },
    });
    map_roof.addLayer({
        'id': 'roof6',
        'type': 'fill',
        'source': 'solar-roof6',
        'paint': {
            'fill-color': '#eee',
            'fill-opacity': 0
        },
        'filter': ['==', '$type', 'Polygon']
    });
    map_roof.addLayer({
        'id': 'roof6_line',
        'type': 'line',
        'source': 'solar-roof6',
        'paint': {
            'line-color': '#ffffff',
            'line-width': 1
        },
    });
    map_roof.addLayer({
        'id': 'roof7',
        'type': 'fill',
        'source': 'solar-roof7',
        'paint': {
            'fill-color': '#eee',
            'fill-opacity': 0
        },
        'filter': ['==', '$type', 'Polygon']
    });
    map_roof.addLayer({
        'id': 'roof7_line',
        'type': 'line',
        'source': 'solar-roof7',
        'paint': {
            'line-color': '#ffffff',
            'line-width': 1
        },
    });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map_roof.on('mouseenter', 'roof1', (e) => {
        // Change the cursor style as a UI indicator.
        map_roof.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const coordinates = e.lngLat;
        const address = e.features[0].properties.ADDRESS;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(address).addTo(map_roof);
    });

    map_roof.on('mouseleave', 'roof1', () => {
        map_roof.getCanvas().style.cursor = '';
        popup.remove();
    });
    map_roof.on('mouseenter', 'roof2', (e) => {
        // Change the cursor style as a UI indicator.
        map_roof.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const coordinates = e.lngLat;
        const address = e.features[0].properties.ADDRESS;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(address).addTo(map_roof);
    });

    map_roof.on('mouseleave', 'roof2', () => {
        map_roof.getCanvas().style.cursor = '';
        popup.remove();
    });
    map_roof.on('mouseenter', 'roof3', (e) => {
        // Change the cursor style as a UI indicator.
        map_roof.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const coordinates = e.lngLat;
        const address = e.features[0].properties.ADDRESS;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(address).addTo(map_roof);
    });

    map_roof.on('mouseleave', 'roof3', () => {
        map_roof.getCanvas().style.cursor = '';
        popup.remove();
    });
    map_roof.on('mouseenter', 'roof4', (e) => {
        // Change the cursor style as a UI indicator.
        map_roof.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const coordinates = e.lngLat;
        const address = e.features[0].properties.ADDRESS;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(address).addTo(map_roof);
    });

    map_roof.on('mouseleave', 'roof4', () => {
        map_roof.getCanvas().style.cursor = '';
        popup.remove();
    });
    map_roof.on('mouseenter', 'roof5', (e) => {
        // Change the cursor style as a UI indicator.
        map_roof.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const coordinates = e.lngLat;
        const address = e.features[0].properties.ADDRESS;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(address).addTo(map_roof);
    });

    map_roof.on('mouseleave', 'roof5', () => {
        map_roof.getCanvas().style.cursor = '';
        popup.remove();
    });
    map_roof.on('mouseenter', 'roof6', (e) => {
        // Change the cursor style as a UI indicator.
        map_roof.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const coordinates = e.lngLat;
        const address = e.features[0].properties.ADDRESS;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(address).addTo(map_roof);
    });

    map_roof.on('mouseleave', 'roof6', () => {
        map_roof.getCanvas().style.cursor = '';
        popup.remove();
    });
    map_roof.on('mouseenter', 'roof7', (e) => {
        // Change the cursor style as a UI indicator.
        map_roof.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const coordinates = e.lngLat;
        const address = e.features[0].properties.ADDRESS;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(address).addTo(map_roof);
    });

    map_roof.on('mouseleave', 'roof7', () => {
        map_roof.getCanvas().style.cursor = '';
        popup.remove();
    });
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

            break
        }
    }
});


