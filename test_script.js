const { Client } = require('pg');
const settings = require("./settings"); // settings.json

const famousFirstName = process.argv[2]
const client = new Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT id, first_name, last_name, TO_CHAR(birthdate, 'YYYY-MM-DD') as birthdate FROM famous_people WHERE famous_people.first_name = $1`, [famousFirstName], (err, res) => {
    if (err) {
      return console.error("error running query", err);
    } else {
        console.log('searching...')
        console.log('Found ' + res.rows.length + ' person(s) by the name \''+ famousFirstName + '\':')
        for(const person of res.rows) {
            client.query("SELECT to_char('birthdate', 'DD/MM/YYYY') FROM famous_people WHERE famous_people.first_name = $1", [famousFirstName], (err, res) => {
            console.log(person.id + ': ' + person.first_name +' '+ person.last_name +', born \'' + person.birthdate + '\'');
            })
        }
        client.end();
    };
})
})
