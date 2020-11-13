const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (req, res) => {
    res.json({info : 'Node.js, Express, and Postgres API'})
})

app.get('/students', db.getStudents);
app.get('/students/:id', db.getStudentByID);
app.get('/grades/:id', db.getGradeByID);
app.post('/students', db.registerStudent);



app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })