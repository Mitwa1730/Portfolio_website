
// Author: Mitwa Patel, 000905034
// StAuth10244: I Mitwa Patel, 000905034 certify that this material is my original work. No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else. 

// Initialize and add the map
let map;
let markers = [];


async function initMap() {
    console.log("Init Map")

  const position = { lat: 43.255203, lng: -79.843826 };
  
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  
  map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: position,
    mapId: "DEMO_MAP_ID",
  });


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            
            map.setCenter(userPosition);

            // Add a marker to show the user's location
            const userMarker = new google.maps.Marker({
                position: userPosition,
                map: map,
                title: "Your Location",
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", 
            });

        },
        () => {
            console.warn("Geolocation unavailable.");
        }
    );
} else {
    console.warn("Geolocation is not supported.");
}
  addMarkers(locations);
}

function addMarkers(locations){
    var infoWindow = new google.maps.InfoWindow();
    locations.map(location=>{
        // adding marker on the map
         let marker =new google.maps.Marker({
            map: map,
            position: {lat: location.lat, lng:location.lng},
            title: "Hamilton",
            category: location.category
          });
          markers.push(marker);
          // adding event listener to each marker
          marker.addListener("click", () => {
            // setting informartion to window
            infoWindow.setContent(showInfo(location));
            infoWindow.open(map, marker);
          });

    });    
}


function showInfo(location) {
    const content = `
<div class="card" style="width: 100%; max-width: 400px;">
    <div class="d-flex">
        <img src="${location.image}" class="img-fluid" alt="${location.name}" style="width: 150px; height: 150px; object-fit: cover; margin-left: 5px; margin-top: 15px;">      
        <div class="card-body text-start">
            <h5 class="card-title">${location.name}</h5>
            <p class="card-subtitle mb-1 text-muted">${location.category}</p>
            <p class="card-text">${location.description}</p>
            <button class="btn btn-primary btn-sm" onclick="findDirection(${location.lat}, ${location.lng})">
                Get Directions
            </button>
        </div>
    </div>
  </div>
  `;
  return content;
}



function filterMarker(markerType){
    console.log("filtering...");
    markers.map(marker=>{
        marker.category !== markerType ? marker.setVisible(false) : marker.setVisible(true);
    });
}


function addMarkerFromAddress(){
    const userInputAddress = document.getElementById("address").value;
    const geocoder = new google.maps.Geocoder();

    //https://developers.google.com/maps/documentation/javascript/geocoding
    geocoder.geocode({address: userInputAddress}, function(results, status){
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                name:"user",
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
    });
}



function findDirection(destLat, destLng) {
    const destination = { lat: destLat, lng: destLng };
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                showRoute(currentLocation, destination);
            },
            () => {
                showLocationError(true);
            }
        );
    } else {
        showLocationError(false);
    }
}

function showRoute(startLocation, destination) {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const routeRequest = {
        origin: startLocation,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(routeRequest, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);
        } else {
            alert("Unable to find directions: " + status);
        }
    });
}

function showLocationError(geolocationAvailable) {
    const errorMessage = geolocationAvailable
        ? "Unable to retrieve your location."
        : "Geolocation is not supported by your browser.";
    
    const infoWindow = new google.maps.InfoWindow({
        content: errorMessage,
        position: map.getCenter()
    });
    infoWindow.open(map);
}



window.addEventListener("load",()=>{
    initMap();
});


