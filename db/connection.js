var pg = require('pg');

var pool = new pg.Pool({
  database: 'aquatics'
});

module.exports = pool;
