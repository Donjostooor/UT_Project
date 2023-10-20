var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
const bodyParser = require("body-parser")
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
// import config 
const dbConnection = require("./config/config")
// import controllers
const adminRouter = require("./controller/admin")
const menuRouter = require("./controller/menu")
const modelRouter = require("./controller/model")
const predictRouter = require("./controller/predict")
const userRouter = require("./controller/user");
const account = require("./controller/account");

var app = express()
const port = 3036
app.use(cors())
app.use(express.json())

// Create a MySQL connection
const connection = mysql.createConnection(dbConnection)
// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the MySQL database")
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// use controller
adminRouter(app, connection);
menuRouter(app, connection);
modelRouter(app, connection);
predictRouter(app, connection);
userRouter(app, connection);
account(app, connection);

// Start the server
app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});
