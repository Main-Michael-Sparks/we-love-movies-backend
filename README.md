# we-love-movies-backend
An api for a project web app called "we love movies". 
It was written with nodejs and expressjs utilizing RESTful API principles. 
The api has the following endpoints (routes), which fetch data from an SQL database and format the response in JSON.
A live example of the backend is here: https://ms-we-love-movies-backend.herokuapp.com/

Movies endpoint(s):
* /movies - provides "list" of all movies in the database. 
* /movies/:is_showing? - provides a "list" of movies currently showing in theaters.
* /movies/:moveId - provides a "read" of a specific movie and its related data fields. 
* /movies/:movieId/theaters - provides a "read" of a specific movie to access theaters currently playing  that movie. 
* /movies/:movieId/reviews - provides a "read" of a specific movie to access reviews for that movie.
*  
Reviews endpoint:
* /reviews/:reviewId - provides an "update" or  "delete" of a specific review depending on the request method provided. 
* 
Theaters endpoint: 
* /theaters - provides a "list" of theaters with all movies playing at the theater. 

