const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
const currencyLinks = document.querySelectorAll("nav a");
const currencyDescription = document.querySelector("section p");

console.log(currencyDescription);
const priceHeading = document.querySelector("section h1");
let currency = "USD";

// make a function to grab data from coindesk
const checkPrice = function() {
  fetch(url)
    .then(response => response.json())
    .then(jsonData => {
      priceHeading.innerText = jsonData.bpi[currency].rate_float.toFixed(1);
    });
};

// run on load
checkPrice();

// loop over each currency and add a click event
currencyLinks.forEach(link => {
  link.addEventListener("click", function(link) {
    currency = this.getAttribute("data-currency");
    checkPrice();
    currencyDescription.innerText = currency + " per BTC";
    currencyLinks.forEach(link => link.classList.remove("selected"));
    this.classList.add("selected");
  });
});

// check the price every 60 seconds
setInterval(function() {
  checkPrice();
}, 60000);
