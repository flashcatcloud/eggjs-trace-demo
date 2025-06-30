'use strict';

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { Resource } = require('@opentelemetry/resources');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
// getNodeAutoInstrumentations 内置大部分常见插件的追踪能力， 但是未支持redis，如果我们代码中有redis的调用，需要显示的引用并初始化redis追踪
const { RedisInstrumentation } = require('@opentelemetry/instrumentation-redis');
const { MySQLInstrumentation } = require('@opentelemetry/instrumentation-mysql');
const { MongoDBInstrumentation } = require('@opentelemetry/instrumentation-mongodb');

// 声明资源属性：指定 service.name
const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'nodejs10-demo-6-30', // 重要：自定义服务名，便于区分服务，也可以通过环境变量传入
  // 也可继续加 service.version、deployment.environment 等
});
// 使用 OTLP over gRPC 导出器
const traceExporter = new OTLPTraceExporter({
        url: '10.99.1.105:4317'    // 建议使用grpc协议， 172.18.62.237:4317 为容联云环境内部的grpc协议接收地址
        // url: 'http://10.201.0.210:4318/v1/traces'  // 也可以使用http 协议上报
  // 如需指定，可以传入 credentials 和 url（grpc-js 模式）
});
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);
const sdk = new NodeSDK({
  resource,
  traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations(),
    new RedisInstrumentation(),
    new MySQLInstrumentation(),
    new MongoDBInstrumentation({})
  ]
});

sdk.start()
  .then(() => console.log('OpenTelemetry tracing started (via gRPC)'))
  .catch(err => console.error('Failed to start OpenTelemetry:', err));

process.on('SIGTERM', () => {
  sdk.shutdown().then(() => console.log('OpenTelemetry shut down'));
});

