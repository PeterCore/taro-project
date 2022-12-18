// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

cloud.init()
exports.main = async () => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database({
    throwOnNotFound: false
  })

  return new Promise((resolve, reject) => {
    db.collection('cs').get().then(res => {
      let data = res.data || []
      resolve(data)
    }).catch(() => {
      reject('error')
    })
  })
}
