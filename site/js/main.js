import { initializeMap } from "./map.js";
import { getData, dataPullFailure, dataPullSuccess, buildURL } from "./dataPull.js";

// setup

// initialize map
let map = initializeMap();

// on startup, always load current recent observation data
let url = buildURL("recentObs");
getData(url, dataPullSuccess, dataPullFailure, map);

