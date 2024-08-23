const API_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

dropdown=document.querySelectorAll(".dropdowns select");
let button=document.querySelector("button");
let from=document.querySelector(".selectfromdropdown select")
const to=document.querySelector(".To select")
const msg=document.querySelector(".message")



window.addEventListener("load",()=>{
    updateExc();
});

for(select of dropdown){
    for(currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value= currcode;
        if(select.name==="from" && currcode==="USD"){
            newoption.selected="selected"

        }
        else if(select.name==="To"&& currcode==="INR"){
            newoption.selected="selected"
        }
        select.append(newoption);
    } 
}


dropdown.forEach(select=>{select.addEventListener("change",(evt)=>{
    update(evt.target)
})
});

const update=(element)=>{
   let currcode= element.value
   let country =countryList[currcode];
   let newSrc=`https://flagsapi.com/${country}/flat/64.png`
   let img=element.parentElement.querySelector("img")
   img.src=newSrc;
   
};




const updateExc= async()=>{
    let amount = document.querySelector("input");
    let amount_value = amount.value;
    if (amount_value === "" || amount_value < 1) {
        amount.value = "1";
    }
    

    const URL = `${API_URL}/${from.value.toLowerCase()}.json`;
  
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[from.value.toLowerCase()][to.value.toLowerCase()]; 
    console.log(rate)
    
    let finalAmount = amount_value* rate;
    console.log(finalAmount)
    msg.innerText = `${amount_value} ${from.value} = ${finalAmount} ${to.value}`;

}
button.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExc();
  


});