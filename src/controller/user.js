const { dealQuery } = require('../db/mysql')
const registerCheck = (username, password) =>{
  sql = `select*from users where username='${username}' and password='${password}'`
  return dealQuery(sql).then(
    registerResult => {
      if(!registerResult.length){
        return false
      }
      return true

    }
  )
  
}

module.exports = {
  registerCheck
}