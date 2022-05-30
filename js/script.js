"use strict";

//global vars
let teamsData;
let slcTeams;
let divShirt, divRiders;
let sctDetails;

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
    sctDetails = document.querySelector(".details");
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
            imgRacer.onmouseover = function (){
                showRiderDetails(teamArray, this);
            };
            divRacer.addEventListener('mouseleave', () => {
                sctDetails.innerHTML = "";
            })
            divRacer.style.display = "inline-block";
            divRiders.appendChild(divRacer);
        }
}


function showRiderDetails(teamArray, e){
    let hdrName = document.createElement("h2");
    let hdrNationality = document.createElement("h2");
    let hdrAge = document.createElement("h2");
    let hdrAchievements = document.createElement("h2");

    let rider = teamArray.find(element => element.short == e.id);

    let riderName = document.createElement("p");
    riderName.textContent = rider.name;
    let riderNat = document.createElement("p");
    riderNat.textContent = rider.nationality;
    let riderAge = document.createElement("p");
    riderAge.textContent = getAge(rider.birthdate);

    let riderAchievements = document.createElement("p"); 
    
    let riderAchievementValue = rider["achievements"];
    hdrName.textContent = "Name";
    hdrNationality.textContent = "Nationality";
    hdrAge.textContent = "Age";
    
    

    sctDetails.appendChild(hdrName);
    sctDetails.appendChild(riderName);
    sctDetails.appendChild(hdrNationality);
    sctDetails.appendChild(riderNat);
    sctDetails.appendChild(hdrAge);
    sctDetails.appendChild(riderAge);
    sctDetails.appendChild(hdrAchievements);

    if(typeof(riderAchievementValue) === "object"){
        let race = document.createElement("p");
        race.textContent = riderAchievementValue;
        race.classList.add("achievementStyle");
        sctDetails.appendChild(race);
    }else if(Array.isArray(riderAchievementValue)){
        let divRaces = document.createElement("div");
        
        for (let key in riderAchievementValue){
            {
                let container = document.createElement("div");
                let race = document.createElement("p");
                container.textContent = riderAchievementValue[key];
                //container.appendChild(container);
                divRaces.appendChild(container);
            }
        }
        divRaces.array.forEach(element => {element.classList.add("achievementStyle");
            
        });
        sctDetails.appendChild(divRaces);

    }else{
        let race = document.createElement("p");
        riderAchievementValue = "No races won yet!";
        race.textContent = riderAchievementValue;
        race.classList.add("achievementStyleNone");

        sctDetails.appendChild(race);
    }

}

function getAge(birthDateString){
    let today = new Date();
    let birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

