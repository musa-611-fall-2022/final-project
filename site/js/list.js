import { htmlToElement } from './htmlelement.js';

function showFtInList(ftToShow, seattleList) {
    seattleList.innerHTML = '';

    for (const seattle of ftToShow) {
        const html = `
            <li class="school-list-item">${seattle.properties['name']}</li>
        `;
        const li = htmlToElement(html);
        // li.addEventListener('click', () => { // ATTEMPT AT STRETCH 1 TASK
        //     schoolHighlight(li.innerText);  // ATTEMPT AT STRETCH 1 TASK
        //     }); // ATTEMPT AT STRETCH 1 TASK
        seattleList.append(li); // ATTEMPT AT STRETCH 1 TASK
    }
}

// function schoolHighlight(name) { // ATTEMPT AT STRETCH 1 TASK
//     console.log(name); // ATTEMPT AT STRETCH 1 TASK
// } // ATTEMPT AT STRETCH 1 TASK

export {
    showFtInList,
    // schoolHighlight, // ATTEMPT AT STRETCH 1 TASK
};