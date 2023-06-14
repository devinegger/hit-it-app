//  TODO:
// - get users location with geoLocation API ✅
// - use Google Maps API to display map with hits ✅
// - - loop through hits and add markers ✅
// - - pull add marker out of current function !! ✅
// - move hits json to supabase ✅
// - - use .env variables ✅
// - start moving functions to inidividual files and import here ✅
// - display loading symbol on map while getting user position ✅
// - use map API to get distance between user location and hits 
// - - display hits in order of distance from user 
// - - display distance from user on hit list
// - use local storage to save hits selected by user

// webpack dev stuff
import 'normalize.css'
import '../css/styles.css'

if (module.hot) {
    module.hot.accept()
}

// js imports
import { initMap, loadMapData } from './map'
import { supabase } from './supabase.js'
// import { getUserLocation } from './geolocation'  ?? move user location to here ??


// get user current location and save it for the map to load
var userPosition;

navigator.geolocation.getCurrentPosition((position) => {
    
    userPosition = { lat: position.coords.latitude, lng: position.coords.longitude };

    initMap(userPosition);

    displaySearchButton();

}, (error) => {
    console.log(error);
});



// *** loading page elements ***

// loading page
const loading = document.querySelector('.loading');

// "loading..."
const loading_message = loading.querySelector('.loading__message');

// button to display search page
const loading_button = loading.querySelector('.loading__button');

// display search page when click on loading button
loading_button.addEventListener('click', displayPageSearch);



// *** search page elements ***

// search page
const search = document.querySelector('.search');

// button to display hit list
const hit_loader = search.querySelector('.hit_loader');

// html element in which we will display hits
const hitsList = search.querySelector('.hits__list');

// display results of hit query on map and in hit list
hit_loader.addEventListener('click', loadHitsJSON);


// *** functions ***

// load JSON from supabase
async function loadHitsJSON() {

    // get data from supabase
    const { data, error } = await supabase
      .from('hits')
      .select()

    buildHitList(data);

    loadMapData(data);
}

// builds out hits list with provided json data
function buildHitList(hits) {
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

// diplays search button and removes loading message
function displaySearchButton() {
    loading_message.style.display = 'none';
    loading_button.style.display = 'block';
}

// displays search page and removes loading page
function displayPageSearch() {
    loading.style.display = 'none';
    search.style.display = 'flex';
}