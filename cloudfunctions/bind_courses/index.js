// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
  const { courseInfo } = event
  const wxContext = cloud.getWXContext()
  const db = cloud.database({
    throwOnNotFound: false
  })
  return new Promise((resolve, reject) => {
    db.collection('s_course').where({ openid: wxContext.OPENID, name: courseInfo.name })
      .get()
      .then(res => {
        if (res.data[0]) {
          resolve({ code: 1, msg: '已经添加', result: null })
        } else {
          db.collection('s_course')
            .add({
              data: { ...courseInfo, openid: wxContext.OPENID }
            }).then(res => {
              resolve({ code: 0, msg: '添加成功', result: null })

            }).catch(() => {
              reject('数据错误')
            })
        }
      })
      .catch(() => {
        reject('error')
      })
  })
}
