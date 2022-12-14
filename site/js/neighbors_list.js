import { htmlToElement } from './template-tools.js';

let selectNeighbor = document.querySelector('#select-neighbor');

for (let i = 0; i < neighbors['features'].length; i++) {
    let name = neighbors['features'][i]['properties']['MAPNAME'];
    let name_arr = name.split(' ');

    if (name_arr.length > 1) {
        name = name_arr[0];
        for (let j = 1; j < name_arr.length; j++) {
            name += '_' + name_arr[j]

        }
    }
    const html = `
        <option value=${name}>${neighbors['features'][i]['properties']['MAPNAME']}</option>
    `;
    const opt = htmlToElement(html);
    selectNeighbor.append(opt);

}

window.neighbors = neighbors;