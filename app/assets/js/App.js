//  TODO:
// - make pages all a class to query them together.
// - get users location with geoLocation API
// - use Google Maps API to display map with hits
// - use local storage to save hits
// - move hits json to supabase
// - start moving functions to inidividual files and import here

// dev stuff
import 'normalize.css'
import '../css/styles.css'

if (module.hot) {
    module.hot.accept()
}

// js imports


// setup

//time before display search button
const loadingTime = 1000;

let hits = [];

const hitsJSONUrl = 'https://gist.githubusercontent.com/devinegger/138f104b7bcc4de7aa51a8d839fea4e2/raw/b486e37613dda637d600c30d0d74be941914ffe1/hit-it-data.json';

const hitsList = document.querySelector('.hits__list');

function buildHitList() {
    hits.map(hit => {
        hitsList.innerHTML += `<div class="hits__item">`;
        hitsList.innerHTML += `<div class="hits__item__name"><h2>${hit.name}</h2></div>`;
        hitsList.innerHTML += `<div class="hits__item__url">${hit.url}</div>`;
        hitsList.innerHTML += `<div class="hits__item__location">${hit.location.latitude}, ${hit.location.longitude}</div>`;
        hitsList.innerHTML += `<div class="hits__item__status">${hit.status}</div>`;
        hitsList.innerHTML += `<div class="hits__item__visibility">${hit.visibility}</div>`;
        hitsList.innerHTML += `</div>`;
    });
}

async function loadHitsJSON() {
    const response = await fetch(hitsJSONUrl);
    hits = await response.json();
    
    buildHitList();

    setTimeout(() => {
        displaySearchButton();
    }, loadingTime);
}


// loading page elements
const loading = document.querySelector('.loading');
const loading_message = loading.querySelector('.loading__message');
const loading_button = loading.querySelector('.loading__button');

// search page elements
const search = document.querySelector('.search');

function displaySearchButton() {
    loading_message.style.display = 'none';
    loading_button.style.display = 'block';
}

loading_button.addEventListener('click', displayPageSearch);

function displayPageSearch() {
    loading.style.display = 'none';
    search.style.display = 'flex';
}

window.onload = loadHitsJSON();