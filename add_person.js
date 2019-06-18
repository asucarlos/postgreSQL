const settings = require("./settings"); // settings.json
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password : settings.password,
      port     : settings.port,
      database : settings.database,
      ssl      : settings.ssl
    }
  });
 
  const famousFirstName = process.argv[2]
  const famousLastName = process.argv[3]
  const famousDOB = process.argv[4]

  knex('famous_people')
  .insert({first_name: famousFirstName, last_name: famousLastName, birthdate: famousDOB})
  .returning('*')
  .then(rows => console.log(rows[0])) 
  .finally(() => {
    knex.destroy();
});
