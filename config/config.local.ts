import { EggAppInfo, PowerPartial, EggAppConfig } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {};

  // 本地开发环境配置
  config.logger = {
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
  };

  // 允许跨域
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['*'],
  };

  return config;
}; 