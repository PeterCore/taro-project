/*
 * @Author: hjh
 * @Date: 2021-11-25 20:57:21
 * @Description: 静态常量
 */

import { UserInfo } from "@tarojs/taro"

export const tabbarUrlList = ['pages/home/index','pages/user/index',]

export const pageSize = 10

export enum UserType {
    student,
    teacher
}

export enum LoginType{
    login,
    register
  }

export interface AccountInfo {
     /** 用户昵称 */
     nickName: string
     /** 用户头像图片的 URL。URL 最后一个数值代表正方形头像大小（有 0、46、64、96、132 数值可选，0 代表 640x640 的正方形头像，46 表示 46x46 的正方形头像，剩余数值以此类推。默认132），用户没有头像时该项为空。若用户更换头像，原有头像 URL 将失效。 */
     avatarUrl: string
     /** 用户性别。不再返回，参考 [相关公告](https://developers.weixin.qq.com/community/develop/doc/00028edbe3c58081e7cc834705b801) */
     gender?: keyof UserInfo.Gender
     /** 用户所在国家。不再返回，参考 [相关公告](https://developers.weixin.qq.com/community/develop/doc/00028edbe3c58081e7cc834705b801) */
     country: string
     /** 用户所在省份。不再返回，参考 [相关公告](https://developers.weixin.qq.com/community/develop/doc/00028edbe3c58081e7cc834705b801) */
     province: string
     /** 用户所在城市。不再返回，参考 [相关公告](https://developers.weixin.qq.com/community/develop/doc/00028edbe3c58081e7cc834705b801) */
     city: string
     /** 显示 country，province，city 所用的语言。强制返回 “zh_CN”，参考 [相关公告](https://developers.weixin.qq.com/community/develop/doc/00028edbe3c58081e7cc834705b801) */
     language: keyof UserInfo.Language

     name: string,

     phone: string,
}
