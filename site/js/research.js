let galleryInput = document.querySelector('#researchbox');
window.galleryInput = galleryInput;
let galleryButton=document.querySelector('#researchbutton');
window.galleryButton = galleryButton;
export let galleries;
export let gallerydata;
import{ updateselectedgalleryPositionOn }from'./main.js';

gallerydata =  $.parseJSON($.ajax({
    url: "data/New York City Art Galleries.geojson",
    dataType: "json",
    async: false,
}).responseText);

function makegalleryFeatureCollection() {
    /*const resp =fetch('data/New York City Art Galleries.geojson');
    if (resp.status === 200) {
     gallerydata =resp.json();
    } */
    // Construct a geojson empty frame
    galleries = {
      type: "FeatureCollection",
      features: [],
    };

    // Write into geojson
    for(let i = 0; i < 917; i++) {

            galleries.features.push( {
            "type": "Feature",
           "geometry":gallerydata.features[i].geometry['coordinates'],

            "properties": {
                "name": gallerydata.features[i].properties['name'],
                "tel": gallerydata.features[i].properties['tel'],
                "zip": gallerydata.features[i].properties['zip'],
                "url":gallerydata.features[i].properties['url'],
                "address":gallerydata.features[i].properties['address1'],
            },
          });
    }
    return galleries;
  }
  makegalleryFeatureCollection();



  //select the right gallery in the file by name
  function getFilteredgallerys(){
    //Filter through school name
    const text = galleryInput.value;
    let filteredgalleries;
for(let i = 0; i < 917; i++){
    if(galleries.features[i].properties['name']==text){
    filteredgalleries = galleries.features[i];
    }
}
return filteredgalleries;
}



// show information to the informationbox, and hightlight the point in the map
function showinputtedgalleryinfo(){
    const filteredgalleries=getFilteredgallerys();

    if(filteredgalleries){
    const Name = filteredgalleries.properties['name'];
    const TELnumber = filteredgalleries.properties['tel'];
    const ZIPcode = filteredgalleries.properties['zip'];
    const Website = filteredgalleries.properties['url'];
    const Address = filteredgalleries.properties['address'];
    galleryEl.innerHTML = 'NAME:'+Name;
    galleryEl.innerHTML += '<br></br>';
    galleryEl.innerHTML += 'TEL:'+TELnumber;
    galleryEl.innerHTML += '<br></br>';
    galleryEl.innerHTML += 'ZIPCODE:'+ZIPcode;
    galleryEl.innerHTML += '<br></br>';
    galleryEl.innerHTML += 'ADDRESS:'+Address;
    galleryEl.innerHTML += '<br></br>';
    galleryEl.innerHTML += Website.link(filteredgalleries.properties['url']);
    updateselectedgalleryPositionOn(filteredgalleries);

}
    else{
        galleryEl.innerHTML ='Opps, you inputted a wrong name!';
    }
}


galleryButton.addEventListener("click", ()=>{
    showinputtedgalleryinfo();

});



