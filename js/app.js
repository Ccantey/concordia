var map;
var layersArray = [];
function init(){
	southWest = new mapboxgl.LngLat( -104.7140625, 41.86956);
    northEast = new mapboxgl.LngLat( -84.202832, 50.1487464);
    //bounds = new mapboxgl.LngLatBounds(southWest, northEast);
    bounds = new mapboxgl.LngLatBounds(southWest,northEast);


	mapboxgl.accessToken = 'pk.eyJ1IjoiY2NhbnRleSIsImEiOiJjaWVsdDNubmEwMGU3czNtNDRyNjRpdTVqIn0.yFaW4Ty6VE3GHkrDvdbW6g';
	map = new mapboxgl.Map({
	    container: 'map',
	    style: 'mapbox://styles/ccantey/cimi2xon00022ypnhqkjob9k9',
		center: [-95,46.50],
		maxBounds:bounds,		
		zoom: 6
	    //style: 'mapbox://styles/mapbox/streets-v9'
	});

	var nav = new mapboxgl.NavigationControl({position: 'top-right'}); // position is optional
    map.addControl(nav);

     map.on('load', function () {
    	// add vector source:
	    map.addSource('MNSen_ALana', {
	        type: 'vector',
	        url: 'mapbox://ccantey.4ivfoz0y'
	    });

	 var paintType = 'categorical';
     var paintProperty = 'party';//we'll pull that from dropdown
     var paintStops = [['DFL', '#6582ac'],['R', '#cc7575']];

     var layers = [
            //name, minzoom, maxzoom, filter, paint fill-color, stops, paint fill-opacity, stops
	        [
		        'MNSen_ALana',                  //layers[0] = id
		        ['has','district'],             //layers[1] = filter
		        paintType,						//layers[2]
		        paintProperty,					//layers[3]
		        paintStops,						//layers[4]                 
		        0.75                            //layers[5] = fill opacity
	        ], 

   	        ["MNSen_ALana-highlighted", ["in", "MNSENDIST", ""],paintType,paintProperty,[['DFL', 'yellow'],['R', 'yellow']],1]
	    ];      

        layers.forEach(addLayer);
	});//end map on load
} //end initialize

function addLayer(layer) {
             
	         map.addLayer({
		        "id": layer[0],
		        "type": "fill",
		        "source": "MNSen_ALana",
		        "source-layer": "MNSen_JoinAlana-8o59a2", //layer name in studio
		        // "minzoom":layer[1],
		        // 'maxzoom': layer[2],
		        'filter': layer[1],
		        "layout": {},
		        "paint": {		        	
		            "fill-color": {
		            	"type":layer[2],
		            	"property": layer[3], //layers[4] = fill-color property -- geojson.winner (add this property to geojson)
		            	"stops": layer[4],    //layers[5] = fill-color stops -- ['dfl':blue, 'r':red,'i':yellow]
		            },		           
		            "fill-outline-color": "#000",
		            "fill-opacity":layer[5]
		        }
	         }, 'minnesota');
	         layersArray.push(layer[0])
}; 


function showResults(featureProperties){
	console.log(featureProperties['AsianDisab'])
	var content = '';
	var header ='';
	var district = '';
	// var unit =''
	// var data = {
	// 	activeTab:activeTab.selection,
	// 	geography:activeTab.geography
	// };
	header += "<h5>Results</h5>";
	for (attributes in featureProperties){
		// console.log(attributes, featureProperties[attributes])
		content += "<tr><th>"+attributes+":</th><td>"+featureProperties[attributes]+"</td></tr>"
	}
	$("#results").html(content);
	// district += feature.properties.SENDIST
	// content += "<tr><th>Total Votes: </th><td>"+feature[activeTab.selection+'TOTAL'].toLocaleString()+"</td></tr>";

}

function mapResults(feature){
	console.log(feature.properties.SENDIST);
	map.setFilter('MNSen_ALana-highlighted', ['==', 'MNSENDIST', feature.properties.SENDIST]);
}
