'use strict'

const User = use('App/Models/User')

class AuthController {
  async login({ request, response, auth }) {
    const { user } = request.all()
    const logged = await auth.attempt(user.email, user.password)
    return response.json(logged)
  }

  async register({ request, response }) {
    const { user } = request.all()
    const userInstance = new User()

    userInstance.username = user.email,
    userInstance.email = user.email,
    userInstance.password = user.password
    /*await User.create({
      username : user.email,
      email : user.email,
      password: user.password
    })*/

    await userInstance.save()

    return response.json(userInstance)
  }

  async profile ({ request, response, auth }) {
    let user = await auth.getUser()
    const userInput = request.input('user') // const { userInput } = request.all()
    user.email = userInput['email']         // user.email = userInput.email
    user.username = userInput['username']   // user.username = userInput.username
    await user.save()

    const logged = await auth.generate(user, true)

    return response.json(logged)
  }
}

module.exports = AuthController
