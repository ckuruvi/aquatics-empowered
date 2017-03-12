var pool = require("../db/connection");

exports.getFacilityId = function(userId) {
    return query(
            "SELECT id FROM facilities where users_id=$1 ;", [userId]
        ).then(function(facilityId) {
            return facilityId[0].id;
        })
        .catch(function(err) {
            console.log("Error getting facility Id", err);
        });
}

  // get facility info by users_id
exports.getFacilityInfo = function(userId) {
  console.log('userId passed to model is: ', userId);
    return query(
            "SELECT * FROM facilities where users_id=$1;", [userId]
        ).then(function(facility) {
          console.log('facility[0] is', facility[0]);
            return facility[0];
        })
        .catch(function(err) {
            console.log("Error getting facility Id", err);
        });
}




exports.getUserDetails = function(userId) {
    return query(
            "SELECT * FROM users where id=$1 ;", [userId]
        ).then(function(facilityId) {
            return facilityId[0];
        })
        .catch(function(err) {
            console.log("Error getting user details", err);
        });
}

exports.getTimeSlots = function(date, facilityId) {
    return query(
      "SELECT fa.id facility_availability_id,fa.date,fa.start_time,fa.end_time,fr.id facility_reservation_id,fr.reservation_id user_id, fr.approved approved "+
"FROM facility_availability fa LEFT JOIN facility_reservation fr ON fa.id=fr.facility_availability_id WHERE fa.date=$1 and fa.facility_id=$2;",
             [date, facilityId]
        ).then(function(timeSlotList) {
            return timeSlotList;
        })
        .catch(function(err) {
            console.log("Error getting time slot list", err);
        });
}

exports.setTimeSlots = function(facilityId, date, startTime, endTime) {
    console.log("facilityId,date,startTime,endTime ::", facilityId, date, startTime, endTime);
    return query(
            "INSERT INTO facility_availability(facility_id,date,start_time,end_time) values ($1,$2,$3,$4);", [facilityId, date, startTime, endTime]
        ).then(function(facilityId) {
            return facilityId;
        })
        .catch(function(err) {
            console.log("Error getting facility Id", err);
        });
}


exports.deleteTimeSlot = function(id) {
    return query(
            "DELETE from facility_availability where id=$1 RETURNING *", [id]
        ).then(function(users) {
            return users[0];
        })
        .catch(function(err) {
            console.log("Error deleting  timeslots", err);
        });
};

//updates facility
exports.updateFacility = function (fac) {
  return query(
    "UPDATE facilities SET name=$2, street_address=$3, city=$4, state=$5, zip=$6, description=$7, level=$8, image_url=$9, cost=$10 WHERE id = $1 RETURNING *",
    [fac.id, fac.name, fac.street_address, fac.city, fac.state, fac.zip, fac.description, fac.level, fac.image_url, fac.cost]
  ).then(function(facility) {
    console.log('facility returned from db after update ', facility[0]);
    return facility[0];
  }).catch(function(err) {
    console.log('error updating facilities', err);
  })
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
