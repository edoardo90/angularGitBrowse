(function () {
    "use strict";
    angular.module("gitApp", []).controller("MainCtrl", ["$scope", "$rootScope", "$log", "gitApiFetcher", MainCtrl]);

    function MainCtrl($scope, $rootScope, $log, gitApiFetcher) {
        var MainCtrl = this;
        MainCtrl.userId = "mario";
        MainCtrl.repos = [];

        MainCtrl.$onInit = function () {
            $log.log("init!");
        };

        MainCtrl.$onChanges = function () {
          console.log("good");
        };

        MainCtrl.searchRepos = function (userId) {
            $log.log("userID:", userId);

            gitApiFetcher(userId).then(function (repositories) {
                MainCtrl.repos = repositories;
                $rootScope.$digest();
            }).catch(function (err) {
                $log.error("an error occurred while fetching repos: ", err);
            });
        };

    }

})();