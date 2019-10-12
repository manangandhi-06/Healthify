var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var { getAllDieticians, getAllDishes, insertUser, userLogin, getUserDetails, getDieticianDetails, updateConsults, updateRecommends, getDishDetails } = require('./routes/query')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/css', express.static('css'));

app.use('/assets', express.static('assets'));


app.get("/", function (req, res) {
    res.render("login/login");
})

app.get("/signup", function (req, res) {
    res.render("signup/signup");
})

app.get("/user-profile/:uid", async function (req, res) {


    if (req.cookies['testCookie']){
        var userId = req.params.uid;
        var user = await getUserDetails(userId);
        console.log(user)
        res.render("user-profile/user-profile",{
            user: user
        });
    }
    else{
        res.status(400).json({message:'You are not logged in'})
    }
})

app.get("/list-of-dieticians", async(req, res) => {
    let listOfDieticians = await getAllDieticians();
    console.log(listOfDieticians)
    res.render("list-of-dieticians/list-of-dieticians", {
            listOfDieticians : listOfDieticians           
        }
    )
})

app.get("/list-of-dishes", async(req, res) => {
    let listOfDishes = await getAllDishes();
    res.render("list-of-dishes/list-of-dishes", {
            listOfDishes : listOfDishes           
        }
    )
})

app.post('/postuserSignup' ,async (req, res) => {
    let user = {}
    user["Fname"] = req.body.Fname
    user["Lname"] = req.body.Lname
    user["Username"] = req.body.Username
    user["Password"] = req.body.Password
    user["Email"] = req.body.Email
    user["Age"] = req.body.Age
    user["Weight"] = req.body.Weight
    user["Medhist"] = req.body.Medhist
    user["Sex"] = req.body.Sex
    
    let affectedRows = await insertUser(user)
    if(affectedRows){
        res.redirect('/')
    }
    else{
        res.status(400).json({message:"User Already Exist or Fill all Fields"})
    }
});

app.post('/signin', async (req, res) => {
    let user = {}
    user["Username"] = req.body.Username
    user["Password"] = req.body.Password

    let person = await userLogin(user)

    if(req.cookies['testCookie']){
        res.clearCookie('testCookie')
    }
    if(person[0]){
        
        res.cookie('testCookie',JSON.stringify({
            userId:person[1]["Uid"]}
            ),{path:'/'})
        console.log(req.cookies['testCookie'])
        console.log(person[1].Uid)
        // res.status(200).json({message:"Correct User",user:person[1][0]})
        res.redirect('/user-profile/' + person[1].Uid)

    }
    else {
        res.status(400).json({message:"Wrong User"})
    }
});

app.post('/logout', async (req, res) => {
    if(req.cookies['testCookie']){
        res.clearCookie('testCookie')
    }
    res.redirect('/');
})

app.get('/dietician-profile/:did', async (req, res) => {
    if(req.cookies['testCookie']){
        let Did = req.params.did
        let Uid = JSON.parse(req.cookies['testCookie']).userId
        var dietician = await getDieticianDetails(Did);
        var relation1 = await updateConsults(Uid, Did);
        console.log(relation1)
        res.render("dietician-profile/dietician-profile",{
            dietician: dietician
        });
    }
    else {
        res.status(400).json({message:"You are not logged in"})
    }
    
});

app.get('/dish/:id', async (req, res) => {
    if(req.cookies['testCookie']){
        let Id = req.params.id
        let Uid = JSON.parse(req.cookies['testCookie']).userId
        var dish = await getDishDetails(Id);
        var relation2 = await updateRecommends(Id, Uid);
        console.log(relation2)
        res.render("dish/dish",{
            dish: dish
        });
    }
    else {
        res.status(400).json({message:"You are not logged in"})
    }
    
});

app.listen(5000, () => {
    console.log('App listening on port 5000!');
});