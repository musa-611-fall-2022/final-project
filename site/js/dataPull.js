import { createObsPointFeatures, createHotspotPointFeatures, addPointsToMap } from "./map.js";

function dataPullFailure() {
    console.log("Data pull failure");
}

function dataPullSuccess(data, map, urlType) {
    let points;
    if (urlType === 'recentObs' | urlType === 'notableObs') {
        points = createObsPointFeatures(data);
    } else if (urlType === 'hotspot') {
        points = createHotspotPointFeatures(data);
    }
    addPointsToMap(points, map);
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
    if (resp.status == 200) {
        const data = await resp.json();
        console.log("calling onSuccess");
        if (onSuccess) { onSuccess(data, map, urlType) }
    } else {
        console.log("calling onFailure");
        if (onFailure) { onFailure() }
    }
}

function buildURL(urlType) {
    // list possible request URLs
    let recentObs = "https://api.ebird.org/v2/data/obs/US-PA/recent";
    let notableObs = "https://api.ebird.org/v2/data/obs/US-PA/recent/notable";
    let hotspot = "https://api.ebird.org/v2/ref/hotspot/US-PA?fmt=json";
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
};