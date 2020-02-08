const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')
const querystring = require ('querystring')
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
  res.setHeader('content-type','application/json')
  getPostData(req).then(postdata => {
    req.body = postdata
    const blogResult = handleBlogRouter(req, res)
    if(blogResult){
    blogResult.then(blogData => {
      console.log(blogData)
       res.end(
       JSON.stringify(blogData)
      )
    })
  }
   
    const userResult = handleUserRouter(req, res)
    if(userResult){
     userResult.then(userData => {
            res.end(
              JSON.stringify(userData)
            )
          
    }) 
    }
    
    
  })
}
module.exports = handlerFunc