-- TODO: Find the actor who has acted in the maximum number of movies.

SELECT name
FROM actors
WHERE id = (
    SELECT actor_id
    FROM movies_to_actors
    GROUP BY actor_id
    ORDER BY COUNT(movie_id) DESC
    LIMIT 1
);
/*
        name
--------------------
 Leonardo di Caprio
(1 row)
*/