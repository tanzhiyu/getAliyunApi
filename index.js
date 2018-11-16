const aliHost = 'http://api.citylink.aliplus.com'
const Client = require('aliyun-api-gateway').Client
const UUID = require('uuid')
const fs = require('fs')


var client = new Client('25254476', '5def6366e38d9d128f3013b66989010c')

const deviceInfo = {
  productKey: 'a1LqDcxc3yk',
  deviceName: 'N6EKs04oyRObGwV9f8eX'
}

const gateWay = async ({url, apiVer, params}) => {
  return await client.post(url, {
    data: {
      id: UUID.v1(),
      version: "1.0",
      request: {
        apiVer
      },
      params: params || {}
    },
    headers: {
      accept: 'application/json'
    },
    timeout: 3000
  })
}

const params = {
  url: aliHost + '/device/get',
  apiVer: '0.2.0',
  params: deviceInfo
}



const params2 = {
  url: aliHost + '/product/ability/list',
  apiVer: "0.2.0",
  params: deviceInfo
}

const {productKey, deviceName} = deviceInfo
const params3 = {
  url: aliHost + '/device/list',
  apiVer: "0.2.0",
  params: Object.assign({}, deviceInfo, {
    pageSize: 10,
    pageNo: 1
  })
}
const params4 = {
  url: aliHost + '/device/property/list',
  apiVer: '0.2.0',
  params: Object.assign({}, deviceInfo, {
    propertyNames: ['GeoLocation']
  })
}
// gateWay(params)
//   .then(res => {
//     console.log('=============response1===============')
//     console.log(JSON.stringify(res,null,2))
//   })
//   .catch(err => console.log(err))

// gateWay(params2)
//   .then(res => {
//     console.log('=============response2===============')
//     console.log(JSON.stringify(res, null, 2))
//   })
//   .catch(err => console.log(err))


// gateWay(params3)
//   .then(res => {
//     console.log('=============response3===============')
//     console.log(JSON.stringify(res, null, 2))
//   })
//   .catch(err => console.log(err))



setInterval(() => {
  gateWay(params4)
  .then(res => {
    console.log(JSON.stringify(res, null, 2))
    genGeoFile('./GeoLocation.json', res)
  })
}, 1000)


const writeEmptyArry = (file) => {
  fs.writeFile(file, JSON.stringify([]), err => {
    if (err)
      throw err
  })
}

const genGeoFile = (file='./GeoLocation.json', info) => {
  info.time = new Date().toLocaleString()
  fs.readFile(file, (err, data) => {
    if (err) throw err
    const content = data.toString().trim() && JSON.parse(data)
    if (Array.isArray(content)) {
      content.push(info)
      writeDataToFile(file, content)
    } else {
      writeEmptyArry(file)
    }

  })
}

const writeDataToFile = (file, data) => {
  fs.writeFile(file, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      throw err
    }
  })
}






