const galleryEl = document.getElementById('info');
window.galleryEl=galleryEl;




function showgalleryDataInForm(gallery) { 

    const Name = gallery.properties['name'];
    const TELnumber = gallery.properties['tel'];
    const ZIPcode = gallery.properties['zip'];
    const Website = gallery.properties['url'];
    const Address = gallery.properties['address1'];
    galleryEl.innerHTML = 'NAME:'+Name;
    galleryEl.innerHTML += '<br></br>';
    galleryEl.innerHTML += 'TEL:'+TELnumber;
    galleryEl.innerHTML += '<br></br>';
    galleryEl.innerHTML += 'ZIPCODE:'+ZIPcode;
    galleryEl.innerHTML += '<br></br>';
    galleryEl.innerHTML += 'ADDRESS:'+Address;
    galleryEl.innerHTML += '<br></br>';
    galleryEl.innerHTML += Website.link(gallery.properties['url']);

}
  export {
    showgalleryDataInForm,
  };

