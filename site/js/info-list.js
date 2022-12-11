import { htmlToElement } from './template-tools.js';

let info_List = document.querySelector('#solar-info');

$("#select-neighbor").change(function(){
    info_List.innerHTML = '';
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

            const li1 = `
                <li style="margin: 50px 0">Annual Solar Radiation: ${neighbors['features'][i]['properties']['Solar_Rad__sum']} kWh</li>
            `;
            const li2 = `
                <li style="margin: 50px 0">Area available for installing solar panel: ${neighbors['features'][i]['properties']['Area_m2_sum']} m2</li>
            `;
            const li3 = `
                <li style="margin: 50px 0">Estimate net profits over 20 years: ${neighbors['features'][i]['properties']['Solar20_sa_sum']} $</li>
            `;
            const li4 = `
                <li style="margin: 50px 0">Potential environmental impacts: Reduced Co2 ${neighbors['features'][i]['properties']['CO2_save_sum']}; Car saved ${neighbors['features'][i]['properties']['Car_save_sum']}; Tree seedings ${neighbors['features'][i]['properties']['Tree_seedi_sum']}</li>
            `;
            const opt1 = htmlToElement(li1);
            const opt2 = htmlToElement(li2);
            const opt3 = htmlToElement(li3);
            const opt4 = htmlToElement(li4);
            info_List.append(opt1);
            info_List.append(opt2);
            info_List.append(opt3);
            info_List.append(opt4);
        }
    }
});
