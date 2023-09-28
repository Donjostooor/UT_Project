const express = require('express')
let bodyParser = require('body-parser')
const {sequelize} = require('./src/model')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

require('./src/routes')(app)

app.get('/', (req, res) => {
    res.send('Hello World!')
})


let port = 8081

sequelize.sync({force: false}).then(() => {
    app.listen(port, function () {
    console.log('Server running on ' + port)
    })
})