/*global Promise */
function fetchComplaintData() {
  return fetch(`./data/complaint.csv`)
    .then(resp => resp.text())
    .then(data => {
      const complaintData = Papa.parse(data, { header: true });
      window.complaintData = complaintData;
      //console.log(complaintData);
    });
}



function fetchQOLData() {
  return fetch(`./data/lifequality.csv`)
    .then(resp => resp.text())
    .then(data => {
      const qolData = Papa.parse(data, { header: true });
      window.qolData = qolData;
      //console.log(qolData);
    });
}

function fetchMiscData() {
  return fetch(`./data/miscellaneous.csv`)
    .then(resp => resp.text())
    .then(data => {
      const miscData = Papa.parse(data, { header: true });
      window.miscData = miscData;
      //console.log(miscData);
    });
}

function fetchStreetsData() {
  return fetch(`./data/streets.csv`)
    .then(resp => resp.text())
    .then(data => {
      const streetsData = Papa.parse(data, { header: true });
      window.streetsData = streetsData;
      //console.log(streetsData);
    });
}


function fetchAllData() {
  return Promise.all([
    fetchComplaintData(),
    //fetchInfoData(),
    fetchQOLData(),
    fetchMiscData(),
    fetchStreetsData(),
  ]);
}



export {
  fetchAllData,
};

