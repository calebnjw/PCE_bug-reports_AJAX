import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';

// import model db
import db from './models/index.mjs';

// import controllers
import BugController from './controllers/bugController.mjs';
import FeatureController from './controllers/featureController.mjs';
// import routers
import BugRouter from './routers/bugRouter.mjs';
import FeatureRouter from './routers/featureRouter.mjs';

// initialise controllers
const bugController = new BugController(db.Bug, db);
const featureController = new FeatureController(db.Feature, db);
// initialise routers
const bugRouter = new BugRouter(bugController).router();
const featureRouter = new FeatureRouter(featureController).router();

// Initialise Express instance
const app = express();
// Set the Express view engine to expect EJS templates
app.set('view engine', 'ejs');
// Bind cookie parser middleware to parse cookies in requests
app.use(cookieParser());
// Bind Express middleware to parse request bodies for POST requests
// !!! this is important
app.use(express.json());
// Bind method override middleware to parse PUT and DELETE requests sent as POST requests
app.use(methodOverride('_method'));
// Expose the files stored in the public folder
app.use(express.static('public'));

// use router for routes
app.get('/', (request, response) => response.redirect('/bugs'));
app.use('/bugs', bugRouter);
app.use('/features', featureRouter);

// Set Express to listen on the given port
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log('App is running on Port', PORT));
