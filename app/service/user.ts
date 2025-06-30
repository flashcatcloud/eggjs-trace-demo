import { Service } from 'egg';
import opentelemetry,{Span} from '@opentelemetry/api';
//...

const tracer = opentelemetry.trace.getTracer(
  'guguji9',
  '1.0.0',
);
export default class UserService extends Service {
  public async getUser(id: number): Promise<any> {
    const { ctx } = this;
    // 记录访问日志
    ctx.logger.info(`获取用户信息，ID: ${id}`);
    
    // 这里可以连接数据库查询用户信息
    // 暂时返回模拟数据
    return {
      id,
      name: `用户${id}`,
      email: `user${id}@example.com`,
      createTime: new Date().toISOString(),
    };
  }

  public async getUserList(page = 1, pageSize = 10): Promise<any> {
    const { ctx } = this;
    ctx.logger.info(`获取用户列表，页码: ${page}, 页大小: ${pageSize}`);
    
    // 模拟分页查询
    const users: any[] = [];
    const start = (page - 1) * pageSize;
    
    for (let i = start; i < start + pageSize; i++) {
      users.push({
        id: i + 1,
        name: `用户${i + 1}`,
        email: `user${i + 1}@example.com`,
        createTime: new Date().toISOString(),
      });
    }

    tracer.startActiveSpan('guguji7',  (span: Span) => {
      const result: number[] = [];
      for (let i = 0; i < 10; i++) {
        result.push(i);
      }
      // Be sure to end the span!
      span.end();
      return result;
    });

    return {
      list: users,
      total: 100, // 模拟总数
      page,
      pageSize,
    };
  }

  public async createUser(userData: any): Promise<any> {
    const { ctx } = this;
    ctx.logger.info(`创建新用户，数据: ${JSON.stringify(userData)}`);
    
    // 模拟用户ID生成（实际项目中应该使用数据库自增ID或UUID）
    const userId = Date.now();
    
    // 构建新用户对象
    const newUser = {
      id: userId,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || null,
      avatar: userData.avatar || null,
      status: userData.status || 'active',
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
    };

    // 这里可以添加数据库插入逻辑
    // 例如：await this.ctx.model.User.create(newUser);
    
    // 模拟数据库操作延迟
    await new Promise(resolve => setTimeout(resolve, 100));
    
    ctx.logger.info(`用户创建成功，ID: ${userId}`);
    
    return newUser;
  }
} 