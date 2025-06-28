	mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });



const marker = new mapboxgl.Marker({    color: 'red', })
    .setLngLat(listing.geometry.coordinates) // Set the marker position [lng, lat]
    .setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<h3>${listing.location}</h3>`)) // Set the popup content
    .addTo(map); // Add the marker to the map
    

