const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})
//GET student - returns a list of all students - Caden
const getStudents = (req, res) => {
    if(req.query.search){
        const name = req.query.search
    
        pool.query('SELECT * FROM student WHERE name = $1', [name], (error, results) => {
            if (error) {
            throw error
        } 
        res.status(200).json(results.rows)
    })
    } else {
        pool.query('SELECT * FROM student ORDER BY id ASC', (error, results) => {
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
    pool.query('SELECT * FROM student WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

//GET student?search= - returns a list of students filtered on name matching the given query - Caden

const nameSearch = (req, res) => {
    const name = req.query.search
    
    pool.query('SELECT * FROM student WHERE name = $1', [search], (error, results) => {
        if (error) {
            throw error
        } 
        res.status(200).json(results.rows)
    })
}

//GET grades/:studentId - returns all grades for a given student by student id

//POST grade - records a new grade, returns success status in JSON response and stores the new grade in the database

//POST register - creates a new user, returns success status in JSON response and stores the new user in the database

module.exports = {
    getStudents,
    getStudentByID,
}