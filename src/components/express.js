const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();



const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: '5432',
  password: 'root',
  database: 'todo'

})

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to todo application." });
});


{/* Register Users */}

app.post("/registration", (req, res) => {
  data = req.body
  console.log(data);
  try {
    client.query(
      `INSERT INTO "todo_users" ("email","password")  
                     VALUES ($1,$2)`, [data.email, data.password]); // sends queries
  }


  catch (error) {
    console.error(error.stack);
  } finally {
  }
  res.end()
})


{/* user details */}


app.get('/details/:id', async (req, res) => {
  let currentUser = req.params.id
  res.setHeader('Content-Type', 'application/json');
  client.query(`SELECT * FROM todo_users where id=${currentUser}`, (err, result) => {

    if (result) {
      console.log((typeof result.rows))
      resu = JSON.stringify(result.rows)
      res.status(200).send(resu);
    }
    else {
      console.log(err.message)
    }
  });
})



{/* Login */}

app.post("/login", (req, res) => {
  loginData = req.body
  var email = loginData.email;
  var password = loginData.password;
  var postgres = 'SELECT * FROM todo_users WHERE email= $1 AND password= $2';
  console.log("login Data", loginData.email)
  client.query(postgres, [email, password], function (err, result) {
    if (err) throw err;
    if (result.rows.length === 0) {
      console.log("Check your Email and Password")
      res.status(404).send({ 'status': 'Not Found' });
    }
    else {
      console.log("login result", result);
      let userData = JSON.stringify(result.rows[0])
      res.status(200).send({ 'status': 'Found', 'data': userData });
    }
  });
}
)



client.connect();