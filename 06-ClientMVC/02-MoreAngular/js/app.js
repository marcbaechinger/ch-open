var myModule = angular.module('CourseRater', []);

myModule.factory('courseRaterHelper', function($rootScope) {
    var buildIndex = function(source, property) {
        var tempArray = [];

        for(var i = 0, len = source.length; i < len; ++i) {
            tempArray[source[i][property]] = source[i];
        }

        return tempArray;
    };

    return {
        buildIndex: buildIndex
    };
});

myModule.factory('courseRaterModel', function($rootScope) {
    var getRatingChoice = function() {
        var tempArray = [
            {name:'Rubbish'},
            {name:'Not Good'},
            {name:'Ok'},
            {name:'Smily'},
            {name:'Great!'}
        ];
        return tempArray;
    };

    var getStories = function() {
        var tempArray = [
            {date:'2013-08-05', comment:'Description pending.', rating:'Rubbish', reporter:'Will Hunting'},
            {date:'2013-08-06', comment:'Description pending.', rating:'Ok', reporter:'Tyler Durden'}
        ];

        return tempArray;
    };

    return {
        getRatingChoice: getRatingChoice,
        getRatings: getStories   };
});

myModule.controller('MainCtrl', function($scope, courseRaterModel, courseRaterHelper) {
    $scope.currentRating;

    $scope.ratingChoices = courseRaterModel.getRatingChoice();
    $scope.ratings = courseRaterModel.getRatings();
    $scope.statusesIndex = courseRaterHelper.buildIndex($scope.ratingChoices, 'name');

    $scope.setCurrentRating = function(story) {
        $scope.currentRating = story;

        $scope.currentStatus = $scope.statusesIndex[story.rating];
    };

    $scope.createRating = function() {
        $scope.ratings.push({date: moment().format('YYYY-MM-DD'), comment:'Description pending.', rating:'Ok'});
    };

    $scope.setCurrentStatus = function(status) {
        if(typeof $scope.currentRating !== 'undefined') {
            $scope.currentRating.rating = status.name;
        }
    };
});

angular.bootstrap($('#CourseRater'),['CourseRater']);

//myModule.controller('TimeCtrl', function($scope){
//    $scope.format = 'M/d/yy h:mm:ss a';
//});
//
//myModule.directive('myCurrentTime', function($timeout, dateFilter) {
//    // return the directive link function. (compile function not needed)
//    return function(scope, element, attrs) {
//        var format,  // date format
//            timeoutId; // timeoutId, so that we can cancel the time updates
//
//        // used to update the UI
//        function updateTime() {
//            element.text(dateFilter(new Date(), format));
//        }
//
//        // watch the expression, and update the UI on change.
//        scope.$watch(attrs.myCurrentTime, function(value) {
//            format = value;
//            updateTime();
//        });
//
//        // schedule update in one second
//        function updateLater() {
//            // save the timeoutId for canceling
//            timeoutId = $timeout(function() {
//                updateTime(); // update DOM
//                updateLater(); // schedule another update
//            }, 1000);
//        }
//
//        // listen on DOM destroy (removal) event, and cancel the next UI update
//        // to prevent updating time after the DOM element was removed.
//        element.on('$destroy', function() {
//            $timeout.cancel(timeoutId);
//        });
//
//        updateLater(); // kick off the UI update process.
//    }
//});

