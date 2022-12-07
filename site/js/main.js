const testEl = document.querySelector("#test");
console.log(testEl);

testEl.addEventListener("click", ( ) => {
  alert("Test");
});

fetch(`https://mobiladelphia.herokuapp.com/test-query`)
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