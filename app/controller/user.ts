import { Controller } from 'egg';
import opentelemetry,{Span} from '@opentelemetry/api';
import { mysqlQuery } from '../service/mysql';
import request from '../service/request';
const tracer = opentelemetry.trace.getTracer(
  'guguji9',
  '1.0.0',
);

export default class UserController extends Controller {
  public async show() {
    const { ctx } = this;
    const id = parseInt(ctx.params.id);
    
    if (isNaN(id)) {
      ctx.status = 400;
      ctx.body = { error: '无效的用户ID' };
      return;
    }

    const user = await ctx.service.user.getUser(id);
    ctx.body = {
      code: 0,
      data: user,
      message: '获取成功',
    };
  }

  public async index() {
    const { ctx } = this;
    const { page = 1, pageSize = 10 } = ctx.query;
    tracer.startActiveSpan('guguji7',  (span: Span) => {
      const result: number[] = [];
      for (let i = 0; i < 10; i++) {
        result.push(i);
      }
      // Be sure to end the span!
      span.end();
      return result;
    });
    const res = await mysqlQuery<string[]>(
      "mis",
      "SELECT tags FROM TagAndDescription limit 10"
    )

    const result = await ctx.service.user.getUserList(
      parseInt(page as string), 
      parseInt(pageSize as string)
    );

    const res2 = await request({uri:'http://10.99.1.223:8081/roll',method:'GET'})
    
    ctx.body = {
      code: 0,
      data: {result, res, res2},
      message: '获取成功',
    };
  }
} 