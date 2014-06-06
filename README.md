com.caffeinalab.titanium.notifications
====================================

Alloy Titanium widget to display an in-app notification.

![image](http://cl.ly/image/2j462U291g3e/b.gif)

### Cross Platform ?

On **iOS 7+**, the widget is a tiny view that comes from the top with a simple push-gravity animation, using real `Ti.UI.iOS.Animator` physics engine (Tweetbot style).

On **iOS 6**, a simple alert is displayed, insted.

On **Android**, the default `Ti.UI.createNotification` method is used.


#### Require

```javascript
var Notifier = Alloy.createWidget('com.caffeinalab.titanium.notifications', /* options */);
```

#### The Options

```javascript
{

	message: 'Notification Test', // the message to display. This set the global message.

	duration: 2000, // time after go away. Valid for iOS7+ and Android
	title: "Ti.App.name", // title for IOS 6 alerts
	
	/* iOS 7 properties */
	elasticity: 0.5,
	pushForce: 30, 
	icon: '/appicon.png', // the icon to display on the left.
	/* end */
	
}
```

#### Usage

```javascript

// Show setting the message as string
Notifier.show('Hello, world!');

// Show settings other various overrides options.
Notifier.show({
	message: 'Notification Test', 
	icon: '/appicon.png',
	pushForce: 10,
	duration: 2500
});

```

