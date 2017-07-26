$( document ).ready(function() {
    init();
    map.on('mousemove', function (e) {
	    var features = map.queryRenderedFeatures(e.point, { layers: layersArray });
	    map.getCanvas().style.cursor = (features.length) ? 'pointer' : ''; 
    });

    $('[data-toggle="offcanvas"]').click(function () {
    	$('.row-offcanvas').toggleClass('active')
  	});

  	map.on('click', function (e) {
	    // console.log(e.point)
	    var features = map.queryRenderedFeatures(e.point,{ layers: ['MNSen_ALana'] }); //queryRenderedFeatures returns an array
	    // var feature = features[0];
	    var feature = (features.length) ? features[0] : '';
	    // console.log(feature.properties);
	    // removeLayers('pushpin');
	    mapResults(feature);
	    showResults(feature.properties);       
 	});

 	$('#inlineFormCustomSelect').change(function(e){
 		console.log($(this).val());

	 		e.preventDefault();
	    //remove previous layers
	    $('#clear').hide();
	    // document.getElementById('precinct-header').innerHTML = "";
	    // document.getElementById('precinct-results').innerHTML = "";
	    // map.removeLayer("2016results-"+ activeTab.geography);
	    // map.removeLayer("2016results-"+ activeTab.geography+"-hover");
	    // spliceArray("2016results-"+ activeTab.geography);
	    // spliceArray("2016results-"+ activeTab.geography+"-hover");
	    // map.setLayoutProperty(activeTab.geography + '-symbols', 'visibility', 'none');
	    // map.setLayoutProperty(activeTab.geography + '-lines', 'visibility', 'none');
	    // //remove any vtd selection
	    // map.setFilter("2016results-vtd", ['all', ['==', 'UNIT', 'vtd'], ["!=", "VTD",'any']]);
	    // map.setFilter("2016results-vtd-hover", ['all', ['==', 'UNIT', 'vtd'], ["==", "VTD",'all']]);

	    $('.election-navigation-a').removeClass('active');
	      
	    //add new selections
	    $(this).addClass('active');
	    activeSelect.paintProperty = $(this).val();
	    // activeTab.geography = $(this).val('geography');
	    // activeTab.name = $(this).val('name');
	    changeData(activeSelect);
 	})


});