"use strict";

//global vars
let teamsData;


window.addEventListener('load',initialize);



function initialize(){
    loadData();
}

async function loadData() {
    fetch("https://howest-gp-wfa.github.io/st-2122-2-s2a-ee-cycling-start-Beoddah/api/data.json")
        .then(function(resp) {
            return resp.json();
        })
            .then (function(data) {
                teamsData = data;
            })
        .catch(error => console.log(error));


}       