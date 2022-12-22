import { htmlToElement } from './template-tools.js';

let neighbor_info = document.querySelector('#neighbor-info');

let equation = document.querySelector('#neighbor-equation');

// let carbon = document.querySelector('#neighbor-carbon');
//
// let car = document.querySelector('#neighbor-car');
//
// let tree = document.querySelector('#neighbor-tree');

$("#select-neighbor").change(function(){
    let selectVal = $("#select-neighbor option:selected").val();
    let name_arr = selectVal.split('_');
    if (name_arr.length > 1) {
        selectVal = name_arr[0];
        for (let j = 1; j < name_arr.length; j++) {
            selectVal += ' ' + name_arr[j];
        }
    }
    for (let i = 0; i < neighbors['features'].length; i++) {
        if (neighbors['features'][i]['properties']['MAPNAME'] === selectVal) {
            $("#neighbor-panel").css("display", "block");
            $("#neighbor-impact").css("display", "block");
            neighbor_info.innerHTML = '';
            equation.innerHTML = '';

            const li1 = `
                <li style="list-style: none; padding: 15px 30px 15px 80px; position: relative; height: 33%; width: 100%">
                    <div class="icon-sun panel-icon"></div>
                        <div class="panel-text">
                             ${parseFloat(neighbors['features'][i]['properties']['Solar_Rad__sum']).toFixed(2)} MWh of usable sunlight per year
                        </div>
                        <div class="panel-caption">
                            Based on day-to-day analysis of weather patterns
                        </div>
                </li>
            `;
            const divide= `
                <div class="dividing-line"></div>
            `;
            const li2 = `
                <li style="list-style: none; padding: 15px 30px 0px 80px; position: relative; height: 33%; width: 100%">
                    <div class="icon-area panel-icon"></div>
                    <div class="panel-text">
                        ${parseFloat(neighbors['features'][i]['properties']['Area_m2_sum']).toFixed(2)} sq meter available for solar panels
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
                         $${(parseFloat(neighbors['features'][i]['properties']['Solar20_sa_sum']) * 0.671592).toFixed(2)} savings
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
            neighbor_info.append(opt1);
            neighbor_info.append(opt2);
            neighbor_info.append(opt3);
            neighbor_info.append(opt22);
            neighbor_info.append(optli3);

            const carbon_info = `
                <div class="carbon">
                    <div class="icon-carbon eq-icon"></div>
                    <span style="position:absolute; left: 43%; font-size: 15px; width: 60%; top:15%; font-weight: bold">Carbon dioxide</span>
                    <span style="position:absolute; left: 47%; font-size: 20px; width: 80%; top:37%; font-weight: bold; text-align: left">${(parseFloat(neighbors['features'][i]['properties']['CO2_save_sum']) * 0.355595).toFixed(2)}</span>
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
                    <span style="position:absolute; left: 47%; font-size: 20px; width: 80%; top:37%; font-weight: bold; text-align: left">${(parseFloat(neighbors['features'][i]['properties']['Car_save_sum']) * 0.354546).toFixed(2)}</span>
                    <span style="position:absolute; left: 42%; font-size: 10px; width: 70%; top:75%;">taken off the road for 1 yr</span>
                </div>
            `;
            const tree_info = `
                <div class="tree">
                    <div class="icon-tree eq-icon"></div>
                    <span style="position:absolute; left: 40%; font-size: 15px; width: 60%; top:15%; font-weight: bold">Tree seedlings</span>
                    <span style="position:absolute; left: 44%; font-size: 20px; width: 80%; top:37%; font-weight: bold; text-align: left">${(parseFloat(neighbors['features'][i]['properties']['Tree_seedi_sum']) * 0.96874).toFixed(2)}</span>
                    <span style="position:absolute; left: 42%; font-size: 10px; width: 50%; top:75%;">grown for 10 yrs</span>
                </div>
            `;
            const carbon_opt = htmlToElement(carbon_info);
            const eq_opt = htmlToElement(place_eq);
            const eq_car_opt = htmlToElement(place_car);
            const car_opt = htmlToElement(car_info);
            const tree_opt = htmlToElement(tree_info);
            equation.append(carbon_opt);
            equation.append(eq_opt);
            equation.append(eq_car_opt);
            equation.append(car_opt);
            equation.append(tree_opt);
        }
    }
});
