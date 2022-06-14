import BaseController from './baseController.mjs';

export default class FeatureController extends BaseController {
  constructor(model, db) {
    super(model);
    this.Bug = db.Bug;
  }

  async getFeatures(request, response) {
    const featureList = await this.model.findAll();

    response.send(featureList);
  }

  async newFeature(request, response) {
    try {
      const { name } = request.body;
      console.log('NAME:', name);

      await this.model.create({
        name,
      }, { returning: true });
    } catch (error) {
      console.log(error);
    }
  }
}
