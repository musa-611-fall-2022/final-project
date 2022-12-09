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