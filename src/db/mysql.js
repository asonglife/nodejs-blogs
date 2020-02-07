const mysql = require('mysql')

const {  mysqlConfig } = require('../conf/db')

const conn = mysql.createConnection(mysqlConfig)

conn.connect()

function dealQuery(sql){
  let promise = new Promise((resolve,reject) => {
    conn.query(sql, (err, reslut) => {
      if(err){
        reject(err)
        return
      }
      resolve(reslut)
    })
  })
  return promise
}

module.exports = {
  dealQuery
}