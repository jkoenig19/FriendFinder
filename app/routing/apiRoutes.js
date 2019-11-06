var friendsData = require("../data/friends.js");

module.exports = function(app){
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {

        var totalDifference = 0;
        var nextTotalDifference = 0;
        var closestMatch;

        for (var i=0; i<10; i++){
            totalDifference += Math.abs(req.body.scores[i] - friendsData[0].scores[i]);
        };
        closestMatch = friendsData[0];
        for (var i=1; i<friendsData.length; i++){
            for (var j=0; j<10; j++){
                nextTotalDifference += Math.abs(req.body.scores[j] - friendsData[i].scores[j]);
            };
            if (nextTotalDifference <= totalDifference){
                totalDifference = nextTotalDifference;
                closestMatch = friendsData[i];
            }
            nextTotalDifference = 0;
        };
        friendsData.push(req.body);
        res.json(closestMatch);
    });
};