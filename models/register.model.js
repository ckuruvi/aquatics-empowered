var pool = require("../db/connection");
var bcrypt = require("bcrypt");
var SALT_ROUNDS = 10;

// find by username
exports.findByUsername = function(username) {
  return query("SELECT * FROM users WHERE username = $1", [ username ])
    .then(function(users) {
      return users[0];
    })
    .catch(function(err) {
      console.log("Error finding user by username", err);
    });
};

// find by id
exports.findById = function(id) {
  return query("SELECT * FROM users WHERE id = $1", [ id ])
    .then(function(users) {
      return users[0];
    })
    .catch(function(err) {
      console.log("Error finding user by id", err);
    });
};

// compare password
// takes a username and a password, looks up the user by the given username
// and returns promise which resolves to a boolean indicating whether the
// passwords matched
exports.findAndComparePassword = function(username, password) {
  return exports.findByUsername(username).then(function(user) {
    return bcrypt
      .compare(password, user.password)
      .then(function(match) {
        return { match: match, user: user };
      })
      .catch(function(err) {
        return false;
      });
  });
};

exports.createUser = function(email, password, userType, firstName, lastName, phone, address, city, state, zipcode) {
  return bcrypt
    .hash(password, SALT_ROUNDS)
    .then(function(hash) {
      return query(
        "INSERT INTO users (username, password, user_type, first_name, last_name, phone_number, street_address, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [ email, hash, userType, firstName, lastName, phone, address, city, state, zipcode]
      ).then(function(users) {
        console.log('users[0] is ', users[0]);
        return users[0];
      });
    })
    .catch(function(err) {
      console.log("Error creating user", err);
    });
};

// updates user info in the db
exports.updateUser = function(user) {
  return query(
    "UPDATE users SET username=$2, first_name=$3, last_name=$4, street_address=$5, city=$6, state=$7, phone_number=$8 WHERE id = $1 RETURNING *",
    [user.id, user.username, user.first_name, user.last_name, user.street_address, user.city, user.state, user.phone_number]
  ).then(function(user) {
    console.log('user returned from DB after update ', user[0]);
    return user[0];
  }).catch(function(err) {
    console.log('error updating user in the DB ', err);
  });
}

exports.createFacility = function(id, name, address, city, state, zipcode, description, level, cost, image_url) {
      return query(
        "INSERT INTO facilities (users_id, name, street_address, city, state, zip, description, level, cost, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [id, name, address, city, state, zipcode, description, level, cost, image_url]
      ).then(function(facilities) {
        return facilities[0];
      }).catch(function(err) {
      console.log("Error creating facility", err);
    });
};


// exports.create('test', '1234').then(function() {
//   console.log('Created a test user');
// });
// exports.findByUsername('test').then(function(user){
//   console.log(user);
// })
// exports.findById('2').then(function(user){
//   console.log(user);
// });
// exports.findAndComparePassword("test", "12345").then(function(match) {
//   console.log("Passwords match", match);
// });
// query("SELECT * FROM users")
//   .then(function(result) {
//     console.log(result.rows);
//   })
//   .catch(function(err) {
//     console.log("Error running test query", err);
//   });
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
//