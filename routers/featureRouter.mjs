import express from 'express';

const router = express.Router();

export default class BugRouter {
  constructor(controller) {
    this.controller = controller;
  }

  router() {
    // insert routes that call functions in the controller
    // have to .bind(this.controller) at the end of each route
    router.get('/', this.controller.getFeatures.bind(this.controller));
    router.post('/new', this.controller.newFeature.bind(this.controller));

    return router;
  }
}
