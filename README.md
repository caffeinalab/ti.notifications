com.caffeinalab.titanium.notifications
====================================

Toast widget useful for notifications

![image](http://cl.ly/image/2j462U291g3e/b.gif)


### Usage

#### Instantiate-it

```javascript
var Notifier = Alloy.createWidget('com.caffeinalab.titanium.notifications', options);
```

#### Show

```javascript
Notifier.show([ message ]);
```

#### Show with options override

```javascript
Notifier.show({
	message: 'Notification Test', 
	icon: '/appicon.png',
	pushForce: 10
});
```

#### Options

```javascript
{
	duration: 2000, // time after go away
	title: "Ti.App.name", // title for IOS 6 alerts
	elasticity: 0.5, // elasticity for IOS 7 toast animator
	pushForce: 30, // push force for IOS 7 toast animator,
	icon: '/appicon.png', // the icon to display in IOS 7 on the left,
	message: 'Notification Test', // the message (globally)
}
```