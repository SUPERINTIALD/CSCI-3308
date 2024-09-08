-- TODO: Get movies available on Hulu orderd by id.


SELECT s.name
FROM movies s
JOIN platforms p ON s.platform_id = p.id
WHERE p.name = 'Hulu'
ORDER BY s.id;

/*
                             name
---------------------------------------------------------------
 Shadow Riders, The
 Saban, Son of Saban
 Smoke Signals
 American History X
 Cabinet of Dr. Caligari, The (Cabinet des Dr. Caligari., Das)
 Dawn Rider, The
(6 rows)
*/