var args = arguments[0] || {};
var timeout = null;


/*
Methods
*/

function close() {
	clearTimeout(timeout);
	$.caffeinaToastWindow.animate({
		top: -$.caffeinaToastWindow.height,
		duration: args.animationDuration
	}, function() {
		$.caffeinaToastWindow.close();
	});
}

/*
Listeners
*/

$.caffeinaToastWindow.addEventListener('touchstart', function(e){
	close();
	if (args.click) args.click(e);
});

/*
Initialization
*/

$.caffeinaToastLabel.text = args.message;
if (args.icon) $.caffeinaToastIcon.image = args.icon;

if /*ios7+*/ (args.usePhysicsEngine && Ti.UI.iOS.createAnimator) {

	var animator = Ti.UI.iOS.createAnimator({ referenceView: $.caffeinaToastWindow });
	var collision = Ti.UI.iOS.createCollisionBehavior();
	var dy = Ti.UI.iOS.createDynamicItemBehavior({ elasticity: args.elasticity });
	var pusher = Ti.UI.iOS.createPushBehavior({ pushDirection: { x: 0, y: args.pushForce }, });

	collision.addItem($.caffeinaToastView);
	dy.addItem($.caffeinaToastView);
	pusher.addItem($.caffeinaToastView);

	animator.addBehavior(collision);
	animator.addBehavior(dy);
	animator.addBehavior(pusher);

	// This is a simple method to do the bounce animation:
	// Create a Window with height=150 and top=-86, and when the window is opened,
	// the View will fall from the sky for the "Push Behavior"
	$.caffeinaToastWindow.addEventListener('open', function(){ animator.startAnimator(); });
	$.caffeinaToastWindow.height = 150;
	$.caffeinaToastWindow.top = -86;
	$.caffeinaToastWindow.open();

} else /*ios6*/ {

	// Here, instead, set the Window.height equal to the View.height,
	// and simply animate the top property of the Window
	$.caffeinaToastWindow.top = -65;
	$.caffeinaToastWindow.height = 65;

	$.caffeinaToastWindow.open();
	$.caffeinaToastWindow.animate({
		top: 0,
		duration: args.animationDuration
	});

}


// Set the timer to automatically close the Window
timeout = setTimeout(close, args.duration);
