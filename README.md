# eggjs-trace-demo 

## 6.18 问题排查

1.  如何使用RUM的traceid在Flashcat链路检索中查询

    会有点延迟，已经反馈给后端，在优化

2.  如何把RUM的traceid 输出到log中，后期可以在Flashcat的日志检索中查询

    https://opentelemetry.io/docs/languages/js/getting-started/nodejs/ 
    
    很可惜，opentelemetry 自动给nodejs打印log的插件官方还在开发中，我们这里可以自己配置一下middleware和eggjs的log，输出自己想要的日志

    注：1和2配置好后，都可以设置跳转链接，从trace跳转日志，从日志跳转trace

3.  mongo连接没有记录在trace中

    https://www.npmjs.com/package/@opentelemetry/instrumentation-mongodb 
    
    要求mongodb version >=3.3.0 <7 ，咱公司的3.1.13 确实不支持，需要升级一下


**视频地址：https://c9xudyniiq.feishu.cn/file/GKkpbulSloiI3Xx7p9ycq8ywnZe**

---

##### 模拟RUM带traceparent的请求

```
curl 'http://localhost:7001/api/users' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8' \
  -H 'Cache-Control: max-age=0' \
  -H 'Connection: keep-alive' \
  -b 'Hm_lvt_5f52de2a09b4d5af428aceb0e1b33959=1739937703; Hm_lvt_2718f8b80438a3802c035dc143ecb4fd=1747973599,1749094008,1749626240' \
  -H 'Sec-Fetch-Dest: document' \
  -H 'Sec-Fetch-Mode: navigate' \
  -H 'Sec-Fetch-Site: none' \
  -H 'Sec-Fetch-User: ?1' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'traceparent: 00-000000000000000032b049cf4aab3e2d-2ecf59a1320fb372-01' \
  -H 'sec-ch-ua-platform: "macOS"'
```

上访traceparent为RUM生成，在Flashcat的链路检索中，可以查询 **000000000000000032b049cf4aab3e2d** 即可查询处理