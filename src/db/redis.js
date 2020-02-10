const {redisConfig} = require('../conf/db')

const redis = require('redis')

const redisClient = redis.createClient(redisConfig.port,redisConfig.host)

redisClient.on('err',(err) => {
  console.log(err)
})

function set(key, value){
  if(typeof value === 'object')[
    value = JSON.stringify(value)
  ]
  redisClient.set(key, value)
}

function get(key){
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if(err){
        reject(err)
      }
      if(value === null){
        resolve(null)
      }
      try{
        resolve(JSON.parse(value))
      }catch(ex){
        resolve(value)
      }
    })

  })

  return promise
}

module.exports = {
  get,
  set
}