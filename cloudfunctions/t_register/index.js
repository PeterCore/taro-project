// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
  const { userInfo, authInfo, } = event
  const wxContext = cloud.getWXContext()
  const db = cloud.database({
    throwOnNotFound: false
  })
  return new Promise((resolve, reject) => {
    db.collection('tauth').where({ phone: userInfo.phone })
      .get()
      .then(res => {
        if (res.data[0]) {
          resolve({ code: 1, msg: '已有账号', result: null })
        } else {
          db.collection('tauth')
            .add({
              data: { ...authInfo, createTime: db.serverDate(), openid: wxContext.OPENID }
            }).then(res => {
              db.collection('tuserInfo')
                .add({
                  data: { ...userInfo, createTime: db.serverDate() }
                }).then(res => {
                  resolve({ code: 0, msg: '注册成功', result: wxContext.OPENID })
                })
            }).catch(() => {
              reject('数据错误')
            })

        }
      })
      .catch(() => {
        reject('数据错误')
      })


  })
}
