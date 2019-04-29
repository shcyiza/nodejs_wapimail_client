const makeToken = require('./token.js')
const fetch = require('node-fetch');
const log = require('./logger.js')

const WapiMail = {
  transmit(code_name, send_to, payload) {
    try {
      const token = makeToken(send_to, payload)
      let status = 200
      fetch(`http://0.0.0.0:3001/v1/transmit/${code_name}`, {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: ""
      })
      .then(res => {
        const rs = res.status
        if (rs !== 200) {
          status = rs
        }
        return res.json()
      })
      .then(json => {
        if(status === 200) {
          log.success(json)
        } else {
          const err = new Error(json.message)
          err.error_cat = "API"
          throw err
        }
      })
      .catch(error => {
        log.error(error, status)
      })

    } catch(error) {
      log.error(error)
    }
  }
}

module.exports = WapiMail