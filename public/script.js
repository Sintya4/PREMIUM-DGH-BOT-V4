// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");

// fetch the initial list of dreams
fetch("/api/flavors")
  .then(response => response.json()) // parse the JSON from the server
  .then(dreams => {
    return [];
  });
