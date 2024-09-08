// ************************************************
// <!-- Section 1 : Dependencies-->
// ************************************************

// importing the dependencies
// Express is a NodeJS framework that, among other features, allows us to create HTML templates.
const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
require('dotenv').config();

// ************************************************
// <!-- Section 2 : Initialization-->
// ************************************************

// defining the Express app
const app = express();
// using bodyParser to parse JSON in the request body into JS objects
app.use(bodyParser.json());
// Database connection details
const dbConfig = {
  host: 'db',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};
// Connect to database using the above details
const db = pgp(dbConfig);

// ************************************************
// <!-- Section 3 : TODOs Enpoint Implementation-->
// ************************************************

// <!-- Endpoint 1 :  GET Endpoint Implementation (Default) -->
const message = 'Hey there!';
app.get('/', (req, res) => {
  res.send(message);
});

// <!-- Endpoint 2 : GET Endpoint Implementation -->
app.get('/getTop3Trails', function (req, res) {
  var state = req.query.state;
  const query = 'SELECT name FROM trails WHERE location = \'California\' ORDER BY avg_rating DESC LIMIT 3;';
  db.any(query)
    .then(function(data){
      res.status(200).json({
        status: 'success',
        data:data,
        message: 'get data success'
      });
    })
    .catch(function(err) {
      return console.log(err);
    });
});

// <!-- Endpoint 3 : POST Endpoint Implementation -->
app.post('/addReview', function (req, res) {


  // <!-- Add Employee ("/add_employee") -->
// app.post('/add_employee', function (req, res) {
//   const query =
//     'insert into employees (name, email, city) values ($1, $2, $3)  returning * ;';
//   db.any(query, [req.body.name, req.body.email, req.body.city])
//     // if query execution succeeds, send success message
//     .then(function (data) {
//       res.status(201).json({
//         status: 'success',
//         data: data,
//         message: 'data added successfully',
//       });
//     })
//     // if query execution fails, send error message instead
//     .catch(function (err) {
//       console.error(
//         'Internal Server Error (HTTP 500): Oops! Something went wrong! Please check your code and try again.',
//         error
//       );
//       res.status('500').json({
//         error,
//       });
//     });
// });
  if(req.body.review && req.body.img){ //If there exists a image and review
    var query1 = 'insert into reviews (username, review, rating) values ($1, $2, $3) returning review_id;';
    var query2 = 'insert into images (image_url, image_caption) values ($1, $2) returning image_id;';
    var queryCombined = 'insert into reviews_to_images (image_id, review_id) values ($1, $2);';
    db.task('do-everything', task => {
      return task.batch([task.any(query1, [
        req.body.username,
        req.body.rating,
        req.body.review,
      ]), task.any(query2, [
        req.body.image_url,
        req.body.image_caption,
      ]), task.any(queryCombined,[
        query1,
        query2,
      ])]);
    })
    .then(function (data) {
      res.status(201).json({
        status: 'success',
        data: data,
        message: 'data added successfully',
      });
    })
    .catch(function (err) {
      return console.log(err);
    });
  }
  else if(req.body.review){ //If no image:
    var reviewQuery = 'insert into reviews (username, review, rating) values ($1, $2, $3) returning review_id;';
    db.task('do-everything', task => {
      return task.batch([task.any(reviewQuery,[
        req.body.username,
        req.body.review,
        req.body.rating,
      ])]);
    })
    .then(function (data) {
      res.status(201).json({
        status: 'success',
        data: data,
        message: 'data added successfully',
      });
    })
    .catch(function (err) {
      return console.log(err);
    });
  }
});

  

