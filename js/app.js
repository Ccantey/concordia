function init(){
	mapboxgl.accessToken = 'pk.eyJ1IjoiY2NhbnRleSIsImEiOiJjaWVsdDNubmEwMGU3czNtNDRyNjRpdTVqIn0.yFaW4Ty6VE3GHkrDvdbW6g';
	var map = new mapboxgl.Map({
	    container: 'map',
	    style: 'mapbox://styles/mapbox/streets-v9'
	});
}

