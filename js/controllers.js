'use strict';

angular.module('App.controllers', [])

.controller('ListCtrl', ['$rootScope', '$scope', 'fb', function($rootScope, $scope, fb) {
	
	$rootScope.section = "Poll";
	
	$scope.Polls = fb.getPolls();
	
}])

.controller('NewCtrl', ['$rootScope', '$scope', '$location', 'fb', function($rootScope, $scope, $location, fb) {
	
	$rootScope.section = "New Poll";
	
	// Define an empty poll model object
	$scope.poll = {
		question: '',
		totalVotes: 0,
		choices: [ { text: '', votes: 0 }, { text: '', votes: 0 }, { text: '', votes: 0 }]
	};

	// Method to add an additional choice option
	$scope.addChoice = function() {
		$scope.poll.choices.push({ text: '', votes: 0 });
	};
	
	// Validate and save the new poll to the database
	$scope.createPoll = function() {
	
		// Check that a question was provided
		if($scope.poll.question.length > 0) {
			var choiceCount = 0;
			
			// Loop through the choices, make sure at least two provided
			for (var i = 0, ln = $scope.poll.choices.length; i < ln; i++) {
				var choice = $scope.poll.choices[i];
				
				if (choice.text.length > 0) {
					choiceCount++
				}
			}
		
			if(choiceCount > 1) {
				fb.addPoll($scope.poll);
				$location.path('/');
				
			} else {
				alert('You must enter at least two choices');
			}
			
		} else {
			alert('You must enter a question');
		}
	};
		
}])

.controller('PollCtrl', ['$rootScope', '$scope', 'fbutil', '$routeParams', function($rootScope, $scope, fbutil, $routeParams) {
	
	$rootScope.section = "View Poll";

	$scope.poll = fbutil.syncObject("/Polls/" + $routeParams.id);
	
	$scope.poll.$loaded().then(function(p) {
		$scope.poll === p;	
	});
		
	$scope.vote = function() {
		var choice = $scope.userVote;
		
		if(choice) {
			$scope.userVoted = true;
			$scope.poll.totalvotes++;
			$scope.poll.choices[choice].votes++;
			$scope.poll.$save();
		} else {
			alert('You must select an option to vote for');
		}
	};	
}]);