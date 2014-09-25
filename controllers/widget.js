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
	That = Widget.createController('window', args);
};

exports.hide = function() {
	if (That != null) {
		That.hide();
	}
};