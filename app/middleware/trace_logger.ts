import { Context } from 'egg';
// 目前输出到终端，也可以打印在文件中
export default () => {
  return async function traceLogger(ctx: Context, next: () => Promise<any>) {
    const traceparent = ctx.request.headers.traceparent || '';
    const traceparentArray = Array.isArray(traceparent) ? traceparent : traceparent.split('-');
    const traceID = traceparentArray[1] || '';
    const spanID = traceparentArray[2] || '';
    
    // 记录请求开始
    ctx.logger.info('Request started', {
      path: ctx.path,
      method: ctx.method,
        traceId: traceID,
        spanId: spanID,
    });

    try {
      await next();
    } finally {
      // 记录请求结束
      ctx.logger.info('Request ended', {
        path: ctx.path,
        method: ctx.method,
        status: ctx.status,
        traceId: traceID,
        spanId: spanID,
      });
    }
  };
}; 