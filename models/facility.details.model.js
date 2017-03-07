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



exports.getTimeSlots = function(date, facilityId) {
    return query(
            "SELECT * FROM facility_availability where facility_id=$2 and date=$1 order by start_time;", [date, facilityId]
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
