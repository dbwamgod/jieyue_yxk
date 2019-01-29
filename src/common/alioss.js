var OSS = require('ali-oss').Wrapper
export function client(data) {
  var client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAIerQ3ep7exyIM',
    accessKeySecret: 'uxOiLtLpcTmzqT84Qg2a76ounX9GUT',
    bucket: 'oss-test-all'
  })  //后端提供数据
  return client
}