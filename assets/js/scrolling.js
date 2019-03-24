$(function() {
	let $pages_container = $('.pages_container');
	let $pages = $pages_container.children('.page');

	$pages.css('min-height', window.innerHeight);
	$pages.css('min-width', window.innerWidth);

	$(window).resize(() => {
		$pages.css('min-height', window.innerHeight);
		$pages.css('min-width', window.innerWidth);
	});

	let pos = 0;
	let scrollto = [];
	$pages.each(function() {
		console.log(this);
		scrollto.push($(this).offset().top);
	});
	if (scrollto[0] !== 0) scrolto.push(0);
	let scrolling = false;
	$(window).on('mousewheel', event => {
		if (!scrolling) {
			if (event.originalEvent.wheelDelta > 0) {
				if (pos > 0) pos--;
			} else if (event.originalEvent.wheelDelta < 0) {
				if (pos < scrollto.length) pos++;
			}
			if ($(window).scrollTop() - scrollto[pos]) {
				scrolling = true;
				$('html,body').animate({
					scrollTop: scrollto[pos]
				}, 1000, function () {
					scrolling = false;
				});
			}
		}
	});
});