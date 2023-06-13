// load map script
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: process.env.GOOGLE_MAP_KEY,
    v: "weekly"
});

let userPosition;

navigator.geolocation.getCurrentPosition((position) => {
    // console.log(position);
    
    userPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
}, (error) => {
    console.log(error);
});


// initialize map
export async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const map = new Map(document.getElementById("map"), {
        center: userPosition,
        zoom: 8,
        mapId: process.env.CURRENT_LOCATIOIN_MAP_ID,
    });

    // console.log(map);

    const marker = new AdvancedMarkerElement({
        map: map,
        position: userPosition,
        title: 'Hit It Location!',
    });

    return map;
}