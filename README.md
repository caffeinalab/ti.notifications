com.caffeinalab.titanium.notifications
====================================

Alloy Titanium widget to display an in-app notification.

The widget is a tiny view that comes from the top with a simple animation.

![image](http://cl.ly/image/2j462U291g3e/b.gif)

### Cross Platform?

On iOS7+, the animation is managed by `Ti.UI.iOS.Animator` physics engine (Tweetbot style).

## Installation

#### Via Gittio

```
gittio install com.caffeinalab.titanium.notifications
```

#### Via Github

Download the latest release and add in your *config.json*, under `dependencies`:

```
"dependencies": {
    "com.caffeinalab.titanium.notifications": "*"
}
```

#### Require

```javascript
var Notifier = Alloy.createWidget('com.caffeinalab.titanium.notifications', /* options */);
```

#### The Options

```javascript
{

	message: 'Notification Test', // the message to display.

	duration: 2000, // time after go away. Valid for iOS7+ and Android
	icon: '/appicon.png', // icon to display on the left

	elasticity: 0.5, // iOS7+ only
	pushForce: 30, // iOS7+ only
	usePhysicsEngine: true, // disable if you don't want on iOS7+

	animationDuration: 200, // animation sliding duration

}
```

#### Usage

```javascript

// Show the widget setting the title
Notifier.show('Hello, world!');

// Show the widget, and override defaults
Notifier.show({
	message: 'Notification Test',
	icon: '/appicon.png',
	pushForce: 10,
	duration: 2500,
	click: function(){ alert("OH, you clicked me!\nDo you think I'm weird?"); }
});

// Hide
Notifier.hide();

```

#### Fully stylable via TSS

Override this options in your `app.tss`.

```json
".caffeinaToastView":{
	top: 0,
	backgroundColor: '#A000',
	height: 65,
	touchEnabled: false
},
".caffeinaToastIcon":{
	left: 8,
	height: 42
},
".caffeinaToastLabel":{
	touchEnabled: false,
	left: 60,
	right: 10,
	height: 60,
	color: '#fff',
	textAlign: 'left',
	font: {
		fontSize: 14
	}
}
```

#### Work with Android or iOS modal Windows

On Android is not possible to make it work with Windows.

On iOS, with modal Windows, in not possible to open a non-modal window in front of another modal window.

So, to make it work with theese two cases, use the `view` property on open:

```javascript
Notifier.show({
	view: /* Your Window */
});
```
