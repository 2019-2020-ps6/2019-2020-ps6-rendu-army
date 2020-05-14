const { Router } = require('express')

const { Game } = require('../../models')

const router = new Router()

router.get('/:gameId', (req,res) => {
  try{

    const game = Game.getById(req.params.gameId)
    res.status(200).json(game)

  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {      

    try {
      const game = Game.create({ ...req.body })
      res.status(201).json(game)
    } catch (err) {
      if (err.name === 'ValidationError') {
        res.status(400).json(err.extra)
      } else {
        res.status(500).json(err)
      }
    }
})

router.put('/:gameId', (req, res) => {
  try{
    const game = Game.update(req.params.gameId, { ...req.body })
    game.step++;
    res.status(201).json(game)
  } catch (err) {
    if(err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    }
    else{
      res.status(500).json(err)
    }
  }
})

router.delete('/:gameId', (req,res) => {
  try{
    res.status(200).json(Game.delete(req.params.gameId))
  } catch (err){
    res.status(500).json(err)
  }
})

module.exports = router

