import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // 表单验证插件
  validate: {
    enable: true,
    package: 'egg-validate',
  },
};

export default plugin; 