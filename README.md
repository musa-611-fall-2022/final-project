# MUSA 611 Final Project: Atlantic Yards/Pacific Park Plans Interactive

## Team Members:

**Ben Keel, MUSA '23 Student
**
Design, Development
[https://github.com/bennkeel](https://github.com/bennkeel)

**Norman Oder, NYC Journalist 
**
Research, Editing
[Twitter](https://twitter.com/AYReport)
[His Blog](https://atlanticyardsreport.blogspot.com/)
 
## Project Summary
This data visualization takes the work Norman and I have done in designing and editing our [Atlantic Yards/Pacific Park Plans](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-0yNDDy3gcfH1t2qzJg1uiz0vn3YYhGZ9SlzxXQ7W7P909Xw1L9AEApESM2o_GQsRnQteVmkDazxke6WEEsQbr8FBuuSvfxuABTmF7SXq_EQs3eKjBcqO2sCiI3-5qf9G41mpSSWCl3gAKY7f5N5jGcXAiTMDPC4pej7X8610Edc86YZihac/s960/AYPP_Plans_221121_72.jpg)  
graphic and sorts the information into different layers of interactivity. Each building and the bar below are loaded on top of a background svg using the 
D3 JS framework, and can be fitlered between the current progress and approved plans by two buttons on the top right.

## Getting It Running
Downloading the complete folder and running an http-server from the index.html file as a base folder should work fine. "inventory.js" accesses the data
from site/data/AYPPBuildingData.csv. Change this file location and the path in "inventory.js" if necessary.
