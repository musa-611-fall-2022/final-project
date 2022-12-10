/*
 * @Author: miaomiao612 dddoctorr612@gmail.com
 * @Date: 2022-12-10 06:41:25
 * @LastEditors: miaomiao612 dddoctorr612@gmail.com
 * @LastEditTime: 2022-12-10 09:19:01
 * @FilePath: \final-project\site\js\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { initMap, showFonMap } from './map.js';


const map = initMap();

const search = document.getElementById('showlocation');
search.addEventListener('click', () => {
  // Get the value of the name element
const facilities = document.getElementById('name').value;
showFonMap(map,facilities);});





