"use strict";

const express = require("express");
const cors = require("cors");
const repoInfoFetcher = require("./gitApiTools/repoInfoFetcher");

const app = express();
app.use(cors());

app.get("/", function (req, res) {
    res.status(200).send("call /user-repos?userid with valid git userid ");
})

app.get("/user-repos", function (req, res) {

    let user = req.query.user;
    if (!user) {
        return res.status(400).send("please provide user id to fetch repositories");
    }

    repoInfoFetcher.getReposMainInfo(user)
        .then(repoList => {
            res.status(200).send(repoList);
        })
        .catch(err  => {
            console.log(`err while fetching repos for user: ${user} - err: `, err);
            res.status(500).send({err: "could not fetch repos"});
        })

})

app.listen(3000, function () {
    console.log('Repo app listening on port 3000!')
})