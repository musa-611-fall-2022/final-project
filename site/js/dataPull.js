import { createObsPointFeatures, addPointsToMap } from "./map.js";

function dataPullFailure() {
    console.log("Data pull failure");
}

function dataPullSuccess(data, map) {
    addPointsToMap(createObsPointFeatures(data), map);
}

async function getData(url, onSuccess, onFailure, map) {
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
        if (onSuccess) { onSuccess(data, map) }
    } else {
        console.log("calling onFailure");
        if (onFailure) { onFailure() }
    }
}

function buildURL(urlType) {
    // list possible request URLs
    let recentObs = "https://api.ebird.org/v2/data/obs/US-PA/recent";
    let notableObs = "https://api.ebird.org/v2/data/obs/US-PA/recent/notable";
    let hotspot = "https://api.ebird.org/v2/ref/hotspot/US-PA";
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