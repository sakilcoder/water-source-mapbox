mapboxgl.accessToken = 'pk.eyJ1Ijoic2FraWxjb2RlcmdlbyIsImEiOiJjbGs0YmFyY2MwYnRhM2dyeXRjMXl1bjM1In0.VJhsnxZvt7hYIdPOhPy4Cg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [16, 62],
    zoom: 8,
    zoomSnap: 0.5,
});
map.addControl(new mapboxgl.NavigationControl());

// locateUser();
// addGeocoding();

map.on('load', function () {
    map.loadImage('assets/images/water-32.png', function (error, wdicon) {
        if (error) throw error;

        map.addImage('water-drop', wdicon);

        map.addSource('map-data', {
            type: 'geojson',
            data: 'assets/data/water_sources.geojson'
        });

        map.addLayer({
            id: 'markers',
            type: 'symbol',
            source: 'map-data',
            layout: {
                'icon-image': 'water-drop',
                'icon-size': 0.5
            }
        });

        map.on('click', 'markers', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            console.log(e.features[0].properties.fid);
            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML('<h3><a href="location/map/?id=' + e.features[0].properties.fid + '" target="_blank">' + e.features[0].properties.name + '</a></h3>')
                .addTo(map);
        });

        map.on('mouseenter', 'markers', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'markers', function () {
            map.getCanvas().style.cursor = '';
        });
    });
});
