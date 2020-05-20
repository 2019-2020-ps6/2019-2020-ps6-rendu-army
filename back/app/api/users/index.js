const { Router } = require('express')

const { User } = require('../../models')
const GameRouter = require('./games')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(User.get())
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:userId', (req,res) => {
  try{
    res.status(200).json(User.getById(req.params.userId))
  } catch (err) {
    res.status(500).json(err)
  }
})


router.post('/', (req, res) => {
  try {
    var user = User.create({ ...req.body })
    var setting = {};
    setting.font = '50'
    setting.id = user.id
    setting.color = '#f2f2f2'
    setting.light = 100
    setting.t2sOn = false
    user.setting = setting

    user = User.update(user.id + '' , user)
    res.status(201).json(user)

  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})


router.delete('/:userId', (req,res) => {
  try{
    res.status(200).json(User.delete(req.params.userId))
  } catch (err){
    res.status(500).json(err)
  }
})

router.put('/:userId', (req, res) => {
  
  try{
    console.log({ ...req.body })
    const user = User.update(req.params.userId, { ...req.body })
    res.status(201).json(user)
  } catch (err) {
    if(err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    }
    else{
      res.status(500).json(err)
    }
  }
  
})

router.use('/:userId/games', GameRouter)

module.exports = router

