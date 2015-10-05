KnockOutJS example
===========

Application to add, edit and delete places in a google map and show instagram pictures and yelp information when a user selects a marker in the map. Project of the JavaScript design patterns course from Udacity https://www.udacity.com/course/javascript-design-patterns--ud989

* Use of google map javacript API
* Use of Instagram API to retrieve images taken in a specific place
* Use of yelp API to get information from a specific place

### Requirements

* [NodeJS](https://nodejs.org/en/) 
* [Bower](http://bower.io/) 

### Set up

* Download and install the current version of nodeJS from its page https://nodejs.org/en/

* Once you have finished of installing nodeJS you can install bower with the following command

```sh
npm install -g bower
```

* Download the repository with the following command

```sh
git clone https://github.com/reivaj05/KnockOutJS-GoogleMaps
```

* Go to the folder of the repository

```sh
cd KnockOutJS-GoogleMaps
```

* Install bower dependecies

```sh
bower install 
```

* Add your API keys for instagram and yelp you can get it from here (instagram: https://instagram.com/developer/, yelp: https://www.yelp.com/developers)

* Create a javascript file in the folder js named keys.js and add your API keys.

```sh
var KEYS = {
    CLIENT_ID_INSTAGRAM: 'YOUR_API_KEY',
};
```

* Run a local server with the following command (you must have python installed) otherwise you can only open the index.html
file

```sh
python -m SimpleHTTPServer 8000
```
* Take a look