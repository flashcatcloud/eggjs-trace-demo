import { Application } from 'egg';

export default (app: Application) => {
  const { router } = app;

  // 基础路由
  router.get('/', 'home.index');
  router.get('/health', 'home.health');

  // 用户相关接口
  router.get('/api/users', 'user.index');
  router.get('/api/users/:id', 'user.show');
}; 