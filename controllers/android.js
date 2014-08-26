var args = arguments[0] || {};
var timeout = null;

/*
Methods
*/

function close() {
	clearTimeout(timeout);
	$.caffeinaToastView.animate({
		top: -$.caffeinaToastView.height,
		duration: args.animationDuration
	});
}
exports.hide = close;

/*
Listeners
*/

$.caffeinaToastView.addEventListener('touchstart', function(){
	close();
	if (args.click) args.click();
});

/*
Initialization
*/

if (args.view) {

	$.caffeinaToastLabel.text = args.message;
	if (args.icon) $.caffeinaToastIcon.image = args.icon;

	args.view.add($.caffeinaToastView);

	$.caffeinaToastView.animate({
		top: 0,
		duration: args.animationDuration
	});

	// Set the timer to automatically close the Window
	timeout = setTimeout(close, args.duration);

} else {
	Ti.API.error("com.caffeinalab.titanium.notifications: In Android you MUST set a view that contain the sliding view");
}