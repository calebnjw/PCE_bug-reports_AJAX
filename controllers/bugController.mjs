import BaseController from './baseController.mjs';

export default class BugController extends BaseController {
  constructor(model, db) {
    super(model);
    this.Feature = db.Feature;
  }

  getIndex(request, response) {
    if (request.userLoggedIn) {
      response.render('index');
    } else {
      response.redirect('/user/login')
    }
  }

  async getBugs(request, response) {
    try {
      const bugList = await this.model.findAll({
        include: this.Feature,
        order: ['id'],
      });

      response.send(bugList);
    } catch (error) {
      console.log(error);
    }
  }

  async newBug(request, response) {
    try {
      const { problem, error, feature } = request.body;
      const { id: featureId } = await this.Feature.findOne({ where: { name: feature } });
      // console.log(problem, error, featureId);

      await this.model.create({
        problem,
        errorText: error,
        featureId,
        userId: 1,
      }, { returning: true });
    } catch (error) {
      console.log(error);
    }
  }
}
