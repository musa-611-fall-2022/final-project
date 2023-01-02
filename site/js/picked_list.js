//display information to user when they go random

function showPickedInfo(itemToShow, domElement1, domElement2){
    const locationInfo = itemToShow.properties['address_info'];
    const text = "Congratulations! You have picked " + itemToShow.properties['name'] + " as your date location. " + itemToShow.properties['name'] + " is located at " + locationInfo['formatted_address'] + ".";
    const text2 = "More information - "+ "Menu Link: " + itemToShow.properties['menu'] + ", " + "Restaurant rating from 1-10: " + itemToShow.properties['rating'] + ", " + "To go random again, refresh the page and click the button again.";
    //console.log(text);
    //console.log(text2);
    domElement1.textContent = text;
    domElement2.textContent = text2;
}

export {
    showPickedInfo,
};