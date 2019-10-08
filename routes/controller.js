var { getTest } = require('./query')

const getTest1 = async() => {
    var res = getTest();
    console.log(res)
    return res;
}

module.exports = { getTest1 }

