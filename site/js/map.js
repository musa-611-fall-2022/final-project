mapboxgl.accessToken = 'pk.eyJ1IjoieWVzZW5pYW8iLCJhIjoiY2tlZjAyM3p5MDNnMjJycW85bmpjenFkOCJ9.TDYe7XRNP8CnAto0kLA5zA';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/light-v9', // style URL
    center: [-75.180663, 39.954125], // starting position [lng, lat]
    zoom: 12 // starting zoom
});

window.map = map;

var solar = {};

// Add the control to the map.
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    language: 'en-EN'
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
// map.addControl(
//     new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     mapboxgl: mapboxgl
//     })
// );

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

map.addControl(new mapboxgl.NavigationControl());

$.ajax({
    url: "data/Solar_test.geojson",
    type: "GET",
    dataType: "json",
    async: false,
    success: function(data) {
        console.log(data)
        solar = data;
    },
    error: function (err) {
        console.log(err);
    }
});

map.on('load', () => {
    console.log(solar)
    map.addSource('solar-roof', {
        'type': 'geojson',
        'data': solar
    });
    map.addLayer({
        'id': 'roof',
        'type': 'fill',
        'source': 'solar-roof',
        'paint': {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'Solar20_saving'],
                0,
                '#F2F12D',
                500000,
                '#EED322',
                750000,
                '#E6B71E',
                1000000,
                '#DA9C20',
                2500000,
                '#CA8323',
                5000000,
                '#B86B25',
                7500000,
                '#A25626',
                10000000,
                '#8B4225',
                25000000,
                '#723122'
                ],
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.5
            ]
                // 'fill-opacity': 0.75
            // 'fill-color': '#888888',
            // 'fill-opacity': 0.4
        },

        'filter': ['==', '$type', 'Polygon']
    });
    // When a click event occurs on a feature in the states layer,
    // open a popup at the location of the click, with description
    // HTML from the click event's properties.
    // map.on('click', 'roof', (e) => {
    //     new mapboxgl.Popup()
    //         .setLngLat(e.lngLat)
    //         .setHTML(e.features[0].properties.ADDRESS)
    //         .addTo(map);
    // });
    //
    // // Change the cursor to a pointer when
    // // the mouse is over the states layer.
    // map.on('mouseenter', 'roof', () => {
    //     map.getCanvas().style.cursor = 'pointer';
    // });
    //
    // // Change the cursor back to a pointer
    // // when it leaves the states layer.
    // map.on('mouseleave', 'roof', () => {
    //     map.getCanvas().style.cursor = '';
    // });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'roof', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

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
        popup.setLngLat(coordinates).setHTML(address).addTo(map);
    });

    map.on('mouseleave', 'roof', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});


