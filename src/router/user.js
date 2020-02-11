const {registerCheck} = require('../controller/user')

const {SuccessModel, ErrorModel} = require('../model/baseModel')

const {set} = require('../db/redis')
const handleUserRouter = (req, res) => {
  const method = req.method
  if(method === 'POST' && req.path === '/api/user/login'){
    const {username, password} = req.body
    let result = registerCheck(username, password)
    return result.then(registerResult =>{
      if(registerResult){
      req.session.realname = registerResult.realname
      req.session.username = registerResult.username
      set(req.sessionId, req.session)
      console.log('req.session in router/user',req.session)

      SuccessModel.setUp('登录成功')
      return SuccessModel
    }else{
      ErrorModel.setUp('登录失败')
      return ErrorModel
    }
    })
    
  }
//   if(method === 'GET' && req.path === '/api/user/login-test'){
//     if(req.session.username){
//       SuccessModel.setUp(req.session,'已登录')
//       return Promise.resolve(SuccessModel)
//     }
//     ErrorModel.setUp('尚未登录')
//       return Promise.resolve(ErrorModel)
// }
}

module.exports =   handleUserRouter
