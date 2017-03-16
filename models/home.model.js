var pool = require("../db/connection");

exports.getFacilitiesList=function(zipcode){
  return query(
    "SELECT * FROM facilities where zip=$1 and approved='true';",
    [zipcode]
  ).then(function(facilitieslist) {
    return facilitieslist;
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
