// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportResponseTime from '../../../app/middleware/response_time';

declare module 'egg' {
  interface IMiddleware {
    responseTime: typeof ExportResponseTime;
  }
}
