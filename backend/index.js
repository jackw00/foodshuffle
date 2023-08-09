require('dotenv').config()
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const saltRounds = 10

const PORT = 3001

const app = express()

app.use(cors({
    origin: ["https://foodshuffle.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
  

const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PW,
    database:  process.env.DB_NAME
})


//add new foods
app.post('/create', (req, res) => {
    const category = req.body.category
    const name = req.body.name
    const description = req.body.description
    const user = req.body.username
    db.query(
        'INSERT INTO foods (category, name, description, userId) VALUES (?,?,?,?)',
        [category, name, description, user], (err, result) => {
            if(err) {
                console.log(err)
            } else {
                res.send("Food added!")
            }
        }
    )
})

//display routes
app.post('/showMeat', (req, res) => {
    const user = req.body.username
    db.query('SELECT * FROM foods WHERE category="meat" AND userId=? ', [user], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.post('/showVege', (req, res) => {
    const user = req.body.username
    db.query('SELECT * FROM foods WHERE category="vege" AND userId=? ', [user], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.post('/showSide', (req, res) => {
    const user = req.body.username
    db.query('SELECT * FROM foods WHERE category="side" AND userId=? ', [user], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

//delete routes
app.delete('/deleteFood/:id', (req, res) => {
    const id = req.params.id
    db.query('DELETE FROM foods WHERE id = ?', id, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

//picking foods routes
app.post('/pickMeat', (req, res) => {
    const user = req.body.username
    db.query('SELECT * FROM foods WHERE category="meat" AND userId=? ORDER BY RAND() LIMIT 1', [user], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.post('/pickVege', (req, res) => {
    const user = req.body.username
    db.query('SELECT * FROM foods WHERE category="vege" AND userId=? ORDER BY RAND() LIMIT 1', [user], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.post('/pickSide', (req, res) => {
    const user = req.body.username
    db.query('SELECT * FROM foods WHERE category="side" AND userId=? ORDER BY RAND() LIMIT 1', [user], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

//update routes
app.put('/updateName', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    db.query('UPDATE foods SET name = ? WHERE id = ?', [name, id], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

//login & authentication routes
app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err){
            console.log(err)
        }
        db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], 
        (err, result) => {
            if(err) {
                res.send({registered: false, message: 'This username already exists. Try a different one.'})
            } else {
                res.send({registered: true, message: "Welcome to Food Shuffle! Log in below."})
            }
        })
    })    
})
app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    db.query("SELECT * FROM users WHERE username = ?", [username],
    (err, result) => {
        if(err) {
            res.send({err: err})
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if(response){                   
                    res.json({loggedIn: true, result: result[0].username})
                } else {
                    res.json({loggedIn: false, message: "Username and password combination is incorrect."})
                }
            })
        } else {
            res.json({loggedIn: false, message: "Username does not exist."})
        }
    })
})


db.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message)
    }

    console.log("success")
})

app.listen(process.env.PORT || PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})