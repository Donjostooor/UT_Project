var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
const bodyParser = require("body-parser")

const dbConfig = require("./config/config")
const adminRouter = require("./controller/admin")

var app = express()
const port = 8089

/*require('./router/router')(app)*/

var app = express()
app.use(cors())
app.use(express.json())

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig)
// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the MySQL database")
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

adminRouter(app, connection);

// Start the server
app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});