/*
 * @Author: miaomiao612 dddoctorr612@gmail.com
 * @Date: 2022-12-07 05:59:18
 * @LastEditors: miaomiao612 dddoctorr612@gmail.com
 * @LastEditTime: 2022-12-07 05:59:22
 * @FilePath: \final-project\site\js\managedata.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {  showVotersOnMap }  from './map.js';
//convert csv to json and display on map
function csvtojson ( map, votersToShow, onFailure){
    fetch(`data/voters_lists/${votersToShow}.csv`)

    .then(response => {
        if (response.status === 200) {
        const data = response.text();
        return data;
        } else {
        alert('Oh no, I failed to download the data.');
        if (onFailure) { onFailure() }
        }
    })
    .then(v => Papa.parse(v, { delimiter:"," }))
    .catch(err => console.log(err))
    .then(result => {
        let v = result.data.slice(1, result.data.length-1);
        return v;
    })
    //now we get json version data of a certain listNO.

    .then(result => showVotersOnMap(result,map))


    }

export{
    csvtojson,
};