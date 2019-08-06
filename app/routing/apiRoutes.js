
const friendInfo = require("../data/friends");


module.exports = (app) => {

    app.get("/api/friends", (req, res) => {
        res.json(friendInfo);
    });

    app.post("/api/friends", (req, res) => {
        let userScore = req.body.scores;
        const scoresArr = [];
        let bestMatch = 0;


        for (var i = 0; i < friendInfo.length; i++) {
            var scoreDiff = 0;
            for (var j = 0; j < userScore.length; j++) {
                scoreDiff += (Math.abs(parseInt(friendInfo[i].scores[j]) - parseInt(userScore[j])))
            }
            scoresArr.push(scoreDiff);
        }

        for (var i = 0; i < scoresArr.length; i++) {
            if (scoresArr[i] <= scoresArr[bestMatch]) {
                bestMatch = i;
            }
        }

   
        let potentialMate = friendInfo[bestMatch];
        res.json(potentialMate);
        friendInfo.push(req.body)

    });


    app.post("/api/clear", (req, res) => {

        friendInfo.length = [];
        res.json({
            ok: true
        });
    });
};