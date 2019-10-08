var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var { getAllDieticians,getAllDishes } = require('./routes/query')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/css', express.static('css'));

app.use('/assets', express.static('assets'));

app.get("/", function (req, res) {
    res.render("login/login");
})

app.get("/user-profile", function (req, res) {
    res.render("user-profile/user-profile");
})

app.get("/list-of-dieticians", async(req, res) => {
    let listOfDieticians = await getAllDieticians();
    res.render("list-of-dieticians/list-of-dieticians", {
            listOfDieticians : listOfDieticians           
        }
    )
})

app.get("/list-of-dishes", async(req, res) => {
    let listOfDishes = await getAllDishes();
    console.log(listOfDishes)
    res.render("list-of-dishes/list-of-dishes", {
            listOfDishes : listOfDishes           
        }
    )
})

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});