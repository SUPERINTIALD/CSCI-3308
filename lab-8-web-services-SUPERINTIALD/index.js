// *****************************************************
// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require('express'); // To build an application server or API
const app = express();
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const path = require('path');
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const bodyParser = require('body-parser');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcrypt'); //  To hash passwords
const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part C.

// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
});

// database configuration
const dbConfig = {
  host: 'db', // the database server
  port: 5432, // the database port
  database: process.env.POSTGRES_DB, // the database name
  user: process.env.POSTGRES_USER, // the user account to connect with
  password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
  .then(obj => {
    console.log('Database connection successful'); // you can view this message in the docker compose logs
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });

// *****************************************************
// <!-- Section 3 : App Settings -->
// *****************************************************

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.

// initialize session variables
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// *****************************************************
// <!-- Section 4 : API Routes -->
// *****************************************************

// TODO - Include your API routes here
app.get('/', (req, res) => {
  res.render('login');
});
app.get('/register', (req, res) => {
  res.render('pages/register');
});
app.post('/register', async (req, res) => {
  // Hash the password using bcrypt library
  const hash = await bcrypt.hash(req.body.password, 10);

  // Insert username and hashed password into the 'users' table
  await db.none('INSERT INTO users(username, password) VALUES($1, $2)', [req.body.username, hash])
    .then(() => {
      res.redirect('/login');
    })
    .catch(error => {
      console.error(error);
      res.redirect('/register');
    });
});
// app.post('/register', async (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   const query = 'SELECT * FROM users WHERE username = $1 LIMIT 1';
//   const values = [username];

//   db.oneOrNone(query, values)
//     .then(user => {
//       if (user) {
//         console.log('Username already exists');
//         res.render('pages/register', { errorMessage: 'Username already exists.' }); // Render the 'register' page with an error message
//       } else {
//         bcrypt.hash(password, 10)
//           .then(hash => {
//             return db.none('INSERT INTO users(username, password) VALUES($1, $2)', [username, hash]);
//           })
//           .then(() => {
//             res.redirect('/login');
//           })
//           .catch(error => {
//             console.error(error);
//             res.redirect('/register');
//           });
//       }
//     })
//     .catch(error => {
//       console.error(error);
//       res.redirect('/register');
//     });
// });

app.get('/login', (req, res) => {
    res.render('pages/login');
});
    
app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const query = 'SELECT * FROM users WHERE username = $1 LIMIT 1';
  const values = [username];

  db.oneOrNone(query, values)
    .then(user => {
    if (user) {
      bcrypt.compare(password, user.password)
      .then(match => {
        if (match) {
        req.session.user = {
          username: user.username,
        };
        req.session.save();
        res.redirect('/discover');
        } else {
        res.render('pages/login', { errorMessage: 'Incorrect username or password.' });
        }
      })
      .catch(err => {
        console.log(err);
        res.redirect('/login');
      });
    } else {
      res.redirect('/register');
    }
    })
    .catch(err => {
    // If the database request fails, send an appropriate message to the user and render the login.hbs page
    console.log(err);
    res.render('pages/login', { errorMessage: 'An error occurred. Please try again.' });
    });
});
  
  // Authentication middleware.
  const auth = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    next();
  };
  
  app.use(auth);


// Discover ROUTE: GET

app.get('/discover', (req, res) => {
  axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
    params: {
      apikey: process.env.API_KEY,
      city: 'boulder, denver',
    },
  })
    .then(response => {
      const results = response.data._embedded ? response.data._embedded.events.slice(0, 12) : [];
      res.render('pages/discover', { events: results });
      console.log('API call successful');
    })
    .catch(error => {
      console.error('Error fetching events:', error);
      res.render('pages/discover', { events: [], error: 'Failed to fetch events from Ticketmaster API' });
    });
});




app.get('/logout', (req, res) => {
  req.session.destroy();
  res.render('pages/logout');
});

// *****************************************************
// <!-- Section 5 : Start Server-->
// *****************************************************
// starting the server and keeping the connection open to listen for more requests
app.listen(3000);
console.log('Server is listening on port 3000');