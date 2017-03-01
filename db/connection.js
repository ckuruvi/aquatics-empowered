var pg = require('pg');

var pool = new pg.Pool({
  database: 'passport'
});

module.exports = pool;
