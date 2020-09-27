const qs = require('querystring');

exports.handler = async (event) => {
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
