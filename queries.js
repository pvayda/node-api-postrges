const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})
//GET student - returns a list of all students - Caden
//GET student?search= - returns a list of students filtered on name matching the given query - Caden
const getStudents = (req, res) => {
    if(req.query.search){
        const name = req.query.search
    
        pool.query('SELECT * FROM students WHERE name = $1', [name], (error, results) => {
            if (error) {
            throw error
        } 
        res.status(200).json(results.rows)
    })
    } else {
        pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
    }
    
    
}
//GET students/:studentId - returns details of a specific student by student id - Peter
const getStudentByID = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

//GET grades/:studentId - returns all grades for a given student by student id-Peter
const getGradeByID = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM grade WHERE id = $1', [id], (error, results) => {
        if(error){
            throw error
        }
        res.status(200).json(results.rows)
    })
}


//POST grade - records a new grade, returns success status in JSON response and stores the new grade in the database

//POST register - creates a new user, returns success status in JSON response and stores the new user in the database
const registerStudent = (req, res) => {
    const name = req.body.name
    pool.query('INSERT INTO students (name) VALUES ($1)', [name], (error, results) => {
        if(error){
            throw error
        }
        res.status(200).send(`${name} added successfully`)
    } )
}

module.exports = {
    getStudents,
    getStudentByID,
    getGradeByID,
    registerStudent
}