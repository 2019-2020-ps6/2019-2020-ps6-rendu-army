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
    console.log(user)
    var setting;
    console.log(user.id)
    setting.light = 100;
    console.log(user)
    setting.color = '#aaaaaa';
    setting.font = '50';
    setting.t2sOn = false;
    setting.id = 1;
    console.log(user)
    user.setting = setting;
    user = User.update(user.id , user.stringify());
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

