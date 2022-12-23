import { htmlToElement } from './template-tools.js';

let legend = document.querySelector('#legend');


function setLegend(ddval) {
    legend.innerHTML = '';
    if(ddval === 'off') {
        const html = `
        <div> <br>
        `;
        const li = htmlToElement(html);
        legend.append(li);
    }

    if(ddval === 'Zoning') {
        const html = `
        <ul>
            <li class="box RSA"> RSA </li>
            <li class="box RM-1"> RM (1,4) </li>
            <li class="box CA"> CA (2) </li> 
            <li class="box CMX1"> CMX (1, 2, 2.5) </li>
            <li class="box CMX3"> CMX (3) </li> 
            <li class="box IRMX"> IRMX </li> 
            <li class="box ICMX"> ICMX </li> 
            <li class="box I2"> I-2 </li> 
            <li class="box SPENT"> SP-ENT </li> 
            <li class="box SPPOA"> SP-PO-A </li> 
        </ul>
        `;
        const li = htmlToElement(html);
        legend.append(li);
    }



    if(ddval === 'Height') {
        const html = `
        <ul> Building Height (ft)
            <li class="box less20"> 20 or less </li>
            <li class="box l20to30"> 20 - 30 </li>
            <li class="box l30to40"> 30 - 40 </li>
            <li class="box l40to50"> 40 - 50 </li>
            <li class="box l50to100"> 50 - 100 </li>
            <li class="box l100plus"> 100 or more </li>

        </ul>
        `;
        const li = htmlToElement(html);
        legend.append(li);
    }
}

export { setLegend };