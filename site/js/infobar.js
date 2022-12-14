import { htmlToElement } from './template-tools.js';
export { highlightFeature };


function showParcelDeets(parcel) {
    parcelList.innerHTML = '';
    const html = `
    <div> Address: ${parcel.addy} <br>
    Owner: ${parcel.owner}  <br>
    Land Use: ${parcel.bcType} <br>
    Zoning: ${parcel.zoningCode} <br>
    Height: ${parcel.height}  </div>

    `;
    const li = htmlToElement(html);
    parcelList.append(li);
}


function highlightFeature(e) {
    e.target.setStyle({ weight: 5, color: "yellow" });
    showParcelDeets(e.target);
}


