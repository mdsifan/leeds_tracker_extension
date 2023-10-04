let myLeads = [];
// //Turn the myLeads string into array
// myLeads = JSON.parse(myLeads);

// //Push a new value to the array
// myLeads.push("www.sifan2.com");

// //Turn the array to string again
// myLeads = JSON.stringify(myLeads);

// //console.log the string using typeof to verify that it's a string
// console.log(typeof myLeads); it show string

const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');
const ulEl = document.getElementById('ul-el');

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function render(leads) {
    let listItems = "";
    leads.forEach(function (e) {
        listItems +=
            `
           <li>
                <a target='_blank' href='${e}'>
                     ${e} 
                </a>
           </li>
        `
    })
    ulEl.innerHTML = listItems;
}

tabBtn.addEventListener("click", function () {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })

})

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    render(myLeads);
})

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})


