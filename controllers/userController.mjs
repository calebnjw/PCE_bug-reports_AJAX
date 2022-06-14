import BaseController from './baseController.mjs';

export default class UserController extends BaseController {
  constructor(model, db) {
    super(model);
    this.Bug = db.Bug;
  }

  getLogin(request, response) {
    response.render('login');
  }

  getSignup(request, response) {
    response.render('signup');
  }

  async getUser(request, response) {
    const { email, password } = request.body;

    const user = await this.model.findOne({ where: { email } });
    if (user.password === password) {
      console.log('User match');
      response.cookie('loggedIn', true);
      response.cookie('userID', user.id);

      response.send({ loggedIn: true });
    }
  }

  async newUser(request, response) {
    try {
      const { name } = request.body;
      console.log(name);

      await this.model.create({
        name,
      }, { returning: true });
    } catch (error) {
      console.log(error);
    }
  }
}
