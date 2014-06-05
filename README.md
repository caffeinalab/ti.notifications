com.caffeinalab.titanium.toast
====================================

Toast widget useful for notifications


### Usage

#### Instantiate-it

```javascript
var Notifier = Alloy.createWidget('com.caffeinalab.titanium.notifications', { /* ... */ });
```

#### Show

```javascript
Notifier.show([ message ]);
```


#### Options

```javascript
{
	duration: 2000, // time after go away
	title: Ti.App.name, // title for IOS 6 alerts
	elasticity: 0.5, // elasticity for IOS 7 toast animator
	pushForce: 30, // push force for IOS 7 toast animator
}
```