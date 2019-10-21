var client = require('../knex')

const getAllDieticians =  async() => {
    let allDieticians = await client.raw(`select * from dietician`)
    return allDieticians[0];
}

const getAllDishes =  async() => {
    let allDishes = await client.raw(`select * from dish`)
    return allDishes[0];
}

const refDishes =  async(Uid) => {
    let allrefDishes = await client.raw('SELECT distinct * FROM dish INNER JOIN recommends ON dish.Id=recommends.Id where recommends.Uid=?',[Uid]).then(result => result[0]).catch(err => console.log(err))
    return allrefDishes;
}

const refDieticians=  async(Uid) => {
    let allrefDieticians = await client.raw('SELECT distinct dietician.Fname,dietician.Lname,dietician.Qualification,dietician.Exp FROM dietician INNER JOIN consults ON dietician.Did=consults.Did where consults.Uid=?;',[Uid]).then(result => result[0]).catch(err => console.log(err))
    return allrefDieticians;
}

const insertUser = async(user) => {
    var user = await client.raw('INSERT INTO user(Username,Fname,Lname,Password,Email,Age,Weight,Medhist,Sex) VALUES(?,?,?,?,?,?,?,?,?)',[user.Username,user.Fname,user.Lname,user.Password,user.Email,user.Age,user.Weight,user.Medhist,user.Sex]).then(resp => resp[0].affectedRows).catch(err => console.log(err))
    return user
}

const userLogin = async(user) => {
    var user = await client.raw('SELECT * FROM user WHERE Username=? AND Password=?',[user.Username,user.Password]).then(result => result[0]).catch(err => console.log(err))
    if(user.length){
        return [true,user[0]]
    }
    return [false,user]
}

const getUserDetails = async(uid) => {
    var user = await client.raw('SELECT * FROM user WHERE Uid=?',[uid])
    return user[0][0]
}

const getDieticianDetails = async(Did) => {
    var dietician = await client.raw('SELECT * FROM dietician WHERE Did=?',[Did])
    return dietician[0][0]
}

const getDishDetails = async(Id) => {
    var dish = await client.raw('SELECT * FROM dish WHERE Id=?',[Id])
    return dish[0][0]
}

 const updateConsults = async(Uid,Did) => {
     var consults = await client.raw('INSERT INTO consults(Uid,Did) VALUES(?,?)', [Uid, Did]).then(resp => resp[0].affectedRows).catch(err => console.log(err))
     return consults;
 }

 const updateRecommends = async(Id,Uid) => {
    var recommends = await client.raw('INSERT INTO recommends(Id, Uid) VALUES(?,?)', [Id, Uid]).then(resp => resp[0].affectedRows).catch(err => console.log(err))
    return recommends;
}

module.exports = { getAllDieticians, getAllDishes, insertUser, userLogin, getUserDetails, getDieticianDetails, updateConsults, updateRecommends, getDishDetails, refDishes, refDieticians }