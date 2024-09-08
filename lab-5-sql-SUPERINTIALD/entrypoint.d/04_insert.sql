-- TODO: Insert atleast 2 rows in each table

/*
\i /data/actors.sql;
\i /data/platforms.sql;
\i /data/movies.sql;
\i /data/genres.sql;
\i /data/movies_to_actors.sql;
\i /data/movies_to_genres.sql;
*/


INSERT INTO actors VALUES (21, 'Riley', 'Boulder', 2004, 'CHINA'), (22, 'Yuri', 'Erie', 2004, 'Japan'); 
INSERT INTO platforms VALUES (9, 'Disney', 1234.70),(10, 'Peacock', 516546.22);
INSERT INTO movies VALUES (27, 'Matrix', 5.2, 2005, 288394, 'California', 'USA', 8.9, 4), (28, 'Terminator', 5.2, 1998, 233234, 'New York', 'USA', 9.9, 4); 
INSERT INTO genres VALUES (9,'Music'), (10,'Literature'); 
INSERT INTO movies_to_actors VALUES (27, 23),(28,32);
INSERT INTO movies_to_genres VALUES   (27, 2), (28, 5);
/*

INSERT 0 2
INSERT 0 2
INSERT 0 2
INSERT 0 2
INSERT 0 2
INSERT 0 2

*/
