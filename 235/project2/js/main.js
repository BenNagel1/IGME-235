window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};
	
let displayTerm = "";

let alphabetically = true;
let searchType = true;

const prefix = "ban8083-";
const searchKey = prefix + "search";
const storedSearch = localStorage.getItem(searchKey);

document.addEventListener("DOMContentLoaded", function () {
    if (storedSearch){
        document.querySelector("#searchterm").value = storedSearch;
        searchButtonClicked();
    } else {
        document.querySelector("#searchterm").value = "USA";
    }
});

function searchButtonClicked(){
    console.log("searchButtonClicked() called");
    
    let REST_URL = "";

    if(searchType)
        REST_URL = "https://restcountries.com/v3.1/name/";
    else
        REST_URL = "https://restcountries.com/v3.1/capital/";

    let url = REST_URL;

    let term = document.querySelector("#searchterm").value;

    localStorage.setItem(searchKey, term);

    displayTerm = term;

    term = term.trim();

    term = encodeURIComponent(term);

    if(term.length < 1) return;
        url += term;

    document.querySelector("#status").innerHTML = "<b> Searching for '" + displayTerm + "' </b>";

    console.log(url);

    getData(url);
}

function getData(url){
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;
    xhr.open("GET", url)
    xhr.send();
}

function dataLoaded(e){
    let xhr = e.target;

    let results = JSON.parse(xhr.responseText);

    let title = "<p><i>Displaying " + results.length + " result(s) for '" + displayTerm + "'</i></p>";

    document.querySelector("#result-count").innerHTML = title;

    if(!results.length || results.length == 0){
        document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm + "'</b>"
        document.querySelector("#result-count").innerHTML = "There are no results for the term you searched!";
        document.querySelector("#content").innerHTML = "";
        return;
    }

    let full = "";

    if(alphabetically){
        results.sort(function(a, b) {
            var textA = a.name.common.toUpperCase();
            var textB = b.name.common.toUpperCase();
            return textA.localeCompare(textB);
        });
    }
    else{
        results.sort(function(b, a) {
            var textA = a.name.common.toUpperCase();
            var textB = b.name.common.toUpperCase();
            return textA.localeCompare(textB);
        });
    }
    
    for(let i = 0; i < results.length; i++){
        let result = results[i];

        let smallURL = result.flags.png;
        
        if (!smallURL) 
            smallURL = "images/no-image-found.png";

        let line = `<div class='result'><div id="image"><img src='${smallURL}' title='${result.name.common}'></div>`;
        line += `<div id="common"><b><u>${result.name.common}</u></b></div>` + '<br>';

        if(result.capital != null)
            line += result.capital + '</div>';
        else
            line += '</div>';
        
        full += line;
    }

    document.querySelector("#content").innerHTML = full;
}

function dataError(e){
    console.log("An error occurred");
}

function alphabeticallyChange(){
    console.log("alphabetically change detected");

    const option = document.querySelector("#alphabetically").value;

    if(option == 0)
        alphabetically = true;
    if(option == 1)
        alphabetically = false;

    searchButtonClicked();
}

function searchTypeChange(){
    console.log("searchType change detected");

    const option = document.querySelector("#search-type").value;

    if(option == 0)
        searchType = true;
    if(option == 1)
        searchType = false;

    searchButtonClicked();
}