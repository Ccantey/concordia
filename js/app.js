var map;
var layersArray = [];

var activeSelect = {
  paintType:"categorical",
  paintProperty:"party",
  paintStops:[['DFL', '#6582ac'],['R', '#cc7575']]
};

var popLegendEl = document.getElementById('pop-legend');
var pctLegendEl = document.getElementById('pct-legend');

function init(){
	southWest = new mapboxgl.LngLat( -104.7140625, 41.86956);
    northEast = new mapboxgl.LngLat( -84.202832, 50.1487464);
    //bounds = new mapboxgl.LngLatBounds(southWest, northEast);
    bounds = new mapboxgl.LngLatBounds(southWest,northEast);


	mapboxgl.accessToken = 'pk.eyJ1IjoiY2NhbnRleSIsImEiOiJjaWVsdDNubmEwMGU3czNtNDRyNjRpdTVqIn0.yFaW4Ty6VE3GHkrDvdbW6g';
	map = new mapboxgl.Map({
	    container: 'map',
	    style: 'mapbox://styles/ccantey/ciu8t8b2k003j2jtebtewk2py', //light
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

	 // var paintType = 'categorical';
  //    var paintProperty = 'party';//we'll pull that from dropdown
  //    var paintStops = [['DFL', '#6582ac'],['R', '#cc7575']];

     var layers = [
            //name, minzoom, maxzoom, filter, paint fill-color, stops, paint fill-opacity, stops
            
	        [
		        'MNSen_ALana',                  //layers[0] = id
		        'fill',                          //layer[1]
		        ['has','district'],             //layers[2] = filter
				{"fill-color": {				//layers[3] = paint object
					"type":activeSelect.paintType,
					"property": activeSelect.paintProperty,
					"stops": activeSelect.paintStops
					}, 
					"fill-outline-color": "#fff",
		            "fill-opacity":0.75
		        } /*layers[2] = paint object*/                             
	        ], 
   	        ["MNSen_ALana-highlighted", 'fill',["in", "MNSENDIST", ""],{"fill-color": {"type":activeSelect.paintType,"property": activeSelect.paintProperty,"stops": [['DFL', 'orange'],['R', 'orange']]},"fill-outline-color": "#fff","fill-opacity":1}],
   	        ["MNSen_ALana-stroke", 'line',['has','district'],{"line-color": '#fff',"line-width": {"stops":[[3,0.5],[10,1]]}}]		        
	    ];      

        layers.forEach(addLayer);
	});//end map on load
} //end initialize

function addLayer(layer) {
             
	         map.addLayer({
		        "id": layer[0],
		        "type": layer[1],
		        "source": "MNSen_ALana",
		        "source-layer": "MNSen_JoinAlana-8o59a2", //layer name in studio
		        // "minzoom":layer[1],
		        // 'maxzoom': layer[2],
		        'filter': layer[2],
		        "layout": {},
		        "paint": layer[3],
	         }, 'waterway-label');
	         layersArray.push(layer[0])
}; 


function showResults(featureProperties){
	// console.log(featureProperties['AsianDisab'])
	var content = '';
	var header ='';
	var district = '';
	
	var attributeMap = {'AsianDisab':"Asian Disabled", "BlackDisab":"Black Disabled","LatinoDisa":"Latino Disabled", 'Native_A_1':"Native American Disabled","WhiteDisab":"White Disabled",
						'FemHHPov':"Female Head Household Poverty",
                        'AsianEmplo':"Asian Employed",'BlackEmplo':"Black Empolyed","LatinoEmpl":"Latino Employed","Native_Ame":"Native American Employed",'WhiteEmplo':"White Emplyed",
                    	'MNTaxes':"MN Taxes",'TotalIncom':"Total Income"}
	header += "<h5>Results</h5>";
	content += "<tr><th>Senate District:</th><td>"+featureProperties['MNSENDIST']+"</td></tr>"
	content += "<tr><th>Senator:</th><td>"+featureProperties['name']+"</td></tr>"
	for (attributes in featureProperties){
		if( attributes.match(/MNSENDIST/gi) || attributes.match(/OBJECTID/gi) || attributes.match(/Shape_Area/gi) || attributes.match(/Shape_Leng/gi) || attributes.match(/district/gi) || attributes.match(/SENDIST/gi) || attributes.match(/memid/gi) || attributes.match(/name/gi) || attributes.match(/party/gi)){
			content += "";
		}else{
			console.log(attributes, featureProperties[attributes])
			content += "<tr><th>"+attributeMap[attributes]+":</th><td>"+featureProperties[attributes]+"</td></tr>"
		}		
	}
	$("#results").html(content);
	// district += feature.properties.SENDIST
	// content += "<tr><th>Total Votes: </th><td>"+feature[activeSelect.selection+'TOTAL'].toLocaleString()+"</td></tr>";

}

function mapResults(feature){
	// console.log(feature.properties.SENDIST);
	map.setFilter('MNSen_ALana-highlighted', ['==', 'MNSENDIST', feature.properties.SENDIST]);
}

