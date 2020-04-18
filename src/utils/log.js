let fs = require('fs')
let path = require('path')
//将日志写入
function writeStream(writeStream,log){
  writeStream.write(log.toString()+'\n');
}


//创建日志写入的函数
function createWriteStream(filename){
  let fullFileName = path.join(__dirname,'../','../','/log',filename)
  let writeStream = fs.createWriteStream(fullFileName,{
    flags:'a'
  })
  return writeStream
}
const accessStream = createWriteStream('access.log')

function access(log) {
  writeStream(accessStream,log)
}

module.exports={
  access
}

