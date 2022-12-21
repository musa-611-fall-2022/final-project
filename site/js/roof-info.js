import { htmlToElement } from './template-tools.js';

let roof_info = document.querySelector('#roof-info');

let equation = document.querySelector('#roof-equation');

// let carbon = document.querySelector('#roof-carbon');
//
// let car = document.querySelector('#roof-car');
//
// let tree = document.querySelector('#roof-tree');

let current_roof = {};

window.current_roof = current_roof;

$("#geocoder-roof").change(function(){
    let address;
    console.log(geocoder_roof['inputString']);
    if (clicked_address !== '') {
        address = clicked_address;
    }
    else {
        address = JSON.parse(geocoder_roof['lastSelected'])['place_name'];
    }

    let street = address.split(',')[0].toUpperCase();
    street = street.replaceAll('EAST', 'E');
    street = street.replaceAll('NORTH', 'NORTH');
    street = street.replaceAll('WEST', 'W');
    street = street.replaceAll('SOUTH', 'S');
    street = street.replaceAll('STREET', 'ST');
    street = street.replaceAll('ROOD', 'RD');
    street = street.replaceAll('AVENUE', 'AVE');

    let flag = 0;

    for (let i = 0; i < solar['features'].length; i++) {
        if (street === solar['features'][i]['properties']['ADDRESS']) {
            flag = 1;
            $("#roof-panel").css("display", "block");
            $("#impact").css("display", "block");

            roof_info.innerHTML = '';
            equation.innerHTML = '';

            current_roof = solar['features'][i];
            const li1 = `
                <li style="list-style: none; padding: 15px 30px 15px 80px; position: relative; height: 33%; width: 100%">
                    <div class="icon-sun panel-icon"></div>
                        <div class="panel-text">
                             ${parseFloat(solar['features'][i]['properties']['Solar_Rad_']).toFixed(2)} MWh of usable sunlight per year
                        </div>
                        <div class="panel-caption">
                            Based on day-to-day analysis of weather patterns
                        </div>
                </li>
            `;
            const divide= `
                <div class="dividing-line"></div>
            `
            const li2 = `
                <li style="list-style: none; padding: 15px 30px 0px 80px; position: relative; height: 33%; width: 100%">
                    <div class="icon-area panel-icon"></div>
                    <div class="panel-text">
                        ${parseFloat(solar['features'][i]['properties']['Area_m2']).toFixed(2)} sq meter available for solar panels
                    </div>
                    <div class="panel-caption">
                        Based on 3D modeling of your roof and nearby trees
                    </div>
                </li>
            `;
            const li3 = `
                <li style="list-style: none; padding: 15px 30px 0px 80px; position: relative; height: 33%; width: 100%">
                     <div class="icon-money panel-icon"></div>
                     <div class="panel-text">
                         $${(parseFloat(solar['features'][i]['properties']['Solar20_sa'] * 0.671592)).toFixed(2)} savings
                     </div>
                     <div class="panel-caption">
                         Estimated net savings for your roof over 20 years
                     </div>
                </li>
            `;

            const opt1 = htmlToElement(li1);
            const opt2 = htmlToElement(divide);
            const opt22 = htmlToElement(divide);
            const opt3 = htmlToElement(li2);
            const optli3 = htmlToElement(li3);
            roof_info.append(opt1);
            roof_info.append(opt2);
            roof_info.append(opt3);
            roof_info.append(opt22);
            roof_info.append(optli3);

            const carbon_info = `
                <div class="carbon">
                    <div class="icon-carbon eq-icon"></div>
                    <span style="position:absolute; left: 43%; font-size: 15px; width: 60%; top:15%; font-weight: bold">Carbon dioxide</span>
                    <span style="position:absolute; left: 47%; font-size: 30px; width: 80%; top:35%; font-weight: bold; text-align: left">${(parseFloat(solar['features'][i]['properties']['CO2_save']) * 0.355595).toFixed(2)}</span>
                    <span style="position:absolute; left: 42%; font-size: 10px; width: 40%; top:75%;">metric tons</span>
                </div>
            `;
            const place_eq = `
                <span class="place-eq">=</span>
            `;
            const  place_car = `
                <span class="place-car">=</span>
            `;
            const car_info = `
                <div class="cars">
                    <div class="icon-car eq-icon"></div>
                    <span style="position:absolute; left: 43%; font-size: 15px; width: 60%; top:15%; font-weight: bold">Passenger cars</span>
                    <span style="position:absolute; left: 47%; font-size: 30px; width: 80%; top:35%; font-weight: bold; text-align: left">${(parseFloat(solar['features'][i]['properties']['Car_save']) * 0.354546).toFixed(2)}</span>
                    <span style="position:absolute; left: 42%; font-size: 10px; width: 70%; top:75%;">taken off the road for 1 yr</span>
                </div>
            `;
            const tree_info = `
                <div class="tree">
                    <div class="icon-tree eq-icon"></div>
                    <span style="position:absolute; left: 40%; font-size: 15px; width: 60%; top:15%; font-weight: bold">Tree seedlings</span>
                    <span style="position:absolute; left: 44%; font-size: 30px; width: 80%; top:35%; font-weight: bold; text-align: left">${(parseFloat(solar['features'][i]['properties']['Tree_seedi']) * 0.96874).toFixed(2)}</span>
                    <span style="position:absolute; left: 42%; font-size: 10px; width: 50%; top:75%;">grown for 10 yrs</span>
                </div>
            `;
            const opt7 = htmlToElement(place_eq);
            const opt8 = htmlToElement(place_car);

            const opt4 = htmlToElement(carbon_info);
            const opt5 = htmlToElement(car_info);
            const opt6 = htmlToElement(tree_info);
            equation.append(opt4);
            equation.append(opt7);
            equation.append(opt5);
            equation.append(opt8);
            equation.append(opt6);

        }
    }

    if (flag === 0) {
        alert("Sorry, failed to find the address. Please type another");
    }
});



