var args = arguments[0] || {};
var timeout = null;
var $container = null;

function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/////////////
// Methods //
/////////////

exports.hide = function() {
	clearTimeout(timeout);

	$container.animate({
		transform: Ti.UI.create2DMatrix().translate(0, -$container.height),
		duration: 200
	}, function() {
		if (args.view != null) {
			args.view.remove($container);
		} else {
			$container.close();
		}

		if (_.isFunction(args.onClose)) args.onClose();
	});
};

exports.setMessage = function(message) {
	$.caffeinaToastLabel.text = message;
};

exports.setIcon = function(icon) {
	if (icon == null) {
		$.resetClass($.caffeinaToastLabel, "caffeinaToastLabel caffeinaToastLabelWithoutIcon");
	} else {
		$.resetClass($.caffeinaToastLabel, "caffeinaToastLabel");
		$.caffeinaToastIcon.image = icon;
	}
};

exports.setStyle = function(style) {
	$.resetClass($.caffeinaToastView, "caffeinaToastView caffeinaToast" + ucfirst(style || "default"));
};

////////////////////
// Initialization //
////////////////////

if (args.message != null) exports.setMessage(args.message);
if (args.style != null) exports.setStyle(args.style);

exports.setIcon(args.icon);

if (args.view == null) {
	$container = Ti.UI.createWindow({
		backgroundColor: 'transparent',
		fullscreen: true
	});
} else {
	$container = Ti.UI.createView({
		backgroundColor: 'transparent'
	});
	args.view.add($container);
}

$container.addEventListener('touchstart', function(e){
	exports.hide();
	if (_.isFunction(args.onClick)) args.onClick(e);
});

if (OS_IOS && args.usePhysicsEngine === true && Ti.UI.iOS.createAnimator != null) {

	var animator = Ti.UI.iOS.createAnimator({ referenceView: $container });
	var collision = Ti.UI.iOS.createCollisionBehavior();
	var dy = Ti.UI.iOS.createDynamicItemBehavior({ elasticity: args.elasticity });
	var pusher = Ti.UI.iOS.createPushBehavior({ pushDirection: { x: 0, y: args.pushForce }, });

	collision.addItem($.caffeinaToastView);
	dy.addItem($.caffeinaToastView);
	pusher.addItem($.caffeinaToastView);

	animator.addBehavior(collision);
	animator.addBehavior(dy);
	animator.addBehavior(pusher);

	$container.applyProperties({ height: 150, top: -86 });
	$container.add($.caffeinaToastView);

	if (_.isFunction($container.open)) {
		$container.addEventListener('open', function(){ animator.startAnimator(); });
		$container.open();
	} else {
		animator.startAnimator();
	}

} else {

	$container.applyProperties({ height: 65, top: -65 });
	$container.add($.caffeinaToastView);

	if (_.isFunction($container.open)) {
		$container.addEventListener('open', function(){
			$container.animate({ top: 0, duration: args.animationDuration });
		});
		$container.open();
	} else {
		$container.animate({ top: 0, duration: args.animationDuration });
	}

}


// Set the timer to automatically close the Window
if (args.duration != null) {
	timeout = setTimeout(exports.hide, args.duration);
}