function changeData(activeSelect){
	// alert(activeSelect.paintProperty);
    // var visibility = map.getLayoutProperty(activeSelect+'-lines', 'visibility');
	switch (activeSelect.paintProperty) {
	    case "party": 
	        var type = 'categorical'
	        var stops = [['DFL', '#6582ac'],['R', '#cc7575']];
	        var field = activeSelect.paintProperty;
	        // map.setLayoutProperty('cty-lines', 'visibility', 'visible');
	        // map.setLayoutProperty('cty-symbols', 'visibility', 'visible');
	        // popLegendEl.style.display = 'block';
         //    pctLegendEl.style.display = 'none';
            map.setPaintProperty("MNSen_ALana-stroke", 'line-color', '#FFF');
	        break;
	    //multiple case like this -> diabled will have same symbology
	    case "AsianDisab":
	    case "BlackDisab":
	    case "LatinoDisa":
	    case "Native_A_1":
	    case "WhiteDisab":
	        // $('#candidate-table').hide();
	        var type = 'interval'
	        var stops = [[0, '#edf8fb'],[3, '#bfd3e6'],[7, '#9ebcda'],
	                       [10, '#8c96c6'],[13, '#8856a7'], [17, '#810f7c']
                ];
	        var field = activeSelect.paintProperty;

            
			$('#pop-legend').each(function(index){
			    	console.log( index + ": " + $( this ).text() );

			    for(var i = 0; i < stops.length; i++) {
			    var colors = stops[i];
			    console.log(colors[0],colors[1]);
			    $( this ).html(colors[0])
			}
			 })
	        break;
	    case "AsianEmplo":
	    case "BlackEmplo":
	    case "LatinoEmpl":
	    case "Native_Ame":
	    case "WhiteEmplo":
	        // $('#candidate-table').hide();
	        var type = 'interval'
	        var stops = [[0, '#edf8fb'],[5, '#bfd3e6'],[10, '#9ebcda'],
	                       [15, '#8c96c6'],[20, '#8856a7'], [50, '#810f7c']
                ];
	        var field = activeSelect.paintProperty;
	        // map.setLayoutProperty('sen-lines', 'visibility', 'visible');
	        // map.setLayoutProperty('sen-symbols', 'visibility', 'visible');
	        // popLegendEl.style.display = 'none';
            // pctLegendEl.style.display = 'block';
	        break;
	    case "TotalIncom":
	        // $('#candidate-table').hide(); 
	        var type = 'exponential'
	        var stops = [[60000000, '#ffffcc'],[104000000, '#a1dab4'],[207000000, '#41b6c4'],
	                     [353000000, '#2c7fb8'], [1000000000, '#253494']
                ];
	        var field = activeSelect.paintProperty;
            map.setPaintProperty("MNSen_ALana-stroke", 'line-color', '#000');
	        // map.setLayoutProperty('hse-lines', 'visibility', 'visible');
	        // map.setLayoutProperty('hse-symbols', 'visibility', 'visible');
	        // popLegendEl.style.display = 'none';
            // pctLegendEl.style.display = 'block';
	        break;
	    case "MNTaxes":
	        // $('#candidate-table').hide(); 
	        var type = 'exponential'
	        var stops = [[6889385, '#ffffcc'],[10100944, '#a1dab4'],[20666002, '#41b6c4'],
	                     [30701440, '#2c7fb8'], [150000000, '#253494']
                ];
	        var field = activeSelect.paintProperty;
            map.setPaintProperty("MNSen_ALana-stroke", 'line-color', '#000');
	        // map.setLayoutProperty('hse-lines', 'visibility', 'visible');
	        // map.setLayoutProperty('hse-symbols', 'visibility', 'visible');
	        // popLegendEl.style.display = 'none';
            // pctLegendEl.style.display = 'block';
	        break;
	    case "FemHHPov":
	        // $('#candidate-table').hide(); 
	        var type = 'exponential'
	        var stops = [[0, '#ffffcc'],[5, '#a1dab4'],[10, '#41b6c4'],
	                     [15, '#2c7fb8'], [20, '#253494']
                ];
	        var field = activeSelect.paintProperty;
	        console.log(field)
            map.setPaintProperty("MNSen_ALana-stroke", 'line-color', '#000');
	        // map.setLayoutProperty('hse-lines', 'visibility', 'visible');
	        // map.setLayoutProperty('hse-symbols', 'visibility', 'visible');
	        // popLegendEl.style.display = 'none';
            // pctLegendEl.style.display = 'block';
	        break;
	};
    
    map.setPaintProperty("MNSen_ALana", 'fill-color', {"type":type, 'property': field, 'stops':stops});  // selection = map.querySourceFeatures('2012results-cty-hover', {sourceLayer:'AllResults', filter: ['has','COUNTYNAME']})
    // map.setPaintProperty("2016results-vtd", 'fill-opacity', {"type":'interval', 'property': activeSelect.selection+'PCT', 'stops': [[0, 0.25],[50, 0.45],[55, 0.6],[60, 0.7],[100, .99]]});
	// showResults(activeSelect, feature.properties);
	// var layer = [
	//     [activeSelect.geography,          3, zoomThreshold, ['==', 'UNIT', activeSelect.geography], activeSelect.selection+'WIN', [['DFL', '#6582ac'],['R', '#cc7575'],['TIE', '#333']], opacityField, opacity, 'hsl(55, 11%, 96%)'],
 //        [activeSelect.geography+'-hover', 3, zoomThreshold, ['all', ['==', 'UNIT', activeSelect.geography], ["==", activeSelect.name, ""]], 'USPRSTOTAL', [[6000, 'orange']], opacityField, [[6000, .75]], 'white']
 //    ];

	// layer.forEach(addLayer)
}
