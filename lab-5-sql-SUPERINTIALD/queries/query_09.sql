-- TODO: Actor with the overall highest revenue?

SELECT actors.name, SUM(movies.gross_revenue) AS revenue
FROM actors
JOIN movies_to_actors ON actors.id = movies_to_actors.actor_id
JOIN movies ON movies_to_actors.movie_id = movies.id
GROUP BY actors.id
ORDER BY revenue DESC
LIMIT 1;

/*
        name        |  revenue
--------------------+-----------
 Leonardo di Caprio | 298665119
(1 row)
*/