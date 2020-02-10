const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')
const querystring = require ('querystring')
const {get, set} = require('./src/db/redis')
// let SESSION_DATA = {}
const getExpireTime= () => {
  let date = new Date()
  date.setTime(date.getTime()+24*60*60*1000)
  return date.toUTCString()
}
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if(req.method !== 'POST'){
      resolve({})
      return
    }
    if(req.headers['content-type'] !== 'application/json'){
      resolve({})
      return
    }
    let postdata = ''
    req.on('data', chunk => {
      postdata+=chunk.toString()
    })
    req.on('end', () => {
      if(!postdata){
        resolve({})
        return 
      }
      resolve(JSON.parse(postdata))
    })
  });
  return promise
}

const handlerFunc = (req, res) => {
  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1])
  req.cookie = {}
  res.setHeader('content-type','application/json')
  let cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if(!item){
      return
    }
    let key = item.split('=')[0].trim()
    let value = item.split('=')[1].trim()
    req.cookie[key]=value
  })
  //使用普通进程内存储存session
  // let userId = req.cookie.userid
  // let needSetCookie = false
  // if(userId){
  //   if(!SESSION_DATA[userId]){
  //     SESSION_DATA[userId]={}
  //   } 
  // }else{
  //   userId=`${Date.now()}_${Math.random()}`
  //   SESSION_DATA[userId]={}
  //   needSetCookie = true
  // }
  // req.session=SESSION_DATA[userId]
  // console.log('session',SESSION_DATA[userId])
  //
  //使用redis来储存session
  let needSetCookie = false
  let userId = req.cookie.userId
  if(!userId){
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    req.sessionId = {}
  }
  req.session = req.sessionId
  req.sessionId.userId = userId
  // set(req.session.userId, req.session)
  get(req.sessionId.userId).then(redisData => {
    if(redisData === null){
      set(req.sessionId.userId, {})
    }
    set(req.sessionId.userId, redisData)
    console.log(redisData)
    return getPostData(req)
  }).then(postdata => {
    req.body = postdata
    const blogResult = handleBlogRouter(req, res)
    if(blogResult){
    blogResult.then(blogData => {
      if(needSetCookie){
        res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getExpireTime()}`)
      }
       res.end(
       JSON.stringify(blogData)
      )
    })
  }
   
    const userResult = handleUserRouter(req, res)
    if(userResult){
     userResult.then(userData => {
      if(needSetCookie){
        res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getExpireTime()}`)
      }
      res.end(
              JSON.stringify(userData)
            )
          
    }) 
    }
    
    
  })
}
module.exports = handlerFunc