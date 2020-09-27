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
  //   so you need to remember the document name you pass

  //   const result = await twilio.sync
  //     .services(process.env.TWILIO_SERVICE_SID)
  //     .documents.create({
  //       uniqueName: 'JSB Text To Vote Results',
  //     });

  // after the document is created then just use the update method

  //   console.log('TWILIO RESULT', result);
  const { Body } = qs.parse(event.body);
  console.log('CHECK OUT ALL MY MESSAGE', Body);
  const vote = Body.match(/yes/i) ? 'yes' : 'no';

  const { data } = await twilio.sync
    .services(process.env.TWILIO_SERVICE_SID)
    .documents()
    .fetch();

  console.log('TWILIO FETCH RESULT', data);

  //   const newData = {
  //     ...data,
  //     [vote]: data[vote] + 1,
  //   };

  //   await twilio.sync
  //     .services(process.env.TWILIO_SERVICE_SID)
  //     .documents('IS7473257f7b67069feeb8afe54f1732aa')
  //     .update({ data: newData });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
    body: `
        <Response>
            <Message>Thank you for voting. Your replied with:  ${vote} on sandwiches</Message>
        </Response>
    `,
  };
};
