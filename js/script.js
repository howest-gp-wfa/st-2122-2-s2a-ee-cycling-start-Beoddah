"use strict";

//global vars
let teamsData;
let slcTeams;

window.addEventListener('load',initialize);



function initialize(){
    loadData();
    bindElements();
}

async function loadData() {
    fetch("https://howest-gp-wfa.github.io/st-2122-2-s2a-ee-cycling-start-Beoddah/api/data.json")
        .then(function(resp) {
            return resp.json();
        })
            .then (function(data) {
                teamsData = data;
                loadSlcTeams();
                //bindElements();
            })
        .catch(error => console.log(error));
}

function bindElements(){
    slcTeams = document.querySelector("#slcTeams");
}

function loadSlcTeams(){
    for(let key in teamsData)
        slcTeams.add(new Option(key, key));
}