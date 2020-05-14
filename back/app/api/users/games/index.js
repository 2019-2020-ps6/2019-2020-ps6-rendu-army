const { Router } = require('express')

const game_helper = require('../../../utils/game-helper')

const router = new Router({mergeParams: true})

router.get('/', (req,res) => {
  try{

    const games  = game_helper.getGameByUserId(req.params.userId)
    if(games != null)
      res.status(200).json(games)

    else
      res.status(200).json()
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/notFinish', (req,res) => {
  try{

    const game  = game_helper.getGameByUserIdNotFinish(req.params.userId)
    if(game != null)
      res.status(200).json(game)

    else
      res.status(200).json()
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router