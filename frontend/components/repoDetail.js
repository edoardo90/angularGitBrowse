(function(angular) {
    "use strict";
    angular.module("gitApp").component("repoDetail", {
        templateUrl: "/components/repoDetail.html",
        bindings: {
            repo: "<"
        }
    });
})(window.angular);
