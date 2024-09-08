-- TODO: Top 3 highest grossing thriller movies.

SELECT movies.name
FROM movies
JOIN movies_to_genres ON movies.id = movies_to_genres.movie_id
JOIN genres ON movies_to_genres.genre_id = genres.id
WHERE genres.name = 'Thriller'
ORDER BY movies.gross_revenue DESC
LIMIT 3;

/*

      name      
----------------
 Shutter Island
 Mammy
 Cover-Up
(3 rows)
*/