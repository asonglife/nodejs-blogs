let mysqlConfig = {
    host    :'localhost',
    user    :'root',
    password:'123456',
    port    :'3306',
    database:'myblog'
  }

let redisConfig = {
  port:6379,
  host:'127.0.0.1'
}
module.exports ={
  mysqlConfig,
  redisConfig
}