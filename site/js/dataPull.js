import { createObsPointFeatures, addPointsToMap } from "./map.js";

function dataPullFailure() {
    console.log("Data pull failure");
}

function dataPullSuccess(data, map, requestType) {
    if (requestType === "recentObs") {
        addPointsToMap(createObsPointFeatures(data), map);
    }
}

async function getData(url, requestType, onSuccess, onFailure, map) {
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
        if (onSuccess) { onSuccess(data, map, requestType) }
    } else {
        if (onFailure) { onFailure() }
    }
}

function buildURL(urlType) {
    // list possible request URLs
    let recentObs = "https://api.ebird.org/v2/data/obs/US-PA/recent";
    let hotspot = "https://api.ebird.org/v2/ref/hotspot/US-PA";
    // return correct URL to put into getData
    if (urlType === "recentObs") {
        return recentObs;
    } else if (urlType === "hotspot") {
        return hotspot;
    }
}

export {
    getData,
    dataPullFailure,
    dataPullSuccess,
    buildURL,
};