// data
const locations = [
    {
        lat:43.2201832,
        lng:-79.885679,
        name:"CF Limbridge",
        category:"shopping",
        description: "CF Lime Ridge is a bustling shopping mall in Hamilton, featuring over 210 stores and services. Address: 999 Upper Wentworth Street, Hamilton, Ontario, L9A 4X5. ",
        image: "https://assets.cadillacfairview.com/transform/ef445c92-58ad-4ba2-96b6-1c88f98ab218/-CF-Lime-Ridge-Opengraph"
    },
    {
        lat:43.2584184,
        lng:-79.9089362,
        name:"Jackson Square",
        category:"shopping",
        description: "Jackson Square is a downtown Hamilton shopping hub, offering shops, food courts, offices, and entertainment. Address: 2 King St W, Hamilton, ON L8P 1A1" ,
        image: "https://i.ytimg.com/vi/6VZknWcvx0A/sddefault.jpg"
    },
    {
        lat:43.2520136,
        lng:-79.8485818,
        name:"The Centre on Barton",
        category:"shopping",
        description: "The Centre on Barton is an open-air retail center with a variety of stores and eateries in East Hamilton. Address: 1275 Barton St E, Hamilton, ON L8H 2V4" ,
        image: "https://centreonbarton.com/wp-content/uploads/Centre-On-Barton-264-Gallery.jpg"
    },
    {
        lat:43.2307964,
        lng:-79.7683012,
        name:"Eastgate Square",
        category:"shopping",
        description: "Eastgate Square is an indoor shopping mall with diverse stores, restaurants, and a supermarket. Address: 75 Centennial Pkwy N, Hamilton, ON L8E 2P2" ,
        image: "https://mallmaverick.imgix.net/web/property_managers/8/properties/80/galleries/20210827153123/Leasing_Gallery_3.png"   
    },
    {
        lat:43.289961,
        lng:-79.9908693,
        name:"Albion Falls",
        category:"Tourist attraction",
        description: "Albion Falls is a picturesque cascade waterfall, known for its scenic beauty in East Hamilton. Address: 885 Mountain Brow Blvd, Hamilton, ON L8W 1R6" ,
        image: "https://waterfallsofontario.com/sitephotos/albion-falls_by_la-mabo.jpg"   
    },
    {
        lat:43.2458325,
        lng:-79.968018,
        name:"Mountview Waterfall",
        category:"Tourist attraction",
        description: "Mountview Waterfall in Hamilton is a hidden gem, offering serene views and a tranquil environment perfect for nature lovers and hikers alike. Address: Cliff View Park Scenic Dr &, Upper Paradise Rd, Hamilton, ON" ,
        image: "https://www.cityofwaterfalls.ca/wp-content/uploads/2015/02/Mountview-autumn.jpg"   
    },
    {
        lat:43.2694639,
        lng:-79.8891172,
        name:"Dundurn Castle",
        category:"Tourist attraction",
        description: "Dundurn Castle is a grand neoclassical villa offering guided tours of Hamilton's historic landmark. Address: 610 York Blvd, Hamilton, ON L8R 3E7" ,
        image: "https://d1l57x9nwbbkz.cloudfront.net/files/s3fs-public/banners/2024-04/dundurn-castle-hamilton-exterior.jpg?VersionId=.X2dErqjqn39zWmglG6WeEkV8iRc7a6V"   
    },
    {
        lat:43.2692565,
        lng:-79.9093426,
        name:"Hamilton Harbour Waterfront Trail",
        category:"Trails",
        description: "The Hamilton Harbour Waterfront Trail offers scenic paths for walking and cycling along Lake Ontario. Address: Waterfront Trl, Hamilton, ON L8L 1C8" ,
        image: "https://www.touristplaces.ca/images/pp/6/p123878.jpg" 
    },
    {
        lat:43.2460814,
        lng:-79.946348,
        name:"Chedoke Radial Recreational Trail",
        category:"Trails",
        description: "The Chedoke Radial Recreational Trail provides breathtaking views of the escarpment and nearby waterfalls. Address: 120 Beddoe Dr, Hamilton, ON L9C 5B5" ,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmfC2KM3MKSqMlxRJq7fU6YTXqySqVZujTFw&s" 
    },
    {
        lat:43.2651288,
        lng:-79.9453014,
        name:"Dundurn Stairs",
        category:"Trails",
        description: "Dundurn Stairs offer a challenging climb with rewarding views, connecting to Hamilton's escarpment trails. Address: Dundurn Stairs, Hamilton, ON L8P 2X3" ,
        image: "https://prod-static.curiocity.com/uploads/2024/07/DundurnStreetStairway.jpeg" 
    }
]
