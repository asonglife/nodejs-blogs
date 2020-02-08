const {registerCheck} = require('../controller/user')

const {SuccessModel, ErrorModel} = require('../model/baseModel')

const handleUserRouter = (req, res) => {
  const method = req.method
  
  if(method === 'POST' && req.path === '/api/user/login'){
    const {username, password} = req.body
    let result = registerCheck(username, password)
    return result.then(registerResult =>{
      if(registerResult){
      SuccessModel.setUp('登录成功')
      return SuccessModel
    }else{
      ErrorModel.setUp('登录失败')
      return ErrorModel
    }
    })
    
  }
}

module.exports = handleUserRouter
