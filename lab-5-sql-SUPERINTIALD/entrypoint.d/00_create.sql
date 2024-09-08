-- TODO: Add your `CREATE` statements to this file.

/* Create a table names products with the mentioned columns
having the datatypes mentioned */


-- DROP TABLE IF EXISTS movies;
-- DROP TABLE IF EXISTS actors;
-- DROP TABLE IF EXISTS platforms;
-- DROP TABLE IF EXISTS genres;
-- DROP TABLE IF EXISTS movies_to_actors;
-- DROP TABLE IF EXISTS movies_to_genres;



CREATE TABLE IF NOT EXISTS movies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    duration SMALLINT,
    year_of_release SMALLINT,
    gross_revenue DECIMAL,
    country VARCHAR(100),
    language VARCHAR(30),
    imdb_rating DECIMAL,
    platform_id INT
);

CREATE TABLE IF NOT EXISTS actors(
  id SERIAL PRIMARY KEY,   /* the primary key for each entry */
  name VARCHAR(100) NOT NULL,
  agency VARCHAR(100),
  active_since INT,
  location VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS platforms(
  id SERIAL PRIMARY KEY,   /* the primary key for each entry */
  name VARCHAR(100) NOT NULL,
  viewership_cost DECIMAL
);

CREATE TABLE IF NOT EXISTS genres(
  id SERIAL PRIMARY KEY,   /* the primary key for each entry */
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS movies_to_actors(
  movie_id INT NOT NULL,
  actor_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS movies_to_genres(
  movie_id INT NOT NULL,
  genre_id INT NOT NULL
);

-- Output
/*


CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE

*/