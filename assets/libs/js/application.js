//	HISTORY.JS
//	https://github.com/balupton/History.js/


//	HISTORICIZE AND AJAXIFY OUR SITE
jQuery(document).ready(function() {
	console.log('helllllllllllo')
	var siteUrl = 'http://'+(document.location.hostname||document.location.host);

	//	Catch all internally-focused links and push a new state.
	//	Note: External links will not be affected by this behavior.
	$(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
		e.preventDefault();
		History.pushState({}, "", this.pathname);
	});

	History.Adapter.bind(window, 'statechange', function(){
		var State = History.getState();
		$.get(State.url, function(data){	// Use AJAX to get the new content.
			document.title = data.match(/<title>(.*?)<\/title>/)[1];
			$('.content').html($(data).find('.content')); 	// Pull the post we want out of the .content class.
															// If you change the class of the post container,
															// you must change it here!!!
			//_gaq.push(['_trackPageview', State.url]);	// This updates Google Analytics with a visit to the new page.
														// If you don't use Google Analytics, you can safety comment or
														// remove that line.
		});
	});
});