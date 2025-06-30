import { Controller } from 'egg';
import opentelemetry,{Span} from '@opentelemetry/api';
import { mysqlQuery } from '../service/mysql';
import { createMongoClient } from '../service/mongo';
// import request from '../service/request';
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

    const client = await createMongoClient()
    const database = client.db("event")
    const alertTable = database.collection(
      "c_alert_0"
    )
    const mongoRes = await alertTable.find({ account_id:2451002751131 }).count()
    await client.close()

    const result = await ctx.service.user.getUserList(
      parseInt(page as string), 
      parseInt(pageSize as string)
    );
    // const res2 = await request({uri:'http://10.99.1.223:8081/roll',method:'GET'})
    
    ctx.body = {
      code: 0,
      data: {result, res, mongoRes},
      // data: {result, res, res2, mongoRes},
      message: '获取成功',
    };
  }

  public async create() {
    const { ctx } = this;
    
    // 获取请求体数据
    const userData = ctx.request.body;
    
    // 参数验证
    if (!userData.name || !userData.email) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        error: '用户名和邮箱是必填项',
        message: '参数错误',
      };
      return;
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        error: '邮箱格式不正确',
        message: '参数错误',
      };
      return;
    }

    try {

      // 使用startActiveSpan记录用户创建过程
      const result = await tracer.startActiveSpan('create_user', async (span: Span) => {
        // 将请求体数据添加到span属性中
        span.setAttribute('user.name', userData.name);
        span.setAttribute('user.email', userData.email);
        span.setAttribute('user.phone', userData.phone || '');
        span.setAttribute('user.avatar', userData.avatar || '');
        span.setAttribute('user.status', userData.status || 'active');
        span.setAttribute('request.timestamp', new Date().toISOString());
        
        // 在span内部调用service创建用户
        const newUser = await ctx.service.user.createUser(userData);
        console.log('newUser', newUser)
        // 记录创建结果到span
        span.setAttribute('user.created_id', newUser.id);
        span.setAttribute('user.created_time', newUser.createTime);
        
        // 结束span
        span.end();
        
        // 返回创建的用户数据
        return newUser;
      });
      
      ctx.status = 201;
      ctx.body = {
        code: 0,
        data: result,
        message: '用户创建成功',
      };
    } catch (error) {
      ctx.logger.error('创建用户失败:', error);
      ctx.status = 500;
      ctx.body = {
        code: 500,
        error: '创建用户失败',
        message: '服务器内部错误',
      };
    }
  }
} 