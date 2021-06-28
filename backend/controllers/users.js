const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const allUsers = await User.find({}).populate('blogs', { user: 0 })
  response.json(allUsers)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.username || !body.password || body.username.length <=3 || body.password.length<=3){
    return response.status(400).json({ error: 'invalud credentials' })
  }

  const hashedPassword = await bcrypt.hash(body.password, 10)

  try {
    const user = new User({
      username: body.username,
      name: body.name,
      password: hashedPassword
    })

    const savedUser = await user.save()
    response.json(savedUser)
  } catch(err) {
    return response.status(400).json({ error: 'username should be unique' })
  }
})

module.exports = usersRouter