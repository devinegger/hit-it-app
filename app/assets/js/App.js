//  TODO:
// - make pages all a class to query them together.
// - get users location with geoLocation API
// - use Google Maps API to display map with hits
// - use local storage to save hits
// - move hits json to supabase ✅
// - - learn how to use .env variables - https://www.npmjs.com/package/dotenv - try Udemy course also
// - start moving functions to inidividual files and import here

// dev stuff
import 'normalize.css'
import '../css/styles.css'

if (module.hot) {
    module.hot.accept()
}

// js imports

// supabase setup
// Create a single supabase client for interacting with your database
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://toksbbqhzdievgvnjlyg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRva3NiYnFoemRpZXZndm5qbHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYwNTY1MDAsImV4cCI6MjAwMTYzMjUwMH0.I5qD-J8II9TZ_QlQf1bY-jXjPmjjK1cALShpjWdAEU0'
// learn how to use env variables
// const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


// setup variables

//time before display search button
const loadingTime = 1000;

// html element in which we will display hits
const hitsList = document.querySelector('.hits__list');

// loading page elements
const loading = document.querySelector('.loading');
const loading_message = loading.querySelector('.loading__message');
const loading_button = loading.querySelector('.loading__button');

// display search page when click on loading button
loading_button.addEventListener('click', displayPageSearch);

// search page elements
const search = document.querySelector('.search');


// functions

// load JSON from supabase
async function loadHitsJSON() {

    // get data from supabase
    const { data, error } = await supabase
      .from('hits')
      .select()

    buildHitList(data);

    setTimeout(() => {
        displaySearchButton();
    }, loadingTime);
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

window.onload = loadHitsJSON();