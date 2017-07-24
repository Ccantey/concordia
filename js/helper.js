$( document ).ready(function() {
    init();

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

 	$('#inlineFormCustomSelect').change(function(){
 		console.log($(this).val())
 	})
});