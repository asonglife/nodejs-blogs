const { dealQuery } = require('../db/mysql')

const getList = (keywords, author) => {
  let sql = `select*from blogs where 1=1 `
  if(author){
    sql += `and author='${author}' `
  }
  if(keywords){
    sql += `and title like '%${keywords}%' `
  }
  sql += `order by createtime desc`
  return dealQuery(sql)
}

const getDetail = (id) => {
  if(id){
    sql = `select*from blogs where 1=1 and id=${id}`
    return dealQuery(sql)
  }
}

const newBlog = (blogData = {}) => {
  let title =blogData.title
  let author=blogData.author
  let content =blogData.content
  let createtime = Date.now()
  sql = `insert into blogs
  (title,content,createtime,author) 
  values
  ('${title}','${content}',${createtime},'${author}')`
  return dealQuery(sql).then(
    insertResult=>{
      return{
        id:insertResult.insertId
      }
    }
  )
}

const updateBlog = (id, blogData = {}) => {
  let title =blogData.title
  let author=blogData.author
  let content =blogData.content
  let createtime = Date.now()
  sql = `update blogs set title='${title}',author='${author}',
  content='${content}',createtime='${createtime}'where id='${id}'
  `
  return dealQuery(sql).then(
    updateResult => {
      if(updateResult.affectedRows > 0){
        return true
      }else{
        return false
      }
    }
  )
}

const deleteBlog = (id, author) => {
  let sql = `delete from blogs where id='${id}' and author='${author}' `
  return dealQuery(sql).then(deleteResult => {
    if(deleteResult.affectedRows > 0){
      return true
    }else{
      return false
    }
  })
}
module.exports= {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}