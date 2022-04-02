const knex = require("../db/connection");

// class and method for taileredReducer
class Theater {

  constructor(address_line_1, address_line_2, city, name, state, zip) {

    this.address_line_1 = address_line_1,
    this.address_line_2 = address_line_2,
    this.city = city,
    this.movies = [],
    this.name = name,
    this.state = state,
    this.zip = zip

  };

  movie(rating, runtime_in_minutes, title) {

    return this.movies = [
      ...this.movies,
      {
        "rating": rating,
        "runtime_in_minutes": runtime_in_minutes,
        "title": title,
      },
    ];

  }

};

// tailered reduce function to format the database res 
function taileredReducer(databaseArr){

    return databaseArr.reduce((arr,dbElement)=>{

        const theater = new Theater(
            dbElement.address_line_1,
            dbElement.address_line_2,
            dbElement.city,
            dbElement.name,
            dbElement.state,
            dbElement.zip
            );

            if (dbElement.theater_id === 1){
                if(arr.length < 1) {
                    console.log(arr.length)
                    theater.movie(dbElement.rating, dbElement.runtime_in_minutes, dbElement.title)
                    arr.push(theater) 
                    return arr
                }

               arr[0].movies.push(...theater.movie(dbElement.rating, dbElement.runtime_in_minutes, dbElement.title));
               return arr;
            }

            if (dbElement.theater_id === 2){
                if(arr.length < 2) {
                    console.log(arr.length)
                    theater.movie(dbElement.rating, dbElement.runtime_in_minutes, dbElement.title)
                    arr.push(theater) 
                    return arr
                }

               arr[1].movies.push(...theater.movie(dbElement.rating, dbElement.runtime_in_minutes, dbElement.title));
               return arr;
            }

            if (dbElement.theater_id === 3){
                if(arr.length < 3) {
                    console.log(arr.length)
                    theater.movie(dbElement.rating, dbElement.runtime_in_minutes, dbElement.title)
                    arr.push(theater) 
                    return arr
                }

               arr[2].movies.push(...theater.movie(dbElement.rating, dbElement.runtime_in_minutes, dbElement.title));
               return arr;
            }

        return arr
},[]);

};

// call db for a list of theaters and movies showing at each theater
function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("t.*", "m.*")
    .orderBy("t.theater_id");
}

module.exports = {
  list,
  taileredReducer,
};