
function loadResearchData() {
    if(currentSlideIndex == 3) {
      fetch('data/Research.json')
      .then(resp => resp.json())
      .then(researchData => {
        researchCollection = researchData;
      })
      else if(currentSlideIndex == 9) {
        fetch('data/Research2.json')
        .then(resp => resp.json)
        .then(reserachData => {
          researchCollection = researchData;
        })
      }
    }
    
  }