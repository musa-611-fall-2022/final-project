import { createObsPointFeatures, createHotspotPointFeatures, addPointsToMap } from "./map.js";

async function getSpeciesList() {
    let myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken", "ol5p0ugs0k6o");

    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
    };

    const resp = await fetch("https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json", requestOptions);
    if (resp.status === 200) {
        const data = await resp.json();
        return data;
    } else {
        console.log("Failed to pull species list");
    }
}

function dataPullFailure() {
    console.log("Data pull failure");
}

function dataPullSuccess(data, map, urlType) {
    let points;
    if (urlType === 'recentObs' | urlType === 'notableObs' | urlType === 'birdObs') {
        points = createObsPointFeatures(data);
    } else if (urlType === 'hotspot') {
        points = createHotspotPointFeatures(data);
    }
    addPointsToMap(points, map);
    return points;
}

async function getData(url, onSuccess, onFailure, map, urlType) {
    let myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken", "ol5p0ugs0k6o");

    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
    };

    const resp = await fetch(url, requestOptions);
    console.log(resp);
    if (resp.status === 200) {
        const data = await resp.json();
        console.log("calling onSuccess");
        if (onSuccess) { return onSuccess(data, map, urlType) }
    } else {
        console.log("calling onFailure");
        if (onFailure) { onFailure() }
    }
}

function buildURL(urlType) {
    // list possible request URLs
    let recentObs = "https://api.ebird.org/v2/data/obs/geo/recent?lat=39.952&lng=-75.164&back=30&dist=50";
    let notableObs = "https://api.ebird.org/v2/data/obs/geo/recent/notable?lat=39.952&lng=-75.164&back=30&dist=50";
    let hotspot = "https://api.ebird.org/v2/ref/hotspot/geo?lat=39.952&lng=-75.164&fmt=json&back=30&dist=50";
    // return correct URL to put into getData
    if (urlType === "recentObs") {
        return recentObs;
    } else if (urlType === "hotspot") {
        return hotspot;
    } else if (urlType === "notableObs") {
        return notableObs;
    } else {
        return recentObs;
    }
}

export {
    getData,
    dataPullFailure,
    dataPullSuccess,
    buildURL,
    getSpeciesList,
};