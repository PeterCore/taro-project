// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database({
    throwOnNotFound: false
  })
  return new Promise((resolve, reject) => {
    db.collection('s_course').where({ openid: wxContext.OPENID })
      .get()
      .then(res => {
        if (res.data) {
          resolve({ code: 0, msg: '', result: res.data })
        } else {
          resolve({ code: 1, msg: '请添加课程', result: null })

        }
      })
      .catch(() => {
        reject('error')
      })
  })
}
