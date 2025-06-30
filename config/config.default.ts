import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1234567890';

  // add your middleware config here
  // config.middleware = ['traceLogger'];
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    // 日志配置
    logger: {
      // 自定义日志格式会打印在logs/cc-server-in-api-web.log 中
      formatter(meta) {
        const { ctx } = meta;
        const traceparent = ctx?.request?.headers?.traceparent || '-';
        const traceparentArray = Array.isArray(traceparent) ? traceparent : traceparent.split('-');
        const traceID = traceparentArray[1] || '';
        const spanID = traceparentArray[2] || '';
        return `[${meta.date}] ${meta.level} ${meta.pid} ${traceID} ${spanID} ${meta.message}`;
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
}; 