const Client = require('aliyun-api-gateway').Client;
const UUID = require('uuid');

// 用appKey和appSecret初始化客户端
const client = new Client('你的<AppKey>', '你的<AppSecret>');

const Gateway = async ({url, apiVer, params, iotToken}) => {

    return await client.post(url, {
        data: {
            id: UUID.v1(), // 请求唯一标识，必填
            version: '1.0', // 协议版本，固定值1.0
            request: {
                apiVer // api版本，必填
            },
            params: params || {} // 业务参数，必填
        },
        headers: {
            accept: 'application/json'
        },
        timeout: 3000
    });

};

const params = {
    url: 'http://api.link.aliyun.com/thing/product/list/get',
    apiVer: '1.1.0',
    params: {
        
    }
}

Gateway(params)
    .then(res => console.log(res))
    .catch(res => console.log(res));