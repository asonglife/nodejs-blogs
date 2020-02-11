const { getList, 
        getDetail,
        newBlog,
        updateBlog,
        deleteBlog
       } = require('../controller/blog')
    
const {SuccessModel, ErrorModel} = require('../model/baseModel')

 const loginCheck = (req) => {
    if(!req.session.username){
      ErrorModel.setUp('尚未登录')
      return Promise.resolve(ErrorModel)
    }
  }

const handleBlogRouter = (req, res) => {

  const method = req.method;
  if(method === 'GET' && req.path === '/api/blog/list'){
    let author = req.query.author || ''
    const keywords = req.query.keywords || ''
    if(req.query.isadmin){
      const checkResult = loginCheck(req)
      console.log('req.session in router/blog',req.session)
      if(checkResult){
        return checkResult
      }
      author = req.session.username
    }
    let result = getList(keywords,author)
    return result.then(
      listData=>{
        SuccessModel.setUp(listData)
        return SuccessModel
      }
    )
    
  }

  if(method === 'GET' && req.path ==='/api/blog/detail'){
    let id = req.query.id || ''
    let result = getDetail(id)
    return result.then(detailData => {
      SuccessModel.setUp(detailData)
      return SuccessModel
    })
    
  }

  if(method === 'POST'&& req.path === '/api/blog/new'){
    let checkResult = loginCheck(req)
    if(checkResult){
      return checkResult
    }
    req.body.author = req.session.username
    let blogData = req.body
    let result = newBlog(blogData)
    return result.then(data => {
      SuccessModel.setUp(data)
      return SuccessModel
    })
    

  }

  if(method === 'POST'&& req.path === '/api/blog/update'){
    let checkResult = loginCheck(req)
    if(checkResult){
      return checkResult
    }
    req.body.author = req.session.username
      let result = updateBlog(req.query.id, req.body)
      return result.then(
        updateResult=>{
          if(updateResult){
            SuccessModel.setUp('更新博客成功！')
            return SuccessModel
          }else{
            ErrorModel.setUp('更新博客失败！')
            return ErrorModel
          }
        }
      )
      
  }

  if(method === 'POST'&& req.path === '/api/blog/del'){
    let checkResult = loginCheck(req)
    if(checkResult){
      return checkResult
    }
    req.body.author = req.session.username
    let result = deleteBlog(req.query.id ,req.body.author)
    return result.then(
      deleteResult=>{
        if(deleteResult){
          SuccessModel.setUp('删除博客成功！')
          return SuccessModel
        }else{
          ErrorModel.setUp('删除博客失败！')
          return ErrorModel
        }
      }
    )
} 
}

module.exports = handleBlogRouter