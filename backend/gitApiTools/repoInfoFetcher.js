const request = require("request");

function getReposMainInfo(user = "") {

    let getRepoListBody = getJsonBodyFromUrl(makeUrlFromUser(user));

    return getRepoListBody.then(extractDataFromRepoList)
        .then(getMyRepoWithForks)
        .then(function (repoForkCounts) {
            console.log("result:", repoForkCounts);
            return repoForkCounts;
        });
}

function getJsonBodyFromUrl(url) {
    const options = gitCallOptions(url);

    return new Promise(function (resolve, reject) {
        request.get(options, function (error, response, body) {
            console.log("options:", options);
            if (error) {
                reject(error);
            }
            if (response && response.statusCode >= 400) {
                console.log("err:", response.statusCode);
                return reject(new Error("response code error:", response.statusCode));
            }
            let bodyObj = {};
            try {
                bodyObj = JSON.parse(body);
                return resolve(bodyObj);
            } catch (err) {
                return reject(err);
            }

        });
    });
}

function extractDataFromRepoList(repoList) {
    let repos = repoList.map((detailedRepo) => ({
        name: detailedRepo.name,
        description: detailedRepo.description,
        language: detailedRepo.language,
        forksUrl: detailedRepo.url,
        starsCount: detailedRepo.stargazers_count

    }));

    return repos;
}
function getMyRepoWithForks(repos) {
    let getRepoForkPromises = repos.map(getForksInfoFromRepo);
    return Promise.all(getRepoForkPromises);
}

function getForksInfoFromRepo(repo) {
    return new Promise(function (resolve, reject) {

        let opts = gitCallOptions(repo.forksUrl);

        request.get(opts, function (error, response, body) {
            if (error) {
                return reject(error);
            }
            let bodyObj = JSON.parse(body);
            let parentForks = 0;
            console.log("fetching data for repo...", repo, "bodyObj:", JSON.stringify(bodyObj, null, 2))
            if (bodyObj.parent) {
                parentForks = bodyObj.parent.forks;
            }
            return resolve(Object.assign({}, {forkCount: parentForks}, repo));

        });
    });
}


function makeUrlFromUser(user) {
    return `https://api.github.com/users/${user}/repos`;
}

function gitCallOptions(url, headers = {"User-Agent": "request"}) {
    return {
        url,
        headers
    };
}

function logError(err) {
    console.log("an error occurred...", err);
}

module.exports = {
    getReposMainInfo
};