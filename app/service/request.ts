import { Service } from 'egg';
const request = require("request");

export default class RequestService extends Service {
  // options interface follow https://github.com/request/request#requestoptions-callback
  public async makeRequest(options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      request(options, function (error: any, response: any) {
        if (error) reject(error);
        let result = {};
        try {
          result = JSON.parse(response.body);
        } catch (e) {}
        resolve(result);
      });
    });
  }
}
