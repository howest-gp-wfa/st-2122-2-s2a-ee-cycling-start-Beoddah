"use strict";

//global vars
let teamsData;
let slcTeams;
let divShirt, divRiders;

window.addEventListener('load',initialize);



function initialize(){
    loadData();
    bindElements();
    addEvents();
}

async function loadData() {
    fetch("https://howest-gp-wfa.github.io/st-2122-2-s2a-ee-cycling-start-Beoddah/api/data.json")
        .then(function(resp) {
            return resp.json();
        })
            .then (function(data) {
                teamsData = data;
                loadSlcTeams();
                slcTeams.selectedIndex = -1;

            })
        .catch(error => console.log(error));
}

function bindElements(){
    slcTeams = document.querySelector("#slcTeams");
    divShirt = document.querySelector("#divShirt");
    divRiders = document.querySelector("#divRiders");
}

function loadSlcTeams(){
    for(let key in teamsData)
        slcTeams.add(new Option(key, key));
}

function addEvents(){
    slcTeams.addEventListener('change', () =>{
        let currentTeam = slcTeams.options[slcTeams.selectedIndex].text;
        showShirt(currentTeam);
        showRiders(currentTeam);
    });
}

function showShirt(currentTeam){
    divShirt.innerHTML = "";
    let imgShirt = document.createElement("img");
    console.log(currentTeam);

    imgShirt.src = `/img/Shirts/${teamsData[currentTeam]["shirt"]}`;
    divShirt.appendChild(imgShirt);
}

function showRiders(currentTeam){
    divRiders.innerHTML = "";
    let teamArray = teamsData[currentTeam]["riders"];
    
    for(let i = 0; i < teamArray.length; i++){
            let divRacer = document.createElement("div");
            console.log(i["name"]);
            let imgRacer = document.createElement("img");
            let hdrName = document.createElement("p");
            imgRacer.src = `/img/Riders/${teamArray[i]["image"]}`;
            imgRacer.setAttribute("id", teamArray[i]["short"])
            hdrName.textContent = teamArray[i]["name"]
            divRacer.appendChild(imgRacer);
            divRacer.appendChild(hdrName);
            divRiders.appendChild(divRacer);
            divRacer.addEventListener('mouseover', showRiderDetails);
        }
}


function showRiderDetails(){
    
}