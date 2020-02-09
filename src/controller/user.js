const { dealQuery } = require('../db/mysql')
const registerCheck = (username, password) =>{
  sql = `select username, realname from users where username='${username}' and password='${password}'`
  return dealQuery(sql).then(
    registerResult => {
      if(!registerResult.length){
        return false
      }
      console.log(registerResult)
      return registerResult[0]

    }
  )
  
}

module.exports = {
  registerCheck
}