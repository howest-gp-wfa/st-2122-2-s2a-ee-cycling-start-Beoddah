"use strict";

//global vars
let teamsData;
let slcTeams;
let divShirt;

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
}

function loadSlcTeams(){
    for(let key in teamsData)
        slcTeams.add(new Option(key, key));
}

function addEvents(){
    slcTeams.addEventListener('change', showShirt);
}

function showShirt(){
    divShirt.innerHTML = "";
    let imgShirt = document.createElement("img");
    let currentTeam = slcTeams.options[slcTeams.selectedIndex].text;
    console.log(currentTeam);

    imgShirt.src = `/img/Shirts/${teamsData[currentTeam]["shirt"]}`;
    divShirt.appendChild(imgShirt);
}
