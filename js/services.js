 angular.module('App.services', [])
	
	.factory('fb', ['fbutil', function(fbutil) {
		
		var Polls = fbutil.syncArray("/Polls");
		
		var getPolls = function() {
			return Polls;	
		}
	
		var addPoll = function(i) {
			Polls.$add(i);
		}
				
		return {
			getPolls : getPolls,
			addPoll : addPoll
		}
	}
	
]);