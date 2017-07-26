$( document ).ready(function() {
	$('#economic, #disability, #employment').hide();
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
    $('#formsubmission').click(function(e){
    	e.preventDefault();
    	if ($('#layerSelect').val() == 'party'){
    		activeSelect.paintProperty = 'party';
    	} else {
    		console.log($('.attSelect:visible').val())
    		activeSelect.paintProperty = $('.attSelect:visible').val();
    	}
    	
    	changeData(activeSelect);
    })
 	$('#layerSelect').change(function(e){
 		// console.log($(this).val());

	 		e.preventDefault();
	 		$('#economic, #disability, #employment').hide();
	 		$('#economic, #disability, #employment').removeClass('active');
	 		var att = '#'+$(this).val();
	 		$(att).addClass('active');
	 		$('.active').show()
	    //remove previous layers
	    $('#clear').hide();
 	})


});