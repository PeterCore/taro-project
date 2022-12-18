// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
  const { phone, password } = event
  const wxContext = cloud.getWXContext()
  const db = cloud.database({
    throwOnNotFound: false
  })
  return new Promise((resolve, reject) => {
    db.collection('s_auth').where({ phone: phone })
      .get()
      .then(res => {
        if (res.data[0]) {
          const openid = res.data[0].openid;
          const psw = res.data[0].password;
          if (psw === password) {
            db.collection('s_userInfo').where({ phone: phone })
              .get()
              .then(res => {
                if (res.data[0]) {
                  const userinfo = res.data[0]
                  resolve({ code: 0, msg: '成功登录', result: { ...userinfo, openid: openid } })
                } else {
                  resolve({ code: 2, msg: '用户信息为空', result: null })
                }
              })
              .catch(() => {
                reject('error')
              })
          } else {
            resolve({ code: 3, msg: '密码错误', result: null })
          }

        } else {
          resolve({ code: 1, msg: '账号不存在', result: null })

        }
      })
      .catch(() => {
        reject('数据错误')
      })
  })
}
