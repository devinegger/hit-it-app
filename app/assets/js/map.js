// load map script
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: process.env.GOOGLE_MAP_KEY,
    v: "weekly"
});

var map;


// initialize map
export async function initMap(userPosition) {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        center: userPosition,
        zoom: 15,
        mapId: process.env.CURRENT_LOCATIOIN_MAP_ID,
    });

    const marker = new AdvancedMarkerElement({
        map: map,
        position: userPosition,
        title: 'Hit It Location!',
    });
}


export async function loadMapData(data) {
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