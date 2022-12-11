/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


var dataset = "https://opendata.arcgis.com/datasets/53b8a1c653a74c92b2de23a5d7bf04a0_0.geojson"
var datum;
var featureGroup;

var myStyle = function(feature) {
    if(feature.properties.HIGH_POVERTY === "Yes"){
        return {fillColor: 'red',
                color: 'red'};
    }
}

var page1 = {
    title: "Supermarket Access",
    content: "These neighborhoods do not have access to high-produce supply stores within a half mile walking distance.High-produce supply stores generally offer a larger amount of healthier foods, particularly fruits and vegetables. They included supermarkets, big box stores, and produce stores.",
    filter: function(feature) {return feature.properties.SUPERMARKET_ACCESS === "No"},
    style: myStyle,
    bbox:[[40.11221380317288,-75.02632141113281],[39.8870845777293,-75.22819519042969]],
}


var page2 = {
    title: "Restaurant Access",
    content: "These neighborhoods have no access to restaurants. Here the total number counted restaurants, bars, and food trucks located within a block group.",
    filter: function(feature) {return feature.properties.NON_RESIDENTIAL === "No" & feature.properties.TOTAL_RESTAURANTS < 1},
    style: myStyle,
    bbox:[[40.11221380317288,-75.02632141113281],[39.8870845777293,-75.22819519042969]],
}

var page3 = {
    title: "Very High Poverty",
    content: "These neighborhoods have high poverty rate. The neighorhoods indicated on map are block groups with 50% or more of people being below the federal poverty level.",
    filter: function(feature) {return feature.properties.PCT_POVERTY > 50},
    style: myStyle,
    bbox:[[40.11221380317288,-75.02632141113281],[39.8870845777293,-75.22819519042969]],

}
var page4 = {
    title: "Vehicle Ownership",
    content: "These neighborhoods have low vehicle availability. The ones shown on map have 30% or less population have acess to cars.",
    filter: function(feature) {return feature.properties.NON_RESIDENTIAL === "No" & feature.properties.PCT_VEHICLE_AVAILABILITY < 30},
    style: myStyle,
    bbox:[[40.11221380317288,-75.02632141113281],[39.8870845777293,-75.22819519042969]],
}


var page5={
    title: "Special Attention Neighorboods",
    content: "These neighborhoods satisfies the criteria for all previous pages. They do not have access to supermarkets or restuarnt and they have high poverty rate and low vehicle availability. We encourage the city to focus on these four neighorhoods for future development.",
    filter: function (feature) {return feature.properties.NON_RESIDENTIAL === "No" &
                                       feature.properties.PCT_VEHICLE_AVAILABILITY < 30 &
                                       feature.properties.HIGH_POVERTY === "Yes" &
                                       feature.properties.TOTAL_RESTAURANTS < 1 &
                                       feature.properties.SUPERMARKET_ACCESS === "No"},
    style: myStyle,
    bbox:[[40.02590560445986,-75.13669967651367],[39.90512749255248,-75.23866653442383]]

}


var slides = [page1, page2, page3, page4, page5];
var currentPage = 0;



var nextPage = function(){
    $('#prev').prop("disabled",false) //make sure the other button is enabled

    tearDown()
    var nextPage = currentPage + 1
    currentPage = nextPage
    console.log(currentPage)
    buildPage(datum, currentPage)

    if(currentPage === slides.length -1){
        $('#next').prop("disabled",true)
    }
}

var previousPage = function(){
    $('#next').prop("disabled",false) //make sure the other button is enabled

    tearDown()
    var prevPage = currentPage - 1
    currentPage = prevPage
    console.log(currentPage)
    buildPage(datum, currentPage)

    if(currentPage === 0){
        $('#prev').prop("disabled",true)
    }
}

//change title, change content, move to the bonding box.
var buildPage = function(data, pageId){
    //add markers / features to map
    featureGroup = L.geoJson(data, {
      style: slides[pageId].style,
      filter: slides[pageId].filter
    }).addTo(map);

    featureGroup.eachLayer(eachFeatureFunction);

    //change title and content
    $('#subtitle').text(slides[pageId].title)
    $('#content').text(slides[pageId].content)
    if(slides[pageId].bbox !== undefined){
        map.flyToBounds(slides[pageId].bbox)
    }


}

var tearDown = function(){
    //remove all ploted data in prepr for building the page with new filter
    featureGroup.remove();
}


var myStyle = function(feature) {
  return {};
};


var eachFeatureFunction = function(layer) {
    layer.bindPopup(
        'GEOID10: ' + layer.feature.properties.GEOID10 +
        '<br> Total high-produce supply stores: ' + layer.feature.properties.TOTAL_HPSS +
        '<br> Total restaurants: ' + layer.feature.properties.TOTAL_RESTAURANTS +
        '<br> Poverty percent: ' + layer.feature.properties.PCT_POVERTY )
  layer.on('click', function (event) {
    /* =====================
    The following code will run every time a layer on the map is clicked.
    Check out layer.feature to see some useful data about the layer that
    you can use in your application.
    ===================== */
    console.log(layer.feature);

    // +

  });
};


$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
      console.log(data)
      buildPage(data,0);
      $('#prev').prop("disabled",true)
      datum = data

    // quite similar to _.each

  });

});

$('#next').click(nextPage)
$('#prev').click(previousPage)
$('#close').click(function(){
    console.log('clicked')
    document.querySelector('.bg-modal').style.display="none";
})
