var express = require('express')
var app = express()
var bodyParser = require('body-parser')

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


app.listen(3000, () => {
    console.log('App listening on port 3000!');
});