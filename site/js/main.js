fetch(`https://mobiladelphia.herokuapp.com/test-query/3`)
.then(resp => {
  if(resp.status === 200) {
    const data = resp.json();
    return data;
  } else {
    //
  }
})
.then(data => {
  console.log(data);
});

/* =================================================
Main.js deals with the actions that function on global scale,
defines global objects,
and is a coordinator of all different modules

@auther: Jie Li
@date: 12/08/2022
================================================= */

import { initMap, addBlockGroups } from "./display-map.js";

const map = initMap();

addBlockGroups(map);