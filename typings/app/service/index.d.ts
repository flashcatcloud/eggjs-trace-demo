// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportMysql from '../../../app/service/mysql';
import ExportRequest from '../../../app/service/request';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    mysql: ExportMysql;
    request: ExportRequest;
    user: ExportUser;
  }
}
