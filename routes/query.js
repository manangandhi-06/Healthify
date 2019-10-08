var client = require('../knex')

const getAllDieticians =  async() => {
    let allDieticians = await client.raw(`select * from dietician`)
    return allDieticians[0];
}

const getAllDishes =  async() => {
    let allDishes = await client.raw(`select * from dish`)
    return allDishes[0];
}

module.exports = { getAllDieticians,getAllDishes }