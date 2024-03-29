// currency converter url
const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdowns select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg h3");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
// const input = document.querySelector(".amount #getInput");
const input = document.getElementById("getInput");


// checking the country list
for (let select of dropdowns) {
    for(currCode in countryList){
    let newOpt = document.createElement("option");
    newOpt.innerText = currCode;
    newOpt.value = currCode;
    if(select.name === "from" && currCode === "USD"){
        newOpt.selected = "selected";
    } else if(select.name === "to" && currCode === "INR"){
        newOpt.selected = "selected";
    }
    select.append(newOpt);
    }
    
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
};


// Accessing the selected values and changing images
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrcLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrcLink;
}

// Calculating the exchange rate
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;

    if(amtval === "" || amtval < 1 ){
        amtval = 1;  
        amount.value = "1";
        
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmt = amtval * rate;
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}


// accessing the amount 
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () =>{
    updateExchangeRate();
});

// input.addEventListener("input", () => {
//     updateExchangeRate();
// });



