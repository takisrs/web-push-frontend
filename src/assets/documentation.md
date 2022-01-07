
# Push Notifications

Web Push Notifications API   
Backend implementation in node.js and mongodb for web push notifications. Exposes an API for signup (create vapid keys), login (returns a token), add subscriptions, send notifications and more...

<!--- If we have only one grouop/collection, then no need for the "ungrouped" heading -->

* [Auth](#auth)
    1. [Login](#1-login)
    1. [Signup](#2-signup)
* [Images](#images)
    1. [upload](#1-upload)
* [Logs](#logs)
    1. [Retrieve Logs](#1-retrieve-logs)
* [Notifications](#notifications)
    1. [Create Notification](#1-create-notification)
    1. [Delete Notification](#2-delete-notification)
    1. [Retrieve Notifications](#3-retrieve-notifications)
    1. [Send Notification](#4-send-notification)
* [Scripts](#scripts)
    1. [main](#1-main)
    1. [sw](#2-sw)
* [Subscriptions](#subscriptions)
    1. [Add Subscription](#1-add-subscription)
    1. [Retrieve Subscriptions](#2-retrieve-subscriptions)
    1. [Retrieve a single Subsciption](#3-retrieve-a-single-subsciption)

--------



## Auth



### 1. Login



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/auth/login
```



***Body:***

```js        
{
    "email": "takispadaz@gmail.com",
    "password": "panathinaikos"
}
```



### 2. Signup


Creates a new user


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/auth/signup
```



***Body:***

```js        
{
    "name": "Panos",
    "email": "panos@atnet.gr",
    "password": "panathinaikos",
    "website": "https://www.rs-radio.gr"
}
```



## Images



### 1. upload



***Endpoint:***

```bash
Method: POST
Type: FORMDATA
URL: http://localhost:3000/images/
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| file |  |  |



## Logs



### 1. Retrieve Logs



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/logs
```



## Notifications



### 1. Create Notification



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/notifications/
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| accept-language | el |  |



***Body:***

```js        
{
    "title": "Web example",
    "message": "Just an example notification",
    "image": "https://miro.medium.com/max/1200/1*m5RYM_Wkj4LsZewpigV5tg.jpeg",
    "icon": "https://raw.githubusercontent.com/gurayyarar/NodeJsPackageManager/master/images/app.png",
    "badge": "https://raw.githubusercontent.com/gurayyarar/NodeJsPackageManager/master/images/app.png",
    "dir": "ltr",
    "lang": "el-GR",
    "vibrate": [
        100,
        20,
        100
    ],
    "silent": false,
    "tag": "alert",
    "renotify": true,
    "scheduledAt": "",
    "data": {
        "url": "https://nodejs.org/en/"
    },
    "actions": [
        {
            "action": "confirm",
            "title": "Read More",
            "icon": "https://cdn1.iconfinder.com/data/icons/color-bold-style/21/34-512.png"
        },
        {
            "action": "cancel",
            "title": "Close",
            "icon": "https://icons-for-free.com/iconfiles/png/512/cercle+close+delete+dismiss+remove+icon-1320196712448219692.png"
        }
    ]
}
```



### 2. Delete Notification



***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: http://localhost:3000/notifications/61d583371a5f0cb0677c4764d
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| accept-language | el |  |



***Body:***

```js        
{}
```



### 3. Retrieve Notifications


Retrieve the list with all notifications of a user


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/notifications/
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| page | 1 |  |
| limit | 10 |  |



### 4. Send Notification



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/notifications/send
```



***Body:***

```js        
{
	"title": "Web Push Notifications",
	"message": "Just an example notification",
	"image": "https://miro.medium.com/max/1200/1*m5RYM_Wkj4LsZewpigV5tg.jpeg",
	"icon": "https://raw.githubusercontent.com/gurayyarar/NodeJsPackageManager/master/images/app.png",
	"badge": "https://raw.githubusercontent.com/gurayyarar/NodeJsPackageManager/master/images/app.png",
	"dir": "ltr",
	"lang": "el-GR",
	"vibrate": [100, 20, 100],
	"silent": false,
	"tag": "alert",
	"renotify": true,
	"data": {
		"url": "https://nodejs.org/en/"	
	},
	"actions": [
		{
			"action": "confirm",
			"title": "Read More",
			"icon": "https://cdn1.iconfinder.com/data/icons/color-bold-style/21/34-512.png"
		},
		{
			"action": "cancel",
			"title": "Close",
			"icon": "https://icons-for-free.com/iconfiles/png/512/cercle+close+delete+dismiss+remove+icon-1320196712448219692.png"
		}
	]
}
```



## Scripts



### 1. main



***Endpoint:***

```bash
Method: GET
Type: 
URL: 
```



### 2. sw



***Endpoint:***

```bash
Method: GET
Type: 
URL: 
```



## Subscriptions



### 1. Add Subscription


Used to add a new subscription to the database


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/subscriptions
```



***Body:***

```js        
{
    "userId": "5f725538290ed1996e438513",
    "subscription": {
        "endpoint": "http:/sdsds",
        "keys": {
            "p256dh": "sdsdsd",
            "auth": "sdsdsd"
        }
    }
}
```



### 2. Retrieve Subscriptions


Retrieve the subscriptions of a user


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/subscriptions
```



### 3. Retrieve a single Subsciption



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/subscriptions
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| endpoint | https%3A%2F%2Ffcm.googleapis.com%2Ffcm%2Fsenhd%2FcgbDw6hTIxs%3AAPA91bHvw5402-uXvj7j-V6CKRIXN-6PzpI_nQyRi-mHfhY1-g-D-cF5ZuykNsFYUmlh2dBG9ujhOkfFat_QMZ26-D7K4ZiQOP9VtPrg4WYNTqRczWaczDqhf4wdrpZx6EQbrG1G2cil |  |



***Available Variables:***

| Key | Value | Type |
| --- | ------|-------------|
| BASE_URL | http://localhost:3000 |  |



---
[Back to top](#push-notifications)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2022-01-06 15:31:02 by [docgen](https://github.com/thedevsaddam/docgen)
