export default {
  pages: [
    'pages/index/index',
    // 'pages/logs/index',
    'pages/user/index',
    'pages/share/index'
  ],
  permission: {
    // 'scope.userLocation': {
    //   desc: '你的位置信息将用于小程序位置接口的效果展示'
    // },
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar:{
    color: '#000',
    selectedColor: '#56abe4',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list:[{
      pagePath:'pages/index/index',
      text:'首页',
      iconPath:'image/home-page.png',
      selectedIconPath:'image/home-page-select.png'
    },{
      pagePath:'pages/user/index',
      text:'我的',
      iconPath:'image/user.png',
      selectedIconPath:'image/user-select.png'
    }]
  }
}
