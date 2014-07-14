com.caffeinalab.titanium.notifications
====================================

Alloy Titanium widget to display an in-app notification.

![image](http://cl.ly/image/2j462U291g3e/b.gif)

### Cross Platform ?

The widget is a tiny view that comes from the top with a simple animation.

On iOS7+, the animation is managed by `Ti.UI.iOS.Animator` physics engine (Tweetbot style).


## Installation

#### Via Gittio

```
gittio install com.caffeinalab.titanium.notifications
```

#### Via Github

```
git clone git@github.com:CaffeinaLab/com.caffeinalab.titanium.notifications.git app/widgets/com.caffeinalab.titanium.notifications
```

And add in your *config.json*, under `dependencies`:

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
	usePhysicsEngine: true // disable if you don't want on iOS7+

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

```

#### Fully stylable via TSS

Override this options in your `app.tss`.

```json
".caffeinaToastWindow":{
	fullscreen: true,
	backgroundColor: '#0000'
},
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
