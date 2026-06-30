(function() {
	function autoFit(el, paddingRatio, strokeRatio) {
		var vw = window.innerWidth;
		var padding = vw * paddingRatio;

		el.style.paddingLeft = padding + 'px';
		el.style.paddingRight = padding + 'px';

		var maxWidth = el.clientWidth - padding * 2;

		var span = document.createElement('span');
		span.textContent = el.textContent;
		span.style.cssText = 'font-family:' + getComputedStyle(el).fontFamily + ';font-weight:900;letter-spacing:-0.03em;position:absolute;visibility:hidden;white-space:nowrap;font-size:100px';
		document.body.appendChild(span);

		var fontSize = Math.min(Math.round(maxWidth / span.offsetWidth * 100), 100);
		el.style.fontSize = fontSize + 'px';

		document.body.removeChild(span);

		if (strokeRatio) {
			el.style.webkitTextStroke = Math.round(vw * strokeRatio) + 'px #2b1e12';
		}
	}

	var titles = document.querySelectorAll('.landing__title');
	var subtitles = document.querySelectorAll('.landing__subtitle');

	function fit() {
		titles.forEach(function(el) { autoFit(el, 0.1, 0.018); });
		subtitles.forEach(function(el) { autoFit(el, 0.15, 0.015); });
	}

	if (titles.length || subtitles.length) {
		document.fonts.ready.then(fit);
		window.addEventListener('resize', fit);
	}
})();
