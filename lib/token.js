const JWT = require('jsonwebtoken');
const makePayload = require('./payload');

const makeToken = (send_to, payload) => (
  JWT .sign(
    makePayload(send_to, payload),
    process.env.WAPI_MAIL_SECRET,
    {algorithm: 'RS256', noTimestamp: true}
  )
)

module.exports = makeToken
