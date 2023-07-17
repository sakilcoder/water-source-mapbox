let locateUser = function () {
    navigator.geolocation.watchPosition(function (position) {
        var userLngLat = [position.coords.longitude, position.coords.latitude];

        if (!map.getSource('user-location')) {
            map.addSource('user-location', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: userLngLat
                    }
                }
            });

            map.addLayer({
                id: 'user-location-layer',
                type: 'circle',
                source: 'user-location',
                paint: {
                    'circle-color': '#0074D9',
                    'circle-radius': 6,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#FFF'
                }
            });
        } else {
            map.getSource('user-location').setData({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: userLngLat
                }
            });
        }
    });
}

// document.getElementById('locate-button').addEventListener('click', function () {
//     navigator.geolocation.getCurrentPosition(function (position) {
//         var userLngLat = [position.coords.longitude, position.coords.latitude];
//         map.flyTo({ center: userLngLat, zoom: 12 });
//     });
// });

let addGeocoding = function () {
    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    });

    document.getElementById('search').appendChild(geocoder.onAdd(map));
    geocoder.on('result', function (e) {
        var result = e.result;
        var coordinates = result.center;

        new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map);
    });
}