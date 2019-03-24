$(function() {
	let $page = $('.page');
	let $page1 = $('#page1');
	let $page2 = $('#page2');
	let $page3 = $('#page3');
	$page.css('min-height', window.innerHeight);
	$page.css('min-width', window.innerWidth);

	$(window).resize(() => {
		$page.css('min-height', window.innerHeight);
		$page.css('min-width', window.innerWidth);
	});

	let pos = 0;
	let scrollto = [$page1.offset().top, $page2.offset().top, $page3.offset().top];
	let scrolling = false;
	$(window).on('mousewheel DOMMouseScroll', event => {
		if (!scrolling) {
			console.log(event.originalEvent.wheelDelta);
			if (event.originalEvent.wheelDelta > 0) {
				if (pos > 0) pos--;
			} else if (event.originalEvent.wheelDelta < 0) {
				if (pos < 2) pos++;
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