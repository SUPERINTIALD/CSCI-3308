-- TODO: Find the highest rated movie.
-- If there is a tie, return only one of highest rated movies.
SELECT movies.name
FROM movies
ORDER BY imdb_rating DESC
LIMIT 1;
/*
     name
--------------
 Secret Honor
(1 row)
*/