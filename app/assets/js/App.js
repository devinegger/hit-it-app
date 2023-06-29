//  TODO:
// - get users location with geoLocation API ✅
// - use Google Maps API to display map with hits ✅
// - - loop through hits and add markers ✅
// - - pull add marker out of current function !! ✅
// - move hits json to supabase ✅
// - - use .env variables ✅
// - start moving functions to inidividual files and import here ✅
// - display loading symbol on map while getting user position ✅
// - use map API to get distance between user location and hits ✅
// - - display distance from user on hit list ✅
// - - display hits in order of distance from user 
// - load only closest hits to user 
// - - create setting to switch from all hits to closest hit
// - - create distance filter for hits ✅
// - - prevent load hits from loading duplicate hits ✅
// - use local storage to save hits selected by user
// - move user position function to gelocation.js
// ---- UI ----
// - header with page title, search and menu buttons ✅
// - - menu button opens menu ✅
// - - search button opens search page
// - menu
// - hit list
// --- PAGES ---
// - single hit
// - - clicking hit goes to single hit page
// - register hit


// webpack dev stuff
import 'normalize.css'
import '../css/styles.css'

if (module.hot) {
    module.hot.accept()
}

// js imports
import { initMap, loadMapData } from './map'
import { supabase } from './supabase'
import {getDistanceFromUserToHit} from './geolocation'

// import { getUserLocation } from './geolocation'  ?? move user location to here ??


// get user current location and save it for the map to load
var userPosition;

navigator.geolocation.getCurrentPosition((position) => {
    
    userPosition = { lat: position.coords.latitude, lng: position.coords.longitude };

    initMap(userPosition);

    // userLocation.textContent = `Your Location: ${userPosition.lat}, ${userPosition.lng}`;
    userLocation_lat.textContent = userPosition.lat;
    userLocation.dataset.userLat = userPosition.lat;

    userLocation_lng.textContent = userPosition.lng;
    userLocation.dataset.userLng = userPosition.lng;

    // displaySearchButton();

    displayPageSearch();

}, (error) => {
    console.log(error);
});



// geta all pages
const pages = document.querySelectorAll('.page');


// *** global elements ***
const nav = document.querySelector('.top_bar');
const menu_button = nav.querySelector('.menu_button');
const close_button = nav.querySelector('.close_button');
const page_title = nav.querySelector('.page_title');
const menu = nav.querySelector('.menu');

function showNav() {
    nav.style.display = 'block';
}

function hideNav() {
    nav.style.display = 'none';
}

menu_button.addEventListener('click', 
    () => {
        toggleCloseButton();
        toggleMenu();
    }
);

close_button.addEventListener('click',
    () => {
        toggleCloseButton();
        toggleMenu();
    }
);

function setPageTitle(title) {
    page_title.textContent = title;
}

function toggleCloseButton() {
    if (close_button.style.opacity == 1) {
        close_button.style.opacity = 0;
    } else {
        close_button.style.opacity = 1;
    }
}

function toggleMenu() {
    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
    } else {
        menu.classList.add('open');
    }
}


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

const userLocation = search.querySelector('.user-location');

const userLocation_lat = userLocation.querySelector('.user_lat');
const userLocation_lng = userLocation.querySelector('.user_lng');

const distanceFilter = search.querySelector('.distance_filter');

// display results of hit query on map and in hit list
hit_loader.addEventListener('click', loadHitsJSON);


// *** functions ***

// load JSON from supabase
async function loadHitsJSON() {

    const hitsList_items = hitsList.querySelectorAll('.hits__item');
    const user = { lat: userLocation.dataset.userLat, lng: userLocation.dataset.userLng};

    const existing_ids = [];

    hitsList_items.forEach(item => {
        existing_ids.push(item.dataset.id);
    });

    const ids = existing_ids.join(',');

    console.log(distanceFilter.value);

    // get data from supabase
    const { data, error } = await supabase
        .from('hits')
        .select()
        .not('id', 'in', `(${existing_ids.join(',')})`)  // Use `cs` for `contains()`, `{}` for array values

    if(error) {
        console.log(error);
    } else if(data.length) {
        console.log('got data!');
        data.map(hit => {
            hit.distance = getDistanceFromUserToHit(user, hit.location);
            console.log(hit);
        });
        const filteredData = data.filter(hit => hit.distance < distanceFilter.value);
        console.log(filteredData);
        buildHitList(filteredData);

        loadMapData(filteredData);
    }
}

// builds out hits list with provided json data
function buildHitList(hits) {
    const user = { lat: userLocation.dataset.userLat, lng: userLocation.dataset.userLng};

    console.log(user);

    hits.map(hit => {
        let distance = getDistanceFromUserToHit(user, hit.location)*5280; // distance in feet
        hitsList.innerHTML += `<li class="hits__item" data-id="${hit.id}">
            <h2 class="hits__item_name">${hit.name}</h2>
            <span class="hits__item_url">${hit.url}</span>
            <span class="hits__item_status">${distance.toFixed(2)} feet</span>
        </li>`;
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
    search.style.display = 'block';
    showNav();
    setPageTitle('Search');
}

// getUserLoction();