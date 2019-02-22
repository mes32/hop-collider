
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const brewingRoleRouter = require('./routes/brewingRole.router');
const countryRouter = require('./routes/country.router');
const hopComparison = require('./routes/hopComparison.router');
const hopsRouter = require('./routes/hops.router');
const userRouter = require('./routes/user.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/brewing_role', brewingRoleRouter);
app.use('/api/country', countryRouter);
app.use('/api/hop_comparison', hopComparison);
app.use('/api/hops', hopsRouter);
app.use('/api/user', userRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
