-- TODO: Find ALL the movies starring "Leonardo di Caprio".
--Hint: Join the movies & actors tables by using any necessary join operation required to combine both. Filter rows where the actor’s name is "Leonardo di Caprio".


SELECT movies.name
FROM movies
JOIN movies_to_actors ON movies.id = movies_to_actors.movie_id
JOIN actors ON actors.id = movies_to_actors.actor_id
WHERE actors.name = 'Leonardo di Caprio';

/*

                  name
-----------------------------------------
 Midsummer Night's Sex Comedy, A
 Secret Honor
 Ballad of a Soldier (Ballada o soldate)
 Satan's Tango (Sátántangó)
 Miracle
 Smoke Signals
 Shutter Island
(7 rows)

*/