-- TODO: Verify that the data was correctly inserted into each table.
select count(*) from actors;
select count(*) from platforms;
select count(*) from movies;
select count(*) from genres;
select count(*) from movies_to_actors;
select count(*) from movies_to_genres;







-- select count(*) from actors;

/*
 count
-------
    20
(1 row)

*/
-- select count(*) from platforms;
/*
 count
-------
     7
(1 row)

*/
-- select count(*) from movies;
/*
 count
-------
    26
(1 row)
*/
-- select count(*) from genres;
/*
 count
-------
     8
(1 row)
*/
-- select count(*) from movies_to_actors;
/*
 count
-------
    61
(1 row)
*/
-- select count(*) from movies_to_genres;
/*
 count
-------
    26
(1 row)
*/
