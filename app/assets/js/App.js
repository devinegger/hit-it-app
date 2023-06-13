//  TODO:
// - make pages all a class to query them together.
// - get users location with geoLocation API
// - use Google Maps API to display map with hits
// - - loop through hits and add markers
// - - pull add marker out of current function !!
// - use local storage to save hits
// - move hits json to supabase ✅
// - - learn how to use .env variables - https://www.npmjs.com/package/dotenv - try Udemy course also ✅
// - start moving functions to inidividual files and import here

// dev stuff
import 'normalize.css'
import '../css/styles.css'

if (module.hot) {
    module.hot.accept()
}

// js imports
// import { getUserLocation } from './geolocation'
import { initMap } from './map'
// import { getHits } from './supabase.js'


// get user current location and save it for the map to load
// let userPosition; 
let map;

// userPosition = getUserLocation();
map = await initMap();


console.log(map);






// navigator.geolocation.getCurrentPosition((position) => {
//     console.log(position);
//     userPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
// }, (error) => {
//     console.log(error);
// });


// (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
//     key: process.env.GOOGLE_MAP_KEY,
//     v: "weekly"
//   });

// let map;

// async function initMap() {
//     const { Map } = await google.maps.importLibrary("maps");
//     const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

//     map = new Map(document.getElementById("map"), {
//         center: userPosition,
//         zoom: 8,
//         mapId: process.env.CURRENT_LOCATIOIN_MAP_ID,
//     });

//     const marker = new AdvancedMarkerElement({
//         map: map,
//         position: userPosition,
//         title: 'Hit It Location!',
//     });
// }

// initMap(userPosition);




async function loadMapData(data, map) {
    console.log('loading data... ', data)
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    data.map(hit => {
        console.log(hit.location.latitude, hit.location.longitude)
        let latLng = new google.maps.LatLng(hit.location.latitude, hit.location.longitude);
        let newMarker = new AdvancedMarkerElement({
            position: latLng,
            map: map,
            title: hit.name
        });
    });
}


// supabase setup
// Create a single supabase client for interacting with your database
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://toksbbqhzdievgvnjlyg.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, process.env.SUPABASE_KEY)


// setup variables

// //time before display search button
// const loadingTime = 1000;

// html element in which we will display hits
const hitsList = document.querySelector('.hits__list');



// // *** loading page elements ***
// const loading = document.querySelector('.loading');
// const loading_message = loading.querySelector('.loading__message');
// const loading_button = loading.querySelector('.loading__button');

// // display search page when click on loading button
// loading_button.addEventListener('click', displayPageSearch);




// *** search page elements ***
const search = document.querySelector('.search');
const hit_loader = document.querySelector('.hit_loader');

// display results of hit query on map and in hit list
hit_loader.addEventListener('click', loadHitsJSON);

// functions

// load JSON from supabase
async function loadHitsJSON() {

    // get data from supabase
    const { data, error } = await supabase
      .from('hits')
      .select()

    buildHitList(data);

    loadMapData(data, map);

    // setTimeout(() => {
    //     displaySearchButton();
    //     
    // }, loadingTime);
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

// // diplays search button and removes loading message
// function displaySearchButton() {
//     loading_message.style.display = 'none';
//     loading_button.style.display = 'block';
// }

// // displays search page and removes loading page
// function displayPageSearch() {
//     loading.style.display = 'none';
//     search.style.display = 'flex';
// }

// run functions
// window.onload = loadHitsJSON();