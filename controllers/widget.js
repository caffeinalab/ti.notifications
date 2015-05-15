var args = _.extend({
	duration: 2000,
	animationDuration: 250,
	message: '',
	title: Ti.App.name,
	elasticity: 0.5,
	pushForce: 30,
	usePhysicsEngine: true
}, arguments[0] || {});

var That = null;

exports.show = function(opt) {
	if (_.isObject(opt)) _.extend(args, opt);
	if (_.isString(opt)) _.extend(args, { message: opt });

	if (OS_ANDROID && args.view == null) {

		Ti.API.error("In Android you have to set a view that contain the sliding view. Fallbacking to Ti.UI.Notification.");

		That = Ti.UI.createNotification({
			message: args.message,
			duration: args.duration
		});
		That.setIcon = function(){};
		That.show();

	} else {

		That = Widget.createController('window', args);

	}
};

exports.hide = function() {
	if (That != null) {
		That.hide();
	}
};

exports.setMessage = function(message) {
	That.setMessage(message);
};

exports.setIcon = function(icon) {
	That.setIcon(icon);
};
