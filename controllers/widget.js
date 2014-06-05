var args = _.extend({
	duration: 2000,
	message: '',
	title: Ti.App.name
}, arguments[0] || {});
var $$;

exports.show = function(opt) {
	if (_.isObject(opt)) {
		opt = _.extend(args, opt);
	} else {
		opt = _.extend(args, {
			message: opt.toString()
		});
	}

	if (OS_IOS && Ti.UI.iOS.createAnimator) {
		$$ = Widget.createController('ios', opt);
	} else if (OS_IOS) {
		$$ = Ti.UI.createAlertDialog(opt);
	} else if (OS_ANDROID) {
		$$ = Ti.UI.createNotification(opt);
	}

	$$.show();
};

exports.hide = function() {
	if (!$$) return;
	if (!('hide' in $$)) return;
	$$.hide();
};