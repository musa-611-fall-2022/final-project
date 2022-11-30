function readCSV(onSuccess, onFailure) {
    fetch('data/AYPPBuildingData.csv')
    .then(resp => {
        if (resp.status === 200){
            return resp.text();
        } else {
            alert('Failure to Load Data');
            if (onFailure) {onFailure()}
        }
    })
    .then(text => {
        const data = Papa.parse(text, { header: true });
        console.log(data);
        return data;
    })
    .then(onSuccess);
}

export {
    readCSV,
};