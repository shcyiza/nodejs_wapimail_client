const makeToken = require('./token')
const fetch = require('node-fetch');

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
        const {send_to, env, transaction} = json
        if(status === 200) {
          console.log('\x1b[32m%s\x1b[0m',
            `\n${new Date()} Wapi-Mail success:`, 
            `Transmission of ${transaction} to ${send_to} in ${env} is successful!\n`
          )
        } else {
          throw Error(json.message)
        }
      })
      .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `\n${new Date()} Wapi-Mail API error ${status}:`, error.message + "\n")
      })

    } catch(error) {
      console.log('\x1b[31m%s\x1b[0m', `\n${new Date()} Wapi-Mail ${error.error_cat || "SDK"} error:`, !!error.error_at ? `${error.message}\nat ${error.error_at}\n` : error.stack)
    }
  }
}

module.exports = WapiMail
