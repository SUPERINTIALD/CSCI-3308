-- TODO: Find 3 oldest movies. Return only THREE rows.

SELECT movies.name
FROM movies
ORDER BY movies.year_of_release ASC
LIMIT 3;

/*
   name
---------------------------------------
 Mammy
 Angus
 Miguel and William (Miguel y William)
(3 rows)
*/