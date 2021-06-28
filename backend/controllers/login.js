const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username }).populate('blogs', { user: 0 })
  console.log(user)

  try{
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.password)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({ token, username: user.username, name: user.name, id: user.id, blogs: user.blogs })
  } catch(err) {
    return response.status(400).json({ error: err })
  }
})

module.exports = loginRouter