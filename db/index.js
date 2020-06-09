const { Pool, Client } = require('pg');
const connectionString = 'postgressql://postgres:@localhost:5432/coaches_cage';

const client = new Client({
  connectionString: connectionString
})

client.connect()
module.exports.client = client;
