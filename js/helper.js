$( document ).ready(function() {
    init();

    $('[data-toggle="offcanvas"]').click(function () {
    	$('.row-offcanvas').toggleClass('active')
  	});
});