//sets onclick of the search button
window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};
	
let displayTerm = "";

//control selections
let alphabetically = true;
let searchType = true;

const prefix = "ban8083-";

//local storage consts
const searchKey = prefix + "search";
const storedSearch = localStorage.getItem(searchKey);
//
const typeKey = prefix + "type";
const storedType = localStorage.getItem(typeKey);
//
const alphaKey = prefix + "alphabetically";
const storedAlpha = localStorage.getItem(alphaKey);

//sets the local storage search term
document.addEventListener("DOMContentLoaded", function () {
    if (storedSearch){
        document.querySelector("#searchterm").value = storedSearch;
    } else {
        document.querySelector("#searchterm").value = "USA";
    }

    //stored info as ints due to issues with booleans. converted from ints to booleans.
    if (storedType != null){
        document.querySelector("#search-type").value = storedType;
        if(storedType == 0)
            searchType = true;
        else
            searchType = false;
    } else {
        searchType = true;
        document.querySelector("#search-type").value = 0;
    }

    if (storedAlpha){
        document.querySelector("#alphabetically").value = storedAlpha;
        if(storedAlpha == 0)
            alphabetically = true;
        else
            alphabetically = false;
    } else {
        alphabetically = true;
        document.querySelector("#alphabetically").value = 0;
    }

    searchButtonClicked();
});

function searchButtonClicked(){
    console.log("searchButtonClicked() called");
    
    let REST_URL = "";

    //checks if the name or capital is being searched
    if(searchType)
        REST_URL = "https://restcountries.com/v3.1/name/";
    else
        REST_URL = "https://restcountries.com/v3.1/capital/";

    let url = REST_URL;

    let term = document.querySelector("#searchterm").value;

    //sets local storage
    localStorage.setItem(searchKey, term);

    displayTerm = term;

    term = term.trim();

    term = encodeURIComponent(term);

    if(term.length < 1) return;
        url += term;

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

    //tells user if the search is invalid
    if(!results.length || results.length == 0){
        document.querySelector("#result-count").innerHTML = "There are no results for the term you searched!";
        document.querySelector("#content").innerHTML = "";
        return;
    }

    let full = "";

    //sorts alphabetically depending on the direction set and whether its by country name or capital
    if(alphabetically){
        if(searchType){
            results.sort(function(a, b) {
                var textA = a.name.common.toUpperCase();
                var textB = b.name.common.toUpperCase();
                return textA.localeCompare(textB);
            });
        }
        else{
            results.sort(function(a, b) {
                var textA = a.capital[0].toUpperCase();
                var textB = b.capital[0].toUpperCase();
                return textA.localeCompare(textB);
            });
        }        
    }
    else{
        if(searchType){
            results.sort(function(b, a) {
                var textA = a.name.common.toUpperCase();
                var textB = b.name.common.toUpperCase();
                return textA.localeCompare(textB);
            });
        }
        else{
            results.sort(function(b, a) {
                var textA = a.capital[0].toUpperCase();
                var textB = b.capital[0].toUpperCase();
                return textA.localeCompare(textB);
            });
        }
    }
    
    //creates each box based on search results
    for(let i = 0; i < results.length; i++){
        let result = results[i];

        let smallURL = result.flags.png;
        
        if (!smallURL) 
            smallURL = "images/no-image-found.png";

        let line = `<div class='result'><div id="image"><img src='${smallURL}' title='${result.name.common}'></div>`;
        
        if(searchType){
            line += `<div id="common"><b><u>${result.name.common}</u></b></div>` + '<br>';
        }
        else{
            line += `<div id="common">${result.name.common}</div>` + '<br>';
        }
        

        if(result.capital != null)
            if(searchType){
                line += result.capital + '</div>';
            }
            else{
                line += "<b><u>" + result.capital + '</u></b></div>';
            }
        else
            line += '</div>';
        
        full += line;
    }

    document.querySelector("#content").innerHTML = full;
}

function dataError(e){
    console.log("An error occurred");
}

//detects a change in the alphabetical sort type
function alphabeticallyChange(){
    console.log("alphabetically change detected");

    const option = document.querySelector("#alphabetically").value;

    if(option == 0)
        alphabetically = true;
    if(option == 1)
        alphabetically = false;

    localStorage.setItem(alphaKey, option);

    searchButtonClicked();
}

//detects a change in the search sort type
function searchTypeChange(){
    console.log("searchType change detected");

    const option = document.querySelector("#search-type").value;

    if(option == 0)
        searchType = true;
    if(option == 1)
        searchType = false;

    localStorage.setItem(typeKey, option);

    searchButtonClicked();
}