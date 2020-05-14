const { Game } = require('../models')

module.exports.getGameByUserId = function getGameByUserId(userId){

    games = Game.get().filter(function (game) {

        return game.userId == userId
    })

    if(games.length == 0)
        return null;

    games.sort((a,b) => b.id - a.id)
    return games;
}

module.exports.getGameByUserIdNotFinish = function getGameByUserIdNotFinish(userId){

    games = Game.get().filter(function (game) {
   
        return game.userId == userId && !game.isFinish
    })
   
    if(games.length == 0)
        return null;
    return games[0];

}