// <!-- Endpoint 4 : PUT Endpoint Implementation -->
app.put('/updateReview', function (req, res) {
  var query1 = ";",
  query2 = ";",
  query3 = ";",
  query4 = ";";
  if((req.body.image_id) && (req.body.review_id)){//if exists
    if (req.body.image_url) {//if exists
       query1 = `update images set image_url = '${req.body.image_url}' where image_id = ${req.body.image_id} returning * ;`;
    }
    if (req.body.image_caption) {//if exists
       query2 = `update images set image_caption = '${req.body.image_caption}' where image_id = ${req.body.image_id} returning * ;`;
    }
    if (req.body.review) {//if exists
      query3 = `update reviews set review = '${req.body.review}' where review_id = ${req.body.review_id} returning * ;`;
    }
    if (req.body.rating) {//if exists
      query4 = `update reviews set rating = ${req.body.rating} where review_id = ${req.body.review_id} returning * ;`;
    }
  }
  db.task("add-everything", (task) => {
    return task.batch([
      task.any(query1),
      task.any(query2),
      task.any(query3),
      task.any(query4),
    ]);
  })
    .then(function (data) {
      res.status(201).json({
        status: "success",
        data : data,
        message: "data updated successfully",
      });
    })
    .catch(function (err) {
      return console.log(err);
    });
});
// <!-- Endpoint 5 : DELETE Endpoint Implementation -->
app.delete('/deleteReview', function (req, res) {
  if(req.body.username){ //if username is chosen
    const query = 'delete from reviews where username = $1 returning * ;';

    db.task('do-everything', task => {
      return task.batch([task.any(query, [
        req.body.username,
      ])]);
    })
    .then(function (data) {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'data deleted successfully',
      });
    })
    .catch(function (err) {
      return console.log(err);
    });
  }else if(req.body.review_id){ // if review_id is chosen
    const query = 'delete from reviews where review_id = $1 returning * ;';

    db.task('do-everything', task => {
      return task.batch([task.any(query, [
        req.body.username,
      ])]);
    })
    .then(function (data) {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'data deleted successfully',
      });
    })
    .catch(function (err) {
      return console.log(err);
    });
  }else if(req.body.rating){ // if rating is chosen
    const query = 'delete from reviews where rating = $1 returning * ;';
    db.task('do-everything', task => {
      return task.batch([task.any(query, [
        req.body.username,
      ])]);
    })
    .then(function (data) {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'data deleted successfully',
      });
    })
    .catch(function (err) {
      return console.log(err);
    });
  }
});

// <!-- Endpoint 6 : GET Endpoint Implementation -->
app.get('/getTrails', function (req, res) {
  var difficulty = req.body.difficulty;
  var location = req.body.location;
  if (typeof difficulty === 'number') { //Checks to see if it is number, then makes it "string"
    switch (difficulty) {
      case 1:
        difficulty = "easy";
        break;
      case 2:
        difficulty = "moderate";
        break;
      case 3:
        difficulty = "difficult";
        break;
      case 4:
        difficulty = "very_difficult";
        break;
    }
  }
  if(difficulty && location){
    var query = 'select * from trails where difficulty = $1 and location = $2;';
      db.task('do-everything', task => {
        return task.batch([task.any(query, [
          difficulty,
          location,
        ])]);
      })
      .then(function (data) {
        res.status(200).json({
          data: data,
        });
      })
      .catch(function (err) {
        return console.log(err);
      });
    }
  else if(difficulty){
    const query = 'select * from trails where difficulty = $1;';
      db.task('do-everything', task => {
        return task.batch([task.any(query, [
          difficulty,
        ])]);
      })
      .then(function (data) {
        res.status(200).json({
          status: 'success',
          data: data,
          message: 'get data successful',
        });
      })
      .catch(function (err) {
        return console.log(err);
      });
    }
    else if(req.body.location){ //Just location
      const query = 'select * from trails where location = $1;';
        db.task('do-everything', task => {
          return task.batch([task.any(query, [
            req.body.location,
          ])]);
        })
        .then(function (data) {
          res.status(200).json({
            status: 'success',
            data: data,
            message: 'get data successful',
          });
        })
        .catch(function (err) {
          return console.log(err);
        });
      }
});

// <!-- Endpoint 7 : GET Endpoint Implementation -->
app.get('/getReviewsByTrailID', function (req, res) {
  const query = `select * from reviews
              join trails_to_reviews
              on reviews.review_id = trails_to_reviews.review_id
              where trails_to_reviews.trail_id = '${req.query.trail_id}';`;
  db.any(query)
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch(function (err) {
      return console.log(err);
    });
});

// ************************************************
// <!-- Section 4 : Start Server-->
// ************************************************
// starting the server and keeping the connection open to listen for more requests
app.listen(3000, () => {
  console.log('listening on port 3000');
});
