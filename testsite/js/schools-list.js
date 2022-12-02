import { htmlToElement } from './template-tools.js';

function showSchoolsInList(schoolsToShow, schoolList) {
    schoolList.innerHTML = '';
    console.log("Hi Mjumbe :D");
    for(const school of schoolsToShow) {
        const html = `
        <li class="school-list-item">${school['name']}</li>
        `;
        const li = htmlToElement(html);
        console.log(schoolList);
        schoolList.append(li);
    }
}

export {
    showSchoolsInList,
};