const qs = require('querystring');
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// process.env.TWILIO_ACCOUNT_SID
// process.env.TWILIO_AUTH_TOKEN

exports.handler = async (event) => {
  // twilio has a webhook that makes a post request to an endpoint.
  // it sends a payload on the event.body as a query string
  // parse this query string to get the body payload
  // supply the services SID to this function

  //   twilio doesn't enforce a strict data structure, but when you update it it should maintain the same structure
  //   so you need to remember the document you pass
  const result = await twilio.sync
    .services(process.env.TWILIO_SERVICE_SID)
    .documents.create('JSB Text To Vote Results');
  console.log('TWILIO RESULT', result);
  const { Body } = qs.parse(event.body);
  console.log('CHECK OUT ALL MY MESSAGE', Body);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
    body: `
        <Response>
            <Message>Thank you for voting. Your replied with:  ${Body}</Message>
        </Response>
    `,
  };
};
