/* Default */
var args = _.extend({
	elasticity: 0.5,
	pushForce: 30,
}, arguments[0] || {});


/* Vars */
var timeout;

var animator = Ti.UI.iOS.createAnimator({
	referenceView: $.caffeinaToastWindow
});

var collision = Ti.UI.iOS.createCollisionBehavior();
collision.addItem($.caffeinaToastView);
animator.addBehavior(collision);

var dy = Ti.UI.iOS.createDynamicItemBehavior({
	elasticity: args.elasticity
});
dy.addItem($.caffeinaToastView);
animator.addBehavior(dy);

var pusher = Ti.UI.iOS.createPushBehavior({
	pushDirection: { x: 0, y: args.pushForce },
});
pusher.addItem($.caffeinaToastView);
animator.addBehavior(pusher);

/* API */

function show() {
	$.caffeinaToastWindow.open();

	timeout = setTimeout(function(){
		$.caffeinaToastWindow.animate({
			top: -$.caffeinaToastWindow.height,
			duration: 500
		});
		setTimeout(hide, 500);
	}, args.duration);
}

function hide() {
	clearTimeout(timeout);

	$.caffeinaToastWindow.close();
}

/* Init */

if (args.message) $.caffeinaToastLabel.text = args.message;
if (args.icon) $.caffeinaToastIcon.image = args.icon;

/* Listeners */

$.caffeinaToastWindow.addEventListener('touchstart', function(){
	hide();
	if (_.isFunction(args.click)) args.click();
});
$.caffeinaToastWindow.addEventListener('open', function(){
	animator.startAnimator();
});

/* Public API */

exports.show = show;
exports.hide = hide;
