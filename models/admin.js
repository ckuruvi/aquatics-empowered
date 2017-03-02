var pool = require("../db/connection");

exports.getFacilitiesList = function(){
  console.log('Inside query');
  return query(
    "SELECT name, city, approved FROM facilities;"
  ).then(function(facilitiesList) {
    console.log('Returning facilities from db', facilitiesList);
    return facilitiesList;
  })
  .catch(function(err) {
    console.log("Error getting facilities list", err);
  });
}


function query(sqlString, data) {
  return new Promise(function(resolve, reject) {
    pool.connect(function(err, client, done) {
      try {
        if (err) {
          return reject(err);
        }

        client.query(sqlString, data, function(err, result) {
          if (err) {
            return reject(err);
          }

          resolve(result.rows);
        });
      } finally {
        done();
      }
    });
  });
}
