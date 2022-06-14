import express from 'express';

const router = express.Router();

export default class UserRouter {
  constructor(controller) {
    this.controller = controller;
  }

  router() {
    // insert routes that call functions in the controller
    // have to .bind(this.controller) at the end of each route
    router.get('/login', this.controller.getLogin.bind(this.controller));
    router.post('/login', this.controller.getUser.bind(this.controller));
    router.get('/signup', this.controller.getSignup.bind(this.controller));
    router.post('/signup', this.controller.newUser.bind(this.controller));

    return router;
  }
}
