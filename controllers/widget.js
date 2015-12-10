var args = _.extend({
	duration: 2000,
	animationDuration: 250,
	message: '',
	style: null,
	title: Ti.App.name,
	elasticity: 0.5,
	pushForce: 30,
	usePhysicsEngine: true
}, arguments[0] || {});

var That = null;

exports.show = function(opt) {
	if (_.isObject(opt)) {
		opt = _.extend({}, args, opt);
	} else if (_.isString(opt)) {
		opt = _.extend({}, args, { message: opt });
	}

	if (OS_ANDROID && opt.view == null) {

		Ti.API.error("Ti.Notifications: On Android you have to set a view that contain the sliding view. Fallbacking to Ti.UI.Notification.");

		That = Ti.UI.createNotification({
			message: opt.message,
			duration: opt.duration
		});

		That.setIcon = function(){ Ti.API.warn('Ti.Notifications: setIcon is NoOP on Android'); };
		That.setStyle = function(){ Ti.API.warn('Ti.Notifications: setStyle is NoOP on Android'); };

		That.show();

	} else {

		That = Widget.createController('window', opt);

	}
};

exports.hide = function() {
	if (That != null) {
		That.hide();
	}
};

exports.setStyle = function(style) {
	That.setStyle(style);
};


exports.setMessage = function(message) {
	That.setMessage(message);
};

exports.setIcon = function(icon) {
	That.setIcon(icon);
};
