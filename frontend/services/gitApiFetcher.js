angular.module("gitApp")
    .factory("gitApiFetcher", ["$http", GitApiFetcher]);

function GitApiFetcher($http) {

    /**
     * Calls backend and gets list of repos for the UI to display
     * Returns a promise that, resolved, gives an representing the repos
     */
    return function (userId) {
        return new Promise(function (resolve, reject) {

            $http({
                method: 'GET',
                url: `http://localhost:3000/user-repos?user=${userId}`
            }).then(function successCallback(response) {
                return resolve(response.data);
            }, function errorCallback(response) {
                return reject(new Error("error in http get, status:" + response.statusCode));
            }).catch(err => {
                return reject(err);
            });
        })


    };

}