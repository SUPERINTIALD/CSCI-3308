-- TODO: Find the platform with the most movies.

SELECT platforms.name, COUNT(*) AS count
FROM platforms
JOIN movies ON platforms.id = movies.platform_id
GROUP BY platforms.name
ORDER BY count DESC
LIMIT 1;

/*
  name   | count
---------+-------
 Netflix |     9
(1 row)
*/