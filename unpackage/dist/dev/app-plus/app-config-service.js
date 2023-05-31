
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#F0F4F7","navigationBar":{"backgroundColor":"#F0F4F7","titleText":"uni-app","style":"custom","type":"default","titleColor":"#000000"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"qudong-app","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"3.8.4","entryPagePath":"pages/login/login","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#999999","selectedColor":"#007aff","borderStyle":"black","blurEffect":"none","fontSize":"13px","iconWidth":"24px","spacing":"3px","height":"49px","backgroundColor":"#F0F4F7","list":[{"pagePath":"/pages/tabBar/index/index","text":""},{"pagePath":"/pages/tabBar/calendar/calendar","text":""},{"pagePath":"/pages/tabBar/quadrants/quadrants","text":""},{"pagePath":"/pages/tabBar/habitBuildingSystem/main","text":""},{"pagePath":"/pages/tabBar/userProfile/userProfile","text":""}],"selectedIndex":0,"shown":true},"locales":{},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/login/login","meta":{"isQuit":true,"isEntry":true,"navigationBar":{},"isNVue":false}},{"path":"pages/tabBar/index/index","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/tabBar/habitBuildingSystem/index/index","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/accountManagement/personalInformationDetails/personalInformationDetails","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/audioAndAlertSettings/audioAndAlertSettings","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/tabBar/calendar/calendar","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/tabBar/quadrants/quadrants","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/tabBar/habitBuildingSystem/main","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/tabBar/userProfile/userProfile","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/aboutUs/aboutUs","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/accountManagement/emailLogin/emailLogin","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/accountManagement/registerAccount/registerAccount","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/accountManagement/changeAndRecoverPassword/changeAndRecoverPassword","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/accountManagement/accountDeletion/accountDeletion","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/audioAndAlertSettings/completionSound/completionSound","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/vipMembership/vipMembership","meta":{"navigationBar":{},"isNVue":false}},{"path":"pages/tabBar/habitBuildingSystem/loadingPage/loadingPage","meta":{"navigationBar":{},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  