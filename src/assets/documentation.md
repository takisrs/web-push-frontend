
# Push Notifications

Web Push Notifications API   
Backend implementation in node.js and mongodb for web push notifications. Exposes an API for signup (create vapid keys), login (returns a token), add subscriptions, send notifications and more...

<!--- If we have only one grouop/collection, then no need for the "ungrouped" heading -->

* [Auth](#auth)
    1. [Login](#1-login)
        * [Login example](#i-example-request-login-example)
    1. [Signup](#2-signup)
        * [Signup example](#i-example-request-signup-example)
* [Images](#images)
    1. [upload](#1-upload)
* [Logs](#logs)
    1. [Retrieve Logs](#1-retrieve-logs)
* [Notifications](#notifications)
    1. [Copy Notification](#1-copy-notification)
        * [Copy Notification example](#i-example-request-copy-notification-example)
    1. [Create Notification](#2-create-notification)
        * [Create Notification example](#i-example-request-create-notification-example)
    1. [Delete Notification](#3-delete-notification)
    1. [Edit Notification](#4-edit-notification)
    1. [Retrieve Notifications](#5-retrieve-notifications)
    1. [Retrieve a Notification](#6-retrieve-a-notification)
    1. [Send Notification](#7-send-notification)
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



***More example Requests/Responses:***


##### I. Example Request: Login example



***Body:***

```js        
{
    "email": "takispadaz@gmail.com",
    "password": "panathinaikos"
}
```



##### I. Example Response: Login example
```js
{
    "ok": true,
    "message": "Login ok",
    "data": {
        "userId": "5f725538290ed1996e438513",
        "userEmail": "takispadaz@gmail.com",
        "website": "http://www.rs-radio.gr",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRha2lzcGFkYXpAZ21haWwuY29tIiwidXNlcklkIjoiNWY3MjU1MzgyOTBlZDE5OTZlNDM4NTEzIiwiaWF0IjoxNjQxNTcyNDEwLCJleHAiOjE2NDE1NzYwMTB9.vB94qSgYBLfbOjGXey8qISDG9SJekWscga6VPKTCbeQ",
        "vapidPublicKey": "BF-yfKEFXSs6Fp7CTsufzqbWZTaEXlEGJSwSTiZQN5ZXifu7sa8MQe2BPVTDz4Ngnqmbn334usmvefRAqwxLRbY"
    }
}
```


***Status Code:*** 200

<br>



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
    "name": "Panos Pantazopoulos",
    "email": "takispadaz@hotmail.com",
    "password": "demopass",
    "website": "https://www.demourl.com"
}
```



***More example Requests/Responses:***


##### I. Example Request: Signup example



***Body:***

```js        
{
    "name": "Panos Pantazopoulos",
    "email": "takispadaz@hotmail.com",
    "password": "demopass",
    "website": "https://www.demourl.com"
}
```



##### I. Example Response: Signup example
```js
{
    "ok": true,
    "message": "Account created!",
    "data": {
        "userId": "61df4dfbbf23ef00161d2095",
        "email": "takispadaz@hotmail.com",
        "vapidPublicKey": "BAELC4-mjEIWBTXUEi5G-HuuoLBd-Mh9r7slmXGZE2pnxcCy7oL53WQLFZdbCP9A8d6tsyNNhZvwbGfWldXBRzA"
    }
}
```


***Status Code:*** 201

<br>



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



### 1. Copy Notification



***Endpoint:***

```bash
Method: COPY
Type: 
URL: http://localhost:3000/notifications/:id
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
|  |  |  |



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 61d8d4f2202fd9bd59fc0951 |  |



***More example Requests/Responses:***


##### I. Example Request: Copy Notification example



##### I. Example Response: Copy Notification example
```js
{
    "ok": true,
    "message": "Notification 61d8d4f2202fd9bd59fc0951 was copied successfully. The id of the new notification is 61d8dc1439fa89e9f861fd9b!",
    "data": {
        "duplicatedNotification": {
            "dir": "ltr",
            "lang": "el-GR",
            "vibrate": [
                "100",
                "20",
                "100"
            ],
            "actions": [
                {
                    "action": "confirm",
                    "title": "Read More"
                },
                {
                    "action": "cancel",
                    "title": "Close"
                }
            ],
            "status": "DRAFT",
            "_id": "61d8dc1439fa89e9f861fd9b",
            "user": "5f725538290ed1996e438513",
            "title": "Covid-19",
            "message": "Important information about covid-19",
            "icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSUO3kjS87SxMtm1M0qxPIfavgjcy3Y6ya0w&usqp=CAU",
            "image": "https://www.eom.gr/wp-content/uploads/2020/05/coronavirus-covid19post.jpg",
            "silent": false,
            "badge": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSUO3kjS87SxMtm1M0qxPIfavgjcy3Y6ya0w&usqp=CAU",
            "tag": "alert",
            "renotify": true,
            "data": {
                "url": "https://eody.gov.gr/category/covid-19/"
            },
            "scheduledAt": "2022-01-08T00:34:28.350Z",
            "addedAt": "2022-01-08T00:34:28.349Z",
            "__v": 0,
            "sentAt": null
        }
    }
}
```


***Status Code:*** 201

<br>



### 2. Create Notification


Create a notification


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
            "title": "Read More"
        },
        {
            "action": "cancel",
            "title": "Close"
        }
    ]
}
```



***More example Requests/Responses:***


##### I. Example Request: Create Notification example


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
            "title": "Read More"
        },
        {
            "action": "cancel",
            "title": "Close"
        }
    ]
}
```



##### I. Example Response: Create Notification example
```js
{
    "ok": true,
    "message": "Notification created successfully!",
    "data": {
        "dir": "ltr",
        "lang": "el-GR",
        "vibrate": [
            100,
            20,
            100
        ],
        "actions": [
            {
                "action": "confirm",
                "title": "Read More"
            },
            {
                "action": "cancel",
                "title": "Close"
            }
        ],
        "status": "PENDING",
        "_id": "61df4e90bf23ef00161d20a9",
        "user": "5f725538290ed1996e438513",
        "title": "Web example",
        "message": "Just an example notification",
        "icon": "https://raw.githubusercontent.com/gurayyarar/NodeJsPackageManager/master/images/app.png",
        "image": "https://miro.medium.com/max/1200/1*m5RYM_Wkj4LsZewpigV5tg.jpeg",
        "silent": false,
        "badge": "https://raw.githubusercontent.com/gurayyarar/NodeJsPackageManager/master/images/app.png",
        "tag": "alert",
        "renotify": true,
        "data": {
            "url": "https://nodejs.org/en/"
        },
        "scheduledAt": "2022-01-12T21:56:32.712Z",
        "addedAt": "2022-01-12T21:56:32.714Z",
        "__v": 0
    }
}
```


***Status Code:*** 201

<br>



### 3. Delete Notification



***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: http://localhost:3000/notifications/:id
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| accept-language | el |  |



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 61d583371a5f0cb0677c4764d |  |



***Body:***

```js        
{}
```



### 4. Edit Notification



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: http://localhost:3000/notifications/:id
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| accept-language | el |  |



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 61d9d7087801e94c4f8521fc |  |



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



### 5. Retrieve Notifications


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



### 6. Retrieve a Notification


Retrieve the list with all notifications of a user


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/notifications/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 61d8fa1f4e738300169453e8 |  |



### 7. Send Notification



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
URL: http://localhost:3000/scripts/main
```



### 2. sw



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/scripts/sw
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
| AUTH_TOKEN | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRha2lzcGFkYXpAZ21haWwuY29tIiwidXNlcklkIjoiNWY3MjU1MzgyOTBlZDE5OTZlNDM4NTEzIiwiaWF0IjoxNjQyMDI0MjU5LCJleHAiOjE2NDIwMjc4NTl9.Te9W5aZg8cEE9HVAVrCvLPukbpNcyksdhiYLsO_Wq2c |  |



---
[Back to top](#push-notifications)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2022-01-13 00:12:15 by [docgen](https://github.com/thedevsaddam/docgen)
