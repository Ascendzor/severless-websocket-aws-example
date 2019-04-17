const util = require('util')
const AWS = require('aws-sdk')
const stage = 'dev'

module.exports = {
  reply: ({requestContext, body}) => {
    return new Promise((resolve, reject) => {
      const url = util.format(util.format('https://%s/%s', requestContext.domainName, stage)) //construct the needed url
      const apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({apiVersion: '2018-11-29', endpoint: url})
      apigatewaymanagementapi.postToConnection({
        ConnectionId: requestContext.connectionId, // connectionId of the receiving ws-client
        Data: JSON.stringify(body),
      }, (err, data) => {
        if (err) {
          console.log(err)
          return reject(err)
        }
        resolve(data)
      })
    })
  }
}
