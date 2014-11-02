'use strict';

angular.module('App.routes', ['ngRoute'])

.config(function($routeProvider) {
	$routeProvider.
		when('/', { controller:'ListCtrl', templateUrl:'partials/list.html' }).
		when('/new', { controller: 'NewCtrl', templateUrl: 'partials/add.html' }).
		when('/poll/:id', { controller: 'PollCtrl', templateUrl: 'partials/poll.html' }).
		otherwise({ redirectTo:'/' });
});