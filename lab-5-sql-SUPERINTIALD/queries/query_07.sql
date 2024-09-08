-- TODO: Update the platform for all 2004 movies to be Netflix.

UPDATE movies
SET platform_id = (
    SELECT id
    FROM platforms
    WHERE name = 'Netflix'
)
WHERE year_of_release = 2004;


/*
UPDATE 3
*/