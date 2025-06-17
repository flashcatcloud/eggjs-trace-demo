// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportResponseTime from '../../../app/middleware/response_time';
import ExportTraceLogger from '../../../app/middleware/trace_logger';

declare module 'egg' {
  interface IMiddleware {
    responseTime: typeof ExportResponseTime;
    traceLogger: typeof ExportTraceLogger;
  }
}
