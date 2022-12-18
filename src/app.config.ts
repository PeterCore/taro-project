export default {
  lazyCodeLoading: "requiredComponents",
  pages: [ 'pages/home/index','pages/user/index','pages/pick_login/index','pages/login/index','pages/userinfo/index','pages/add_children/index'],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './assets/images/tab/home.png',
        selectedIconPath: './assets/images/tab/home-active.png',
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: './assets/images/tab/user.png',
        selectedIconPath: './assets/images/tab/user-active.png',
      },
    ],
    color: '#333',
    selectedColor: '#333',
    backgroundColor: '#fff',
    borderStyle: 'white',
  },
};
