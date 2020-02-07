const { getList, 
        getDetail,
        newBlog,
        updateBlog,
        deleteBlog
       } = require('../controller/blog')
    
const {SuccessModel, ErrorModel} = require('../model/baseModel')
const handleBlogRouter = (req, res) => {
  const method = req.method;
  if(method === 'GET' && req.path === '/api/blog/list'){
    let author = req.query.author || ''
    let keywords = req.query.keywords || ''
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
    let blogData = req.body
    let result = newBlog(blogData)
    return result.then(data => {
      SuccessModel.setUp(data)
      return SuccessModel
    })
    

  }

  if(method === 'POST'&& req.path === '/api/blog/update'){
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

  if(method === 'POST'&& req.path === '/api/blog/delete'){
    let result = deleteBlog(req.query.id)
      if(result){
        SuccessModel.setUp('删除博客成功！')
        return SuccessModel
      }else{
        ErrorModel.setUp('删除博客失败！')
        return ErrorModel
      }
} 
}

module.exports = handleBlogRouter