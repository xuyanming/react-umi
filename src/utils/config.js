module.exports = {
  siteName: '个税云管家',
  // copyright: 'Ant Design Admin  © 2018 zuiidea',
  logoPath: 'https://app-ptc-public.oss-cn-beijing.aliyuncs.com/web_h5_img/logo.png',
  // apiPrefix: 'http://192.168.1.69:5000',
  apiPrefix: 'https://www.geshuicloud.com',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exlude: [/(\/(en|zh))*\/login/],
    },
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      {
        key: 'en',
        title: 'English',
        flag: '/america.svg',
      },
      {
        key: 'zh',
        title: '中文',
        flag: '/china.svg',
      },
    ],
    defaultLanguage: 'zh',
  },
}
