window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};
	
let displayTerm = "";

let alphabetically = "true";
let country = "true";

function searchButtonClicked(){
    console.log("searchButtonClicked() called");
    
    const REST_URL = "https://restcountries.com/v3.1/name/";

    let url = REST_URL;

    let term = document.querySelector("#searchterm").value;
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

    console.log(results);
    console.log(results[0].name.official);

    let title = "<p><i>Here are " + results.length + " results for '" + displayTerm + "'</i></p>";

    document.querySelector("#result-count").innerHTML = title;

    let full = "";

    if(alphabetically == "true"){
        results.sort(function(a, b) {
            var textA = a.name.common.toUpperCase();
            var textB = b.name.common.toUpperCase();
            return textA.localeCompare(textB); //should return a value -1, 0, or 1 and sort accordingly
        });
    }
    else{
        results.sort(function(b, a) {
            var textA = a.name.common.toUpperCase();
            var textB = b.name.common.toUpperCase();
            return textA.localeCompare(textB); //should return a value -1, 0, or 1 and sort accordingly
        });
    }
    
    for(let i = 0; i < results.length; i++){
        let result = results[i];

        let smallURL = result.flags.png;
        
        if (!smallURL) 
            smallURL = "images/no-image-found.png";

        let line = `<div class='result'><img src='${smallURL}' title='${result.name.common}'>`;
        line += result.name.common + '</div>';
        
        full += line;
    }

    document.querySelector("#content").innerHTML = full;
}

function dataError(e){
    console.log("An error occurred");
}

function alphabeticallyChange(){
    console.log("change detected");

    const option = document.querySelector("#alphabetically").value;

    if(option == 0)
        alphabetically = "true";
    if(option == 1)
        alphabetically = "false";

    searchButtonClicked();
}