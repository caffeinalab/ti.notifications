var args = arguments[0] || {};
var timeout = null;
var $container = null;


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
	$.caffeinaToastIcon.image = icon;
};

exports.setStyle = function(style) {
	switch(style) {
	    case 'success':
	    	Ti.API.info('SUCCESS STYLE');
	        $.caffeinaToastView.backgroundColor = '#8000df10';
	        break;
	    case 'error':
	   		Ti.API.info('ERROR STYLE');
	    	$.caffeinaToastView.backgroundColor = '#80FF0000';
	        break;
      };
};


////////////////////
// Initialization //
////////////////////

if (args.message != null) exports.setMessage(args.message);
if (args.icon != null) exports.setIcon(args.icon);
if (args.style != null) exports.setStyle(args.style);

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
