-- TODO: Make the column platform_id a FOREIGN KEY in the movies table.
ALTER TABLE movies
ADD CONSTRAINT platform_id FOREIGN KEY (platform_id) REFERENCES platforms (id);


/*

postgres=# -- TODO: Make the column platform_id a FOREIGN KEY in the movies table.
ALTER TABLE movies
ADD CONSTRAINT platform_id FOREIGN KEY (platform_id) REFERENCES platforms (id);
ALTER TABLE

*/