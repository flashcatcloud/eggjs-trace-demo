import { Context } from 'egg';

export default () => {
  return async function responseTime(ctx: Context, next: () => Promise<any>) {
    const start = Date.now();
    await next();
    const cost = Date.now() - start;
    ctx.set('X-Response-Time', `${cost}ms`);
  };
}; 