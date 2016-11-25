app.controller("gameController", ["$q", "$scope", "$stateParams", "store", "socketService", "$rootScope", "$timeout",
    function($q, $scope, $stateParams, store, socketService, $rootScope, $timeout) {
        $scope.data = $rootScope.data;
        
        $scope.animateIn = function() {
            $timeout(function() {
                $('.blue-team').removeClass('loading');
            }, 0);
            $timeout(function() {
                $('.red-team').removeClass('loading');
            }, 150);
        };

        $scope.animateOut = function() {
            $timeout(function() {
                $('.red-team').addClass('loading');
            }, 0);
            $timeout(function() {
                $('.blue-team').addClass('loading');
            }, 150);
            return $timeout(function() {
                $rootScope.socket.emit('state', 'ANIMATE_OUT_FINISHED')
            }, 350);
        };

        $scope.$watch(function() {
            return $rootScope.sponsorLogo;
        }, function() {
            $scope.logo = "assets/img/" + $rootScope.sponsorLogo;
        }, true);

        $scope.$watch(function() {
            return $rootScope.data;
        }, function() {
            $scope.data = $rootScope.data;
        }, true);

        $rootScope.socket.on("animateOut", function() {
            if($rootScope.activeView.overlay == "ingame") $scope.animateOut();
        });

        $scope.animateIn();
        
    }]);