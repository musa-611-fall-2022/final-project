import { htmlToElement } from "./template-tools.js";

function showStopInList(stopToShow, stopList) {
    stopList.innerHTML = '';

    for (const stop of stopToShow) {
        const html = `
            <li class="stop-list-item">${stop.properties['stopname']}.</li>
        `;
        const li = htmlToElement(html);
        stopList.append(li);
    }
}

function showFoodInList(foodToShow, foodList) {
    foodList.innerHTML = '';

    for (const food of foodToShow) {
        const html = `
            <li class="food-list-item">${food.properties['name']}.</li>
        `;
        const li = htmlToElement(html);
        foodList.append(li);
    }
}

export {
    showStopInList,
    showFoodInList,
};
