import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/home.test.ts', () => {
  it('should GET /', async () => {
    const result = await app.httpRequest()
      .get('/')
      .expect(200);
    
    assert(result.text === 'Hello, Egg.js with TypeScript!');
  });

  it('should GET /health', async () => {
    const result = await app.httpRequest()
      .get('/health')
      .expect(200);
    
    assert(result.body.status === 'ok');
    assert(typeof result.body.uptime === 'number');
  });
}); 