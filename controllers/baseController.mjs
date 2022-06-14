export default class BaseController {
  constructor(model) {
    this.model = model;
  }

  // helper functions
  loginRedirect(request, response) {
    // if not logged in, send to login page
    if (!request.cookies.userID) {
      console.log('Not logged in, redirecting to login page.')
      response.status(403).redirect('/user/login');
    }
  }
}
