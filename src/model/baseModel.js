// class BaseModel{
//   constructor(data,message){
//     //data是对象类型，message是字符串类型，兼容操作
//     if(typeof data === 'string'){
//       this.message = data;
//       data = null;
//       message = null;
//     }
//     if(data){
//       this.data=data
//     }
//     if(message){
//       this.message =message
//     } 
//   }
// }
// class SuccessModel extends BaseModel{
//   constructor(data,message){
//     super(data,message)
//     this.errno = 0
//   }
// }
// class ErrorModel extends BaseModel{
//   constructor(data,message){
//     super(data,message)
//     this.errno = -1
//   }
// }

//对象的委托创造模型
let BaseModel = {
  init:function(data,message){
    if(typeof data === 'string'){
      this.message = data
      data = null
      message = null;
    }
    if(data){
      this.data = data
    }
    if(message){
      this.message = message
    }
  }
}

let SuccessModel = Object.create(BaseModel)
SuccessModel.setUp = function(data,message){
  this.init(data,message)
  this.errno = 0
}

let ErrorModel = Object.create(BaseModel)
ErrorModel.setUp = function(data,message){
  this.init(data,message)
  this.errno = -1
}

module.exports={
  SuccessModel,
  ErrorModel
}