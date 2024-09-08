-- TODO: Actors from Missouri that starred in a Romcom ordered by name.

CREATE VIEW actors_from_missouri AS
SELECT actors.id AS actor_id, actors.name AS actor_name
FROM actors
JOIN movies_to_actors ON actors.id = movies_to_actors.actor_id
JOIN movies ON movies_to_actors.movie_id = movies.id
WHERE actors.location = 'Missouri';

CREATE VIEW romcom_movies AS
SELECT movies.id AS movie_id, movies.name AS movie_name
FROM movies
JOIN movies_to_genres ON movies.id = movies_to_genres.movie_id
JOIN genres ON movies_to_genres.genre_id = genres.id
WHERE genres.name = 'Romcom';

SELECT DISTINCT a.actor_name AS name
FROM actors_from_missouri a
JOIN movies_to_actors ma ON a.actor_id = ma.actor_id
JOIN romcom_movies r ON ma.movie_id = r.movie_id
ORDER BY a.actor_name;

/*
  name
---------
 Malachi
(1 row)
*/