# Ti.Notifications

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/CaffeinaLab/Ti.Notifications?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

### com.caffeinalab.titanium.notifications

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

```json
"dependencies": {
    "com.caffeinalab.titanium.notifications": "*"
}
```

#### Require

```js
var Notifier = Alloy.createWidget('com.caffeinalab.titanium.notifications', /* options */);
```

#### The Options

```js
{

	message: 'Notification Test', // the message to display.

	duration: 2000, // time after go away. Valid for iOS7+ and Android
	icon: '/appicon.png', // icon to display on the left

	style: 'info', // 'info', 'success', 'error', 'warn',  notification background blue, green, red or amber.

	elasticity: 0.5, // iOS7+ only
	pushForce: 30, // iOS7+ only
	usePhysicsEngine: true, // disable if you don't want on iOS7+

	animationDuration: 200, // animation sliding duration

}
```

#### Usage

```js

// Show the widget setting the title
Notifier.show('Hello, world!');

// Show the widget, and override defaults
Notifier.show({
	message: 'Notification Test',
	icon: '/appicon.png',
	pushForce: 10,
	style: 'info', // sets the message background to blue (50% opacity)
	duration: 2500,
	onClick: function(){ alert("OH, you clicked me!\nDo you think I'm weird?"); }
});

// Update the notification text. Useful for loading %
Notifier.setMessage('I updated the notifcation message!');

// Update the notification style. Useful for error and success messages
Notifier.setStyle('error');

// Update the icon to a new one
Notifier.setIcon('/newicon.png');

// Hide
Notifier.hide();

```

#### Loading Notification Example (With styling)

```js
var Notifier = Alloy.createWidget('com.caffeinalab.titanium.notifications', { duration: null });
Notifier.show('Loading');

// 50MB test file from thinkbroadband to simulate a slow load.
var url = "http://ipv4.download.thinkbroadband.com:8080/50MB.zip";
var client = Ti.Network.createHTTPClient({
	// function called when the response data is available
	onload : function(e) {
		Notifier.setStyle('success');
		Notifier.setMessage('Successful Download!');
      	setTimeout(Notifier.hide, 3000);
		},
     	// function called at regular intervals as the request data is being received.
     	ondatastream : function(e) {
        	Notifier.setMessage('Loading ' + Math.round(e.progress.toFixed(2)*100) + '%');
     	},
     	// function called when an error occurs, including a timeout
     	onerror : function(e) {
        	Ti.API.debug(e.error);
        	Notifier.setStyle('error');
        	Notifier.setMessage('Error, Please try again.');
        	setTimeout(Notifier.hide, 3000);
     	},
     	timeout: 5000
});
client.open("GET", url);
client.send();
```


#### Fully stylable via TSS

Override this options in your `app.tss`.

```json
".caffeinaToastView":{
	"top": 0,
	"backgroundColor": "#A000",
	"height": 65,
	"touchEnabled": false
},
".caffeinaToastIcon":{
	"left": 8,
	"height": 42
},
".caffeinaToastLabel":{
	"touchEnabled": false,
	"left": 60,
	"right": 10,
	"height": 60,
	"color": "#fff",
	"textAlign": "left",
	"font": {
		"fontSize": 14
	}
}
```

#### Work with Android or iOS modal Windows

On Android is not possible to make it work with Windows.

On iOS, with modal Windows, in not possible to open a non-modal window in front of another modal window.

So, to make it work with theese two cases, use the `view` property on open:

```js
Notifier.show({
	view: /* Your Window/View */
});
```

## Contributing

How to get involved:

1. [Star](https://github.com/CaffeinaLab/Ti.Notifications/stargazers) the project!
2. Answer questions that come through [GitHub issues](https://github.com/CaffeinaLab/Ti.Notifications/issues?state=open)
3. [Report a bug](https://github.com/CaffeinaLab/Ti.Notifications/issues/new) that you find

Pull requests are **highly appreciated**.

Solve a problem. Features are great, but even better is cleaning-up and fixing issues in the code that you discover.

## Copyright and license

Copyright 2015 [Caffeina](http://caffeinalab.com) srl under the [MIT license](LICENSE).
