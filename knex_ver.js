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

  knex('famous_people').select('id', 'first_name', 'last_name', knex.raw('TO_CHAR(birthdate, \'YYYY-MM-DD\') as birthdate'))
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
    for(row of rows) {
        console.log(`${row['id']} : ${row['first_name']} ${row['last_name']} , born \' ${row['birthdate']} \'`)
    }
    })
    .finally(() => {
            knex.destroy();
        });


//promise ver.

//   knex.select('*').from('famous_people')
//   .then((rows) => {
//     for (row of rows) {
//         console.log(`${row['id']} ${row['first_name']} ${row['last_name']}`);
//     }
// }).catch((err) => { console.log( err); throw err })
// .finally(() => {
//     knex.destroy();
// });
